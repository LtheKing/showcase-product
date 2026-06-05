# HijabFirst — Frontend Showcase

Homepage e-commerce modest wear (layout inspired by retail premium, brand **HijabFirst**).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Deploy target: Vercel

## Menjalankan lokal

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

**Product detail:**

- [instant-jersey-plum](http://localhost:3000/products/instant-jersey-plum) — hijab1 (hero kiri)
- [chiffon-square-mauve](http://localhost:3000/products/chiffon-square-mauve) — hijab2 (hero tengah)
- [pashmina-instant-cream](http://localhost:3000/products/pashmina-instant-cream) — hijab3 (hero kanan)

Klik gambar di homepage untuk ke halaman detail masing-masing.

**Syarat:** Node.js 20+. Lihat `run-dev.cmd` jika ada error `node:events`.

## Struktur (homepage)

- `components/layout/AnnouncementBar.tsx` — promo bar
- `components/layout/SiteHeader.tsx` — logo hijabfirst, nav HIJAB/GAMIS/INNER/ACCESSORIES
- `components/home/HeroSection.tsx` — hero produk hijab
- `components/home/MostLovedSection.tsx` — grid 4 kolom "Most Loved"

## Gambar produk

Letakkan foto di folder **`img/`**. Setelah menambah gambar baru, **wajib** jalankan:

```bash
npm run sync-img
npm run dev
```

Urutan file (sort otomatis): `hijab1`, `hijab2`, `hijab3`, `hijab4`, … — dipakai di hero, Most Loved, dan product detail. Tidak ada hardcode `hijab3.webp`.

## Catatan

- Tanpa file di `img/`, hero memakai placeholder Unsplash.
