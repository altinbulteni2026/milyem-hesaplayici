# Milyem Hesaplayıcı — Altın Ayarı ve Has Altın Gramı

Ücretsiz ve bağımsız bir **ayar–milyem / teorik has altın ağırlığı hesaplayıcısı**. 8, 9, 10, 14, 18, 21, 22 ve 24 ayar için yaygın saflık damgalarıyla çalışır. İstenen milyem elle de girilebilir. Canlı altın fiyatı çekmez, kullanıcı verisini sunucuya göndermez, API anahtarı gerektirmez. İşlemler tarayıcı içinde yapılır.

**Fiyat bilgileri için ek kaynaklar:** Güncel altın fiyatlarına [Altın Bülteni ana sayfasından](https://altinbulteni.com/) bakabilirsiniz. Önceki dönemleri karşılaştırmak için [geçmiş altın kurları arşivi](https://altinbulteni.com/gecmis-kurlar) kullanılabilir. Gram, ayar ve fiyat üzerinden başka türden işlemler için [Altın Bülteni altın hesaplama sayfası](https://altinbulteni.com/hesaplama) ziyaret edilebilir. Bu depo adı geçen sitenin özel veri altyapısını veya canlı fiyatlarını içermez.

## Neler sunar?

- 8 / 9 / 10 / 14 / 18 / 21 / 22 / 24 ayar ve özel milyem seçimi.
- Türkçe ondalık sayı girişi (örn. `12,5`).
- Net metal gramından teorik has altın ve diğer alaşım bileşenlerinin ağırlığı.
- Milyem tablosu, açıklayıcı rehber ve hesaplama örnekleri.
- Erişilebilir, mobil uyumlu ve bağımlılıksız HTML/CSS/JavaScript.
- 3 ayrı sayfa, otomatik canonical, XML site haritası ve robots.txt.
- GitHub Pages'e testlerden sonra otomatik yayımlama.

## Hesaplama ilkesi

`Teorik has altın (gram) = net metal gramı × milyem ÷ 1000`

Örnek: 10 gram, 22 ayar (916‰) → 9,16 gram teorik has altın. Diğer bileşenler 0,84 gramdır.

**Önemli:** Bu hesaplama laboratuvar analizinin veya gerçek kuyumcu alış-satış değerinin karşılığı değildir. Üründeki taş, aksesuar ve altın dışı parçaların ağırlığı hesaba katılmamalıdır. Damgalar farklı standartlarda değişebilir.

## Sayfa yapısı

```text
/                                Hesaplama ve milyem tablosu
/rehber/ayar-ve-milyem/           Ayar–milyem rehberi
/rehber/hesaplama-ornekleri/     Uygulamalı örnekler
/sitemap.xml                     Yayın sırasında oluşturulur
/robots.txt                      Yayın sırasında oluşturulur
```

## GitHub Pages'e yayımlama (kodsuz yol)

Ayrıntılı ekran adımları [KURULUM.md](KURULUM.md) dosyasında. Özet:

1. Paketi bilgisayarınızda klasöre çıkarın. GitHub Desktop ile **yeni depo olarak yayımlayabilir** veya GitHub'da **boş bir public depo** oluşturup terminalle yükleyebilirsiniz. Bu iki yöntemi birlikte uygulamayın. README, lisans ve iş akışı pakette hazırdır.
2. `src/`, `.github` (gizli klasör), `scripts/` ve diğer proje dosyalarının tamamını yükleyin. Tarayıcıdan yüklemek yerine GitHub Desktop veya `git push` daha güvenlidir. Ayrıntılı adımlar KURULUM.md'dedir.
3. GitHub'da **Settings → Pages → Build and deployment → Source: GitHub Actions** seçin.
4. `main` dalına her gönderimde testler çalışır ve GitHub Pages güncellenir.
5. Site adresiniz genellikle `https://KULLANICI.github.io/milyem-hesaplayici/` biçimindedir. Kullanıcı adını veya depo adını kodda değiştirmeniz gerekmez.

### Yerel çalıştırma

Python 3 ve Node.js 20+ gereklidir (yalnızca test/yapı üretimi için; yayımlanmış web sitesi bağımsızdır).

```bash
node --test tests/calculator.test.js
python3 -m unittest discover -s tests -v
python3 scripts/build.py --site-url http://localhost:8000/
python3 -m http.server 8000 --directory dist
```

Tarayıcıda `http://localhost:8000/` açın. Harici npm paketi, fiyat API'si, veri tabanı veya gizli anahtar kullanılmaz.

## Bağlantılar ve arama motorları

Site içindeki gezinme bağlantıları her sayfa için göreli adresler kullanır. GitHub Actions `GITHUB_REPOSITORY` üzerinden yayımlama adresini hesaplar; canonical, sitemap ve robots bu adrese göre otomatik üretilir. Google'ın siteyi taramasını veya herhangi bir geri bağlantıya sıralama değeri vermesini garanti etmez.

GitHub'ın **About** alanında `Website` olarak Pages adresini gösterebilirsiniz. About açıklaması tek satır metindir; kaynakların üçü için doğal bağlamlı tıklanabilir bağlantı README ve sayfa açıklamalarında yer alır.

## Güvenlik ve gizlilik

Bu depo yalnızca genel matematik ve açık kaynak ön yüz dosyaları içerir. Herhangi bir ticari sitenin özel kodunu, fiyat kaynağını, kullanıcı bilgisini, anahtarını veya tarayıcı izleme kodunu içermez. Dışa gönderilen tek bağlantılar kullanıcının isteğiyle tıkladığı kaynak linkleridir.

## Lisans

MIT. Projeyi kullanan kişi belirtilen kullanım koşullarına uymalıdır. Milyem veya ağırlık hesaplarından ticari işlem sonucu çıkarılmamalıdır.
