import { MeterProvider } from '@opentelemetry/sdk-metrics'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR)

const exporter = new OTLPMetricExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/metrics',
})

const meterProvider = new MeterProvider({})
meterProvider.addMetricReader(new PeriodicExportingMetricReader({ exporter, exportIntervalMillis: 1000 }))

export const meter = meterProvider.getMeter('observability-lab')

const ordersCounter = meter.createCounter('business_orders_total', {
  description: 'Total de pedidos criados',
})

const checkoutValueSum = meter.createHistogram('business_checkout_value_sum', {
  description: 'Soma dos valores de checkout',
})

const loginCounter = meter.createCounter('business_login_total', {
  description: 'Total de logins realizados',
})

// Snapshot usado em /debug-metrics
export async function getMetricsSnapshot() {
  return {
    orders_total: ordersCounter['_accumulations']?.size || 0,
    login_total: loginCounter['_accumulations']?.size || 0,
    checkout_value_sum: 'acumulado (não acessível diretamente no SDK)',
  }
}

export { ordersCounter, checkoutValueSum, loginCounter }
