# Digimon Digital Monster Viewer 🐉

Proyecto educativo que permite visualizar Digimon de forma interactiva. Utiliza una API pública como fuente de datos y está construido con Java (Spring Boot) en el backend y HTML/CSS/JavaScript en el frontend. Está **empaquetado con Docker** y desplegado automáticamente en **Render**.

🔗 Versión desplegada:  
👉 [https://apidigimon-jh8b.onrender.com](https://apidigimon-jh8b.onrender.com)

---

## 📦 Tecnologías utilizadas

### Backend
- Java 17
- Spring Boot
- Maven
- Jackson (parser JSON)
- Docker
- Render (deploy)
- CORS habilitado

### Frontend
- HTML5
- CSS3 (`stylos.css`)
- JavaScript (`app.js`)
- Fetch API

---

## 🗂️ Estructura actual del proyecto

```
DigimonProject/
│
├── src/main/java/com/example/dataDigimon/
│   ├── controller/ApiDigimonController.java
│   ├── model/Digimon.java
│   └── service/DigimonService.java
│
├── src/main/resources/static/
│   ├── index.html
│   ├── stylos.css
│   └── app.js
│
├── src/main/resources/application.properties
├── Dockerfile
├── .dockerignore
├── pom.xml
└── README.md
```

---

## 🚀 Cómo ejecutar el proyecto

### ✅ Opción 1: Usar Docker (recomendado)

```bash
docker build -t digimon-app .
docker run -p 8080:8080 digimon-app
```

Accede en: [http://localhost:8080](http://localhost:8080)

---

### 🧪 Opción 2: Manual (desde el IDE)

1. Clona el proyecto
2. Abre el proyecto en IntelliJ o tu IDE preferido
3. Asegúrate de tener Java 17 y Maven instalados
4. Ejecuta la clase principal: `ApiDigimonApplication.java`
5. Abre `http://localhost:8080` en tu navegador

---

## 🌐 Despliegue en Render

- Se utilizó un `Dockerfile` con dos etapas (`build` y `runtime`)
- El backend sirve también los archivos `index.html`, `stylos.css` y `app.js` desde la carpeta `static`
- Se usó `fetch("/digimon")` (ruta relativa) para que funcione en local y producción

---

## 🔧 Funcionalidades

- 🎴 Muestra Digimon aleatorios en un banner inicial
- 🧾 Lista todos los Digimon con nombre, imagen y nivel
- 🔎 Filtro por nivel de evolución desde menú desplegable
- 💬 Mostrar detalles al hacer clic en un Digimon

---

## ✨ Planes futuros

- Vista detallada individual
- Búsqueda por nombre
- Cadena de evolución
- Animaciones visuales
- Mejorar diseño responsive

---

## 👨‍💻 Autor

**Jesús Medina Casas**  
ONE - Oracle Next Education | Alura Latam  
📍 México

---

## 📜 Licencia

Proyecto educativo y sin fines de lucro.  
Puedes reutilizar este código para aprender, practicar o inspirarte.
