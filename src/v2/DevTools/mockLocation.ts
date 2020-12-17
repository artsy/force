/**
 * Writable window.location for use in Jest tests
 */
export const mockLocation = (options: Partial<Location> = {}) => {
  Object.defineProperty(window, "location", {
    value: {
      assign: jest.fn(),
      pathname: "/",
      ...options,
    },
    writable: true,
  })
}
