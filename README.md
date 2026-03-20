# najsit.se

Statisk webbplats för NAJSIT.

## Lokalt

Starta den lokala utvecklingsservern med auto-reload:

```bash
cd /Users/andreas.johansson/development/najsit.se
python3 devserver.py
```

Öppna sedan `http://127.0.0.1:8000`.

## Deploy till Loopia

Sätt miljövariabler och kör deploy-scriptet:

```bash
cd /Users/andreas.johansson/development/najsit.se
export FTP_USER='andreasxjohansson'
export FTP_PASS='...'
export FTP_PATH='/najsit.se/public_html'
./deploy.sh
```

Scriptet laddar upp:

- `index.html`
- `nyheter.html`
- `tjanster.html`
- `styles.css`
- `script.js`
- `najsit.png`
- `najsit-gradient.png`

## GitHub

Det här repot är lokalt konfigurerat att använda rätt GitHub-nyckel för push:

```bash
git config --local core.sshCommand "ssh -i ~/.ssh/id_ed25519_github -o IdentitiesOnly=yes"
```

Vanlig push fungerar därför i detta repo:

```bash
git push origin main
```
