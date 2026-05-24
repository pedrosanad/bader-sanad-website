import twilio from 'twilio';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=twilio',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.account_sid || !connectionSettings.settings.api_key || !connectionSettings.settings.api_key_secret)) {
    throw new Error('Twilio not connected');
  }
  return {
    accountSid: connectionSettings.settings.account_sid,
    apiKey: connectionSettings.settings.api_key,
    apiKeySecret: connectionSettings.settings.api_key_secret,
    phoneNumber: connectionSettings.settings.phone_number
  };
}

async function getTwilioClient() {
  const { accountSid, apiKey, apiKeySecret } = await getCredentials();
  return twilio(apiKey, apiKeySecret, {
    accountSid: accountSid
  });
}

async function getTwilioFromPhoneNumber() {
  const { phoneNumber } = await getCredentials();
  return phoneNumber;
}

function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

const sessionTypeLabels: Record<string, string> = {
  portrait: "Portrait",
  events: "Events", 
  commercial: "Commercial",
  headshots: "Headshots",
};

function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If it starts with 0, assume it's a local number and needs country code
  // You may want to adjust this based on your expected phone number format
  if (digits.startsWith('0')) {
    // Default to +966 for Saudi Arabia, adjust as needed
    return '+966' + digits.substring(1);
  }
  
  // If it doesn't start with +, add it
  if (!phone.startsWith('+')) {
    return '+' + digits;
  }
  
  return '+' + digits;
}

export async function sendWhatsAppBookingNotification(booking: {
  name: string;
  email?: string | null;
  phone: string;
  date: string;
  time: string;
  sessionType: string;
  message?: string | null;
}) {
  try {
    const client = await getTwilioClient();
    const fromNumber = await getTwilioFromPhoneNumber();
    
    if (!fromNumber) {
      console.log('No Twilio phone number configured, skipping WhatsApp notification');
      return { success: false, error: 'No phone number configured' };
    }

    const sessionLabel = sessionTypeLabels[booking.sessionType] || booking.sessionType;
    const timeDisplay = formatTimeDisplay(booking.time);
    const formattedPhone = formatPhoneNumber(booking.phone);
    
    // Message to client confirming their booking
    const clientMessage = `Hello ${booking.name}! 

Your photography session has been confirmed:

Session: ${sessionLabel}
Date: ${booking.date}
Time: ${timeDisplay}

Thank you for booking with Bader Sanad Photography! I will be in touch soon to discuss the details.

Visit: www.badersanad.com`;

    // Send WhatsApp message to client
    const result = await client.messages.create({
      body: clientMessage,
      from: `whatsapp:${fromNumber}`,
      to: `whatsapp:${formattedPhone}`,
    });

    console.log('WhatsApp message sent to client:', result.sid);
    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
    return { success: false, error };
  }
}

export async function sendWhatsAppNotificationToPhotographer(booking: {
  name: string;
  email?: string | null;
  phone: string;
  date: string;
  time: string;
  sessionType: string;
  message?: string | null;
}, photographerPhone: string) {
  try {
    const client = await getTwilioClient();
    const fromNumber = await getTwilioFromPhoneNumber();
    
    if (!fromNumber) {
      console.log('No Twilio phone number configured, skipping WhatsApp notification');
      return { success: false, error: 'No phone number configured' };
    }

    const sessionLabel = sessionTypeLabels[booking.sessionType] || booking.sessionType;
    const timeDisplay = formatTimeDisplay(booking.time);
    const formattedPhotographerPhone = formatPhoneNumber(photographerPhone);
    
    // Message to photographer about new booking
    const photographerMessage = `New Booking Received!

Client: ${booking.name}
Phone: ${booking.phone}${booking.email ? `\nEmail: ${booking.email}` : ''}

Session: ${sessionLabel}
Date: ${booking.date}
Time: ${timeDisplay}
${booking.message ? `\nMessage: ${booking.message}` : ''}

Tap to call: ${booking.phone}`;

    // Send WhatsApp message to photographer
    const result = await client.messages.create({
      body: photographerMessage,
      from: `whatsapp:${fromNumber}`,
      to: `whatsapp:${formattedPhotographerPhone}`,
    });

    console.log('WhatsApp message sent to photographer:', result.sid);
    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error('Failed to send WhatsApp notification to photographer:', error);
    return { success: false, error };
  }
}
