# LEAI - Leas Experimente rund um AI :)

Moin. In diesem Repo liegen Leas Experimente rund um das Thema KI und Machine Learning.

## Einrichten der Python-Umgebung

Es empfiehlt sich `pyenv` zu installieren und eine virtuelle Umgebung aufzusetzen.

```sh
pyenv install 3.10
```

Wenn installiert, sollte `pyenv` automatisch die Version `3.10` verwenden.
Wenn nicht, kann mit `pyenv global 3.10` die angegebene Version verwendet werden.

## Virtuelle Umgebung einrichten

```sh
# Virtuelle Umgebung aufsetzen und aktivieren
python3 -m venv venv
source .venv/bin/activate

# Prüfen, ob das funktioniert hat
which pip

# Dependencies installieren
pip install --upgrade pip setuptools
pip install -r requirements.txt
```
