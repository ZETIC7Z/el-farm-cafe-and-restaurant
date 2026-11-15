const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const ENV_PATH = path.join(ROOT, '.env.local');

(async () => {
  const token = process.env.GCLI_ACCESS_TOKEN;
  if (!token) {
    console.error('Missing GCLI_ACCESS_TOKEN');
    process.exit(1);
  }

  // 1. Query https://www.googleapis.com/oauth2/v2/userinfo
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const userInfo = await userRes.json();
  console.log('CONNECTED_GOOGLE_USERINFO:', JSON.stringify(userInfo));

  // Check token scopes
  const tokenInfoRes = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${encodeURIComponent(token)}`);
  const tokenInfo = await tokenInfoRes.json();
  console.log('TOKEN_SCOPES:', tokenInfo.scope);

  // 2. Check if 'EL Farm Bookings' spreadsheet already exists in Drive
  const searchQuery = encodeURIComponent("name = 'EL Farm Bookings' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false");
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${searchQuery}&fields=files(id,name,webViewLink)`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const searchData = await searchRes.json();
  let sheetId = null;
  let webViewLink = null;

  const headersCsv = 'Timestamp,Name,Email,Phone,Date,Time,Guests,Order / Notes\r\n';

  if (searchData.files && searchData.files.length > 0) {
    sheetId = searchData.files[0].id;
    webViewLink = searchData.files[0].webViewLink || `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
    console.log('FOUND_EXISTING_SHEET:', sheetId, webViewLink);
  } else {
    // Create 'EL Farm Bookings' Google Sheet via Drive API multipart upload (converts CSV row 1 headers into native Google Sheet)
    const boundary = '-------ElFarmBookingsBoundary' + Date.now();
    const metadata = {
      name: 'EL Farm Bookings',
      mimeType: 'application/vnd.google-apps.spreadsheet',
    };
    const multipartBody =
      `--${boundary}\r\n` +
      `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
      `${JSON.stringify(metadata)}\r\n` +
      `--${boundary}\r\n` +
      `Content-Type: text/csv; charset=UTF-8\r\n\r\n` +
      `${headersCsv}\r\n` +
      `--${boundary}--`;

    const createRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
    });
    const created = await createRes.json();
    if (!createRes.ok || !created.id) {
      console.error('Failed to create sheet:', created);
      process.exit(1);
    }
    sheetId = created.id;
    webViewLink = created.webViewLink || `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
    console.log('CREATED_NEW_SHEET:', sheetId, webViewLink);
  }

  // Also test if Google Sheets v4 API is accessible with this token to format Row 1 headers bold/frozen
  try {
    const formatRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.06, green: 0.11, blue: 0.13 },
                  textFormat: {
                    foregroundColor: { red: 0.937, green: 0.788, blue: 0.643 },
                    bold: true,
                    fontSize: 11,
                  },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId: 0,
                gridProperties: { frozenRowCount: 1 },
              },
              fields: 'gridProperties.frozenRowCount',
            },
          },
        ],
      }),
    });
    console.log('SHEETS_API_FORMAT_STATUS:', formatRes.status);
  } catch (e) {
    console.log('SHEETS_API_NOTE:', e.message);
  }

  const detectedEmail = userInfo.email || 'stycanine77@gmail.com';

  // 3. Write .env.local with GOOGLE_SHEET_ID, BOOKING_NOTIFICATION_EMAIL, GCLI_ACCESS_TOKEN, and Facebook placeholders
  const envContent = `# ============================================================================
# EL FARM CAFÉ & RESTO — LOCAL ENVIRONMENT CONFIGURATION (.env.local)
# ============================================================================

# Google Sheets Integration (Phase 5)
GOOGLE_SHEET_ID=${sheetId}
GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/${sheetId}/edit

# DEV TESTING EMAIL - Replace with actual EL Farm Café & Resto owner email before final production deploy
BOOKING_NOTIFICATION_EMAIL=${detectedEmail}

# OAuth Access Token for Local Google Drive / Sheets Sync
GCLI_ACCESS_TOKEN=${token}

# Optional Gmail SMTP App Password (if using direct Nodemailer SMTP fallback)
SMTP_USER=${detectedEmail}
SMTP_PASS=

# Facebook Page Auto-Sync Configuration (Phase 6)
# Populate your Facebook Page ID and Page Access Token below to enable live Graph API polling
FACEBOOK_PAGE_ID=61592749568852
FACEBOOK_PAGE_ACCESS_TOKEN=
`;

  fs.writeFileSync(ENV_PATH, envContent, 'utf8');
  console.log('SAVED_ENV_LOCAL_SUCCESSFULLY');
  console.log('DIRECT_SHEET_LINK:', `https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
})();
