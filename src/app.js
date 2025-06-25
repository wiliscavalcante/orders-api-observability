import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../swagger.json' assert { type: "json" }
import './tracing.js'
import { meter, getMetricsSnapshot } from './metrics/metrics.js'
import loginRouter from './routes/login.js'
import ordersRouter from './routes/orders.js'
import checkoutRouter from './routes/checkout.js'

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use('/login', loginRouter)
app.use('/orders', ordersRouter)
app.use('/checkout', checkoutRouter)

app.get('/debug-metrics', async (req, res) => {
  const snapshot = await getMetricsSnapshot()
  res.json(snapshot)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Observability Lab App running on port ${port}`)
})
