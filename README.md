Portal web con perfil 100%
Por:
Santiago Salazar Gilchrist
Pablo José Benitez
Juan Antonio Buendia

---

## Estructura de carpetas del proyecto

```
Ingenieria-de-Software/
├── app/                            # App Router de Next.js (páginas y API)
│   ├── api/                        # Endpoints del backend (API routes)
│   │   ├── apply/
│   │   │   └── route.ts            # POST aplicar a vacante
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts        # POST login de usuario
│   │   │   └── register/
│   │   │       └── route.ts        # POST registro de usuario
│   │   ├── health/
│   │   │   └── route.ts            # GET healthcheck
│   │   ├── jobs/
│   │   │   └── route.ts            # GET listar vacantes
│   │   ├── login/
│   │   │   └── page.tsx            # (página login dentro de api — legacy)
│   │   ├── profile/
│   │   │   └── route.ts            # GET/POST perfiles
│   │   ├── recomendaciones/
│   │   │   └── route.ts            # GET recomendaciones
│   │   └── register/
│   │       └── page.tsx            # (página register dentro de api — legacy)
│   ├── login/
│   │   └── page.tsx                # Página de inicio de sesión
│   ├── mvp/
│   │   └── page.tsx                # Página principal del MVP
│   ├── register/
│   │   └── page.tsx                # Página de registro de usuario
│   ├── favicon.ico
│   ├── globals.css                 # Estilos globales (Tailwind CSS)
│   ├── layout.tsx                  # Layout raíz de la aplicación
│   └── page.tsx                    # Página de inicio (landing)
├── lib/
│   └── prisma.ts                   # Cliente Prisma (singleton)
├── prisma/
│   ├── migrations/
│   │   ├── 20260303232808_init/
│   │   │   └── migration.sql       # Migración inicial (perfiles, vacantes, etc.)
│   │   └── 20260415002026_add_user_model/
│   │       └── migration.sql       # Migración: modelo User
│   ├── schema.prisma               # Esquema de la base de datos
│   └── seed.ts                     # Script de datos de prueba
├── public/                         # Archivos estáticos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── docker-compose.yml              # PostgreSQL en Docker
├── eslint.config.mjs               # Configuración de ESLint
├── next.config.ts                  # Configuración de Next.js
├── package.json                    # Dependencias y scripts
├── postcss.config.mjs              # Configuración de PostCSS
└── tsconfig.json                   # Configuración de TypeScript
```

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
