#!/usr/bin/env bash

set -euo pipefail

FTP_HOST="${FTP_HOST:-ftpcluster.loopia.se}"
FTP_USER="${FTP_USER:?Set FTP_USER before running deploy.sh}"
FTP_PASS="${FTP_PASS:?Set FTP_PASS before running deploy.sh}"
FTP_PATH="${FTP_PATH:-/najsit.se/public_html}"

FILES=(
  "artiklar.html"
  "artikel-arbetsgivare.html"
  "artikel-arkitektur.html"
  "artikel-om-najsit.html"
  "artikel-radgivning.html"
  "artikel-tekniskt-ledarskap.html"
  "index.html"
  "cv.html"
  "jobb.html"
  "tjanster.html"
  "uppdrag.html"
  "styles.css"
  "script.js"
  "najsit.png"
  "najsit-gradient.png"
  "Bild 2023-11-07 kl. 09.57.JPG"
)

for file in "${FILES[@]}"; do
  remote_file="${file// /%20}"
  echo "Uploading ${file}"
  curl --silent --show-error --fail \
    --ftp-create-dirs \
    --user "${FTP_USER}:${FTP_PASS}" \
    -T "${file}" \
    "ftp://${FTP_HOST}${FTP_PATH}/${remote_file}"
done

echo "Deploy complete."
