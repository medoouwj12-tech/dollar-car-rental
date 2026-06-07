import fs from "fs";

const html = fs.readFileSync("catalog.html", "utf8");

// Search for various patterns
const patterns = [
  /catalog[^"']{0,200}/gi,
  /product[^"']{0,200}/gi,
  /retailer[^"']{0,200}/gi,
  /201069916439/g,
  /scontent[^"'\s>]+/g,
  /"text":"([^"]{5,200})"/g,
  /require\(\[.*catalog.*\]/gi,
];

for (const p of patterns) {
  const matches = [...html.matchAll(p)].slice(0, 15);
  if (matches.length) {
    console.log("\n=== Pattern", p, "===");
    matches.forEach((m) => console.log(m[0].substring(0, 300)));
  }
}

// Look for JSON blobs
const jsonBlobs = [...html.matchAll(/\{[^{}]{100,2000}\}/g)];
console.log("\nJSON blobs:", jsonBlobs.length);

// Search Arabic text
const arabic = [...html.matchAll(/[\u0600-\u06FF\s]{10,}/g)];
console.log("\nArabic snippets:", arabic.slice(0, 10).map((m) => m[0].trim()));
