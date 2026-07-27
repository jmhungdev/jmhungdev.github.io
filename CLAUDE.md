# CLAUDE.md — Quick Reference

Read `AGENTS.md` first for boundaries and conventions. This file is the command and file map.

## Project Overview

Static personal site for **jmhung.com**, built with Jekyll and deployed to GitHub Pages by
GitHub Actions. Plain HTML/Liquid/CSS/JS — no Node build, no framework, no theme gem.

## Build & Run

```bash
bash init.sh                 # Verify toolchain + clean build + expected output (run this first)
jekyll serve --livereload    # Local dev server at http://127.0.0.1:4000
jekyll build                 # One-off build into _site/
jekyll build --strict_front_matter --trace   # What init.sh runs; fails loudly on bad front matter
jekyll clean                 # Delete _site/ and .jekyll-cache/
```

Requires Ruby and the `jekyll` gem on PATH. There is no `Gemfile`; the installed gem is used
directly. CI does not use the local gem — it builds via `actions/jekyll-build-pages`.

## Key Files

| File | Purpose |
|------|---------|
| `_config.yml` | Site settings, kramdown/GFM + rouge, post permalink `/deepdive/:title/` |
| `_layouts/default.html` | Page chrome: head, fonts, nav, footer, theme toggle, pre-paint theme script |
| `_layouts/post.html` | Post wrapper (title + date), uses `layout: default` |
| `index.html` | Home page (contains PLACEHOLDER bio copy) |
| `deepdive.html` | Post index; lists `site.posts`, has an empty state |
| `_posts/*.md` | Deepdive articles, `YYYY-MM-DD-slug.md` |
| `css/style.css` | All styling; theme variables in four sync'd blocks |
| `js/theme.js` | Theme toggle click handler + `localStorage` persistence |
| `assets/favicon.svg` | Favicon |
| `CNAME` | Custom domain `jmhung.com` — do not delete |
| `.github/workflows/jekyll-gh-pages.yml` | Build + deploy on push to `main` |
| `feature_list.json` | Site capability tracking with pass/fail status |

## Rules That Bite

- Root pages need YAML front matter or Liquid is not processed.
- `_config.yml` edits require restarting `jekyll serve`.
- No `baseurl` — keep asset paths root-relative (`/css/style.css`).
- Theme colors live in four CSS blocks; changing one means changing all four.
- The `<head>` inline theme script must stay inline and first, or the page flashes.
- `_site/` and `.jekyll-cache/` are generated and gitignored — never edit or commit.

## How to Add a Post

1. Create `_posts/YYYY-MM-DD-slug.md` (date drives ordering and the displayed date).
2. Front matter: `layout: post` and `title: "..."`.
3. Write Markdown. Fenced code blocks are highlighted by rouge.
4. Run `bash init.sh`; confirm the post appears in `_site/deepdive/<slug>/index.html` and is
   linked from `_site/deepdive.html`.
5. Update `feature_list.json` if the post exercises something new.

`_posts/2026-07-09-jcode-deepdive-example.md` is a placeholder demonstrating the layout —
copy it as a starting point, or delete it once real posts exist.

## How to Add a Page

1. Create `name.html` (or `.md`) at the repo root with front matter `layout: default` and a `title`.
2. Add a nav link in `_layouts/default.html`, including the `aria-current="page"` condition.
3. Rebuild and confirm the page and its nav highlight.

## Verifying a Change

There is no test suite. Verification is: build, then inspect.

```bash
bash init.sh                                   # build + structural checks
grep -r "the-thing-you-changed" _site/         # confirm it reached rendered output
jekyll serve                                   # then toggle light/dark in the browser
```
