const endpoints = [
  "https://2chat.co/api/whatsapp/catalog/products?phone=+201069916439",
  "https://2chat.co/api/whatsapp/catalog/products?phone=201069916439",
  "https://api.2chat.co/whatsapp/catalog/products?phone=+201069916439",
  "https://2chat.co/tools/whatsapp-catalog-exporter/api/products?phone=%2B201069916439",
];

for (const url of endpoints) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });
    const text = await res.text();
    console.log(url, res.status, text.substring(0, 500));
  } catch (e) {
    console.log(url, e.message);
  }
}
