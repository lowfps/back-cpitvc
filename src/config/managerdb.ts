import { Response } from 'express';
import pool from './connectiondb';
const PDFDocument = require('pdfkit');
const fecha: any = new Date();
const fechaHoy: any = new Date();
const diaFInal: any = fecha.getDate();
const { Base64Encode } = require('base64-stream');


class ManagerDB {
    protected static async executeQuery(sql: string, parameters: any, res: Response): Promise<any> {


        pool.one(sql, parameters).then(ing => {
            const titulo: any = ing.titulo_id;
            const universidad: any = ing.universidad_id;
            const parametros1 = titulo;
            const parametros2 = universidad;
            const imgPath: any = "src/config/imagen1.png"
            const query: string = 'SELECT * FROM cpitvc_titulo WHERE id = $1';
            const query2: string = 'SELECT * FROM cpitvc_universidad WHERE id = $1';

            function tituloConsulta(query: any, parametros: any) {

                pool.one(query, parametros1).then(titulo => {

                    function uniConsulta(query2: any, parametros2: any) {
                        pool.one(query2, parametros2).then(uni => {

                            // Genereación pdf
                            var fecha = ing.fecha_resolucion_seccional
                            var anioResol = fecha.getFullYear()
                            var mesResol = fecha.getMonth()
                            var diarResol = fecha.getDate()
                            var diaHoy = fechaHoy.getDate()
                            var mesHoy = fechaHoy.getMonth()
                            var anioHoy = fechaHoy.getFullYear()
                            var encabezadoCetrif = ' El Director Ejecutivo, en uso de las facultades estatutarias del Concejo Profesional de Ingeniería de Transporte y Vías de Colombia creado por la ley 33 de 1980 y la ley 842 de 2002.'
                            var cuerpoCertif = 'Que ' + ing.apellidos + ' '+ ing.nombres +' identificado(a) con la Cédula de Ciudadanía No ' + ing.identificacion + ' matriculado(a) como ' + titulo.titulo +
                                ' bajo el número de matrícula ' + ing.numeromatricula + ' acredita a su titular para ejercer la profesión de ' + titulo.titulo + ' o como especialista en la misma área dentro del territorio nacional. Esta matricula fue expedida mediante la resolución No ' + ing.resolucion_nacional + 
                                ' del ' + diarResol + '/0' + mesResol + '/' + anioResol + ' expedida por el Consejo Profesional de Ingeniería de Transporte y Vías de Colombia, con base en el título conferido por '+ uni.nombre + '.'
                            
                                function generateCertif() {

                                // Inicialización del objeto doc
                                const doc = new PDFDocument();
                                // doc.on('data', dataCallback);
                                // doc.on('end', endCallback);
                                
                                // doc.fontSize(25).text('nombre' + ing.nombres, 90, 90);
                                doc.image(imgPath, 0, 0, { width: doc.page.width, height: doc.page.height });
                                doc.font('Helvetica-Bold').fontSize(10).text(encabezadoCetrif, 85,120, {
                                    align: 'justify' 
                                });
                                doc.fontSize(11);
                                doc.font('Helvetica-Bold').text('HACE CONSTAR:', 260, 180);

                                doc.font('Helvetica').text(cuerpoCertif, 90, 225,{
                                    align: 'justify',
                                    // lineGap: 20
                                });

                                doc.text('Que la Matrícula citada se encuentra vigente.', 90, 348);
                                doc.text('Que el (la) Ingeniero(a) NO registra antecedentes disciplinarios, ni éticos, ni sanciones en el ejercicio profesional.', 90, 388);
                                doc.text('Se expide en Bogotá D.C., a los ' + diaHoy +' días del mes '+ mesHoy+ ' de '+ anioHoy, 90, 418)
                                doc.font('Helvetica-Bold').fontSize(9).text('Si el certificado es solicitado por una persona diferente al titular, este no podrá ser presentado en hoja de vida, sin autorización del Ingeniero, según lo contemplado en la Ley 842 del 2003, Articulo N° 53 literal D.', 90, 458)
                                doc.font('Helvetica').text('Este certificado se expide con base en la ley 842 de 2003, artículo 6, parágrafo único.', 100, 498)
                                doc.font('Helvetica-Bold').text('“Antes de imprimir este documento, asegúrese que sea necesario. Proteger el medio ambiente también es su responsabilidad”.', 90, 518)
                                doc.text('Ing. MANUEL ARIAS MOLANO', 258, 680);
                                doc.font('Helvetica').text('Director Ejecutivo')    
                                // Pasar a base 64
                                var finalString = ''; // contains the base64 string
                                var stream = doc.pipe(new Base64Encode());
                                doc.end();

                                stream.on('data', function(chunk:any){
                                    finalString += chunk
                                })
                                stream.on('end', ()=>{
                                    res.json(finalString);
                                })
                            }
                            // Finalizacion del objeto doc
                            generateCertif();



                            // const stream = res.writeHead(200, {
                            //     // 'Content-Type': 'application/pdf',
                            //     'Content-Type': 'multipart/form-data',
                            //     'Content-Disposition': 'attachment;filename=certif.pdf'
                            // })

                            // generateCertif(
                            //     (chunk: any) => stream.write(chunk), () => stream.end()
                            // )

                        })
                    }
                    uniConsulta(query2, parametros2);
                })

            }
            tituloConsulta(query, parametros1);
            
        });

        
    }
    

}

export default ManagerDB;


