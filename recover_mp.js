const fs = require('fs');

let mpRaw = fs.readFileSync('public/data/master-prompts.csv', 'utf8');

// A legitimate Master Prompt row starts with either:
// 1) U.S. ARMY FITNESS CHALLENGE
// 2) [A-Z0-9\s—–\(\)]+,[A-Za-z\s]+,"?ChatGPT Image
const splitRegex = /(?=(?:U\.S\.\s*ARMY\s*FITNESS\s*CHALLENGE|[A-Z0-9\s—–\(\)]+,[A-Za-z\s]+,"?ChatGPT Image))/g;
const parts = mpRaw.split(splitRegex);

console.log('Detected individual MP records:', parts.length);

const parsedMP = [];
for (let p of parts) {
  p = p.trim();
  if (!p) continue;
  if (p.startsWith('Title,')) {
    p = p.replace('Title,Category,Image,Master Prompt\n', '').replace('Title,Category,Image,Master Prompt\r\n', '').trim();
  }
  if (!p) continue;
  
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
      else cell += c;
    }
  }
  cells.push(cell.trim());
  
  if (cells.length >= 3) {
    parsedMP.push({
      title: cells[0],
      category: cells[1] || 'System',
      img: cells[2] || '',
      prompt: cells.slice(3).join(',')
    });
  }
}

console.log('Successfully recovered valid MP records:', parsedMP.length);
if (parsedMP.length > 0) {
  console.log('MP Sample 1:', parsedMP[0].title, '| category:', parsedMP[0].category, '| img:', parsedMP[0].img);
  if (parsedMP[1]) console.log('MP Sample 2:', parsedMP[1].title, '| category:', parsedMP[1].category, '| img:', parsedMP[1].img);
}
