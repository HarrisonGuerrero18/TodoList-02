# 📋 Todo List Deployment

Una aplicación **To‑Do List** con frontend y backend separados, pensada para **despliegue en producción** usando automatización con GitHub Actions y hosting en Netlify.

---

## 🚀 ¿Qué es este proyecto?

Este proyecto implementa una **lista de tareas** con arquitectura cliente‑servidor:

* 🧩 **Frontend**: Interfaz web para crear, listar, completar y eliminar tareas.
* 🔁 **Backend**: API REST que gestiona las operaciones CRUD.
* ⚙️ **CI/CD**: Flujo de despliegue automatizado.

El objetivo es demostrar un **flujo real de desarrollo y despliegue**, no solo que “funcione en local”.

---

## 🧠 Tecnologías utilizadas

* **JavaScript**
* **Node.js** (Backend)
* **Express** (API REST)
* **HTML / CSS / JS** (Frontend)
* **Netlify** (Deploy del frontend)
* **GitHub Actions** (Automatización)

---

## 🗂️ Estructura del proyecto

```txt
/
├── Backend/                # API del servidor
├── frontend/               # Aplicación cliente
├── .github/workflows/      # Flujos de CI/CD
├── netlify.toml            # Configuración de Netlify
├── .gitignore
└── README.md
```

---

## 🛠️ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/HarrisonGuerrero18/todo-list-deployment.git
cd todo-list-deployment
```

---

### 2️⃣ Backend

```bash
cd Backend
npm install
npm run dev
```

El backend quedará disponible, por defecto, en:

```txt
http://localhost:5000
```

---

### 3️⃣ Frontend

```bash
cd frontend
npm install
npm start
```

La aplicación se abrirá en el navegador en:

```txt
http://localhost:3000
```

---

## 🔐 Variables de entorno

### Backend (`.env`)

```env
PORTDB=21074
PASSWORDDB=pZMoDUgBXyLhuePqfWPjEOueYledmeuX
HOSTDB=maglev.proxy.rlwy.net
JWT_SECRET=tu_llave_aqui
USERDB=postgres
DB=railway
NODE_ENV=production
```

### Frontend (`.env`)

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Despliegue

### 🌐 Frontend (Netlify)

El proyecto incluye `netlify.toml`, lo que permite:

* Build automático
* Deploy continuo al hacer push a la rama principal

Pasos:

1. Conectar el repositorio en Netlify
2. Definir el comando de build (`npm run build`)
3. Definir la carpeta de salida (`build/` o `dist/`)

---

### 🛠️ Backend

El backend puede desplegarse en plataformas como:

* Railway
* Render
* Fly.io
* Heroku

Recuerda configurar las variables de entorno en la plataforma elegida.

---

## 📦 Scripts útiles

### Backend

```bash
npm run dev      # Desarrollo
npm start        # Producción
```

### Frontend

```bash
npm start        # Desarrollo
npm run build    # Build de producción
```

---

## 🤝 Contribuciones

1. Haz un fork del proyecto
2. Crea una rama (`feature/nueva-funcionalidad`)
3. Realiza tus cambios
4. Abre un Pull Request

---

## 📄 Licencia

Este proyecto puede distribuirse bajo licencia **MIT** u otra equivalente.

---

## 📬 Autor

**Harrison Guerrero**
Estudiante de Análisis y Desarrollo de Software

---

> Proyecto enfocado en buenas prácticas, despliegue real y separación clara de responsabilidades.
