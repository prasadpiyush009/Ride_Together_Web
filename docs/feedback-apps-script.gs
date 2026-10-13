/**
 * Ride Together: feedback receiver (Google Apps Script)
 *
 * Paste this into Extensions → Apps Script inside the Google Sheet that
 * should hold the responses. Then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone) and copy the Web app URL.
 * Full steps: docs/feedback-setup.md
 */

// Must match FEEDBACK_WEBHOOK_SECRET in your website's environment variables.
var SECRET = "CHANGE_ME_TO_A_LONG_RANDOM_STRING";

var HEADERS = [
  "Time",
  "Rides in a group",
  "Group gets spread out",
  "Would use the app",
  "Note",
  "Email",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return reply({ ok: false, error: "forbidden" });

    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName("Responses") || book.insertSheet("Responses");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      data.ridesInGroups || "",
      data.facesProblem || "",
      data.wouldUse || "",
      data.comment || "",
      data.contact || "",
    ]);
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
