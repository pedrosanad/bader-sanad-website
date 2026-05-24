const PHOTOGRAPHER_PHONE = process.env.PHOTOGRAPHER_PHONE || "966549084443";
const GREEN_API_URL = process.env.GREEN_API_URL || "";
const GREEN_API_INSTANCE = process.env.GREEN_API_INSTANCE || "";
const GREEN_API_TOKEN = process.env.GREEN_API_TOKEN || "";

const sessionLabels: Record<string, string> = {
  portrait: "بورتريه",
  events: "فعاليات",
  commercial: "تجاري",
  headshots: "صور احترافية",
};

export async function notifyPhotographerWhatsApp(booking: {
  name: string;
  phone: string;
  sessionType: string;
  date: string;
  time: string;
  message?: string | null;
}) {
  if (!GREEN_API_URL || !GREEN_API_INSTANCE || !GREEN_API_TOKEN) {
    console.log("[notify] Green API credentials not set — skipping WhatsApp notification");
    return;
  }

  const session = sessionLabels[booking.sessionType] || booking.sessionType;
  const text = [
    "📸 طلب حجز جديد!",
    "",
    `الاسم: ${booking.name}`,
    `الجلسة: ${session}`,
    `التاريخ: ${booking.date}`,
    `الوقت: ${booking.time}`,
    `الجوال: ${booking.phone}`,
    booking.message ? `ملاحظات: ${booking.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const url = `${GREEN_API_URL}/waInstance${GREEN_API_INSTANCE}/sendMessage/${GREEN_API_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: `${PHOTOGRAPHER_PHONE}@c.us`,
        message: text,
      }),
    });
    const body = await res.json();
    console.log("[notify] Green API response:", JSON.stringify(body));
  } catch (err) {
    console.error("[notify] Failed to send WhatsApp notification:", err);
  }
}
