import { data as sd } from 'sharify'
import request from 'superagent'

function metricPayload(pageType, deviceType, name, start, end) {
  return start > 0 && end > 0 && end - start > 0
    ? {
        type: 'timing',
        name: 'load-time',
        timing: end - start,
        tags: [
          `page-type:${pageType}`,
          `device-type:${deviceType}`,
          `mark:${name}`,
        ],
      }
    : null
}

export async function reportLoadTimeToVolley(
  requestStart,
  loadEventEnd,
  domComplete,
  pageType,
  deviceType
) {
  if (sd.VOLLEY_ENDPOINT) {
    const metrics = [
      metricPayload(
        pageType,
        deviceType,
        'dom-complete',
        requestStart,
        domComplete
      ),
      metricPayload(
        pageType,
        deviceType,
        'load-event-end',
        requestStart,
        loadEventEnd
      ),
    ].filter(metric => metric != null)

    if (metrics.length > 0) {
      return await request.post(sd.VOLLEY_ENDPOINT).send({
        serviceName: 'force',
        metrics,
      })
    }
  }
}
