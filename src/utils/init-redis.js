const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("connecting to redis"));
redisClient.on("ready", () => console.log("redis is ready to use"));
redisClient.on("err", (err) => console.log(err));
redisClient.on("end", () => console.log("redis connection closed"));

module.exports = redisClient;
