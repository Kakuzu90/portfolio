# Dual-Audience Static Portfolio

A zero-dependency portfolio with a shared content source and two audience-specific presentations.

## Routes

- `/` — portfolio view selector
- `/dev/` — technical portfolio
- `/client/` — client portfolio

The selected view is saved in `localStorage` under `portfolio_view`. Returning to `/` opens the saved view automatically. “Choose another view” clears the preference.

## Run Locally

The portfolio fetches `data.json`, so serve the directory over HTTP:

```bash
python3 -m http.server
```

Then open [http://localhost:8000](http://localhost:8000).

## Edit Content

Core content lives in `data.json` and is rendered by `app.js` for both portfolio views.

- Existing top-level identity, experience, projects, skills, and contact fields drive the technical view.
- The top-level `client` object contains client-specific hero copy, selected project IDs, services, process steps, and the secondary technology list.
- Each project can include `technicalDetails`, `clientSummary`, `clientProblem`, `clientSolution`, `features`, `benefit`, and optional `screenshots`.

For screenshots, use paths relative to this directory:

```json
"screenshots": [
  {
    "src": "images/project-dashboard.png",
    "alt": "Project dashboard",
    "caption": "Illustrative interface mockup"
  }
]
```

Projects without screenshots render normally without an empty placeholder.
