import fs from "fs";
const html = fs.readFileSync("catalog.html", "utf8");

const ogs = [...html.matchAll(/<meta[^>]+>/gi)].map((m) => m[0]);
const relevant = ogs.filter((m) =>
  /og:|twitter:|description|title|image/i.test(m)
);
console.log(relevant.join("\n"));

const allUrls = [...new Set([...html.matchAll(/https:\/\/[^"'\s<>]+/g)].map((m) => m[0]))];
const fb = allUrls.filter((u) => /scontent|fbcdn|whatsapp/i.test(u));
console.log("\nFB URLs:", fb);
