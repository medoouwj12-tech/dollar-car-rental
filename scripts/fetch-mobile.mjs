const urls = [
  "https://wa.me/c/201069916439",
  "https://www.whatsapp.com/catalog/201069916439/?app_absent=0",
];

const ua =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

for (const url of urls) {
  const res = await fetch(url, { headers: { "User-Agent": ua } });
  const html = await res.text();
  const imgs = [
    ...html.matchAll(/https:\/\/scontent[^"'\s&>]+\.(?:jpg|jpeg|png|webp)/gi),
  ].map((m) => m[0].replace(/&amp;/g, "&"));
  const uniqueImgs = [...new Set(imgs)];
  console.log("\n", url, res.status, uniqueImgs.length);
  uniqueImgs.forEach((i) => console.log(i.substring(0, 120)));
}
