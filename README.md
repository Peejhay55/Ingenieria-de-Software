Portal web con perfil 100%
Por:
Santiago Salazar Gilchrist
Pablo José Benitez
Juan Antonio Buendia
---
Requisitos para correr localmente:

Instalar en el computador:

- Node.js (v18 o superior)
- Docker Desktop
- Git
Verificar instalación:

node -v
npm -v
docker -v


---
Pasos para correr localmente:

# 1. Clonar el repositorio

git clone https://github.com/Peejhay55/Ingenieria-de-Software.git

cd Ingenieria-de-Software
git checkout MVP

---
# 2. Instalar dependencias

npm install
---

# 3. Crear archivo de variables de entorno

Crear un archivo `.env` en la raíz del proyecto con este contenido:

DATABASE_URL="postgresql://pm_user:pm_pass@localhost:5432/profile_manager?schema=public"
(Hay un env.example ya subido que lo tiene, solo es cambiarlo a .env)

---

# 4. Iniciar la base de datos

docker compose up -d

---

# 5. Crear las tablas de la base de datos

npx prisma migrate dev

---

# 6. Insertar vacantes de prueba

npx ts-node prisma/seed.ts

---

# 7. Ejecutar la aplicación

npm run dev

---

# 8. Abrir la aplicación

Ir a:

http://localhost:3000/mvp
