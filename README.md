# API UADE BEF BACK 2025

API REST desarrollada con Express, TypeScript y Prisma para la gestión de citas médicas (appointments), seguros (insurances) y autenticación de usuarios.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Modelo de Datos](#modelo-de-datos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Autenticación](#autenticación)
- [Scripts Disponibles](#scripts-disponibles)
- [Ejemplos de Uso](#ejemplos-de-uso)

## ✨ Características

- **Autenticación JWT**: Sistema de autenticación seguro con tokens JWT
- **Gestión de Citas Médicas**: CRUD completo para citas médicas con estados (requested, confirmed, cancelled)
- **Gestión de Seguros**: Administración de seguros médicos con activación/desactivación
- **Validación de Datos**: Validación robusta usando Zod
- **Arquitectura en Capas**: Separación clara entre controladores, servicios y repositorios
- **Envío de Emails**: Integración con Gmail para notificaciones por correo electrónico
- **Manejo de Errores**: Middleware centralizado para manejo de errores
- **TypeScript**: Código tipado para mayor seguridad y mantenibilidad

## 🛠 Tecnologías

### Dependencias Principales

- **Express 5.1.0**: Framework web para Node.js
- **Prisma 6.19.0**: ORM moderno para bases de datos
- **TypeScript 5.8.2**: Superset de JavaScript con tipado estático
- **Zod 4.1.12**: Librería de validación de esquemas
- **jsonwebtoken 9.0.2**: Generación y verificación de tokens JWT
- **bcrypt 6.0.0**: Encriptación de contraseñas
- **nodemailer 7.0.10**: Envío de correos electrónicos
- **moment 2.30.1**: Manipulación de fechas y horas
- **cors 2.8.5**: Middleware para habilitar CORS

### Base de Datos

- **PostgreSQL**: Base de datos relacional
- **Prisma Accelerate**: Extensión para optimización de consultas

## 📁 Estructura del Proyecto

```
API_UADE_BEF_BACK_2025/
├── prisma/
│   ├── schema.prisma          # Esquema de la base de datos
│   ├── migrations/            # Migraciones de la base de datos
│   ├── seed.ts                # Script de semilla
│   └── clean.ts               # Script de limpieza
├── src/
│   ├── app.ts                 # Configuración de Express
│   ├── config/                # Configuración de la aplicación
│   ├── controllers/           # Controladores (lógica de negocio)
│   │   ├── AppointmentController/
│   │   ├── AuthController/
│   │   └── InsuranceController/
│   ├── dtos/                  # Data Transfer Objects
│   ├── middlewares/           # Middlewares personalizados
│   │   ├── handleAuthorization.ts
│   │   ├── handleError.ts
│   │   ├── notFound.ts
│   │   └── validateData.ts
│   ├── repositories/          # Repositorios (acceso a datos)
│   │   ├── data/
│   │   └── interfaces/
│   ├── routes/                # Definición de rutas
│   │   ├── AppointmentRouter/
│   │   ├── AuthRouter/
│   │   └── InsuranceRouter/
│   ├── schemas/               # Esquemas de validación Zod
│   ├── services/              # Servicios (lógica de aplicación)
│   │   ├── AppointmentService/
│   │   ├── AuthService/
│   │   └── InsuranceService/
│   ├── strategies/            # Estrategias (ej: envío de emails)
│   └── utils/                 # Utilidades
├── index.ts                    # Punto de entrada de la aplicación
├── package.json
└── tsconfig.json
```

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- PostgreSQL (base de datos)
- Cuenta de Gmail (para envío de emails)

## 🚀 Instalación

1. **Clonar el repositorio** (si aplica):

```bash
git clone <url-del-repositorio>
cd API_UADE_BEF_BACK_2025
```

2. **Instalar dependencias**:

```bash
npm install
```

3. **Configurar variables de entorno**:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_bd"

# Puerto del servidor
PORT=3000

# JWT
JWT_SECRET="tu_secreto_jwt_super_seguro"

# Credenciales de Gmail para envío de emails
ACCOUNT_USERNAME="tu_email@gmail.com"
ACCOUNT_PASSWORD="tu_contraseña_de_aplicacion"
```

**Nota**: Para Gmail, necesitas generar una "Contraseña de aplicación" desde tu cuenta de Google.

4. **Configurar la base de datos**:

```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Poblar la base de datos con datos de prueba
npm run poll-bbdd
```

## ⚙️ Configuración

### Variables de Entorno

| Variable           | Descripción                          | Requerido          |
| ------------------ | ------------------------------------ | ------------------ |
| `DATABASE_URL`     | URL de conexión a PostgreSQL         | Sí                 |
| `PORT`             | Puerto donde correrá el servidor     | No (default: 3000) |
| `JWT_SECRET`       | Secreto para firmar tokens JWT       | Sí                 |
| `ACCOUNT_USERNAME` | Email de Gmail para envío de correos | Sí                 |
| `ACCOUNT_PASSWORD` | Contraseña de aplicación de Gmail    | Sí                 |

## 🗄 Modelo de Datos

### User (Usuario)

- `id`: Identificador único (auto-incremental)
- `email`: Email único del usuario
- `username`: Nombre de usuario único
- `password`: Contraseña encriptada
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

### Appointment (Cita Médica)

- `id`: Identificador único (auto-incremental)
- `patient`: Nombre del paciente
- `email`: Email del paciente
- `phone`: Teléfono del paciente
- `insurance_id`: ID del seguro asociado
- `date_time`: Fecha y hora de la cita
- `state`: Estado de la cita (`requested`, `confirmed`, `cancelled`)
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

### Insurance (Seguro)

- `id`: Identificador único (auto-incremental)
- `name`: Nombre único del seguro
- `description`: Descripción del seguro
- `active`: Estado activo/inactivo
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

## 🔌 Endpoints de la API

Todas las rutas están prefijadas con `/api`.

### 🔐 Autenticación (`/api/auth`)

#### POST `/api/auth/register`

Registra un nuevo usuario.

**Body:**

```json
{
  "email": "usuario@example.com",
  "username": "usuario123",
  "password": "Password123!"
}
```

**Respuesta exitosa (201):**

```json
{
  "id": 1,
  "email": "usuario@example.com",
  "username": "usuario123",
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

#### POST `/api/auth`

Inicia sesión y obtiene un token JWT.

**Body:**

```json
{
  "username": "usuario123",
  "password": "Password123!"
}
```

**Respuesta exitosa (200):**

```json
{
  "id": 1,
  "username": "usuario123",
  "email": "usuario@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🏥 Seguros (`/api/insurance`)

#### GET `/api/insurance/all`

Obtiene todos los seguros (público, no requiere autenticación).

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "name": "OSDE",
    "description": "Obra Social de Empresas",
    "active": true
  }
]
```

#### GET `/api/insurance/:id`

Obtiene un seguro por su ID.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**

```json
{
  "id": 1,
  "name": "OSDE",
  "description": "Obra Social de Empresas",
  "active": true
}
```

#### GET `/api/insurance?name=nombre`

Busca un seguro por nombre.

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

- `name`: Nombre del seguro a buscar

#### POST `/api/insurance`

Crea un nuevo seguro.

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "name": "Swiss Medical",
  "description": "Seguro médico privado"
}
```

#### PUT `/api/insurance/:id`

Actualiza un seguro existente.

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "name": "Swiss Medical",
  "description": "Seguro médico privado actualizado",
  "active": true
}
```

#### PATCH `/api/insurance/:id/activate`

Activa un seguro.

**Headers:**

```
Authorization: Bearer <token>
```

#### PATCH `/api/insurance/:id/deactivate`

Desactiva un seguro.

**Headers:**

```
Authorization: Bearer <token>
```

#### DELETE `/api/insurance/:id`

Elimina un seguro.

**Headers:**

```
Authorization: Bearer <token>
```

---

### 📅 Citas Médicas (`/api/appointment`)

#### GET `/api/appointment/all`

Obtiene todas las citas médicas.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "patient": "Juan Pérez",
    "phone": "+5491123456789",
    "email": "juan@example.com",
    "state": "requested",
    "insurance": {
      "id": 1,
      "name": "OSDE",
      "description": "Obra Social de Empresas",
      "active": true
    },
    "date": "2025-01-20",
    "time": "10:00"
  }
]
```

#### GET `/api/appointment/:id`

Obtiene una cita médica por su ID.

**Headers:**

```
Authorization: Bearer <token>
```

#### POST `/api/appointment`

Crea una nueva cita médica (público, no requiere autenticación).

**Body:**

```json
{
  "patient": "Juan Pérez",
  "phone": "+5491123456789",
  "email": "juan@example.com",
  "date_time": "2025-01-20T10:00:00-03:00",
  "state": "requested",
  "insurance": {
    "id": 1
  }
}
```

**Respuesta exitosa (201):**

```json
{
  "id": 1,
  "patient": "Juan Pérez",
  "phone": "+5491123456789",
  "email": "juan@example.com",
  "state": "requested",
  "insurance": {
    "id": 1,
    "name": "OSDE",
    "description": "Obra Social de Empresas",
    "active": true
  },
  "date": "2025-01-20",
  "time": "10:00"
}
```

#### PUT `/api/appointment/:id`

Actualiza una cita médica existente.

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "patient": "Juan Pérez",
  "phone": "+5491123456789",
  "email": "juan@example.com",
  "date_time": "2025-01-20T11:00:00-03:00",
  "state": "confirmed",
  "insurance": {
    "id": 1
  }
}
```

#### PATCH `/api/appointment/:id/confirm`

Confirma una cita médica (cambia el estado a `confirmed`).

**Headers:**

```
Authorization: Bearer <token>
```

#### PATCH `/api/appointment/:id/cancel`

Cancela una cita médica (cambia el estado a `cancelled`).

**Headers:**

```
Authorization: Bearer <token>
```

#### DELETE `/api/appointment/:id`

Elimina una cita médica.

**Headers:**

```
Authorization: Bearer <token>
```

## 🔒 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para la autenticación. Para acceder a endpoints protegidos, debes incluir el token en el header `Authorization`:

```
Authorization: Bearer <tu_token_jwt>
```

### Flujo de Autenticación

1. **Registro**: El usuario se registra con email, username y password
2. **Login**: El usuario inicia sesión y recibe un token JWT
3. **Acceso**: El usuario incluye el token en las peticiones a endpoints protegidos

### Endpoints Protegidos

La mayoría de los endpoints requieren autenticación, excepto:

- `POST /api/auth/register`
- `POST /api/auth`
- `GET /api/insurance/all`
- `POST /api/appointment`

## 📜 Scripts Disponibles

```bash
# Desarrollo (con watch mode)
npm run dev

# Poblar base de datos con datos de prueba
npm run poll-bbdd

# Limpiar base de datos
npm run clean-bbdd

# Linter
npm run lint

# Linter con auto-fix
npm run lint:fix

# Formatear código
npm run format
```

## 💡 Ejemplos de Uso

### Ejemplo 1: Registro y Login

```bash
# 1. Registrar un nuevo usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "username": "usuario123",
    "password": "Password123!"
  }'

# 2. Iniciar sesión
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "password": "Password123!"
  }'
```

### Ejemplo 2: Crear una Cita Médica

```bash
curl -X POST http://localhost:3000/api/appointment \
  -H "Content-Type: application/json" \
  -d '{
    "patient": "María García",
    "phone": "+5491123456789",
    "email": "maria@example.com",
    "date_time": "2025-01-25T14:30:00-03:00",
    "state": "requested",
    "insurance": {
      "id": 1
    }
  }'
```

### Ejemplo 3: Obtener Todas las Citas (Requiere Autenticación)

```bash
curl -X GET http://localhost:3000/api/appointment/all \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Ejemplo 4: Confirmar una Cita

```bash
curl -X PATCH http://localhost:3000/api/appointment/1/confirm \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Ejemplo 5: Crear un Seguro

```bash
curl -X POST http://localhost:3000/api/insurance \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Medicus",
    "description": "Plan de salud privado"
  }'
```

## 🔍 Validaciones

### Usuario

- **Email**: Debe ser un email válido
- **Username**: 3-50 caracteres, solo letras, números y guiones bajos
- **Password**: Mínimo 6 caracteres, debe contener al menos una letra mayúscula, una minúscula y un número

### Cita Médica

- **Patient**: 2-150 caracteres, solo letras y espacios
- **Phone**: Formato de teléfono válido
- **Email**: Debe ser un email válido
- **date_time**: Debe ser una fecha/hora válida en formato ISO 8601

### Seguro

- **Name**: 3-50 caracteres
- **Description**: 3-255 caracteres (opcional)

## 🐛 Manejo de Errores

La API devuelve errores en formato JSON:

```json
{
  "error": "Mensaje de error descriptivo",
  "statusCode": 400
}
```

### Códigos de Estado HTTP

- `200`: Éxito
- `201`: Creado exitosamente
- `400`: Solicitud incorrecta (validación fallida)
- `401`: No autorizado (token inválido o faltante)
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

## 📝 Notas Adicionales

- Las contraseñas se encriptan usando bcrypt antes de almacenarse
- Los tokens JWT expiran después de un tiempo determinado (configurable)
- El envío de emails se realiza mediante Gmail usando nodemailer
- Las fechas se manejan con moment-timezone para soporte de zonas horarias
- La API utiliza Prisma Accelerate para optimización de consultas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado para UADE - 2025**
