# Comparador SAP vs WMS

## Descripción General
El **Comparador SAP vs WMS** es una solución integral (Fullstack) diseñada para la conciliación y comparación de inventarios entre el sistema SAP y el sistema de gestión de almacenes (WMS).

La aplicación permite cargar archivos Excel, normalizar los datos, ejecutar comparaciones precisas y visualizar las diferencias mediante un dashboard interactivo. Está dividida en un backend robusto para el procesamiento de archivos y un frontend intuitivo para la visualización y análisis de métricas.

---

## Características Principales

- **Comparación de Inventarios:** Análisis detallado de diferencias tanto por código de producto como por lote.
- **Dashboard Interactivo:** Visualización de KPIs y métricas clave de conciliación.
- **Procesamiento de Archivos:** Carga y lectura eficiente de archivos Excel (SAP y WMS).
- **Normalización Automática:** Mapeo automático y filtros específicos para estructurar los datos antes de la comparación.
- **Exportación de Resultados:** Descarga de tablas de comparación y resultados consolidados.
- **Gestión de Almacenamiento Seguro:** Limpieza automática de archivos temporales en el servidor.

---

## Tecnologías Utilizadas

| Entorno   | Tecnología                     | Uso Principal |
|------------|--------------------------------|---------------|
| Frontend   | React 18+ & Vite               | Interfaz de usuario y renderizado rápido |
| Frontend   | JavaScript (ES6+) & CSS Modular| Lógica de cliente y estilos aislados |
| Frontend   | Context API                    | Gestión del estado global de las comparaciones |
| Backend    | Node.js & Express.js           | Servidor, enrutamiento y API REST |
| Backend    | Multer                         | Gestión y carga de archivos temporales (Excel) |
| Backend    | xlsx                           | Lectura y parsing de hojas de cálculo |

---

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `/frontend` y `/backend`.

```text
comparador-sap-wms/
│
├── backend/                  # API y lógica de procesamiento
│   ├── controllers/          # Controladores (ej. compare.controller.js)
│   ├── routes/               # Rutas de la API (ej. /api/compare)
│   ├── services/             # Lógica de negocio (autoMap, normalize, readExcel, etc.)
│   ├── utils/                # Utilidades generales (cleanUploads.js)
│   ├── uploads/              # Archivos temporales Excel
│   └── server.js             # Punto de entrada del backend
│
└── frontend/                 # Interfaz de usuario (React + Vite)
    ├── src/
    │   ├── app/              # Punto de entrada de la app
    │   ├── assets/           # Imágenes y recursos estáticos
    │   ├── layouts/         # Layout principal
    │   ├── modules/         # Módulos (comparison, dashboard, context)
    │   ├── routes/          # Rutas de navegación
    │   ├── services/        # Consumo de API (httpClient)
    │   └── shared/          # Componentes reutilizables
    └── main.jsx              # Bootstrap de React

## Instalación y Ejecución
# Requisitos Previos

* Node.js (v16 o superior)
* npm o yarn

## 1. Backend

cd backend
npm install

Configurar .env:

PORT=3001

Ejecutar:

# desarrollo
npm run dev

# producción
node server.js

## 2. Frontend

cd frontend
npm install

Ejecutar:

npm run dev

Build producción:

npm run build
npm run preview

## Flujo de la Aplicación y API

1. Carga: el usuario sube archivos desde el frontend.
2. Petición API: POST /api/compare con archivos SAP y WMS.
3. Procesamiento: backend normaliza y compara datos.
4. Respuesta: devuelve diferencias consolidadas.
5. Visualización: dashboard con KPIs y tablas.
6. Exportación: descarga de resultados desde frontend.

## Notas de Mantenimiento y Despliegue

* Conexión Frontend-Backend: configurada en frontend/src/services/httpClient.js.
* Limpieza automática: utils/cleanUploads.js elimina archivos temporales cada 30 minutos.
* Privacidad: los archivos en /uploads son temporales y no se almacenan permanentemente.
* Despliegue: backend compatible con servicios como Render o similares.