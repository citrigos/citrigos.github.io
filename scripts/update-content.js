#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read JSON files
const bioPath = path.join(__dirname, '../content/bio.json');
const newsPath = path.join(__dirname, '../content/news.json');
const htmlPath = path.join(__dirname, '../index.html');

const bioData = JSON.parse(fs.readFileSync(bioPath, 'utf8'));
const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
let html = fs.readFileSync(htmlPath, 'utf8');

// Generate bio HTML
const bioHtml = bioData.paragraphs.map(p =>
  `                        <p>${p.text}</p>`
).join('\n\n');

// Generate news HTML
const newsHtml = newsData.news.map(item => {
  const content = item.text
    ? `<div class="news-text">${item.text}</div>`
    : `<div class="news-text">
                        <ul>
${item.items.map(i => `                            <li>${i}</li>`).join('\n')}
                        </ul>
                    </div>`;

  return `                <div class="news-item">
                    <div class="news-date">${item.date}</div>
                    ${content}
                </div>`;
}).join('\n');

// Replace bio section
const bioRegex = /(<div class="bio">[\s\S]*?)<p>[\s\S]*?<\/p>([\s\S]*?<\/p>[\s\S]*?)<\/div>/;
html = html.replace(bioRegex, `$1${bioHtml}\n                    </div>`);

// Replace news section
const newsRegex = /(<aside class="news-panel">[\s\S]*?<h3>News<\/h3>\n)([\s\S]*?)(\s*<\/aside>)/;
html = html.replace(newsRegex, `$1${newsHtml}\n            $3`);

// Write updated HTML
fs.writeFileSync(htmlPath, html, 'utf8');

console.log('✅ Content updated successfully!');
console.log('📝 Bio paragraphs:', bioData.paragraphs.length);
console.log('📰 News items:', newsData.news.length);
