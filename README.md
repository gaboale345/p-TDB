# Taller: Comparación y Selección de SGBD para PyMEs

Presentación ejecutiva e interactiva tipo diapositivas construida con arquitectura web pura (**HTML5**, **CSS3** y **JavaScript** en archivos separados), diseñada bajo una estética **editorial tecnológica moderna con acentos azul profesional (azul zafiro y eléctrico)** y totalmente **responsiva** para computadoras, tablets y teléfonos móviles.

## 🎯 Objetivo
Analizar las características arquitectónicas, ventajas competitivas y requerimientos de instalación de 5 Sistemas Gestores de Bases de Datos (**SGBD**) para seleccionar la opción óptima en una PyME local.

---

## 🗄️ Motores Evaluados (5 SGBD)
1. **PostgreSQL:** RDBMS Objeto-Relacional, cumplimiento estricto ACID, soporte híbrido JSONB, extensiones profesionales (PostGIS) y costo de licencia $0.
2. **MySQL / MariaDB:** RDBMS relacional web, amplia compatibilidad con CMS/frameworks y alto rendimiento en lecturas.
3. **Microsoft SQL Server Express:** RDBMS comercial freeware, administración visual con SSMS e integración .NET (límite de 10 GB y 1.4 GB de RAM).
4. **MongoDB:** NoSQL documental basado en BSON con esquemas flexibles para catálogos dinámicos.
5. **SQLite:** RDBMS embebido *serverless*, cero configuración y base de datos contenida en un archivo único.

---

## 🚀 Características de la Presentación
- **12 Diapositivas Estructuradas:** Desde el contexto inicial y matriz de criterios, pasando por fichas técnicas individuales, hasta la matriz comparativa y dictamen final.
- **Diapositiva 1 Bento Hero:** Tarjetas interactivas de acceso directo a cada SGBD.
- **Herramienta Interactiva:** Calculadora y simulador de selección PyME en tiempo real (Slide 11).
- **Herramientas de Defensa:**
  - `N`: Guía de notas del orador para responder preguntas del comité.
  - `O` / `Esc`: Vista de mosaico/esquema para saltar a cualquier diapositiva.
  - `F`: Modo pantalla completa.
  - `T`: Alternar modo oscuro / claro con acentos azul tecnológico.
  - `→` / `←` / `Espacio`: Navegación fluida por teclado o gestos táctiles (swipe).
- **Diseño Responsivo:** Adaptación fluida a pantallas grandes, laptops, tablets y móviles.
- **Soporte de Impresión:** Optimizado para exportar a PDF / diapositivas impresas (`Ctrl + P`).

---

## 📂 Estructura del Proyecto
```
d:/TDB/
├── index.html    # Estructura semántica de diapositivas y modales
├── style.css     # Sistema de diseño con acentos azul tecnológico y media queries
├── script.js     # Lógica de navegación, simulador y atajos de teclado
└── README.md     # Documentación del proyecto
```

---

## 💻 Ejecución Local
Puedes abrir directamente el archivo `index.html` en cualquier navegador web moderno, o iniciar un servidor local:
```bash
python -m http.server 8080
```
Y acceder a: `http://localhost:8080`
