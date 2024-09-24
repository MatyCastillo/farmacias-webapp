# Sistema de Administración de Recetas y Retiros de Medicamentos

Este sistema es una aplicación web dedicada a la administración de pacientes, recetas médicas y retiros de medicamentos en una farmacia. Permite gestionar las recetas médicas de los pacientes, registrar y gestionar retiros, y notificar a los operadores cuando un paciente tiene retiros próximos a vencer.

![farmaciapp](https://github.com/user-attachments/assets/75b8accf-5328-416b-bfd4-ee1bd26fc470)


## **Funcionalidades**

### 1. **Gestión de Pacientes**

- Registro de pacientes en el sistema.
- Relación de pacientes con sus respectivas recetas médicas.
- Búsqueda de pacientes por su DNI.

### 2. **Gestión de Recetas**

- Cada receta tiene un periodo de validez de 30, 60 o 90 días.
- El sistema gestiona automáticamente el número de retiros asociados a cada receta:
  - Receta de 30 días = 1 retiro.
  - Receta de 60 días = 2 retiros.
  - Receta de 90 días = 3 retiros.
- Almacena la imagen de la receta y la medicación asociada.
- Notificaciones de vencimiento para el paciente 10 días antes de cada vencimiento.

### 3. **Historial de Retiros**

- Cada retiro realizado por un paciente es registrado en el sistema, junto con la fecha y la medicación retirada.
- El historial de retiros es accesible para consulta por parte de los operadores.

### 4. **Notificaciones de Vencimiento**

- El sistema calcula las fechas de vencimiento y notifica al operador 10 días antes del vencimiento.
- Si un paciente tiene retiros pendientes, se le notifica de manera adecuada.
- Una vez enviado el recordatorio, la notificación desaparece hasta la próxima fecha de vencimiento si aplica.

### 5. **Eliminar Retiros Pendientes**

- Los retiros se descuentan del total de la receta cuando el paciente retira su medicación.
- El sistema actualiza automáticamente el número de retiros pendientes.

### 6. **Gestión de Personal**

- Registro de pacientes en el sistema.
- Relación de pacientes con sus respectivas recetas médicas.
- Búsqueda de pacientes por su DNI.

## **Estructura del Proyecto**

### **Backend**

- **Modelos**: Contiene funciones para crear recetas, calcular vencimientos, registrar retiros y gestionar las notificaciones.
- **Controladores**: Contiene funciones para registrar, buscar y actualizar los datos de los pacientes.
- **Rutas**: Contiene funciones para registrar, buscar y actualizar los datos de los pacientes.
- **Servicios**: Contiene funciones para registrar, buscar y actualizar los datos de los pacientes.
- **Logs**: Contiene funciones para registrar, buscar y actualizar los datos de los pacientes.

### **Base de Datos**

- **MySQL**

### **Frontend**

- **React + Material UI**: Interfaz gráfica para gestionar pacientes, recetas y retiros.

## **Dependencias**

### **Backend**

1. **Node.js** y **Express**: Servidor backend para manejar las rutas, controladores y lógica de negocio.
2. **MySQL**: Base de datos relacional para almacenar la información de los pacientes, recetas y retiros.
3. **Axios**: Para manejar las solicitudes HTTP en el frontend y backend.
4. **bcryptjs**: Para manejar la seguridad en el almacenamiento de contraseñas de los usuarios (operadores).

### **Frontend**

1. **React.js**: Framework para construir la interfaz de usuario.
2. **Material UI**: Librería de componentes para la interfaz gráfica.
3. **notistack**: Para mostrar notificaciones en la aplicación (uso en los callbacks de las acciones asincrónicas).
4. **Axios**: Para manejar las solicitudes HTTP al backend.
5. **React Router DOM**: Para gestionar las rutas en la aplicación.

### **Dependencias comunes**

1. **dotenv**: Manejo de variables de entorno.
2. **mysql2**: Driver de MySQL para Node.js.
3. **nodemon**: Herramienta de desarrollo para reiniciar automáticamente el servidor backend.
