import express from 'express';
import cors from 'cors';
const app = express();
import path from 'path'
import createPDF from './pdf.js'

app.use(express.json());
app.use(cors());
app.listen(3000, ()=> console.log('listening on http://localhost:3000'));

const invoice = {
	shipping: {
		name: 'John Doe',
		address: '1234 Main Street',
		city: 'San Francisco',
		state: 'CA',
		country: 'US',
		postal_code: 94111,
	},
	items: [
		{
			item: 'TC 100',
			description: 'Toner Cartridge',
			quantity: 2,
			amount: 6000,
		},
		{
			item: 'USB_EXT',
			description: 'USB Cable Extender',
			quantity: 1,
			amount: 2000,
		},
	],
	subtotal: 8000,
	paid: 0,
	invoice_nr: 1234,
};


const pdf = await createPDF(invoice, './src/docs/teste.pdf');

app.use('/download', async(req,res)=> {
  res.sendFile(path.resolve(pdf));
})

app.get('/', (req, res) => {
  res.end('teste')
})