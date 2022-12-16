/**
 * test utility to wait for all promises to be resolved
 */
export function flushPromiseQueue() {
  return new Promise(r => jest.requireActual("timers").setTimeout(r, 0))
}
