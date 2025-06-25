const pino = require('pino');
const { v4: uuidv4 } = require('uuid');
 
const logger = pino();
 
function createRequestLogger(req, res, next) {
  req.trace_id = uuidv4();
  req.log = logger.child({ trace_id: req.trace_id });
  next();
}
 
module.exports = { logger, createRequestLogger };
 
