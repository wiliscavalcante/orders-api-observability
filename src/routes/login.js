import express from 'express'
import { loginCounter } from '../metrics/metrics.js'
import { trace } from '@opentelemetry/api'

const router = express.Router()
const tracer = trace.getTracer('observability-lab')

router.post('/', (req, res) => {
  const span = tracer.startSpan('login_route')
  loginCounter.add(1, { user_type: 'standard' })

  // Simulação de autenticação
  setTimeout(() => {
    span.end()
    res.status(200).json({ message: 'Login successful' })
  }, 100)
})

export default router
