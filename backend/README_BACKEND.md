# Comparador SAP vs WMS - Backend

## Descripción
Backend para la comparación de inventarios entre SAP y WMS. Procesa archivos Excel, normaliza datos, ejecuta comparaciones y genera resultados consolidados.

## Tecnologías
- Node.js
- Express.js
- Multer (manejo de archivos)
- Excel parsing (xlsx o similar)

## Estructura del proyecto

controllers/
- compare.controller.js → Controlador principal de comparación

routes/
- compare.routes.js → Rutas de API

services/
- autoMap.service.js → Mapeo automático de datos
- compare.service.js → Lógica principal de comparación
- normalize.service.js → Normalización de datos SAP/WMS
- readExcel.service.js → Lectura de archivos Excel
- sapFilter.service.js → Filtros específicos SAP
- summary.service.js → Resúmenes y KPIs

utils/
- (utilidades generales)
- cleanUploads.js → Limpieza automática de archivos temporales

uploads/
- Archivos temporales subidos

server.js
- Punto de entrada del servidor

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

## Ejecución en producción

```bash
node server.js
```

## Variables de entorno (.env)

PORT=3001

## Endpoints principales

### Comparación
POST /api/compare
- Recibe archivos SAP y WMS
- Devuelve diferencias por código y lote

## Limpieza automática de uploads

El sistema incluye un proceso automático para eliminar archivos temporales antiguos:

- Se ejecuta cada 30 minutos
- Elimina archivos con más de 30 minutos de antigüedad
- Implementado en utils/cleanUploads.js

## Notas importantes

- Los archivos en /uploads son temporales
- No almacenar datos sensibles en disco permanentemente
- Preparado para despliegue en Render
