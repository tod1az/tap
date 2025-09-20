# Sistema de Gestión Empresarial

Una solución moderna y completa para la gestión empresarial construida con las últimas tecnologías web.

## 🚀 Características

- **Dashboard Intuitivo**: Panel de control con módulos para empleados, asignaciones, items y control de inventario
- **Gestión de Empleados**: CRUD completo para la administración de personal
- **Control de Inventario**: Gestión de items, entradas y mermas
- **Sistema de Asignaciones**: Asignación de  tareas
- **Autenticación Segura**: Sistema de login con NextAuth.js
- **Base de Datos Robusta**: PostgreSQL con Prisma ORM
- **UI/UX Moderna**: Componentes elegantes con shadcn/ui y Tailwind CSS
- **Performance Optimizada**: Server-side rendering con Next.js

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 + React 18
- **Styling**: Tailwind CSS + shadcn/ui
- **Autenticación**: NextAuth.js
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Package Manager**: pnpm
- **TypeScript**: Para mayor seguridad de tipos

## 📋 Prerrequisitos

Antes de instalar, asegúrate de tener:

- Node.js 18.x o superior
- pnpm 8.x o superior
- PostgreSQL 14.x o superior
- Git

## ⚡ Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/gestion-empresarial.git
cd gestion-empresarial
```

2. **Instala las dependencias**
```bash
pnpm install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones:
```env
# Database
DATABASE_URL="postgresql://usuario:password@localhost:5432/gestion_empresarial"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key-aqui"

```

4. **Configura la base de datos**
```bash
# Genera el cliente Prisma
pnpm prisma generate

# Ejecuta las migraciones
pnpm prisma migrate dev

# (Opcional) Llena la base de datos con datos de prueba
pnpm prisma db seed
```

5. **Inicia el servidor de desarrollo**
```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
├── prisma/                 # Schema y migraciones de Prisma
├── public/                # Archivos estáticos
├── src/                   # Código fuente principal
│   ├── app/              # App Router de Next.js
│   │   ├── api/          # API Routes
│   │   │   └── auth/     # Configuración NextAuth
│   │   │       └── [...nextauth]/
│   │   │           └── test/
│   │   ├── dashboard/    # Panel de administración
│   │   │   ├── asignaciones/    # Gestión de asignaciones
│   │   │   ├── empleados/       # Gestión de empleados
│   │   │   ├── entradas/        # Gestión de entradas
│   │   │   ├── items/           # Gestión de items
│   │   │   ├── mermas/          # Gestión de mermas
│   │   │   ├── layout.tsx       # Layout del dashboard
│   │   │   └── page.tsx         # Página principal
│   │   ├── login/        # Página de login
│   │   │   └── page.tsx
│   │   ├── favicon.ico   # Icono de la aplicación
│   │   ├── globals.css   # Estilos globales
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Página de inicio
│   ├── components/       # Componentes React reutilizables
│   ├── generated/        # Archivos generados automáticamente
│   ├── lib/             # Utilidades y configuraciones
│   │   ├── actions/     # Server Actions de Next.js
│   │   ├── hooks/       # Custom React Hooks
│   │   ├── queries/     # Consultas a la base de datos
│   │   ├── consts.ts    # Constantes de la aplicación
│   │   ├── prisma-client.ts  # Cliente de Prisma configurado
│   │   ├── sv-utils.ts  # Utilidades del servidor
│   │   ├── types.ts     # Definiciones de tipos TypeScript
│   │   ├── utils.ts     # Funciones utilitarias generales
│   │   └── zod-schemas.ts    # Esquemas de validación con Zod
│   └── providers/       # Context providers y configuraciones
├── .env                 # Variables de entorno
├── .gitignore          # Archivos ignorados por Git
└── .pnpmfile.cjs
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo
pnpm dev                  # Inicia el servidor de desarrollo
pnpm build               # Construye la aplicación para producción
pnpm start               # Inicia el servidor de producción

- **Desarrollador Principal**: Tomás Díaz (https://github.com/tod1az)


