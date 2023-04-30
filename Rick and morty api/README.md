# Class Activity - Docker Compose & NodeJS
## Contenidos:
### Primera parte de la actividad:
- Implementar DotEnv para las credenciales de la base de datos **(Si lo hicimos pero no lo incluímos en el repo por seguridad)**
- Crear rutas y vistas para **Locations** y para **Episodes**
- Implementar un **SignUp**

### Segunda parte de la actividad:
- Construir las imágenes del servidor web y de la base de datos en Docker, así como su contenedor
- Hacer que la página web corrá a través del comando ``` docker-compose up ```

## Consideraciones
## Base de datos
MySql esta medio extraño en docker, y tiene algunos quirks, los relevantes a esta actividad son:

### Error 1:
```bash
Access denied for user 'root'@'localhost' (using password: YES)
```
Este error aparece cuando la base de datos tarda mucho tiempo en iniciar y la página web no puede acceder a ella, la solución es solamente volver a ejecutar el contenedor de docker con el comando ``` docker-compose up ```, una vez ejecutado esto la página web debería de funcionar como tal. 

Busque varias soluciones para este problema pero ninguna parece funcionar, por lo cuál me quedé con este "workaround".

### Error 2:
```bash
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
Este error puede llegar a ocurrir si se está utilizando la libreria de Node ``` mysql ```, la solución es cambiar esta libreria por ``` mysql2 ``` ejecutando el comando ``` npm i mysql2 ```. Este error ocurre ya que el método de autenticación que utilizamos no funciona en versiones recientes de MySQL, los usuarios de mysql recomiendan siempre utilizar la librería mysql2 para evitar tener que modificar permisos en la configuración de MySQL. 

Una vez instalamos la nueva librería hay que borrar el contenedor a través del comando ``` docker-compose rm ``` y subsecuentemente borrar los volúmenes actuales relevantes al contenedor de docker.


## Página web
### Error 1:
**Middleware no funcional en Docker** 

Este es un error bastante extraño que me encontré al hacer la actividad, cuando se contruía la imágen de docker de la página web y de la base de datos y se ejecutaba en el ```localhost:4000/signin ``` el middleware dejaba de funcionar, especialmente **flash** y **passport**, este error solamente salía si la DB estaba en docker, si la DB estaba local y la página web en docker el error no ocurría. 

No estoy seguro que arreglo este error, pero lo que hice fue:
- Ejecutar la página en modo incognito
- Borrar el contenedor y sus volúmenes
- Re construir el contenedor a través del comando ``` docker compose build --no-cache ``` y ``` docker-compose up ```

Y esto parece haber resuelto el error, según usuarios de **StackOverflow** esto se puede deber a un Bug con passport y flash, lo cuál causa que el middleware no funcione a través de toda la página, pero se resolvió con un clásico "apagar y prender".

## Ejecución con Docker
Hay que correr los siguientes comandos dentro del directorio: ../Rick and morty api: 

``` docker compose build --no-cache ```

``` docker-compose up ```

Si se desea correr local sin las imágenes de Docker hay que hacer lo siguiente:
- nevagar al archivo ``` /class/src/keys.js ```
- comentar el código: 
```js
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE
```
- descomentar el código:
```js
host: "localhost",
user: "root",
password: "Madrilenio3141616_]",
database: "itesm502"
```
- Ejecutar el comando ``` npm start ```
