# Prueba Técnica - Eventos 🎉

Proyecto dividido en **backend** (NestJS + PostgreSQL) y **frontend** (Angular).  
Permite crear y listar eventos.

---

## 🚀 Requisitos previos
- Node.js >= 18
- npm >= 9
- PostgreSQL >= 14
- Angular CLI (global):  
  ```bash
  npm install -g @angular/cli

⚙️ Configuración inicial

1️⃣ Clonar repositorio
```bash
git clone <url-del-repo>
cd pruebatecnica
```
2️⃣ Configurar base de datos

Asegúrate de que PostgreSQL esté corriendo.

Crea una base de datos, por ejemplo:

CREATE DATABASE eventos_db;


Configura las credenciales en backend/src/app.module.ts o en .env (si usas TypeORM con variables de entorno):
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_contraseña
DB_NAME=eventos_db
```
## 🖥️ Backend (NestJS)

📂 Ubicación:

/backend

▶️ Comandos
```bash
cd backend
npm install
npm run start:dev
```
🌍 URL

Por defecto corre en:

http://localhost:3000

📡 Endpoints
```
GET /eventos → Lista todos los eventos

POST /eventos → Crea un evento

Ejemplo body para POST /eventos:

{
  "titulo": "Reunión de equipo",
  "fecha": "2025-09-05T15:00:00.000Z"
}
```
## 🎨 Frontend (Angular)
📂 Ubicación:
/frontend

▶️ Comandos
cd frontend
npm install
ng serve

🌍 URL

Por defecto corre en:

http://localhost:4200

🔗 Flujo completo

Levanta PostgreSQL y asegúrate de tener la base creada.

Inicia el backend (npm run start:dev dentro de /backend).

Inicia el frontend (ng serve dentro de /frontend).

Abre en tu navegador http://localhost:4200
.

✅ Notas

Si aparece error de CORS, revisa que en backend/src/main.ts tengas:

app.enableCors({ origin: 'http://localhost:4200' });


Para producción, deberías ajustar las variables de entorno y el build de Angular.


## ⚠️ Dificultades encontradas

Durante el desarrollo se presentaron algunos retos:

1. **Base de datos (PostgreSQL)**
   - Inicialmente intenté usar Docker, pero mi equipo no lo tenía instalado correctamente.
   - Como alternativa, instalé PostgreSQL en mi portátil y publiqué el servicio en la red para conectarme mediante una IP pública.
   - Esto permitió continuar con el backend sin depender de Docker.

2. **Frontend (Angular + HttpClient)**
   - Tuve problemas con la configuración de la librería `HttpClientModule`, ya que Angular trabaja ahora con aplicaciones standalone y la importación cambió respecto a versiones anteriores.
   - La solución fue importar correctamente `provideHttpClient` en la configuración inicial del proyecto.

3. **ChatGPT y ejemplos de código**
   - Algunas respuestas entregaban archivos o nombres de componentes que no correspondían exactamente a la estructura generada por Angular CLI.
   - Esto me obligó a adaptar el código al contexto real del proyecto, pero al final fue sencillo resolverlo.
   - Ademas de un problema con mi visual que muestra errores donde no los hay pero igualmente estoy seguro ejecutando para que el compilador me diga los errores
   - problemas al implementar dto ya que empeze con lo basico y implementarlo molesto un poco 

---

## ✅ Conclusión

A pesar de estas dificultades, el proyecto se pudo implementar sin mayores inconvenientes y los objetivos principales (crear y listar eventos con NestJS + Angular + PostgreSQL) se cumplieron exitosamente.
