# LNP Open Data Registry

Static GitHub Pages dashboard for the integrated LNP open-data mart.

Chinese project overview: [PROJECT_OVERVIEW_ZH.md](PROJECT_OVERVIEW_ZH.md)

Current static build:

- Combined records: 100,484
- Core open records: 21,283
- High-throughput records: 79,201
- Static site payload: about 6 MB

## Data Build

The source SQLite database is kept outside the Pages repository:

```powershell
python ..\tools\build_lnp_pages_data.py --limit-per-group 250
```

The build script writes:

- SQLite mart tables named `lnp_pages_*` into `..\data\external\lnp_open\external_lnp_open.db`
- Static JSON and CSV assets under `data\`
- Selected audit and integration reports under `reports\`

## Local Preview

```powershell
python -m http.server 8008
```

Then open `http://localhost:8008/`.

## GitHub Pages

Use the repository root as the Pages source. The included workflow deploys the static site from `main` using GitHub Pages Actions.

The large local SQLite database and full raw CSV exports are intentionally excluded from this static site. Publish those separately with Git LFS, Zenodo, or an institutional data repository if full-table downloads are needed.
