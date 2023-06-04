const redis = require("redis");

//Creamos la conexión al cliente de redis
//Para que esto funcione hay que tener instalado el servidor de redis: https://redis.io/docs/getting-started/installation/install-redis-on-windows/
const client = redis.createClient();
client.connect()
.then(async (res) => {
    console.log("Connected to redis client!");
})
.catch((err) => {
    console.log("Error connecting to redis client: ", err);
})

module.exports = client;