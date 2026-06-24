# 🐾 PetRadar API

¡Bienvenido/a a **PetRadar**! 🐶🐱 
Este es un proyecto académico de geolocalización desarrollado para la **Universidad La Salle Bajío**. Su propósito es conectar de manera rápida y eficiente a dueños de mascotas perdidas con personas de la comunidad que las han rescatado o visto.

---

## 💌 Mensaje Especial para el Profe Juan de Dios

> ¡Hola, profe Juan de Dios! 👋
> 
> Quiero aprovechar este espacio para darle un agradecimiento enorme por habernos dado clase a lo largo de este tiempo, por su paciencia y por todo lo que nos enseñó ahora que ya va a tomar nuevos caminos. ¡De verdad se le va a extrañar muchísimo en las aulas!
> 
> Y bueno... también quería pedirle una disculpota enorme porque el último proyecto de plano no me salió como esperaba 😅 (cosas que pasan en el código, jaja), pero le metí todo el corazón y esfuerzo a este proyecto para dejar los templates de email impecables y el sistema funcionando al 100%.
> 
> ¡Le deseo el mayor de los éxitos en todo lo que venga en su futuro profesional y personal! Un abrazo fuerte. 🤗✨

---

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido con un stack moderno y eficiente:
- **Framework:** [NestJS](https://nestjs.com/) + TypeScript 🚀
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) con soporte espacial **PostGIS** 🗺️
- **Caché:** [Redis](https://redis.io/) para optimizar búsquedas frecuentes ⚡
- **Mapas:** Integración con [Mapbox](https://www.mapbox.com/) para generar imágenes estáticas de ubicación 📍
- **Correos:** [Nodemailer](https://nodemailer.com/) con plantillas personalizadas responsivas y en tonos pasteles amigables 📧

---

## 📁 Estructura del Proyecto

Las partes más importantes del proyecto se distribuyen de la siguiente forma:
- `src/lost-pets/`: Registro, consulta y notificaciones de mascotas perdidas.
  - [lost-pet-email.template.ts](file:///c:/Users/Pauis/Documents/sexto_semestrw/geo/POrozco-PetsRadar-main/POrozco-PetsRadar-main/src/lost-pets/templates/lost-pet-email.template.ts): Plantilla responsiva para reportes de extravío (diseño cálido tono durazno 🍑).
- `src/found-pets/`: Registro y control de mascotas encontradas/rescatadas.
  - [found-pet-email.template.ts](file:///c:/Users/Pauis/Documents/sexto_semestrw/geo/POrozco-PetsRadar-main/POrozco-PetsRadar-main/src/found-pets/templates/found-pet-email.template.ts): Plantilla responsiva para mascotas rescatadas (diseño tierno tono verde menta/salvia 🌿).
- `src/core/`: Entidades de la base de datos (TypeORM), interfaces de datos y utilidades.
- `src/email/`: Servicio general de envíos de email.

---

## 🚀 Configuración y Ejecución

La forma más rápida y recomendada de levantar el entorno de desarrollo es utilizando **Docker Compose**.

### Requisitos Previos
- Tener instalado [Docker](https://www.docker.com/) y Docker Compose.
- Un archivo `.env` configurado en la raíz del proyecto (puedes tomar como referencia las variables del `.env` actual).

### Levantar la Aplicación

1. **Iniciar contenedores:**
   ```bash
   docker compose up --build
   ```
   Esto levantará automáticamente PostgreSQL (con PostGIS), Redis y la aplicación NestJS.

2. **Ejecutar Migraciones:**
   La base de datos se inicializa automáticamente y ejecuta las migraciones de TypeORM durante el arranque del contenedor. Si necesitas correrlas manualmente local:
   ```bash
   npm run migration:run
   ```

### Desarrollo Local (Alternativo)

Si prefieres ejecutar el servidor de NestJS de forma local en tu máquina:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor en modo desarrollo (watch mode):**
   ```bash
   npm run start:dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🧪 Pruebas y Calidad de Código

- **Ejecutar pruebas unitarias:**
  ```bash
  npm run test
  ```
- **Formatear el código (Prettier):**
  ```bash
  npm run format
  ```
