#!/usr/bin/env python3
"""Bağımsız, harici paket gerektirmeyen GitHub Pages üretimi.

Kullanım:
  python3 scripts/build.py --site-url http://localhost:8000/
  GITHUB_REPOSITORY=kullanici/milyem-hesaplayici python3 scripts/build.py
"""
from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src'
OUTPUT = ROOT / 'dist'
HTML_ROUTES = ('', 'rehber/ayar-ve-milyem/', 'rehber/hesaplama-ornekleri/')


def resolve_site_url(arg: str | None, github_repo: str | None = None) -> str:
    if arg:
        site_url = arg.strip()
    else:
        github_repo = github_repo or os.environ.get('GITHUB_REPOSITORY', '')
        parts = github_repo.split('/')
        if len(parts) != 2 or not all(parts) or any(c.isspace() for c in github_repo):
            raise ValueError('Site URL belirtilmeli veya GITHUB_REPOSITORY=hesap/depo olmalı.')
        account, repo = parts
        if '/' in repo or '/' in account:
            raise ValueError('Geçersiz depo tanımı.')
        repo_path = '' if repo.casefold() == f'{account.casefold()}.github.io' else f'{repo}/'
        site_url = f'https://{account.lower()}.github.io/{repo_path}'

    parsed = urlsplit(site_url)
    if parsed.scheme not in ('https', 'http') or not parsed.netloc:
        raise ValueError('Geçerli bir http(s) site adresi girin.')
    if parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise ValueError('Kullanıcı adı, sorgu ve # içermeyen temiz adres kullanın.')
    path = parsed.path.rstrip('/') + '/'
    return urlunsplit((parsed.scheme, parsed.netloc, path, '', ''))


def build(site_url: str, output: Path = OUTPUT) -> None:
    if output.resolve() == SOURCE.resolve() or SOURCE.resolve() in output.resolve().parents:
        raise ValueError('Çıktı kaynak klasörünün içine yazılamaz.')
    if output.exists():
        shutil.rmtree(output)
    shutil.copytree(SOURCE, output)

    for route in HTML_ROUTES:
        page = output / route / 'index.html'
        text = page.read_text(encoding='utf-8')
        expected = 3 if not route else 2
        if text.count('{{PAGE_URL}}') != expected:
            raise ValueError(f'Sayfa adresi şablonu beklenenden farklı: {page}')
        page.write_text(text.replace('{{PAGE_URL}}', site_url + route), encoding='utf-8')

    locs = '\n'.join(f'  <url><loc>{escape(site_url + route)}</loc></url>' for route in HTML_ROUTES)
    (output / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f'{locs}\n</urlset>\n', encoding='utf-8')
    (output / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: ' + site_url + 'sitemap.xml\n', encoding='utf-8')
    (output / '.nojekyll').touch()


def main() -> None:
    parser = argparse.ArgumentParser(description='Statik siteyi ve SEO dosyalarını üretir.')
    parser.add_argument('--site-url', help='https://kullanici.github.io/depo/ veya yerel test URL')
    args = parser.parse_args()
    url = resolve_site_url(args.site_url)
    build(url)
    print(f'Üretildi: {OUTPUT} | Site: {url} | Sayfa: {len(HTML_ROUTES)}')


if __name__ == '__main__':
    main()
