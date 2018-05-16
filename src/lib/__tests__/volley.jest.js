const mockSend = jest.fn()
jest.mock('superagent', () => ({
  post() {
    return {
      send: mockSend,
    }
  },
}))
jest.mock('sharify', () => ({
  data: {
    VOLLEY_ENDPOINT: 'http://volley',
  },
}))

import { reportLoadTimeToVolley } from '../volley'

describe('Reporting metrics to Volley', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('reports valid metrics', () => {
    reportLoadTimeToVolley(10, 15, 20, '', 'desktop')
    expect(mockSend.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        serviceName: 'force',
        metrics: [
          {
            type: 'timing',
            name: 'load-time',
            timing: 10,
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
          },
          {
            type: 'timing',
            name: 'load-time',
            timing: 5,
            tags: [`page-type:`, `device-type:desktop`, `mark:load-event-end`],
          },
        ],
      })
    )
  })

  it('omits an invalid metric', () => {
    reportLoadTimeToVolley(10, null, 20, '', 'desktop')
    expect(mockSend.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        serviceName: 'force',
        metrics: [
          {
            type: 'timing',
            name: 'load-time',
            timing: 10,
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
          },
        ],
      })
    )
  })

  it("doesn't send anything if called with no valid data", () => {
    reportLoadTimeToVolley(null, 10, 20, '', 'desktop')
    expect(mockSend.mock.calls.length).toBe(0)
  })
})
