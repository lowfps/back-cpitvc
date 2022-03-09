"use strict";
const PDFDocument = require('pdfkit');
function buildPdf(dataCallback, endCallback) {
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.end();
}
module.exports = { buildPdf };
