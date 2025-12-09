from urllib3 import request
from bs4 import BeautifulSoup

urls = [
    "https://www.projekt-gutenberg.org/apellaun/gespens1/gespens1.html",
    "https://www.projekt-gutenberg.org/apellaun/gespens1/chap001.html",
    "https://www.projekt-gutenberg.org/apellaun/gespens1/chap002.html",
    "https://www.projekt-gutenberg.org/apellaun/gespens1/chap003.html",
    "https://www.projekt-gutenberg.org/apellaun/gespens1/chap004.html",
    "https://www.projekt-gutenberg.org/apellaun/gespens1/chap005.html",
    "https://www.projekt-gutenberg.org/apellaun/gespens1/chap006.html",
    "https://www.projekt-gutenberg.org/apellaun/gespens1/chap007.html"
]

for url in urls:
    print(url)
    resp = request("GET", url)
    if resp.status == 200:
        html = resp.data
        soup = BeautifulSoup(html, features="html.parser")
        raw = soup.get_text()
        print(raw)
