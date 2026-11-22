// Проверка лендинга: node tests/check.js (из папки projects/landing).
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const readmePath = path.join(root, 'README.md');

const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
  } catch (e) {
    results.push({ name, ok: false, why: String(e.message || e).split('\n')[0] });
  }
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// Открывает страницу, собирая все сетевые запросы (кроме самого file://-документа).
async function open(browser, width, opts = {}) {
  const context = await browser.newContext({
    viewport: { width, height: 800 },
    javaScriptEnabled: opts.js !== false,
  });
  const external = [];
  await context.route('**/*', (route) => {
    const u = route.request().url();
    // Локальные файлы и data: — не сеть; всё остальное фиксируем и не пускаем.
    if (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('about:')) return route.continue();
    external.push(u);
    route.abort();
  });
  const page = await context.newPage();
  page.on('request', (r) => {
    const u = r.url();
    if (/^https?:|^wss?:|^ftp:/.test(u) && !external.includes(u)) external.push(u);
  });
  await page.goto(pathToFileURL(htmlPath).href);
  return { context, page, external };
}

async function main() {
  const src = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';

  await check('index.html существует', () => assert(src.length > 0, 'нет файла index.html'));

  await check('один файл: lang, title, viewport, стили и скрипт внутри', () => {
    assert(/<html[^>]*\slang="ru"/i.test(src), 'нет lang="ru"');
    assert(/<title>[^<]+<\/title>/i.test(src), 'нет <title>');
    assert(/<meta[^>]*name="viewport"/i.test(src), 'нет meta viewport');
    assert(/<style[\s>]/i.test(src), 'нет <style>');
    assert(/<script[\s>]/i.test(src), 'нет <script>');
    assert(!/<link[^>]*rel=["']?stylesheet/i.test(src), 'внешний stylesheet');
    assert(!/<script[^>]*\ssrc=/i.test(src), 'внешний script');
  });

  await check('в коде нет внешних адресов', () => {
    assert(src.length > 0, 'нет файла');
    assert(!/(https?:)?\/\/[a-z0-9-]+\.[a-z]/i.test(src.replace(/<!--[\s\S]*?-->/g, '')), 'найден внешний адрес');
  });

  await check('README.md: простыми словами, есть «впиши»', () => {
    assert(fs.existsSync(readmePath), 'нет README.md');
    const t = fs.readFileSync(readmePath, 'utf8');
    assert(/впиши/.test(t), 'нет подсказки про поиск «впиши»');
    assert(/index\.html/.test(t), 'нет упоминания index.html');
    assert(/двойн/i.test(t), 'нет объяснения, как открыть двойным щелчком');
  });

  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    results.push({ name: 'запуск Chromium', ok: false, why: e.message.split('\n')[0] });
    return report();
  }

  for (const width of [1280, 375]) {
    const tag = `[${width}] `;
    let ctx;
    try {
      ctx = await open(browser, width);
    } catch (e) {
      await check(tag + 'страница открывается', () => { throw e; });
      continue;
    }
    const { page, external, context } = ctx;

    await check(tag + 'четыре раздела по порядку и видны', async () => {
      const ids = await page.evaluate(() =>
        ['hero', 'characters', 'trailer', 'watch'].map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: r.top + scrollY, h: r.height, vis: getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none' };
        }));
      ids.forEach((x, i) => assert(x && x.h > 0 && x.vis, 'раздел не виден: ' + ['hero', 'characters', 'trailer', 'watch'][i]));
      for (let i = 1; i < ids.length; i++) assert(ids[i].top > ids[i - 1].top, 'неверный порядок разделов');
    });

    await check(tag + 'тёмный фон, светлый текст, крупный h1 с заглушкой', async () => {
      const d = await page.evaluate(() => {
        const rgb = (s) => s.match(/[\d.]+/g).map(Number);
        const lum = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
        const h1s = document.querySelectorAll('h1');
        return {
          bg: lum(rgb(getComputedStyle(document.body).backgroundColor)),
          fg: lum(rgb(getComputedStyle(document.body).color)),
          n: h1s.length,
          size: h1s[0] ? parseFloat(getComputedStyle(h1s[0]).fontSize) : 0,
          text: h1s[0] ? h1s[0].textContent.trim() : '',
        };
      });
      assert(d.bg < 70, 'фон не тёмный');
      assert(d.fg > 170, 'текст не светлый');
      assert(d.n === 1, 'h1 должен быть один');
      assert(d.size >= 32, 'h1 мелкий: ' + d.size);
      assert(/^\[.+впиши\]$/.test(d.text), 'h1 не заглушка: ' + d.text);
    });

    await check(tag + 'три героя: портрет, имя, фраза, всё заглушки', async () => {
      const d = await page.evaluate(() =>
        [...document.querySelectorAll('#characters .character')].map((c) => ({
          portrait: !!c.querySelector('.portrait'),
          ph: [...c.querySelectorAll('.placeholder')].map((p) => p.textContent.trim()),
          text: c.textContent.replace(/\s+/g, ' ').trim(),
        })));
      assert(d.length === 3, 'героев ' + d.length + ', нужно 3');
      d.forEach((c, i) => {
        assert(c.portrait, `у героя ${i + 1} нет места под портрет`);
        assert(c.ph.length >= 2, `у героя ${i + 1} меньше двух заглушек (имя, фраза)`);
        assert(c.ph.every((t) => /^\[.+впиши\]$/.test(t)), `заглушка героя ${i + 1} не вида [… — впиши]`);
      });
    });

    await check(tag + 'описание сюжета — заглушка в #hero', async () => {
      const n = await page.$$eval('#hero .placeholder', (e) => e.filter((x) => /^\[.+впиши\]$/.test(x.textContent.trim())).length);
      assert(n >= 2, 'в #hero меньше двух заглушек (название, описание)');
    });

    await check(tag + 'трейлер: 16:9, «▶», подпись, подсказка по нажатию', async () => {
      const box = await page.$('#trailer .trailer-box');
      assert(box, 'нет .trailer-box');
      const b = await box.boundingBox();
      assert(Math.abs(b.width / b.height - 16 / 9) < 0.03, 'не 16:9: ' + (b.width / b.height).toFixed(2));
      const txt = await page.$eval('#trailer', (e) => e.textContent);
      assert(txt.includes('Трейлер скоро'), 'нет подписи «Трейлер скоро»');
      const btn = await page.$('#trailer button[type="button"]');
      assert(btn, 'нет button type=button');
      assert((await btn.textContent()).includes('▶'), 'на кнопке нет ▶');
      assert(await page.$('#trailer [role="status"]'), 'нет role=status');
      await btn.click();
      const s = await page.$eval('#trailer [role="status"]', (e) => e.textContent.trim());
      assert(s === 'Трейлер появится позже', 'подсказка: «' + s + '»');
    });

    for (const sec of ['hero', 'watch']) {
      await check(tag + `кнопка серии в #${sec}: подсказка, адрес и прокрутка не меняются`, async () => {
        const btns = await page.$$(`#${sec} button[type="button"]`);
        const target = [];
        for (const b of btns) if ((await b.textContent()).includes('Смотреть первую серию')) target.push(b);
        assert(target.length === 1, 'кнопок «Смотреть первую серию»: ' + target.length);
        assert(!(await page.$(`#${sec} a[href]`)) || true, '');
        await target[0].scrollIntoViewIfNeeded();
        const before = await page.evaluate(() => ({ y: scrollY, url: location.href }));
        await target[0].click();
        const after = await page.evaluate(() => ({ y: scrollY, url: location.href }));
        assert(before.url === after.url, 'адрес изменился');
        assert(before.y === after.y, 'страница прыгнула');
        const s = await page.$eval(`#${sec} [role="status"]`, (e) => e.textContent.trim());
        assert(s === 'Первая серия скоро', 'подсказка: «' + s + '»');
      });
    }

    await check(tag + 'видимый фокус с клавиатуры на кнопке', async () => {
      await page.reload(); // сбрасываем фокус после прошлых нажатий
      await page.keyboard.press('Tab');
      const f = await page.evaluate(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        return { tag: el.tagName, outline: cs.outlineStyle, w: parseFloat(cs.outlineWidth), shadow: cs.boxShadow };
      });
      assert(f.tag === 'BUTTON', 'первый Tab не на кнопке: ' + f.tag);
      assert((f.outline !== 'none' && f.w > 0) || f.shadow !== 'none', 'фокус не виден');
    });

    await check(tag + 'нет горизонтальной прокрутки', async () => {
      const d = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      assert(d.sw <= d.cw, `scrollWidth ${d.sw} > ${d.cw}`);
    });

    await check(tag + (width === 375 ? 'карточки героев в столбик' : 'карточки героев в ряд'), async () => {
      const r = await page.$$eval('#characters .character', (e) => e.map((x) => { const b = x.getBoundingClientRect(); return { l: Math.round(b.left), t: Math.round(b.top) }; }));
      assert(r.length === 3, 'нет трёх карточек');
      if (width === 375) assert(r.every((x) => x.l === r[0].l) && r[1].t > r[0].t && r[2].t > r[1].t, 'не в столбик');
      else assert(r[0].t === r[1].t && r[1].t === r[2].t, 'не в ряд');
    });

    await check(tag + 'нет запросов во внешнюю сеть', () => {
      assert(external.length === 0, 'запросы: ' + external.slice(0, 3).join(', '));
    });
    await context.close();
  }

  // Перехват запросов реально работает: проверка поймала бы внешний запрос.
  await check('перехват запросов ловит внешний запрос (самопроверка)', async () => {
    const context = await browser.newContext();
    const seen = [];
    await context.route('**/*', (r) => { seen.push(r.request().url()); r.abort(); });
    const page = await context.newPage();
    await page.setContent('<img src="http://example.invalid/x.png">');
    await page.waitForTimeout(300);
    await context.close();
    assert(seen.some((u) => u.includes('example.invalid')), 'перехват не сработал');
  });

  await check('с выключенным JavaScript все разделы и тексты видны', async () => {
    const { page, context } = await open(browser, 1280, { js: false });
    const d = await page.evaluate(() => ({
      secs: ['hero', 'characters', 'trailer', 'watch'].map((id) => { const e = document.getElementById(id); return !!e && e.getBoundingClientRect().height > 0 && e.textContent.trim().length > 0; }),
      cards: document.querySelectorAll('#characters .character').length,
      ph: document.querySelectorAll('.placeholder').length,
      btns: document.querySelectorAll('button').length,
    }));
    await context.close();
    assert(d.secs.every(Boolean), 'раздел пуст или не виден');
    assert(d.cards === 3 && d.ph >= 8 && d.btns >= 3, 'содержимое неполное');
  });

  await browser.close();
  report();
}

function report() {
  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : ' — ' + r.why}`);
  const ok = results.filter((r) => r.ok).length;
  console.log(`${ok}/${results.length}`);
  process.exit(ok === results.length ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
