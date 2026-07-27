#!/usr/bin/env bash
# init.sh -- Verify the site builds cleanly before starting work.
# Run this after cloning, when resuming work, and before calling a change done.
#
# Checks: toolchain -> strict build -> expected output -> posts built -> internal links.
set -euo pipefail

cd "$(dirname "$0")"

SITE_NAME="jmhung.com"

echo "=== ${SITE_NAME} Init ==="
echo ""

# ---------------------------------------------------------------- toolchain --
echo "[1/5] Checking toolchain..."
if ! command -v ruby >/dev/null 2>&1; then
  echo "  FAIL: ruby not on PATH. Install Ruby (brew install ruby)."
  exit 1
fi
echo "  ruby   $(ruby -e 'print RUBY_VERSION')"

if [ -f Gemfile ]; then
  command -v bundle >/dev/null 2>&1 || { echo "  FAIL: Gemfile present but bundler not on PATH."; exit 1; }
  bundle install --quiet
  JEKYLL="bundle exec jekyll"
else
  command -v jekyll >/dev/null 2>&1 || { echo "  FAIL: jekyll not on PATH. Run: gem install jekyll"; exit 1; }
  JEKYLL="jekyll"
fi
echo "  jekyll $($JEKYLL --version | awk '{print $2}')"
echo ""

# -------------------------------------------------------------------- build --
echo "[2/5] Building site (strict front matter)..."
$JEKYLL build --strict_front_matter --trace
echo ""

# ---------------------------------------------------------- expected output --
echo "[3/5] Verifying expected output..."
expected=(
  "_site/index.html"
  "_site/deepdive.html"
  "_site/css/style.css"
  "_site/js/theme.js"
  "_site/assets/favicon.svg"
)
for f in "${expected[@]}"; do
  [ -s "$f" ] || { echo "  FAIL: missing or empty $f"; exit 1; }
  echo "  ok  $f"
done

# A custom domain is only preserved if CNAME survives the build.
if [ -f CNAME ]; then
  [ -s "_site/CNAME" ] || { echo "  FAIL: CNAME exists but was not copied to _site/"; exit 1; }
  echo "  ok  _site/CNAME ($(tr -d '\n' < _site/CNAME))"
fi
echo ""

# ---------------------------------------------------------------- posts fan --
echo "[4/5] Verifying posts built..."
if [ -d _posts ]; then
  post_files=$(find _posts -type f \( -name '*.md' -o -name '*.markdown' -o -name '*.html' \) | sort)
  if [ -z "$post_files" ]; then
    echo "  ok  no posts in _posts/"
  else
    n=0
    while IFS= read -r p; do
      base=$(basename "$p")
      # Strip the YYYY-MM-DD- prefix and the extension to get the slug.
      slug=$(echo "$base" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//; s/\.[^.]+$//')
      if ! find _site -path '*'"$slug"'*' -print -quit | grep -q .; then
        echo "  FAIL: no built page found for $p (slug: $slug)"
        echo "        Check the filename is YYYY-MM-DD-slug.md, front matter is valid,"
        echo "        and the date is not in the future (future posts need --future)."
        exit 1
      fi
      n=$((n + 1))
    done <<< "$post_files"
    echo "  ok  $n post(s) built"
  fi
else
  echo "  ok  no _posts/ directory"
fi
echo ""

# ------------------------------------------------------------- link resolve --
echo "[5/5] Checking root-relative links resolve..."
# Honor baseurl so the check works for project pages served under /<repo>/.
baseurl=$(grep -E '^baseurl:' _config.yml 2>/dev/null | head -1 | sed -E 's/^baseurl:[[:space:]]*//; s/^"//; s/"$//; s/^'"'"'//; s/'"'"'$//' || true)

links=$(grep -rhoE '(href|src)="/[^"#?]*"' _site --include='*.html' 2>/dev/null | sort -u || true)

broken_report=""
while IFS= read -r raw; do
  [ -n "$raw" ] || continue
  link=$(printf '%s' "$raw" | sed -E 's/.*="([^"]*)".*/\1/')
  case "$link" in
    //*) continue ;;   # protocol-relative -> external
  esac
  path="$link"
  if [ -n "$baseurl" ]; then
    case "$path" in
      "$baseurl"/*) path="${path#"$baseurl"}" ;;
    esac
  fi
  target="_site${path}"
  if [ ! -e "$target" ] && [ ! -e "${target%/}/index.html" ]; then
    broken_report="${broken_report}${link}"$'\n'
  fi
done <<< "$links"

if [ -n "${broken_report//[$'\n']/}" ]; then
  while IFS= read -r l; do
    if [ -n "$l" ]; then echo "  FAIL: broken internal link -> $l"; fi
  done <<< "$broken_report"
  exit 1
fi
echo "  ok  all internal links resolve"
echo ""

echo "=== Init complete. All checks passed. ==="
echo "Run '$JEKYLL serve --livereload' to preview at http://127.0.0.1:4000"
