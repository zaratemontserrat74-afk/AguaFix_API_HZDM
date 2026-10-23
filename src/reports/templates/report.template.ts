import { CreateReportDto } from '../dto/create-report.dto';
 
const cellLabel =
  'padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 35%;';
const cellValue = 'padding: 10px; border: 1px solid #ddd;';
 
export function generateReportTemplate(
  dto: CreateReportDto,
  photoUrl: string,
): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Nuevo reporte de fuga de agua</title>
      </head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <h2>Nuevo reporte de fuga de agua</h2>
          <p>Se ha recibido un nuevo reporte ciudadano.</p>
 
          <div style="text-align: center; margin: 20px 0;">
            <img
              src="${photoUrl}"
              alt="Foto de la fuga"
              width="560"
              style="max-width: 100%; height: auto; border-radius: 6px; border: 1px solid #ddd;"
            />
            <p style="font-size: 12px; color: #666;">
              <a href="${photoUrl}">Ver foto en tamaño completo</a>
            </p>
          </div>
 
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="${cellLabel}">Dirección</td>
              <td style="${cellValue}">${dto.address}</td>
            </tr>
            <tr>
              <td style="${cellLabel}">Descripción</td>
              <td style="${cellValue}">${dto.description}</td>
            </tr>
            <tr>
              <td style="${cellLabel}">Severidad</td>
              <td style="${cellValue}">${dto.severity}</td>
            </tr>
            <tr>
              <td style="${cellLabel}">Teléfono</td>
              <td style="${cellValue}">${dto.reporterPhone}</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
}
 