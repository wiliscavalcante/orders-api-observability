const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Orders API Observability',
      version: '1.0.0',
      description: 'API para simulação de pedidos com instrumentação para Prometheus, logs estruturados e suporte a testes via Swagger.'
    }
  },
  apis: ['./src/routes.js']
};
 
const swaggerSpec = swaggerJsDoc(options);
 
function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
 
module.exports = setupSwagger;
