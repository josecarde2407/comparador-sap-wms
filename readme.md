# Comparador SAP vs WMS

## Descripción General

El **Comparador SAP vs WMS** es una solución Fullstack diseñada para la conciliación y comparación de inventarios entre SAP y WMS.

La aplicación permite:

- Cargar archivos Excel
- Normalizar datos automáticamente
- Comparar inventarios por código y lote
- Visualizar diferencias mediante dashboards interactivos
- Exportar resultados consolidados

El sistema está dividido en:

- **Backend:** procesamiento de archivos y lógica de comparación
- **Frontend:** visualización, métricas y gestión de resultados

---

# Características Principales

- Comparación detallada de inventarios SAP vs WMS
- Dashboard interactivo con KPIs
- Procesamiento de archivos Excel
- Normalización automática de datos
- Exportación de resultados
- Limpieza automática de archivos temporales

---

# Tecnologías Utilizadas

| Entorno | Tecnología | Uso |
|---|---|---|
| Frontend | React 18 + Vite | Interfaz y renderizado rápido |
| Frontend | JavaScript ES6+ | Lógica del cliente |
| Frontend | CSS Modular | Estilos organizados |
| Frontend | Context API | Estado global |
| Backend | Node.js + Express | API REST |
| Backend | Multer | Carga de archivos |
| Backend | xlsx | Lectura de Excel |

---

# Estructura del Proyecto

```text
comparador-sap-wms/
│
├── backend/
│   ├── controllers/          # Controladores
│   ├── routes/               # Rutas API
│   ├── services/             # Lógica de negocio
│   ├── utils/                # Utilidades
│   ├── uploads/              # Archivos temporales
│   └── server.js             # Inicio backend
│
└── frontend/
    ├── src/
    │   ├── app/              # App principal
    │   ├── assets/           # Recursos estáticos
    │   ├── layouts/          # Layouts
    │   ├── modules/          # Módulos funcionales
    │   ├── routes/           # Navegación
    │   ├── services/         # API y servicios
    │   └── shared/           # Componentes reutilizables
    │
    └── main.jsx              # Bootstrap React
```

---

# Instalación y Ejecución

## Requisitos Previos

- Node.js v16 o superior
- npm o yarn

---

# Backend

## Instalar dependencias

```bash
cd backend
npm install
```

## Configurar variables de entorno

Crear archivo `.env`

```env
PORT=3001
```

## Ejecutar servidor

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
node server.js
```

---

# Frontend

## Instalar dependencias

```bash
cd frontend
npm install
```

## Ejecutar proyecto

```bash
npm run dev
```

## Build producción

```bash
npm run build
npm run preview
```

---

# Flujo de la Aplicación

```text
Frontend
   │
   ├── Carga archivos SAP y WMS
   │
   ▼
Backend API
   │
   ├── Lectura Excel
   ├── Normalización
   ├── Comparación
   │
   ▼
Resultados Consolidados
   │
   ├── KPIs
   ├── Tablas
   ├── Diferencias
   │
   ▼
Exportación
```

---

# API Principal

## Comparar Inventarios

```http
POST /api/compare
```

### Función

- Recibe archivos SAP y WMS
- Normaliza datos
- Ejecuta comparación
- Devuelve diferencias consolidadas

---

# Notas de Mantenimiento

## Conexión Frontend - Backend

Configuración ubicada en:

```text
frontend/src/services/httpClient.js
```

---

## Limpieza Automática

El sistema elimina archivos temporales automáticamente mediante:

```text
utils/cleanUploads.js
```

- Frecuencia: cada 30 minutos
- Elimina archivos antiguos temporales

---

## Privacidad

- Los archivos en `/uploads` son temporales
- No se almacena información sensible permanentemente

---

# Despliegue

El proyecto es compatible con plataformas como:

- Render
- Railway
- VPS Linux
- Docker
- Vercel (Frontend)

---

# Autor

Proyecto desarrollado para conciliación y análisis de inventarios SAP vs WMS.
