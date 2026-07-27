# AGENTS.md — jmhungdev.github.io (Jekyll personal site)

## Startup Rules

Before changing anything, complete these steps in order:

1. **Read this file completely.** It defines the boundaries and conventions for this site.
2. **Read `CLAUDE.md`** for the command reference and file map.
3. **Run `bash init.sh`** to verify the site builds cleanly. If it fails, fix the build before doing anything else.
4. **Read `feature_list.json`** to see the current state of every site capability.

## What This Is

A static personal site built with **Jekyll**, deployed by **GitHub Actions** to **GitHub Pages**,
served at **https://jmhung.com** (see `CNAME`). There is no Node build step, no CSS framework, and
no JavaScript framework. Hand-written HTML, Liquid, CSS, and vanilla JS only.

## Layer Boundaries

Jekyll gives this site four kinds of files. Keep them separate:

### Config (`_config.yml`)
- Site-wide settings: `title`, `description`, `url`, Markdown engine, post permalinks, `exclude`.
- Changes here are **not** picked up by `jekyll serve --watch`. Restart the server after editing.
- `url` must stay `https://jmhung.com` — it must agree with `CNAME`.

### Layouts (`_layouts/`)
- HTML shells plus Liquid. `default.html` is the page chrome (head, nav, footer, theme toggle);
  `post.html` wraps a single post and itself uses `layout: default`.
- Layouts hold **structure only**. No prose, no post-specific content.
- A layout renders page body via `{{ content }}` — never inline a page's copy into a layout.

### Content (root pages + `_posts/`)
- Root pages: `index.html`, `deepdive.html`. Each **must** start with YAML front matter
  (even if empty) or Jekyll copies it through unprocessed and Liquid stops working.
- Posts: `_posts/YYYY-MM-DD-slug.md`, Markdown (kramdown/GFM), front matter with
  `layout: post` and `title`. The filename date sets both sort order and the displayed date.
- Posts publish to `/deepdive/:title/` per the `defaults` block in `_config.yml`.
  Do not hand-write `permalink:` in a post unless deliberately breaking that pattern.

### Static assets (`css/`, `js/`, `assets/`)
- Served from the site root: `/css/style.css`, `/js/theme.js`, `/assets/favicon.svg`.
- The site has **no `baseurl`**, so root-relative paths (`/css/...`) are correct. Keep them
  root-relative; do not switch to relative paths.

### Build output (`_site/`, `.jekyll-cache/`)
- Generated. Never edit, never commit — both are in `.gitignore`.
- If you need to inspect rendered HTML, read it from `_site/` but change the source.

## Conventions

### Styling
- All colors go through CSS custom properties defined in `css/style.css`.
- The theme is defined in **four** blocks that must stay in sync. Adding or renaming a color
  variable means editing all four:
  1. `:root` — light defaults
  2. `@media (prefers-color-scheme: dark)` — OS preference
  3. `:root[data-theme="dark"]` — explicit user override
  4. `:root[data-theme="light"]` — explicit user override
- No CSS preprocessor, no utility framework. Plain CSS in one file.

### JavaScript
- Vanilla ES5-compatible JS, no bundler, no dependencies.
- The inline script in `_layouts/default.html` <head> applies the saved theme **before** first
  paint. It must stay inline and stay in `<head>` — moving it causes a flash of the wrong theme.
- `js/theme.js` handles the toggle click and persists to `localStorage`.

### Markup
- Semantic HTML. Interactive controls carry `aria-label`; the nav marks the active link with
  `aria-current="page"`.
- Fonts come from Google Fonts via `<link>` in `_layouts/default.html`. That is the only
  external runtime dependency — do not add more without a reason.

### Content
- Files containing `<!-- PLACEHOLDER: ... -->` are unfinished copy awaiting the site owner.
  Do not treat placeholder text as intended content, and do not silently rewrite it —
  flag it instead.

## Deployment

- Push to `main` → `.github/workflows/jekyll-gh-pages.yml` builds with
  `actions/jekyll-build-pages` and deploys to Pages. There is no manual deploy step.
- CI's Jekyll version is set by that action and may differ from the locally installed Jekyll.
  Anything that builds locally but relies on a version-specific feature is a deployment risk.
- **Never delete or rename `CNAME`.** Losing it drops the custom domain.

## Definition of Done

A change is done when all of the following hold:

1. `bash init.sh` passes — the site builds with strict front matter and expected pages exist.
2. Rendered output in `_site/` shows the change (check the built HTML, not just the source).
3. Any new or changed color renders correctly in light **and** dark theme.
4. `feature_list.json` has the affected feature at status `"pass"` with concrete evidence.
5. No files from `_site/` or `.jekyll-cache/` are staged for commit.
6. No new external runtime dependency was added.

## Working with the Feature List

`feature_list.json` is the source of truth for what works:

- Each feature has `status`: `"pass"`, `"fail"`, or `"not-started"`.
- `evidence` must describe what was actually checked (a command run, a file inspected,
  a page loaded) — not a restatement of the feature description.
- Set `"fail"` with the reason when something is known broken. Never delete features.
