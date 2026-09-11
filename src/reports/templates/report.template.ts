import { CreateReportDto } from '../dto/create-report.dto';

export function generateReportTemplate(
  dto: CreateReportDto,
): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Nuevo reporte de fuga de agua</title>
      </head>

      <body style="font-family: Arial, sans-serif;">

        <div
          style="
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
          "
        >

          <h2>
            Nuevo reporte de fuga de agua
          </h2>

          <p>
            Se ha recibido un nuevo reporte ciudadano.
          </p>

          <table
            style="
              width: 100%;
              border-collapse: collapse;
            "
          >

            <tr>
              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  font-weight: bold;
                "
              >
                Dirección
              </td>

              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                "
              >
                ${dto.address}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  font-weight: bold;
                "
              >
                Descripción
              </td>

              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                "
              >
                ${dto.description}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  font-weight: bold;
                "
              >
                Severidad
              </td>

              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                "
              >
                ${dto.severity}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  font-weight: bold;
                "
              >
                Teléfono
              </td>

              <td
                style="
                  padding: 10px;
                  border: 1px solid #ddd;
                "
              >
                ${dto.reporterPhone}
              </td>
            </tr>

          </table>

        </div>

      </body>
    </html>
  `;
}