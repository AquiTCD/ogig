#!/usr/bin/env bash
set -euo pipefail

FONTS_DIR="public/fonts"
FONT_FILE="$FONTS_DIR/NotoSansJP-Bold.otf"
FONT_URL="https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf"

mkdir -p "$FONTS_DIR"

if [ -f "$FONT_FILE" ]; then
  echo "Font already exists, skipping download."
  exit 0
fi

echo "Downloading NotoSansJP-Bold.otf..."
curl -fsSL --max-time 120 "$FONT_URL" -o "$FONT_FILE"
echo "Done: $FONT_FILE ($(du -sh "$FONT_FILE" | cut -f1))"
