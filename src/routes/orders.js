import express from 'express'
import { ordersCounter } from '../metrics/metrics.js'
import { trace } from '@opentelemetry/api'

const router = express.Router()
const tracer = trace.getTracer('observability-lab')

router.post('/', (req, res) => {
  const span = tracer.startSpan('orders_route')
  ordersCounter.add(1, { origin: 'web' })

  setTimeout(() => {
    span.end()
    res.status(201).json({ message: 'Order created' })
  }, 150)
})

export default router
