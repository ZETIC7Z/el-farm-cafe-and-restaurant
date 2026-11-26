/**
 * Vercel Serverless API Route — /api/bookings
 * Handles El Farm Cafe & Restaurant table reservation submissions securely.
 */

function cleanText(val, maxLen = 160) {
  return String(val ?? '')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLen);
}

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST, OPTIONS');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }));
    return;
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      payload = payload ? JSON.parse(payload) : {};
    }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ ok: false, error: 'Invalid reservation payload' }));
      return;
    }

    const firstName = cleanText(payload.firstName, 60);
    const lastName = cleanText(payload.lastName, 60);
    const guestName = cleanText(payload.name || `${firstName} ${lastName}`, 120) || 'Guest';
    const email = cleanText(payload.email, 140);
    const phone = cleanText(payload.phone, 40);
    const date = cleanText(payload.date, 32) || new Date().toISOString().slice(0, 10);
    const time = cleanText(payload.time, 32) || '6:30 PM';
    const guests = cleanText(payload.guests || payload.person, 48) || '2 Guests';
    const notes = cleanText(payload.notes || payload.orderNotes, 250);

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ ok: false, error: 'Please provide a valid email address.' }));
      return;
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const gToken = process.env.GCLI_ACCESS_TOKEN;
    let sheetSynced = false;

    if (sheetId && gToken) {
      try {
        const notifyRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(sheetId)}/comments?fields=id`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${gToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content:
                `New Reservation:\n` +
                `Guest: ${guestName} (${email || 'no email'} | ${phone || 'no phone'})\n` +
                `Schedule: ${date} at ${time} (${guests})\n` +
                `Notes: ${notes || 'Standard Table Reservation'}`,
            }),
          }
        );
        sheetSynced = notifyRes.ok;
      } catch {
        sheetSynced = false;
      }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        ok: true,
        status: 'confirmed',
        sheetSynced,
        message: `Reservation confirmed for ${guestName}.`,
      })
    );
  } catch {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'Unable to process reservation request.' }));
  }
}
