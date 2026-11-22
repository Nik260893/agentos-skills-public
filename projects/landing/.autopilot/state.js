window.STATE =
{
  "version": 2,
  "slug": "series-landing",
  "dir": "2026-11-22-series-landing--wip",
  "title": "Лендинг мини-сериала",
  "mode": "semi",
  "depth": "normal",
  "tier": "T0",
  "briefFile": "2026-11-22-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "/home/user/nick-vels/skills/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-11-22T21:19:06+00:00",
  "updatedAt": "2026-11-22T21:22:15+00:00",
  "finishedAt": null,
  "stages": [
    {
      "id": "preflight",
      "status": "done",
      "startedAt": "2026-11-22T21:19:06+00:00",
      "finishedAt": "2026-11-22T21:19:15+00:00"
    },
    {
      "id": "manifest",
      "status": "done",
      "startedAt": "2026-11-22T21:19:15+00:00",
      "finishedAt": "2026-11-22T21:19:35+00:00"
    },
    {
      "id": "briefing",
      "status": "done",
      "startedAt": "2026-11-22T21:19:35+00:00",
      "finishedAt": "2026-11-22T21:21:09+00:00"
    },
    {
      "id": "spec",
      "status": "done",
      "startedAt": "2026-11-22T21:21:09+00:00",
      "finishedAt": "2026-11-22T21:22:08+00:00"
    },
    {
      "id": "plan",
      "status": "active",
      "startedAt": "2026-11-22T21:22:08+00:00"
    },
    {
      "id": "build",
      "status": "pending"
    },
    {
      "id": "review",
      "status": "pending"
    },
    {
      "id": "final",
      "status": "pending"
    }
  ],
  "requirements": {
    "total": 14,
    "done": 0,
    "inTicket": 14,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [
    {
      "id": "01",
      "title": "Страница-лендинг сериала",
      "requirements": [
        "R01",
        "R02",
        "R03",
        "R04",
        "R05",
        "R06",
        "R06.1",
        "R07",
        "R07.1",
        "A01",
        "R08",
        "R09",
        "R09.1",
        "R10",
        "R12",
        "A02",
        "R14i",
        "R11",
        "R13"
      ],
      "blockedBy": [],
      "wave": 1,
      "zone": [
        "index.html",
        "README.md",
        "tests/"
      ],
      "review": "нет",
      "model": "обычная",
      "status": "pending",
      "retries": 0,
      "repairs": 0
    }
  ],
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [
    "вторая кнопка «Смотреть первую серию» внизу — ради R07",
    "README.md с инструкцией — ради R12"
  ],
  "coverage": {
    "found": 4,
    "fixed": 4,
    "deferred": 0,
    "items": []
  },
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-11-22T21:19:06+00:00",
    "2026-11-22T21:19:15+00:00",
    "2026-11-22T21:19:35+00:00",
    "2026-11-22T21:20:42+00:00",
    "2026-11-22T21:21:09+00:00",
    "2026-11-22T21:21:50+00:00",
    "2026-11-22T21:22:08+00:00",
    "2026-11-22T21:22:15+00:00"
  ],
  "rev": 16,
  "waiting": null,
  "waits": [
    {
      "kind": "briefing",
      "from": "2026-11-22T21:19:35+00:00",
      "to": "2026-11-22T21:20:42+00:00"
    }
  ],
  "log": [
    {
      "t": "2026-11-22T21:19:06+00:00",
      "k": "init"
    },
    {
      "t": "2026-11-22T21:19:15+00:00",
      "k": "stage",
      "id": "manifest",
      "act": "start"
    },
    {
      "t": "2026-11-22T21:19:35+00:00",
      "k": "stage",
      "id": "briefing",
      "act": "start"
    },
    {
      "t": "2026-11-22T21:19:35+00:00",
      "k": "ask",
      "kind": "briefing",
      "note": "два вопроса — тексты сериала, стиль страницы"
    },
    {
      "t": "2026-11-22T21:20:42+00:00",
      "k": "answered",
      "kind": "briefing"
    },
    {
      "t": "2026-11-22T21:21:09+00:00",
      "k": "gate",
      "g": "G1",
      "ok": true,
      "open": 0,
      "total": 14
    },
    {
      "t": "2026-11-22T21:21:09+00:00",
      "k": "stage",
      "id": "spec",
      "act": "start"
    },
    {
      "t": "2026-11-22T21:21:50+00:00",
      "k": "gate",
      "g": "G2",
      "ok": true,
      "found": 4,
      "fixed": 4,
      "deferred": 0
    },
    {
      "t": "2026-11-22T21:21:50+00:00",
      "k": "add",
      "key": "additions",
      "n": 2
    },
    {
      "t": "2026-11-22T21:22:08+00:00",
      "k": "stage",
      "id": "plan",
      "act": "start"
    },
    {
      "t": "2026-11-22T21:22:08+00:00",
      "k": "tier",
      "v": "T0"
    },
    {
      "t": "2026-11-22T21:22:08+00:00",
      "k": "tickets",
      "n": 1
    },
    {
      "t": "2026-11-22T21:22:08+00:00",
      "k": "gate",
      "g": "G3",
      "ok": false,
      "problems": 2
    },
    {
      "t": "2026-11-22T21:22:15+00:00",
      "k": "tickets",
      "n": 1
    },
    {
      "t": "2026-11-22T21:22:15+00:00",
      "k": "gate",
      "g": "G3",
      "ok": true,
      "problems": 0
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«простой одностраничный сайт-лендинг для моего мини-сериала»",
      "status": "in-ticket"
    },
    {
      "id": "R02",
      "text": "«Идея сериала: [2–3 предложения о сюжете]»",
      "status": "in-ticket"
    },
    {
      "id": "R03",
      "text": "«На странице: название»",
      "status": "in-ticket"
    },
    {
      "id": "R04",
      "text": "«короткое описание»",
      "status": "in-ticket"
    },
    {
      "id": "R05",
      "text": "«3 героя»",
      "status": "in-ticket"
    },
    {
      "id": "R06",
      "text": "«трейлер-заглушка»",
      "status": "in-ticket"
    },
    {
      "id": "R07",
      "text": "«кнопка «Смотреть первую серию» (пока без ссылки)»",
      "status": "in-ticket"
    },
    {
      "id": "R08",
      "text": "«Без ключей, без оплаты, без внешних сервисов»",
      "status": "in-ticket"
    },
    {
      "id": "R09",
      "text": "«просто HTML-страница»",
      "status": "in-ticket"
    },
    {
      "id": "R10",
      "text": "«Готовый проект положи в папку projects/landing/»",
      "status": "in-ticket"
    },
    {
      "id": "R11",
      "text": "«сохрани в репозиторий (commit + push)»",
      "status": "in-ticket"
    },
    {
      "id": "R12",
      "text": "«В конце скажи, как открыть страницу»",
      "status": "in-ticket"
    },
    {
      "id": "R13",
      "text": "«Я новичок, объясняй простыми словами»",
      "status": "in-ticket"
    },
    {
      "id": "R14i",
      "text": "(подразумевается) страница нормально выглядит на телефоне",
      "status": "in-ticket"
    }
  ],
  "gates": {
    "G1": {
      "ok": true,
      "at": "2026-11-22T21:21:09+00:00",
      "open": 0,
      "total": 14
    },
    "G2": {
      "ok": true,
      "at": "2026-11-22T21:21:50+00:00",
      "found": 4,
      "fixed": 4,
      "deferred": 0
    },
    "G3": {
      "ok": true,
      "at": "2026-11-22T21:22:15+00:00",
      "problems": 0
    }
  },
  "result": null
}
