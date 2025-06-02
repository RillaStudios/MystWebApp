const fs = require('fs');
const zlib = require('zlib');

const sitemap = fs.readFileSync('./public/sitemap.xml', 'utf-8');
const gzipped = zlib.gzipSync(sitemap);

fs.writeFileSync('./public/sitemap.xml.gz', gzipped);
