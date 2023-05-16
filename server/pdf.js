import PDFDocument from 'pdfkit'
import PDFTable from 'pdfkit-table';
import fs from 'fs'
const doc = new PDFDocument();

const createPDF = async () => {
  const date = Date.now()
  const clientName = 'Joao'

  const pathThisPDF = `./output/invoice_${clientName}_${date}.pdf`

  
  const primaryColor = '#008080';
  const secondaryColor = '#d9d9d9';
  
  // Adicione a tabela de informações
  const table = {
    headers: ['Aluno', 'Endereço', 'Professor', 'Endereço', 'Data', 'Valor'],
    rows: [
      ['Fulano de Tal', 'Rua Tal, 123', 'Beltrano de Tal', 'Rua XYZ, 456', '15/05/2023', 'R$ 50,00']
    ]
  };
  
  // Configure o layout da tabela
  const tableLayout = {
    fillColor: secondaryColor,
    textColor: primaryColor,
    fontSize: 10,
    padding: 2
  };
  
  // Defina a largura das colunas
  const columnWidths = {
    0: 100,
    1: 150,
    2: 100,
    3: 150,
    4: 80,
    5: 80
  };
  
  // Crie uma nova tabela e adicione ao documento
  const pdfTable = new PDFTable(doc, {
    bottomMargin: 30
  });
  pdfTable.addPlugin(new (require('pdfkit-tables/plugins/fitcolumn'))({
    columnWidths: columnWidths
  }));
  pdfTable.addPlugin(new (require('pdfkit-tables/plugins/autoTableAlt'))());
  pdfTable.on('pageAdded', function () {
    pdfTable.table.x = pdfTable.page.margins.left;
    pdfTable.table.y = pdfTable.page.margins.top;
  });
  pdfTable.on('cellAfterAdded', function (cell, data) {
    if (cell.y === 0) {
      cell.styles.fillColor = primaryColor;
      cell.styles.color = '#fff';
    } else if (cell.y % 2 === 0) {
      cell.styles.fillColor = secondaryColor;
    }
  });
  pdfTable.draw(table, {
    x: 50,
    y: 50,
    prepareHeader: () => doc.font('Helvetica-Bold'),
    prepareRow: () => doc.font('Helvetica'),
    layout: tableLayout
  });
  
  doc.fontSize(14).text('Nome do aluno:', { continued: true });
  doc.fontSize(12).text(' Fulano de Tal');
  doc.fontSize(14).text('Endereço:', { continued: true });
  doc.fontSize(12).text(' Rua Tal, 123');
  doc.moveDown();
  doc.fontSize(14).text('Nome do professor:', { continued: true });
  doc.fontSize(12).text(' Beltrano de Tal');
  doc.fontSize(14).text('Endereço:', { continued: true });
  doc.fontSize(12).text(' Rua XYZ, 456');
  doc.moveDown();
  doc.fontSize(14).text('Valor da aula:', { continued: true });
  doc.fontSize(12).text(' R$ 50,00');
  doc.fontSize(14).text('Data:', { continued: true });
  doc.fontSize(12).text(' 15/05/2023');
  doc.pipe(fs.createWriteStream(pathThisPDF));
  doc.end();

  return pathThisPDF;
}

export default createPDF;