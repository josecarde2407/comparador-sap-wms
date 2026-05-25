# Comparador SAP WMS - Frontend

## Descripción
Aplicación frontend desarrollada en **React + Vite** para la comparación de datos entre SAP y WMS. Permite visualizar diferencias por código o lote, cargar archivos, consultar métricas y analizar resultados en un dashboard centralizado.

## Características principales
- Comparación de inventarios SAP vs WMS por código
- Comparación de inventarios SAP vs WMS por lote
- Dashboard con KPIs y métricas de conciliación
- Carga de archivos para procesamiento
- Visualización de tablas de comparación
- Exportación de resultados
- Arquitectura modular por dominios

## Estructura del proyecto

```
src/
├── app/                 # Punto de entrada de la aplicación
├── assets/              # Imágenes y recursos estáticos
├── layouts/            # Layout principal de la aplicación
├── modules/
│   ├── comparison/     # Lógica de comparación SAP vs WMS
│   ├── dashboard/      # Dashboard principal con KPIs
│   └── context/        # Estado global de comparación
├── routes/             # Configuración de rutas
├── services/           # Comunicación con backend y utilidades
├── shared/             # Componentes y utilidades reutilizables
└── main.jsx            # Bootstrap de React
```

## Tecnologías utilizadas
- React 18+
- Vite
- JavaScript (ES6+)
- CSS modular
- Context API para estado global

## Instalación

### Requisitos
- Node.js 16 o superior
- npm o yarn

### Pasos
```bash
# Clonar repositorio
git clone <REPO_URL>

# Entrar al proyecto
cd comparador-sap-wms/frontend

# Instalar dependencias
npm install

# Ejecutar entorno de desarrollo
npm run dev
```

## Scripts disponibles
```bash
npm run dev      # Ejecuta entorno de desarrollo
npm run build    # Genera build de producción
npm run preview  # Previsualiza build
```

## Arquitectura
El proyecto está organizado por módulos funcionales:

- **comparison/**: lógica de comparación por código y lote
- **dashboard/**: visualización de KPIs, tablas y análisis
- **services/**: consumo de API y utilidades de exportación
- **shared/**: componentes reutilizables y helpers

## Flujo general
1. Carga de archivos SAP y WMS
2. Normalización de datos
3. Ejecución de comparación
4. Visualización de diferencias
5. Exportación de resultados

## Notas
- El frontend depende de un backend Node.js para el procesamiento de datos
- La configuración de endpoints se gestiona en `services/httpClient.js`

## Autor
Sistema interno de comparación SAP vs WMS

