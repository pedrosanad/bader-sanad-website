import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sessionLabels: Record<string, string> = {
  portrait: "بورتريه",
  events: "فعاليات",
  commercial: "تجاري",
  headshots: "صور احترافية",
};

export async function notifyPhotographerEmail(booking: {
  name: string;
  phone: string;
  sessionType: string;
  date: string;
  time: string;
  message?: string | null;
}) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log("[email] Gmail credentials not set — skipping email notification");
    return;
  }

  const session = sessionLabels[booking.sessionType] || booking.sessionType;

  await transporter.sendMail({
    from: `"Bader Sanad Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `📸 حجز جديد - ${booking.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">📸 طلب حجز جديد!</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666;">الاسم:</td><td style="padding: 8px 0; font-weight: bold;">${booking.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">الجلسة:</td><td style="padding: 8px 0; font-weight: bold;">${session}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">التاريخ:</td><td style="padding: 8px 0; font-weight: bold;">${booking.date}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">الوقت:</td><td style="padding: 8px 0; font-weight: bold;">${booking.time}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">الجوال:</td><td style="padding: 8px 0; font-weight: bold;">${booking.phone}</td></tr>
          ${booking.message ? `<tr><td style="padding: 8px 0; color: #666;">ملاحظات:</td><td style="padding: 8px 0;">${booking.message}</td></tr>` : ""}
        </table>
      </div>
    `,
  });

  console.log("[email] Booking notification sent to " + process.env.GMAIL_USER);
}
