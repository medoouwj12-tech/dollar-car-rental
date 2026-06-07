const endpoints = [
  "https://www.whatsapp.com/catalog/201069916439/products",
  "https://www.whatsapp.com/catalog/201069916439/products.json",
  "https://api.whatsapp.com/catalog/201069916439",
  "https://wa.me/c/201069916439",
  "https://graph.whatsapp.com/catalog/201069916439",
  "https://www.whatsapp.com/ctwa/v1/catalog?phone=201069916439",
];

for (const url of endpoints) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });
    const text = await res.text();
    const hasArabic = /[\u0600-\u06FF]/.test(text);
    const hasProduct = /product|price|سيارة|مرسيدس|تويوتا/i.test(text);
    console.log(url, res.status, text.length, hasArabic, hasProduct);
    if (hasProduct && text.length < 50000) {
      console.log(text.substring(0, 1000));
    }
  } catch (e) {
    console.log(url, "error", e.message);
  }
}
