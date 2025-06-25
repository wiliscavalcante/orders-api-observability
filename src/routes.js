const express = require('express');
const router = express.Router();
const {
  httpRequestCounter,
  httpDurationHistogram,
  orderCreatedCounter,
  checkoutSuccessCounter,
  userLoginCounter
} = require('./metrics');
 
/**
* Simula erro com base no campo "simulate"
*/
function simulateError(simulate, res, route, method, log, payload) {
  const statusMap = {
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Server Error'
  };
  if (statusMap[simulate]) {
    const statusCode = parseInt(simulate);
    log.error({ msg: statusMap[simulate], route, statusCode, payload });
httpRequestCounter.inc({ method, route, statusCode });
    return res.status(statusCode).json({ error: statusMap[simulate] });
  }
  return null;
}
 
/**
* @swagger
* /login:
*   post:
*     summary: Simula login de usuário
*     requestBody:
*       required: false
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               simulate:
*                 type: string
*                 description: 'Código HTTP a simular (ex: 401, 500)'
*                 example: '401'
*     responses:
*       200:
*         description: Login com sucesso
*/
router.post('/login', (req, res) => {
  const end = httpDurationHistogram.startTimer();
  const { simulate } = req.body;
  const route = '/login';
 
  if (simulate) {
    const result = simulateError(simulate, res, route, req.method, req.log, req.body);
    if (result) return;
  }
 
userLoginCounter.inc();
req.log.info({ msg: 'Login realizado com sucesso', route, statusCode: 200, payload: req.body });
httpRequestCounter.inc({ method: req.method, route, statusCode: 200 });
  end({ method: req.method, route });
  res.status(200).json({ success: true });
});
 
/**
* @swagger
* /orders:
*   post:
*     summary: Cria um pedido
*     requestBody:
*       required: false
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               simulate:
*                 type: string
*                 description: 'Código HTTP a simular (ex: 400, 500)'
*                 example: '500'
*     responses:
*       200:
*         description: Pedido criado com sucesso
*/
router.post('/orders', (req, res) => {
  const end = httpDurationHistogram.startTimer();
  const { simulate } = req.body;
  const route = '/orders';
 
  if (simulate) {
    const result = simulateError(simulate, res, route, req.method, req.log, req.body);
    if (result) return;
  }
 
orderCreatedCounter.inc();
req.log.info({ msg: 'Pedido criado', route, statusCode: 200, payload: req.body });
httpRequestCounter.inc({ method: req.method, route, statusCode: 200 });
  end({ method: req.method, route });
  res.status(200).json({ orderId: 'abc123' });
});
 
/**
* @swagger
* /checkout:
*   post:
*     summary: Finaliza o pedido (checkout)
*     requestBody:
*       required: false
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               simulate:
*                 type: string
*                 description: 'Código HTTP a simular (ex: 403, 500)'
*                 example: '403'
*     responses:
*       200:
*         description: Checkout realizado com sucesso
*/
router.post('/checkout', (req, res) => {
  const end = httpDurationHistogram.startTimer();
  const { simulate } = req.body;
  const route = '/checkout';
 
  if (simulate) {
    const result = simulateError(simulate, res, route, req.method, req.log, req.body);
    if (result) return;
  }
 
checkoutSuccessCounter.inc();
req.log.info({ msg: 'Checkout concluído', route, statusCode: 200, payload: req.body });
httpRequestCounter.inc({ method: req.method, route, statusCode: 200 });
  end({ method: req.method, route });
  res.status(200).json({ success: true });
});
 
/**
* @swagger
* /health:
*   get:
*     summary: Verifica se a aplicação está no ar
*     responses:
*       200:
*         description: OK
*/
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});
 
module.exports = router;
