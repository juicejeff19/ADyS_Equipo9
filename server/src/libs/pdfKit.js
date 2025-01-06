import PDFDocument from 'pdfkit'
import path from 'path';

export function buildPDF(competidorData, dataCallback, endCallback) {
    console.log("pdf")
    const doc = new PDFDocument()

    doc.on('data', dataCallback)
    doc.on('end', endCallback)
    //const imagen = path.resolve('assets', 'travis.jpeg');

    // Agregar una imagen en el encabezado
    //const imagePath = imagen; // Reemplaza con la ruta de tu imagen
    //doc.image(imagePath, { width: 500, align: 'center' });
    doc.moveDown();

    // Título con estilo
    doc.fillColor('#4A90E2') // Color azul
       .font('Helvetica-Bold')
       .fontSize(24)
       .text('Reconocimiento', { align: 'center' });
    doc.moveDown();

    // Línea decorativa
    doc.strokeColor('#4A90E2')
       .lineWidth(2)
       .moveTo(doc.x, doc.y)
       .lineTo(doc.page.width - doc.x, doc.y)
       .stroke();
    doc.moveDown();

    // Información del evento y competidor con estilo
    doc.fillColor('#333333') // Color gris oscuro
       .font('Helvetica')
       .fontSize(16)
       .text(`Nombre del Evento: ${competidorData.eventId.name}`);
    doc.text(`Nombre del Competidor: ${competidorData.competidorId.name}`);
    doc.text(`Distancia Recorrida: ${competidorData.resultadoId.distanceKm} km`);
    doc.text(`Tiempo: ${competidorData.resultadoId.time}`);

    // Línea decorativa inferior
    doc.strokeColor('#4A90E2')
       .lineWidth(2)
       .moveTo(doc.x, doc.y)
       .lineTo(doc.page.width - doc.x, doc.y)
       .stroke();



    doc.end();
}
