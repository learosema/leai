import nltk   
from urllib3 import request
from bs4 import BeautifulSoup

urls = [
    "https://www.projekt-gutenberg.org/avenariu/kater/kater.html",
    "https://www.projekt-gutenberg.org/avenariu/kater/chap001.html",
]

for url in urls:
    print(url)
    resp = request("GET", url)
    if resp.status == 200:
        html = resp.data
        soup = BeautifulSoup(html, features="html.parser")
        raw = soup.get_text()
        print(raw)
