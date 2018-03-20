# <img src="/icons/icon_48.png" align="absmiddle"> MinerBlock
MinerBlock is an efficient browser extension that focuses on blocking browser-based cryptocurrency miners all over the web.

[<img src="https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png">](https://chrome.google.com/webstore/detail/minerblock/emikbbbebcdfohonlaifafnoanocnebl) [<img src="https://dev.opera.com/extensions/branding-guidelines/addons_206x58_en@2x.png" width="206">](https://addons.opera.com/en/extensions/details/minerblock/) [<img src="https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png">](https://addons.mozilla.org/en-US/firefox/addon/minerblock-origin/)

![Alt text](https://i.imgur.com/L7cpHjE.png)

# How does it work?
The extension uses two different approaches to block miners. The first one is based on blocking requests/scripts loaded from a blacklist, this is the traditional approach adopted by most ad-blockers and other mining blockers. The other approach which makes MinerBlock more efficient against cryptojacking is detecting potential mining behaviour inside loaded scripts and kills them immediately. This makes the extension able to block inline scripts as well as miners running through proxies.

# Credit
- [Font Awesome](http://fontawesome.io/) by [Dave Gandy](https://github.com/davegandy)
- Icon grabbed from [tools-and-utensils](https://www.shareicon.net/author/tools-and-utensils)

# Donations
All donations are welcome and greatly appreciated.

[![paypal](https://img.shields.io/badge/-Paypal-blue.svg?logo=paypal)](https://www.paypal.me/xd4rker/10)
[![bitcoin](https://img.shields.io/badge/-Bitcoin-yellow.svg?logo=bitcoin)](https://blockchain.info/payment_request?address=1PYj4Bd6YwGzqjb46Ww6buGpTUEt3EZLx4)
[![ethereum](https://img.shields.io/badge/-Ethereum-8a92b2.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiA%2FPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjI2Ljc3NyAyMjYuNzc3IiBoZWlnaHQ9IjIyNi43NzdweCIgaWQ9IkxheWVyXzEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIyNi43NzcgMjI2Ljc3NyIgd2lkdGg9IjIyNi43NzdweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI%2BPGc%2BPHBvbHlnb24gZmlsbD0iIzc4ODdjYyIgcG9pbnRzPSIxMTIuNTUzLDE1NyAxMTIuNTUzLDg2Ljk3NyA0NC4xNTgsMTE2LjkzNyAgIi8%2BPHBvbHlnb24gZmlsbD0iIzllYThkYiIgcG9pbnRzPSIxMTIuNTUzLDgyLjE2MyAxMTIuNTUzLC0wLjA1NiA0Ni4zNjIsMTExLjE1NiAgIi8%2BPHBvbHlnb24gZmlsbD0iIzc5ODZjYyIgcG9pbnRzPSIxMTYuOTYyLC0wLjA5IDExNi45NjIsODIuMTYzIDE4NC4wODMsMTExLjU2NiAgIi8%2BPHBvbHlnb24gZmlsbD0iIzVjNmJjMCIgcG9pbnRzPSIxMTYuOTYyLDg2Ljk3NyAxMTYuOTYyLDE1Ny4wMDIgMTg1LjQwNSwxMTYuOTU3ICAiLz48cG9seWdvbiBmaWxsPSIjOWVhOGRiIiBwb2ludHM9IjExMi41NTMsMjI3LjQwNiAxMTIuNTUzLDE3MS4wODUgNDQuNjE4LDEzMS4zMSAgIi8%2BPHBvbHlnb24gZmlsbD0iIzc4ODdjYyIgcG9pbnRzPSIxMTYuOTYyLDIyNy40MDYgMTg0Ljg5NywxMzEuMzEgMTE2Ljk2MiwxNzEuMDg1ICAiLz48L2c%2BPC9zdmc%2B)](https://etherdonation.com/d?to=0x3057b2648d905912ef511674aa3ffe9fcf5140db)
[![amazon](https://img.shields.io/badge/-Buy%20me%20a%20book-orange.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiA%2FPjxzdmcgaGVpZ2h0PSIzMiIgd2lkdGg9IjMxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yNy4xOTEgMjYuMzUyYy0xMy4xODUgNi4yNzUtMjEuMzY4IDEuMDI1LTI2LjYwNi0yLjE2NC0uMzI0LS4yMDEtLjg3NS4wNDctLjM5Ny41OTYgMS43NDUgMi4xMTYgNy40NjQgNy4yMTYgMTQuOTI5IDcuMjE2IDcuNDcgMCAxMS45MTQtNC4wNzYgMTIuNDctNC43ODcuNTUyLS43MDUuMTYyLTEuMDk0LS4zOTYtLjg2MXptMy43MDMtMi4wNDVjLS4zNTQtLjQ2MS0yLjE1My0uNTQ3LTMuMjg1LS40MDgtMS4xMzQuMTM1LTIuODM2LjgyOC0yLjY4OCAxLjI0NC4wNzYuMTU2LjIzMS4wODYgMS4wMS4wMTYuNzgxLS4wNzggMi45NjktLjM1NCAzLjQyNS4yNDIuNDU4LjYtLjY5OCAzLjQ1OS0uOTA5IDMuOTItLjIwNC40NjEuMDc4LjU4LjQ2MS4yNzMuMzc4LS4zMDcgMS4wNjItMS4xMDIgMS41MjEtMi4yMjcuNDU2LTEuMTMxLjczNC0yLjcwOS40NjUtMy4wNnoiIGZpbGw9IiNGNEI0NTkiLz48cGF0aCBkPSJNMjMuODU0IDE2LjM5MXYtMTAuNTA4YzAtMS44MDUtMS43NDYtNS44ODMtOC4wMjEtNS44ODMtNi4yNzQgMC05LjYxMiAzLjkyMS05LjYxMiA3LjQ1M2w1LjI0NC40NjlzMS4xNjgtMy41MyAzLjg3OS0zLjUzIDIuNTI1IDIuMTk2IDIuNTI1IDIuNjcxdjIuMjgzYy0zLjQ3My4xMTctMTIuMDk3IDEuMTA5LTEyLjA5NyA4LjM4MSAwIDcuODIgOS44NzEgOC4xNDggMTMuMTA4IDMuMDk0LjEyNS4yMDUuMjY3LjQwNi40NDUuNTk0IDEuMTkxIDEuMjUyIDIuNzggMi43NDQgMi43OCAyLjc0NGw0LjA0OC00Yy4wMDItLjAwMS0yLjI5OS0xLjgwNy0yLjI5OS0zLjc2OHptLTExLjk5NS4zNjljMC0zLjM1OSAzLjU5OS00LjA0IDYuMDExLTQuMTJ2Mi44OTFjLS4wMDEgNS43MjctNi4wMTEgNC44Ni02LjAxMSAxLjIyOXoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4%3D)](https://www.amazon.com/registry/wishlist/QHAD9F3VEVJR)

# Press
- [The Wall Street Journal](https://www.wsj.com/articles/how-to-keep-cryptojackers-off-your-devices-as-bitcoin-soars-1513773371)
- [The Next Web](https://thenextweb.com/apps/2017/09/19/cpu-cryptocurrency-miner-blocker/)
- [TorrentFreak](https://torrentfreak.com/cryptocurrency-miner-targeted-by-anti-virus-and-adblock-tools-170926/)
- [CryptoCoinsNews](https://www.cryptocoinsnews.com/pirate-bay-resumes-mining-monero-using-visitor-cpu-power/)
- [The Hacker News](https://thehackernews.com/2017/10/coinhive-cryptocurrency-miner.html)
- [Bleeping Computer](https://www.bleepingcomputer.com/news/security/psa-the-pirate-bay-is-running-an-in-browser-cryptocurrency-miner-with-no-opt-out/)
- [Firstpost](http://www.firstpost.com/tech/news-analysis/how-to-keep-away-cryptocurrency-miners-away-from-chipping-away-at-your-cpu-4061301.html)
- [Bad Packets Report](https://badpackets.net/how-to-find-cryptojacking-malware/)

The extension was also recommended by various CERTs around the world:
- [SingCERT](https://www.csa.gov.sg/singcert/news/advisories-alerts/alert-on-browser-based-digital-currency-mining)
- [VNCERT](http://english.mic.gov.vn/Pages/TinTuc/136048/VNCERT-orders-quick-action-against-CoinHive.html)
- [CERT-IL](https://www.gov.il/he/Departments/publications/reports/cryptocurrency)
- [CERT-RO](https://www.cert.ro/citeste/criptomoneda-minare-webiste-romania-coinhive)
- [CERT-EE](https://blog.ria.ee/kruptorahad-ja-virtuaalne-kaevandamine/)
- [KZ-CERT](http://www.kz-cert.kz/page/635)
