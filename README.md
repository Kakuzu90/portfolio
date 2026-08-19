# Minimal Static Portfolio

A single-page static portfolio built from scratch with zero dependencies, fetching content dynamically from a JSON file.

## How to Run Locally

Since the `index.html` uses `fetch()` to read a local file (`data.json`), it requires a local HTTP server to avoid CORS issues. You can run one instantly using Python 3:

```bash
python3 -m http.server
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

## How to Edit Content

All content is driven by the `data.json` file. You **do not** need to edit the HTML or CSS to add or remove entries.

To add a new project or job entry, simply append a new object to the `projects` or `experience` arrays in `data.json`:

```json
{
  "title": "New Job Title",
  "org": "Company Name",
  "period": "2024",
  "detail": "Description of the job."
}
```

Save the file and refresh the page to see the new entry automatically rendered.
