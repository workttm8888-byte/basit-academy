const fs = require('fs');
const path = require('path');
const https = require('https');

const SOURCES = {
  accounts: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlZS-hwN7Oilzdfs0oLM6AGq5YsZDmjIQUQC7T3Vjxge7UrX4XdIjHCMqRCpjxKfYwM2uzaWyOkRaP/pub?output=csv',
  masterPrompts: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSeijGouDg1i97cLspiUAn-YeYNFds_VGgXaPeOm9Z7mvkzxWsHMkH9qss47t7XzcZaUViPj6S4SH9J/pub?output=csv',
  promptBook: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPCgJBd8X8BJc8Vfkbi6rUYNtDZe9U7lkgikaio2yrYwkofn4Xc4HsBA9xPVglO_QY-cElD-tDojnu/pub?output=csv'
};

const dataDir = path.join(__dirname, 'public', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status code ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

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

async function run() {
  console.log('Downloading datasets from Google Sheets...');

  try {
    // 1. Viral Accounts
    console.log('Fetching Viral Accounts...');
    const accCsv = await fetchUrl(SOURCES.accounts);
    fs.writeFileSync(path.join(dataDir, 'accounts.csv'), accCsv, 'utf8');
    const accRows = parseCSV(accCsv);
    console.log(`Saved accounts.csv (${accRows.length} rows)`);

    // 2. Master Prompts
    console.log('Fetching Master Prompts...');
    const mpCsv = await fetchUrl(SOURCES.masterPrompts);
    fs.writeFileSync(path.join(dataDir, 'master-prompts.csv'), mpCsv, 'utf8');
    const mpRows = parseCSV(mpCsv);
    console.log(`Saved master-prompts.csv (${mpRows.length} rows)`);

    // 3. Prompt Book
    console.log('Fetching Prompt Book...');
    const pbCsv = await fetchUrl(SOURCES.promptBook);
    fs.writeFileSync(path.join(dataDir, 'prompt-book.csv'), pbCsv, 'utf8');
    const pbRows = parseCSV(pbCsv);
    console.log(`Saved prompt-book.csv (${pbRows.length} rows)`);

    console.log('All datasets successfully downloaded and saved to /public/data!');
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

run();
