# Portal web con perfil 100%

Por:
Santiago Salazar Gilchrist
Pablo José Benitez
Juan Antonio Buendia

## Descripción

Aplicación web construida con Next.js, Prisma y PostgreSQL para gestionar perfiles, vacantes, postulaciones y recomendaciones.

La pantalla principal del MVP está en `/mvp`. Ahí puedes:

- Crear perfiles de prueba.
- Ver las vacantes disponibles.
- Navegar por el listado de vacantes con el botón de “Mostrar más”.
- Ver el panel inferior con todas las vacantes y perfiles cargados en base de datos.

## Inicio rápido

Si solo quieres levantar el proyecto lo antes posible, haz esto:

1. Clona el repositorio y entra a la carpeta.
2. Instala dependencias con `npm install`.
3. Crea el archivo `.env` con `DATABASE_URL`.
4. Levanta PostgreSQL con `docker compose up -d`.
5. Ejecuta `npx prisma migrate dev`, luego `npx tsx prisma/seed.ts`.
6. Inicia la app con `npm run dev` y abre `http://localhost:3000/mvp`.

## Requisitos

Antes de iniciar, instala lo siguiente:

- Node.js 18 o superior.
- Git.
- Docker Desktop.

Verifica que esté disponible con:

```bash
node -v
npm -v
docker -v
```

## Descargar el proyecto

```bash
git clone https://github.com/Peejhay55/Ingenieria-de-Software.git
cd Ingenieria-de-Software
```

Si necesitas trabajar sobre la rama principal, usa:

```bash
git checkout main
```

## Instalar dependencias

```bash
npm install
```

## Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con esta variable:

```env
DATABASE_URL="postgresql://pm_user:pm_pass@localhost:5432/profile_manager?schema=public"
```

## Levantar la base de datos

Inicia PostgreSQL con Docker:

```bash
docker compose up -d
```

## Crear las tablas

Aplica las migraciones de Prisma:

```bash
npx prisma migrate dev
```

## Cargar vacantes y perfiles de prueba

El archivo `prisma/seed.ts` inserta 20 vacantes y 10 perfiles de ejemplo.

Para cargar esos datos en la base de datos, ejecuta el seed con un runner de TypeScript, por ejemplo:

```bash
npx tsx prisma/seed.ts
```

Si prefieres usar otro runner, también puedes adaptar ese paso a tu entorno.

## Ejecutar la aplicación

```bash
npm run dev
```

Luego abre:

```text
http://localhost:3000/mvp
```

## Cómo ver todas las vacantes

1. Entra a `/mvp`.
2. Carga o selecciona un perfil.
3. Mira la sección “Vacantes disponibles”. Ahí se muestran primero 5 vacantes.
4. Usa “Mostrar más” para ver el resto.
5. En la sección inferior “Database: Vacantes” puedes navegar por todas las vacantes con las flechas.

## Estructura general

```text
Ingenieria-de-Software/
├── app/                 # Páginas y API routes de Next.js
├── lib/                 # Utilidades compartidas
├── prisma/              # Esquema, migraciones y seed
├── public/              # Archivos estáticos
├── docker-compose.yml   # Contenedor de PostgreSQL
├── package.json         # Scripts y dependencias
└── tsconfig.json        # Configuración de TypeScript
```

## Notas

- Si cambias el esquema de Prisma, vuelve a ejecutar `npx prisma migrate dev`.
- Si quieres volver a cargar datos limpios, revisa `prisma/seed.ts`.
