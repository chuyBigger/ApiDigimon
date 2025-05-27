# Digimon Digital Monster Viewer 🐉

Este proyecto permite visualizar cartas de Digimon utilizando una API externa. Se compone de un backend en Java con Spring Boot que actúa como intermediario y un frontend simple en HTML/CSS/JS que presenta los Digimon y sus evoluciones de forma visual e interactiva.

---

## 📦 Tecnologías utilizadas

### Backend
- Java 17
- Spring Boot
- Maven
- Jackson (JSON parser)
- CORS habilitado para conexión desde frontend local

### Frontend
- HTML5
- CSS3 (archivo `stylos.css`)
- JavaScript (archivo `app.js`)
- Fetch API para consumir datos

---

## 🔧 Estructura del proyecto

```
DigimonProject/
│
├── backend/
│   ├── src/main/java/
│   │   └── com.example.digimon/
│   │       ├── DigimonController.java
│   │       ├── DigimonModel.java
│   │       └── DigimonService.java
│   └── pom.xml
│
├── frontend/
│   ├── index.html
│   ├── stylos.css
│   └── app.js
│
└── README.md
```

---

## 🚀 Cómo ejecutar el proyecto

### 1. Backend

1. Clona el repositorio.
2. Abre la carpeta `backend` con tu IDE.
3. Asegúrate de tener Java 17 y Maven instalados.
4. Ejecuta la aplicación (`DigimonProjectApplication`).

El backend corre en: `http://localhost:8080/digimon`

Este endpoint consulta la API pública de Digimon:

```
https://digimon-api.vercel.app/api/digimon
```

Y la estructura del JSON que retorna es reorganizada por nivel de evolución.

### 2. Frontend

1. Abre el archivo `index.html` directamente en tu navegador.
2. El frontend se conecta automáticamente al backend en `localhost:8080`.

---

## 🧠 Funcionalidades implementadas

- Mostrar todos los Digimon en tarjetas.
- Mostrar Digimon aleatorios en el banner central.
- Filtrar por tipo de evolución desde el menú.
- Menú desplegable limpio y visual con CSS.

---

## 🧩 Planes futuros

- Agregar vista de detalle individual al hacer clic en cada Digimon.
- Mostrar cadena de evolución visual.
- Posibilidad de buscar por nombre.
- Adaptar esta base para futuras APIs como la de Pokémon TCG.

---

## 👨‍💻 Autor

**Jesús Medina Casas** – Desarrollador en formación  
ONE - Oracle Next Education | Alura Latam

---

## 📜 Licencia

Proyecto educativo sin fines de lucro.  
Puedes reutilizar el código con fines personales o de aprendizaje.
