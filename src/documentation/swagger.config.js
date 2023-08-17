const { allDocsServers } = require("./swagger.servers");

const swaggerConfig = {
  info: {
    title: "authentication",
    version: "3.0.0",
    description: "authentication apis",
  },
  servers: allDocsServers,
};


module.exports = {
  swaggerConfig,
};
