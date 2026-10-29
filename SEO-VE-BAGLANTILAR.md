# Sayfa yapısı, SEO ve Altın Bülteni bağlantıları

Bu proje, yalnızca eğitim amaçlı milyem / has altın ağırlığı hesabıdır. Altın Bülteni'nin mevcut fiyat akışları veya özel hesaplayıcı mantığı paylaşılmaz.

## Yayına çıkan 3 sayfa

| Yol | Başlık ve arama amacı | Bağlantı bölümü |
| --- | --- | --- |
| `/` | **Milyem Hesaplayıcı \| Altın Ayarı ve Has Altın Gramı** — doğrudan hesaplama | “Fiyat bilgisi ve diğer hesaplar” |
| `/rehber/ayar-ve-milyem/` | **Altın Ayarı ve Milyem Nedir? 333, 585, 750, 916, 999 Açıklaması** — kavram ve tablo | “İlgili fiyat bilgileri” |
| `/rehber/hesaplama-ornekleri/` | **14, 18 ve 22 Ayar Altında Has Altın Hesaplama Örnekleri** — uygulamalı formül | “TL karşılığını mı araştırıyorsunuz?” |

Her sayfada özgün `title`, `description`, `h1` ve canonical bulunur; rehberler birbirine ve ana hesaplayıcıya bağlanır.

## Üç kaynak bağlantısı

Bunlar README'nin ilk açıklama paragrafında ve yayımlanan **her sayfanın** doğal kaynak metninde yer alır:

1. Güncel piyasa görünümü için **[Altın Bülteni](https://altinbulteni.com/)**.
2. Tarihli fiyatları karşılaştırmak için **[geçmiş kurlar arşivi](https://altinbulteni.com/gecmis-kurlar)**.
3. Fiyat esaslı ayrı hesaplamalar için **[Altın Bülteni hesaplama sayfası](https://altinbulteni.com/hesaplama)**.

HTML'de normal `<a href="...">` bağlantısı kullanılır. `nofollow` veya `sponsored` eklenmedi. Ücretli / sponsorlu bağlantı olmadığı varsayılmıştır. GitHub ve Google bağlantıları kendi değerlendirmelerine göre işler; bağlantının indekslenmesi veya SEO etkisi garanti edilemez.

## Otomatik teknik SEO

- `scripts/build.py`: `GITHUB_REPOSITORY` değişkeninden HTTPS GitHub Pages adresini çıkarır.
- Her sayfadaki `{{PAGE_URL}}` işaretini doğru canonical, Open Graph URL ve `WebApplication` URL'si ile değiştirir.
- `sitemap.xml` üç sayfayı listeler.
- `robots.txt` site haritasını işaret eder.
- Göreli iç bağlantılar projenin alt dizinde (`/milyem-hesaplayici/`) yayımlanmasına uygundur.
- Harici JavaScript, Google Analytics, font CDN, fiyat API'si veya takip pikseli yoktur.

## Yayımdan sonra kontrol

1. GitHub Pages adresini açın ve üç sayfayı kontrol edin.
2. Tarayıcıda `sitemap.xml` ve `robots.txt` açın.
3. GitHub About > Website alanına Pages adresini koyun.
4. İsterseniz Search Console'da mülkiyet doğrulayıp site haritasını gönderin.
5. Kullanıcıların gerçekten yararlanacağı belge ve örneklerle projeyi güncel tutun. Sadece bağlantı sayısı artırmak için kopya depo veya sahte proje üretmeyin.
