/**
 * Writable window.location for use in Jest tests
 */
export const mockLocation = (options: Partial<Location> = {}) => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: {
      assign: jest.fn(),
      pathname: "/",
      ...options,
    },
  })
}

export const resetMockLocation = () => {
  (window.location.assign as any).mockReset();
}
