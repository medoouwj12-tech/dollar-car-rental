/** WhatsApp Business catalog & contact */
export const WHATSAPP_PHONE = "201069916439";
export const WHATSAPP_CATALOG_URL = `https://wa.me/c/${WHATSAPP_PHONE}`;
export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_PHONE}`;

export function getWhatsAppBookUrl(carName: string, days: number, total: number, pickupDate?: string) {
  const dateStr = pickupDate ? `\nتاريخ الاستلام: ${pickupDate}` : "";
  const message = encodeURIComponent(
    `مرحباً، أريد حجز: ${carName}${dateStr}\nعدد الأيام: ${days}\nالإجمالي: ${total} ج.م`
  );
  return `${WHATSAPP_CHAT_URL}?text=${message}`;
}
