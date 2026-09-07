# Dual-Audience Vue Portfolio

A Vue 3 single-page portfolio built with Vite and Vue Router. One shared content source powers technical and client-facing presentations.

## Routes

- `/` — portfolio view selector
- `/dev` — technical portfolio
- `/client` — client portfolio

The selected view is saved in `localStorage` under `portfolio_view`. Returning to `/` opens the saved view automatically. “Choose another view” clears the preference.

The interface uses the Midnight Cobalt palette with light and dark modes.

## Development

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

The build creates `dist/dev/index.html` and `dist/client/index.html` fallbacks so direct route requests work on ordinary static hosts. Set `VITE_BASE` when deploying below a domain subpath.

## Content

`data.json` is the single source of portfolio content.

- Top-level identity, experience, projects, skills, and contact fields drive the technical view.
- The `client` object contains client-specific hero copy, selected project IDs, services, process steps, and technologies.
- Project records can contain `technicalDetails`, client-facing fields, and optional screenshots.

Public assets live in `public`. Screenshot paths in `data.json` are relative to that directory:

```json
"screenshots": [
  {
    "src": "images/project-dashboard.png",
    "alt": "Project dashboard",
    "caption": "Illustrative mockup"
  }
]
```

Projects without screenshots render without empty media placeholders.
