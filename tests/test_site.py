import sys
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from build import HTML_ROUTES, SOURCE, build, resolve_site_url  # noqa: E402


class LinkCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.canonical = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == 'a' and data.get('href'):
            self.links.append(data['href'])
        if tag == 'link' and data.get('rel') == 'canonical':
            self.canonical.append(data.get('href'))
        if tag == 'script' and data.get('src'):
            self.links.append(data['src'])
        if tag == 'link' and data.get('rel') in ('stylesheet', 'icon'):
            self.links.append(data.get('href'))


class TestSite(unittest.TestCase):
    def test_repo_url_auto(self):
        self.assertEqual(resolve_site_url(None, 'ornek/milyem-hesaplayici'), 'https://ornek.github.io/milyem-hesaplayici/')
        self.assertEqual(resolve_site_url(None, 'ornek/ornek.github.io'), 'https://ornek.github.io/')
        self.assertEqual(resolve_site_url('http://localhost:8000'), 'http://localhost:8000/')
        with self.assertRaises(ValueError):
            resolve_site_url(None, 'invalid')
        with self.assertRaises(ValueError):
            resolve_site_url('https://foo.bar/abc/?utm=1')

    def test_publish_files_links_and_backlinks(self):
        target = 'https://ornek.github.io/milyem-hesaplayici/'
        expected = ['https://altinbulteni.com/', 'https://altinbulteni.com/gecmis-kurlar', 'https://altinbulteni.com/hesaplama']
        with tempfile.TemporaryDirectory() as temp:
            output = Path(temp) / 'dist'
            build(target, output)
            self.assertTrue((output / '.nojekyll').is_file())
            sitemap = (output / 'sitemap.xml').read_text()
            robots = (output / 'robots.txt').read_text()
            self.assertIn('Sitemap: ' + target + 'sitemap.xml', robots)
            for route in HTML_ROUTES:
                page_path = output / route / 'index.html'
                html = page_path.read_text()
                self.assertNotIn('{{', html)
                self.assertIn(target + route, sitemap)
                parser = LinkCollector()
                parser.feed(html)
                self.assertEqual(parser.canonical, [target + route]);
                for url in expected:
                    self.assertIn(url, parser.links, f'Bağlantı bulunamadı: {page_path} {url}')
                for link in parser.links:
                    parsed = urlparse(link)
                    if parsed.scheme in ('https', 'http') or link.startswith('#'):
                        continue
                    path = (page_path.parent / unquote(parsed.path)).resolve()
                    if link.endswith('/') or path.is_dir():
                        path /= 'index.html'
                    self.assertTrue(path.is_file(), f'Kırık iç bağlantı: {page_path} → {link}')
            self.assertTrue((output / 'assets' / 'app.js').exists())

    def test_no_api_urls_or_private_data(self):
        for p in SOURCE.rglob('*'):
            if p.is_file() and p.suffix in ('.html', '.js'):
                contents = p.read_text()
                for forbidden in ('fetch(', 'XMLHttpRequest', 'api.altinbulteni', '/api/', 'firebaseio', 'api_key', 'authorization:'):
                    self.assertNotIn(forbidden, contents.lower(), f'{p} contains {forbidden}')


if __name__ == '__main__':
    unittest.main()
