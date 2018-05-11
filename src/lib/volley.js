import { data as sd } from 'sharify'
import request from 'superagent'

export async function reportLoadTimeToVolley(
  requestStart,
  loadEventEnd,
  domComplete,
  topLevelPath,
  deviceType
) {
  if (sd.VOLLEY_ENDPOINT) {
    return await request.post(sd.VOLLEY_ENDPOINT).send({
      serviceName: 'force',
      metrics: [
        {
          type: 'timing',
          name: 'load-time',
          timing: domComplete - requestStart,
          tags: [
            `page-type:${topLevelPath}`,
            `device-type:${deviceType}`,
            'mark:dom-complete',
          ],
        },
        {
          type: 'timing',
          name: 'load-time',
          timing: loadEventEnd - requestStart,
          tags: [
            `page-type:${topLevelPath}`,
            `device-type:${deviceType}`,
            'mark:load-event-end',
          ],
        },
      ],
    })
  }
}
