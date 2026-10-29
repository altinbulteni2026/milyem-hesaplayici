# Milyem Hesaplayıcı — GitHub'a kurulum

Bu paket, Altın Bülteni'nin fiyat API'sini, özel hesaplayıcılarını, veri tabanını veya sunucu kodunu içermez. İnternet bağlantısı yalnızca GitHub'a yükleme ve GitHub Pages'in siteyi göstermesi için gereklidir; hesaplama ziyaretçinin tarayıcısında çalışır.

## Başlamadan önce

1. Hazır proje ZIP dosyasını bilgisayarınıza indirin ve **ZIP'ten çıkarın**. GitHub'a ZIP dosyasının kendisini yüklemeyin.
2. Çıkan `milyem-hesaplayici-github` klasörünü kullanın. İçinde `src`, `scripts`, `tests`, `.github`, `README.md`, `KURULUM.md` bulunmalıdır.
3. Yalnızca **aşağıdaki A veya B yöntemlerinden birini** uygulayın. İkisini birden uygulamayın.

## Yöntem A: GitHub Desktop (terminal kullanmadan)

**Bu yöntemde GitHub sitesinden önceden depo açmayın.**

1. [GitHub Desktop](https://desktop.github.com/) uygulamasını açın, GitHub hesabınızla giriş yapın.
2. **File → Add Local Repository → Choose** ile ZIP'ten çıkardığınız `milyem-hesaplayici-github` klasörünü seçin.
3. Klasör henüz bir Git deposu değil uyarısı çıkarsa **Create a Repository Here** seçin.
4. Repository name alanını **`milyem-hesaplayici`** yapın; **Create repository** seçin.
5. Dal adını kontrol edin: **`main`** olmalı. Gerekirse **Branch → Rename** ile `main` yapın.
6. Değişiklikler görünüyorsa `İlk sürüm` mesajıyla **Commit to main** yapın.
7. **Publish repository** seçin. Depo adı `milyem-hesaplayici` ve görünürlük **Public** olsun. *Keep this code private* seçili kalmasın.
8. **View on GitHub** ile yayımlanmış depoyu açın.

> GitHub Desktop sürümlerinde menü adları küçük farklılıklar gösterebilir. Temel kontrol: çevrimiçi depoda `.github/workflows/pages.yml` dosyası bulunmalıdır.

## Yöntem B: GitHub web + PowerShell / Terminal

**Bu yöntemde önce GitHub sitesinden boş depo açın.**

1. [github.com/new](https://github.com/new) adresini açın.
2. Repository name: **`milyem-hesaplayici`**, Visibility: **Public** seçin.
3. README, `.gitignore` ve lisans ekleme seçeneklerini **boş bırakın** (hazır pakette zaten var).
4. **Create repository** seçin.
5. Windows'ta ZIP'ten çıkardığınız `milyem-hesaplayici-github` klasörünü Dosya Gezgini'nde açın; adres çubuğuna `powershell` yazıp Enter'a basın. Böylece komutlar doğru klasörde çalışır.
6. Aşağıdaki **tam komutları** çalıştırın. Yalnızca `GITHUB_KULLANICI_ADINIZ` metnini kendi GitHub kullanıcı adınızla değiştirin:

```powershell
git init
git branch -M main
git add -A
git commit -m "Ilk surum: milyem hesaplayici"
git remote add origin https://github.com/GITHUB_KULLANICI_ADINIZ/milyem-hesaplayici.git
git push -u origin main
```

> Bilgisayarda `git` komutu tanınmıyorsa önce [Git for Windows](https://git-scm.com/downloads/win) kurun. GitHub kimlik doğrulaması istenirse tarayıcıdan giriş yapın. Şifre veya erişim anahtarını kod dosyalarına kaydetmeyin.

## Her iki yöntemden sonra: GitHub Pages'i açın

1. GitHub depo sayfasında **Settings** sekmesine girin.
2. Soldan **Pages** bölümünü seçin.
3. **Build and deployment → Source → GitHub Actions** seçin.
4. **Actions** sekmesinde **Test ve GitHub Pages yayını** adlı iş akışını açın.
5. Otomatik çalışmadıysa **Run workflow → Run workflow** ile `main` dalında başlatın. Daha önce Pages ayarlanmadan çalışıp hata verdiyse yeniden çalıştırın.
6. İş akışındaki test ve yayın işlemleri başarıyla tamamlanınca **Settings → Pages → Visit site** bağlantısını açın.

Web siteniz standart durumda şu adreste olacaktır:

`https://GITHUB_KULLANICI_ADINIZ.github.io/milyem-hesaplayici/`

**GitHub kullanıcı adını kaynak kodda değiştirmeniz gerekmez.** GitHub Actions depo sahibini ve depo adını otomatik olarak öğrenir; üç sayfanın canonical URL'sini, site haritasını ve robots.txt dosyasını buna göre üretir.

## Yayın kontrol listesi

- [ ] Ana hesaplayıcı sayfası açılıyor.
- [ ] 10 gram / 22 ayar (916‰) ile **9,16 gram** sonuç çıkıyor.
- [ ] 10 gram / 14 ayar (585‰) ile **5,85 gram** sonuç çıkıyor.
- [ ] `12,5` gibi Türkçe ondalık girişleri kabul ediyor.
- [ ] Özel milyem girilebiliyor ve geçersiz değerler uyarı veriyor.
- [ ] `/rehber/ayar-ve-milyem/` ve `/rehber/hesaplama-ornekleri/` sayfaları açılıyor.
- [ ] Ana sayfa ve iki rehberde Altın Bülteni **ana sayfa**, **geçmiş kurlar** ve **altın hesaplama** bağlantıları doğru çalışıyor.
- [ ] `/sitemap.xml` ve `/robots.txt` açılıyor.
- [ ] Telefonda içerik yatay taşmıyor.

## GitHub depo açıklamasını ayarlayın

Depoda sağdaki **About** alanının düzenleme simgesini açın:

**Description (kopyala–yapıştır):**

> Ücretsiz altın ayarı ve milyem hesaplayıcı: 8–24 ayar, has altın gramı, saflık tablosu ve örnekler. Canlı fiyat API'si kullanmaz.

**Website:** GitHub Pages'te yayımlanan adresi girin.

**Topics:** `gold`, `karat`, `fineness`, `milyem`, `calculator`, `javascript`, `turkish`, `github-pages`

GitHub'ın About açıklaması düz metindir; burada üç ayrı bağlantıyı tıklanabilir yapamazsınız. **Üç backlink, README'nin ilk açıklama paragrafına ve yayımlanan üç sayfanın bilgilendirme metinlerine normal HTML bağlantısı olarak yerleştirilmiştir.** Bunların çalışması için başka ayar yapmanız gerekmez.

## Güncelleme ve SEO

- Kodun asıl kopyası `src/` klasöründedir. `dist/` klasörünü GitHub'a göndermeyin; yayın sırasında yeniden üretilir.
- `main` dalına gönderilen her güncellemede test ve Pages yayını otomatik çalışır.
- Canonical, XML site haritası ve robots.txt otomatik oluşturulur. İndekslenme veya SEO sıralama artışı garanti edilmez.
- Google Search Console'a GitHub Pages adresinizi mülk olarak ekleyip doğrulayabilir, ardından sitemap adresini bildirebilirsiniz. Mülkiyet doğrulaması sizin Google hesabınızda yapılır.
- Yalnızca bağlantı sayısı arttırmak için kopya depolar oluşturmayın. Açık kaynak projeyi yararlı ve güncel tutmak daha doğrudur.

## Geliştirici kontrolü (isteğe bağlı)

Yayımlanan web sitesi ve GitHub Actions gerekli ortamları kendi kullanır. Bilgisayarınızda ayrıca test etmek isterseniz Python 3 ve Node.js 20+ ile:

```powershell
node --test tests/calculator.test.js
python -m unittest discover -s tests -v
python scripts/build.py --site-url http://localhost:8000/
python -m http.server 8000 --directory dist
```

Tarayıcıdan `http://localhost:8000/` açın. Harici bağımlılık, `npm install`, fiyat API'si veya sunucu anahtarı gerekmez.
