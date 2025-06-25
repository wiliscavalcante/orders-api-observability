const express = require('express');
const bodyParser = require('body-parser');
const { createRequestLogger } = require('./logger');
const routes = require('./routes');
const { client } = require('./metrics');
const setupSwagger = require('./swagger');
 
const app = express();
const port = 3000;
 
app.use(bodyParser.json());
app.use(createRequestLogger);
 
setupSwagger(app);
app.use('/', routes);
 
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
 
app.listen(port, () => {
console.log(`Orders API running at http://localhost:${port}`);
});
