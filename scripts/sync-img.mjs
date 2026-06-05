import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "img");
const destDir = path.join(root, "public", "img");
const imageExt = /\.(jpe?g|png|webp|avif|gif)$/i;

if (!fs.existsSync(sourceDir)) {
  console.warn("[sync-img] Folder img/ tidak ditemukan — lewati sync.");
  process.exit(0);
}

const files = fs.readdirSync(sourceDir).filter((f) => imageExt.test(f));
if (files.length === 0) {
  console.warn("[sync-img] Tidak ada gambar di img/ — lewati sync.");
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

// Hapus file lama di public/img agar tidak ada referensi stale
for (const existing of fs.readdirSync(destDir)) {
  const full = path.join(destDir, existing);
  if (fs.statSync(full).isFile()) fs.unlinkSync(full);
}

for (const file of files) {
  fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
}

console.log(`[sync-img] ${files.length} gambar disalin ke public/img/:`);
files.forEach((f) => console.log(`  - ${f}`));
