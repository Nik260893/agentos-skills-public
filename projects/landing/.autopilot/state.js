window.STATE =
{
  "version": 2,
  "slug": "series-landing",
  "dir": "2026-11-22-series-landing--wip",
  "title": "Лендинг мини-сериала",
  "mode": "semi",
  "depth": "normal",
  "tier": null,
  "briefFile": "2026-11-22-brief.md",
  "memoryFile": "AGENTS.md",
  "memoryOwner": "autopilot",
  "skillDir": "/home/user/nick-vels/skills/skills/autopilot",
  "baseCommit": null,
  "startedAt": "2026-11-22T21:19:06+00:00",
  "updatedAt": "2026-11-22T21:19:35+00:00",
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
      "status": "active",
      "startedAt": "2026-11-22T21:19:35+00:00"
    },
    {
      "id": "spec",
      "status": "pending"
    },
    {
      "id": "plan",
      "status": "pending"
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
    "inTicket": 0,
    "inSpec": 0,
    "placeholder": 0,
    "deferred": 0,
    "dropped": 0
  },
  "tickets": [],
  "tests": null,
  "debt": {
    "placeholders": [],
    "assumptions": [],
    "emptyEnv": []
  },
  "additions": [],
  "coverage": null,
  "concerns": [],
  "blind": null,
  "beats": [
    "2026-11-22T21:19:06+00:00",
    "2026-11-22T21:19:15+00:00",
    "2026-11-22T21:19:35+00:00"
  ],
  "rev": 6,
  "waiting": {
    "kind": "briefing",
    "since": "2026-11-22T21:19:35+00:00",
    "note": "два вопроса — тексты сериала, стиль страницы"
  },
  "waits": [],
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
    }
  ],
  "reqList": [
    {
      "id": "R01",
      "text": "«простой одностраничный сайт-лендинг для моего мини-сериала»",
      "status": "open"
    },
    {
      "id": "R02",
      "text": "«Идея сериала: [2–3 предложения о сюжете]»",
      "status": "open"
    },
    {
      "id": "R03",
      "text": "«На странице: название»",
      "status": "open"
    },
    {
      "id": "R04",
      "text": "«короткое описание»",
      "status": "open"
    },
    {
      "id": "R05",
      "text": "«3 героя»",
      "status": "open"
    },
    {
      "id": "R06",
      "text": "«трейлер-заглушка»",
      "status": "open"
    },
    {
      "id": "R07",
      "text": "«кнопка «Смотреть первую серию» (пока без ссылки)»",
      "status": "open"
    },
    {
      "id": "R08",
      "text": "«Без ключей, без оплаты, без внешних сервисов»",
      "status": "open"
    },
    {
      "id": "R09",
      "text": "«просто HTML-страница»",
      "status": "open"
    },
    {
      "id": "R10",
      "text": "«Готовый проект положи в папку projects/landing/»",
      "status": "open"
    },
    {
      "id": "R11",
      "text": "«сохрани в репозиторий (commit + push)»",
      "status": "open"
    },
    {
      "id": "R12",
      "text": "«В конце скажи, как открыть страницу»",
      "status": "open"
    },
    {
      "id": "R13",
      "text": "«Я новичок, объясняй простыми словами»",
      "status": "open"
    },
    {
      "id": "R14i",
      "text": "(подразумевается) страница нормально выглядит на телефоне",
      "status": "open"
    }
  ],
  "gates": {},
  "result": null
}
