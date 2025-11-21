# 🏆 AyaxBoard - Sistema de Clasificación de Competición

Sistema de gestión y clasificación para competiciones de gimnasio desarrollado con Next.js, React y TypeScript. Permite registrar atletas, gestionar ejercicios y visualizar rankings en tiempo real.

## 📋 Características

- ✅ **Gestión de Atletas**: Registro completo con datos personales y ejercicios
- ✅ **Gestión de Ejercicios**: CRUD de ejercicios disponibles
- ✅ **Leaderboard Dinámico**: Rankings automáticos por categoría y género
- ✅ **Estadísticas en Tiempo Real**: Contadores y promedios actualizados
- ✅ **Persistencia Local**: Datos guardados en LocalStorage del navegador
- ✅ **Tema Claro/Oscuro**: Soporte para modo claro, oscuro y sistema
- ✅ **Interfaz Responsive**: Diseño adaptativo para móviles y desktop

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **pnpm** (gestor de paquetes) - Se instalará automáticamente si no lo tienes

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd ayaxBoard
```

### 2. Instalar pnpm (si no lo tienes)

```bash
npm install -g pnpm
```

### 3. Instalar dependencias

```bash
pnpm install
```

Este comando instalará todas las dependencias necesarias del proyecto.

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Modo Producción

Para construir y ejecutar en modo producción:

```bash
# Construir el proyecto
pnpm build

# Iniciar el servidor de producción
pnpm start
```

### Linting

Para verificar el código:

```bash
pnpm lint
```

## 📖 Modo de Uso

### 1. Gestión de Ejercicios

1. Ve a la pestaña **"Ejercicios"**
2. Ingresa el nombre del ejercicio en el formulario
3. Haz clic en **"Guardar Ejercicio"**
4. Los ejercicios aparecerán en la lista a la derecha
5. Puedes eliminar ejercicios haciendo clic en el icono de basura

### 2. Registro de Atletas

1. Ve a la pestaña **"Nuevo Atleta"**
2. Completa los datos personales:
   - Nombre y Apellido
   - Categoría de edad (Adultos/Niños)
   - Género (Masculino/Femenino)
   - Cédula de Identidad
   - Edad
   - Gimnasio
   - Ciudad
3. (Opcional) Agrega ejercicios y repeticiones:
   - Haz clic en **"Agregar Ejercicio"**
   - Selecciona el ejercicio y ingresa las repeticiones
   - Puedes agregar múltiples ejercicios
4. Haz clic en **"Registrar Atleta"**
5. Verás una notificación de confirmación

### 3. Lista de Atletas

1. Ve a la pestaña **"Lista Atletas"**
2. Visualiza todos los atletas registrados
3. Puedes:
   - **Editar**: Haz clic en el botón "Editar" para modificar datos
   - **Eliminar**: Haz clic en el botón "Eliminar" (con confirmación)

### 4. Leaderboard (Clasificación)

1. Ve a la pestaña **"Puntuaciones"**
2. El leaderboard se actualiza automáticamente con:
   - Rankings por categoría (Adultos/Niños)
   - Rankings por género (Masculino/Femenino)
   - Top 10 atletas por categoría
3. Los atletas se ordenan por total de repeticiones

### 5. Estadísticas

En la parte superior verás tarjetas con:
- **Total de Atletas**: Número de atletas registrados
- **Puntuación Media**: Promedio de repeticiones totales

### 6. Cambio de Tema

1. Haz clic en el icono de sol/luna en la esquina superior derecha
2. Selecciona:
   - **Claro**: Tema claro
   - **Oscuro**: Tema oscuro
   - **Sistema**: Sigue la preferencia de tu sistema operativo

## 💾 Almacenamiento de Datos

Los datos se guardan automáticamente en el **LocalStorage** del navegador. Esto significa:

- ✅ Los datos persisten al recargar la página
- ✅ No se pierden al cerrar el navegador
- ⚠️ Los datos son específicos del navegador y dispositivo
- ⚠️ Si limpias el cache del navegador, se perderán los datos

### Estructura de Datos

Los datos se almacenan con las siguientes claves:
- `ayax-exercises`: Lista de ejercicios
- `ayax-athletes`: Lista de atletas registrados

## 🏗️ Estructura del Proyecto

```
ayaxBoard/
├── app/                    # Páginas y layout de Next.js
│   ├── layout.tsx          # Layout principal con providers
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/             # Componentes React
│   ├── athlete-form.tsx    # Formulario de registro de atletas
│   ├── athletes-list.tsx   # Lista de atletas
│   ├── exercise-form.tsx   # Formulario de ejercicios
│   ├── leaderboard-table.tsx # Tabla de clasificación
│   ├── leaderboard-header.tsx # Header con título
│   ├── stats-cards.tsx     # Tarjetas de estadísticas
│   ├── theme-toggle.tsx    # Toggle de tema
│   └── ui/                 # Componentes UI reutilizables
├── contexts/               # Context API
│   └── app-context.tsx     # Contexto global de la aplicación
├── lib/                    # Utilidades y hooks
│   ├── use-local-storage.ts # Hook para LocalStorage
│   └── utils.ts            # Funciones utilitarias
├── public/                 # Archivos estáticos
└── package.json            # Dependencias del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 16**: Framework React con SSR
- **React 19**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS 4**: Estilos utilitarios
- **Radix UI**: Componentes accesibles
- **next-themes**: Gestión de temas
- **sonner**: Notificaciones toast
- **LocalStorage**: Persistencia de datos

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Construye la aplicación para producción |
| `pnpm start` | Inicia el servidor de producción |
| `pnpm lint` | Ejecuta el linter de código |

## 🔧 Configuración

### Variables de Entorno

Actualmente el proyecto no requiere variables de entorno. Todos los datos se almacenan localmente en el navegador.

## 🐛 Solución de Problemas

### Error de hidratación

Si ves errores de hidratación en la consola, es normal durante el desarrollo. El proyecto está configurado para manejar estos casos.

### Los datos no persisten

Asegúrate de que:
- No estés en modo incógnito (algunos navegadores bloquean LocalStorage)
- No hayas limpiado el cache del navegador
- El navegador soporta LocalStorage

### El servidor no inicia

1. Verifica que el puerto 3000 no esté en uso
2. Asegúrate de haber ejecutado `pnpm install`
3. Verifica que Node.js esté instalado correctamente

## 📄 Licencia

Este proyecto es privado.

## 👤 Autor

Desarrollado para Juegos AYAX 4.0

---

**Nota**: Este proyecto utiliza LocalStorage para almacenamiento. Para un entorno de producción con múltiples usuarios, se recomienda implementar una base de datos backend.

