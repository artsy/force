import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { render } from "@testing-library/react"
import { createRef } from "react"

jest.mock("Utils/Hooks/useDidMount")
jest.mock("Utils/Hooks/useIntersectionObserver")

describe("SystemQueryRenderer", () => {
  const getWrapper = (props = {}) => {
    return render(
      <SystemQueryRenderer
        query={null}
        render={null as any} // we don't need to test underlying QueryRenderer
        environment={true as any}
        {...props}
      />,
    )
  }

  const mockuseDidMount = useDidMount as jest.Mock
  const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock

  beforeAll(() => {
    mockUseIntersectionObserver.mockImplementation(() => ({
      ref: createRef(),
    }))
  })

  it("doesn't return anything if environment is null", () => {
    const { container } = getWrapper({ environment: null })
    expect(
      container.querySelector(
        '[data-testid="QueryRenderer"], [class*="QueryRenderer"]',
      ),
    ).toBeNull()
  })

  it("does not render if not mounted on client", () => {
    mockuseDidMount.mockImplementation(() => false)
    const { container } = getWrapper()
    expect(
      container.querySelector(
        '[data-testid="QueryRenderer"], [class*="QueryRenderer"]',
      ),
    ).toBeNull()
  })

  it("renders a placeholder if provided", () => {
    const { container } = getWrapper({ placeholder: <>placeholder</> })
    expect(container.textContent).toContain("placeholder")
  })

  it("renders a placeholder if debugPlaceholder is true", () => {
    mockuseDidMount.mockImplementation(() => true)
    const { container } = getWrapper({
      debugPlaceholder: true,
      placeholder: <>placeholder</>,
    })
    expect(container.textContent).toContain("placeholder")
  })

  it("renders a QueryRenderer", () => {
    mockuseDidMount.mockImplementation(() => true)
    const { container } = getWrapper()
    // QueryRenderer from react-relay doesn't have specific class names,
    // so we check if any content is rendered when it should be
    expect(container.children.length).toBeGreaterThan(0)
  })

  describe("lazyLoad = true", () => {
    it("inserts a sentinel if the placeholder does not forward ref", () => {
      const { container } = getWrapper({
        placeholder: <>lazyload placeholder</>,
        lazyLoad: true,
      })
      expect(container.querySelector("span")).toBeTruthy()
      expect(container.textContent).toContain("lazyload placeholder")
      expect(
        container.querySelector(
          '[data-testid="QueryRenderer"], [class*="QueryRenderer"]',
        ),
      ).toBeNull()
    })

    it("renders if isEnteredView is true", async () => {
      mockuseDidMount.mockImplementation(() => true)

      let called = false
      mockUseIntersectionObserver.mockImplementation(({ onIntersection }) => {
        if (!called) {
          onIntersection()
          called = true
        }
        return { ref: createRef() }
      })

      const { container } = getWrapper({
        placeholder: <>lazyload placeholder</>,
        lazyLoad: true,
      })

      await flushPromiseQueue()

      // QueryRenderer from react-relay doesn't have specific class names,
      // so we check if the lazy load placeholder is no longer shown
      expect(container.textContent).not.toContain("lazyload placeholder")
    })
  })
})
