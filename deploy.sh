#!/usr/bin/env bash

set -euo pipefail

FTP_HOST="${FTP_HOST:-ftpcluster.loopia.se}"
FTP_USER="${FTP_USER:?Set FTP_USER before running deploy.sh}"
FTP_PASS="${FTP_PASS:?Set FTP_PASS before running deploy.sh}"
FTP_PATH="${FTP_PATH:-/najsit.se/public_html}"

FILES=(
  "index.html"
  "nyheter.html"
  "tjanster.html"
  "styles.css"
  "script.js"
  "najsit.png"
  "najsit-gradient.png"
)

for file in "${FILES[@]}"; do
  echo "Uploading ${file}"
  curl --silent --show-error --fail \
    --user "${FTP_USER}:${FTP_PASS}" \
    -T "${file}" \
    "ftp://${FTP_HOST}${FTP_PATH}/${file}"
done

echo "Deploy complete."
