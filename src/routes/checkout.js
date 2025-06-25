import express from 'express'
import { checkoutValueSum } from '../metrics/metrics.js'
import { trace } from '@opentelemetry/api'

const router = express.Router()
const tracer = trace.getTracer('observability-lab')

router.post('/', (req, res) => {
  const span = tracer.startSpan('checkout_route')
  const { amount } = req.body

  if (typeof amount !== 'number') {
    span.setAttribute('error', true)
    span.end()
    return res.status(400).json({ error: 'Amount is required and must be a number' })
  }

  checkoutValueSum.record(amount, { currency: 'BRL' })

  setTimeout(() => {
    span.end()
    res.status(200).json({ message: 'Checkout complete', amount })
  }, 200)
})

export default router
