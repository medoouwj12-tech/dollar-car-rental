const page = await fetch("https://2chat.co/tools/whatsapp-catalog-exporter", {
  headers: { "User-Agent": "Mozilla/5.0" },
}).then((r) => r.text());

const scripts = [...page.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map(
  (m) => m[1]
);
console.log("scripts", scripts.length);

for (const script of scripts.slice(0, 20)) {
  const js = await fetch(`https://2chat.co${script}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => r.text());
  if (/catalog|products|phone/i.test(js)) {
    const apis = [
      ...js.matchAll(/https?:\/\/[^"'`\s]+/g),
      ...js.matchAll(/\/api\/[^"'`\s]+/g),
    ].map((m) => m[0]);
    const relevant = [...new Set(apis)].filter((a) =>
      /catalog|product|whatsapp/i.test(a)
    );
    if (relevant.length) {
      console.log("\n", script, relevant.slice(0, 20));
    }
  }
}
