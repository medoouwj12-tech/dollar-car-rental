const phones = [
  "+201069916439",
  "201069916439",
  "+20 10 69916439",
  "01069916439",
];

for (const phone of phones) {
  const url = `https://2chat.co/api/wa-catalog?phoneNumber=${encodeURIComponent(phone)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
    },
  });
  const text = await res.text();
  console.log("\n===", phone, res.status, "===");
  try {
    const data = JSON.parse(text);
    console.log(JSON.stringify(data, null, 2).substring(0, 8000));
    await import("fs").then((fs) =>
      fs.promises.writeFile("wa-catalog.json", JSON.stringify(data, null, 2))
    );
  } catch {
    console.log(text.substring(0, 500));
  }
}
