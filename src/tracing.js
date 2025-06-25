import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'

// Ativar logs de diagnóstico se necessário
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR)

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces'
})

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
})

sdk.start()
