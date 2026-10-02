const fs = require('fs');

// Read PB raw
let pbRaw = fs.readFileSync('public/data/prompt-book.csv', 'utf8');

// Regex split based on legitimate Image URL start
// Each valid row in prompt-book starts with either img/aviation_army_fitness.jpg or https://www.umairtiktokwala.com/img/prompts/
const parts = pbRaw.split(/(?=(?:https:\/\/www\.umairtiktokwala\.com\/img\/prompts\/|img\/aviation_army_fitness\.jpg))/g);

console.log('Detected individual records in prompt-book:', parts.length);

const parsedPB = [];
for (let p of parts) {
  p = p.trim();
  if (!p) continue;
  if (p.startsWith('Image URL,')) {
    p = p.replace('Image URL,Title,Prompt,Category,Tool,Home\n', '').replace('Image URL,Title,Prompt,Category,Tool,Home\r\n', '').trim();
  }
  if (!p) continue;
  
  // Use a mini-parse for this single chunk
  let cells = [];
  let cell = '', inQ = false;
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (inQ) {
      if (c === '"') {
        if (p[i+1] === '"') { cell += '"'; i++; }
        else inQ = false;
      } else cell += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { cells.push(cell.trim()); cell = ''; }
      else if (c === '\n' && cells.length >= 5) {
        cells.push(cell.trim());
        break;
      }
      else cell += c;
    }
  }
  if (cell || cells.length < 6) cells.push(cell.trim());
  if (cells.length >= 4 && cells[0].includes('img')) {
    parsedPB.push({
      img: cells[0],
      title: cells[1] || 'AI Visual Prompt',
      prompt: cells[2] || '',
      category: cells[3] || 'Visual',
      tool: cells[4] || 'Midjourney',
      home: cells[5] || 'True'
    });
  }
}

console.log('Successfully recovered valid PB records:', parsedPB.length);
if (parsedPB.length > 0) {
  console.log('Sample recovered 1:', parsedPB[0].title, '| img:', parsedPB[0].img);
  console.log('Sample recovered 2:', parsedPB[1].title, '| img:', parsedPB[1].img);
}
