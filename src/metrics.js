const client = require('prom-client');
 
client.collectDefaultMetrics();
 
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'statusCode']
});
 
const httpDurationHistogram = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5]
});
 
const orderCreatedCounter = new client.Counter({
  name: 'order_created_total',
  help: 'Total number of orders created'
});
 
const checkoutSuccessCounter = new client.Counter({
  name: 'checkout_success_total',
  help: 'Total number of successful checkouts'
});
 
const userLoginCounter = new client.Counter({
  name: 'user_login_total',
  help: 'Total number of user logins'
});
 
module.exports = {
  client,
  httpRequestCounter,
  httpDurationHistogram,
  orderCreatedCounter,
  checkoutSuccessCounter,
  userLoginCounter
};
