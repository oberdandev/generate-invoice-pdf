import express from 'express';
import cors from 'cors';
const app = express();
import path from 'path'
import createPDF from './pdf.js'

app.use(express.json());
app.use(cors());
app.listen(3000, ()=> console.log('listening on http://localhost:3000'));

const pdf = await createPDF();

app.use('/download', async(req,res)=> {
  res.sendFile(path.resolve(pdf));
})

app.get('/', (req, res) => {
  res.end('teste')
})