const url = "https://www.whatsapp.com/catalog/201069916439/?app_absent=0";

const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
});

const html = await res.text();
console.log("status", res.status, "length", html.length);

const images = [
  ...html.matchAll(/https:\/\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi),
].map((m) => m[0]);

const names = [...html.matchAll(/"name":"([^"]+)"/g)].map((m) => m[1]);
const prices = [...html.matchAll(/"price":"?([^",}]+)"?/g)].map((m) => m[1]);
const descriptions = [
  ...html.matchAll(/"description":"([^"]*)"/g),
].map((m) => m[1]);

console.log("images", images.length, images.slice(0, 10));
console.log("names", names.slice(0, 20));
console.log("prices", prices.slice(0, 20));
console.log("descriptions", descriptions.slice(0, 10));

await import("fs").then((fs) =>
  fs.promises.writeFile("catalog.html", html)
);
