const fs = require('fs');

function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else inQuotes = false;
      } else cell += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(cell.trim()); cell = ''; }
      else if (c === '\n') { row.push(cell.trim()); rows.push(row); row = []; cell = ''; }
      else if (c !== '\r') cell += c;
    }
  }
  if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

const pb = fs.readFileSync('public/data/prompt-book.csv', 'utf8');
const mp = fs.readFileSync('public/data/master-prompts.csv', 'utf8');

const pbRows = parseCSV(pb);
const mpRows = parseCSV(mp);

console.log('Total PB Rows:', pbRows.length);
console.log('Total MP Rows:', mpRows.length);

console.log('PB sample row 1 image:', pbRows[1] ? pbRows[1][0] : 'none');
console.log('PB sample row 2 image:', pbRows[2] ? pbRows[2][0] : 'none');
console.log('PB sample row 3 image:', pbRows[3] ? pbRows[3][0] : 'none');

console.log('MP sample row 1 title & img:', mpRows[1] ? [mpRows[1][0], mpRows[1][2]] : 'none');
console.log('MP sample row 2 title & img:', mpRows[2] ? [mpRows[2][0], mpRows[2][2]] : 'none');
