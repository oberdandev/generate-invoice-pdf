import PDFTable from 'pdfkit-table';
import pkg from 'pdfkit';
import fs from 'fs'
import path from 'path';
import PDFDocument from 'pdfkit'

const doc = new PDFDocument();

function generateHeader(doc) {
	doc.image(path.resolve('./assets/img/logotipo.png'), 100, 45, { width: 150 })
		.fillColor('#444444')
		.fontSize(20)
		.fontSize(10)
		.text('Rua Frei Pantaleao de Aveiro', 200, 75, { align: 'right' })
		.text('N24 - Manaus, Amazonas', 200, 90, { align: 'right' })
		.moveDown();
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Payment is due within 15 days. Thank you for your business.',
		50,
		780,
		{ align: 'center', width: 500 },
	);
}

function generateCustomerInformation(doc, invoice){
  const shipping = invoice.shipping;
	doc.text(`Invoice Number: ${invoice.invoice_nr}`, 50, 210)
		.text(`Invoice Date: ${new Date()}`, 50, 215)
		.text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)
		.text(shipping.name, 300, 500)
		.text(shipping.address, 300, 500)
		.text(
			`${shipping.city}, ${shipping.state}, ${shipping.country}`,
			300,
			130,
		)
		.moveDown();
}

const createPDF = async (invoice, path) => {
  let doc = new PDFDocument({ margin: 50 });

  generateCustomerInformation(doc, invoice)

	generateHeader(doc); // Invoke `generateHeader` function.
	generateFooter(doc); // Invoke `generateFooter` function.

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}

export default createPDF;