from __future__ import annotations

import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
WATCH_EXTENSIONS = {".html", ".css", ".js", ".png", ".jpg", ".jpeg", ".svg", ".webp"}


def latest_mtime() -> float:
    latest = 0.0
    for path in ROOT.rglob("*"):
        if path.is_file() and path.suffix.lower() in WATCH_EXTENSIONS:
            latest = max(latest, path.stat().st_mtime)
    return latest


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/__reload__":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(json.dumps({"version": latest_mtime()}).encode("utf-8"))
            return
        return super().do_GET()

    def translate_path(self, path: str) -> str:
        translated = super().translate_path(path)
        rel = os.path.relpath(translated, os.getcwd())
        return str(ROOT / rel)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8000), Handler)
    print("Serving on http://127.0.0.1:8000")
    server.serve_forever()
