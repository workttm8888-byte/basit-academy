const fs = require('fs');

const pbRaw = fs.readFileSync('public/data/prompt-book.csv', 'utf8');
const mpRaw = fs.readFileSync('public/data/master-prompts.csv', 'utf8');

// Let's inspect where valid image URLs start in pbRaw
console.log('PB Raw length:', pbRaw.length);
console.log('MP Raw length:', mpRaw.length);

// Find all occurrences of https://www.umairtiktokwala.com/img/prompts/ in pbRaw
const matches = pbRaw.match(/https:\/\/www\.umairtiktokwala\.com\/img\/prompts\/[^\s,"]+/g);
console.log('Total visual prompt image matches found in PB:', matches ? matches.length : 0);

// Find all occurrences of ChatGPT Image in mpRaw
const mpMatches = mpRaw.match(/ChatGPT Image [^,"]+/g);
console.log('Total master prompt image matches found in MP:', mpMatches ? mpMatches.length : 0);
