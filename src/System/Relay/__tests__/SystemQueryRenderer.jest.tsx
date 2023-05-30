import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { mount } from "enzyme"
import { createRef } from "react"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"

jest.mock("Utils/Hooks/useDidMount")
jest.mock("Utils/Hooks/useIntersectionObserver")

describe("SystemQueryRenderer", () => {
  const getWrapper = (props = {}) => {
    return mount(
      <SystemQueryRenderer
        query={null}
        render={null as any} // we don't need to test underlying QueryRenderer
        environment={true as any}
        {...props}
      />
    )
  }

  let mockuseDidMount = useDidMount as jest.Mock
  let mockUseIntersectionObserver = useIntersectionObserver as jest.Mock

  beforeAll(() => {
    mockUseIntersectionObserver.mockImplementation(() => ({
      ref: createRef(),
    }))
  })

  it("doesn't return anything if environment is null", () => {
    const wrapper = getWrapper({ environment: null })
    expect(wrapper.find("QueryRenderer").length).toBe(0)
  })

  it("does not render if not mounted on client", () => {
    mockuseDidMount.mockImplementation(() => false)
    const wrapper = getWrapper()
    expect(wrapper.find("QueryRenderer").length).toBe(0)
  })

  it("renders a placeholder if provided", () => {
    const wrapper = getWrapper({ placeholder: <>placeholder</> })
    expect(wrapper.text()).toContain("placeholder")
  })

  it("renders a placeholder if debugPlaceholder is true", () => {
    mockuseDidMount.mockImplementation(() => true)
    const wrapper = getWrapper({
      debugPlaceholder: true,
      placeholder: <>placeholder</>,
    })
    expect(wrapper.text()).toContain("placeholder")
  })

  it("renders a QueryRenderer", () => {
    mockuseDidMount.mockImplementation(() => true)
    const wrapper = getWrapper()
    expect(wrapper.find("QueryRenderer").length).toBe(1)
  })

  describe("lazyLoad = true", () => {
    it("inserts a sentinel if the placeholder does not forward ref", () => {
      const wrapper = getWrapper({
        placeholder: <>lazyload placeholder</>,
        lazyLoad: true,
      })
      expect(wrapper.find("span").length).toBe(1)
      expect(wrapper.text()).toContain("lazyload placeholder")
      expect(wrapper.find("QueryRenderer").length).toBe(0)
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

      const wrapper = getWrapper({
        placeholder: <>lazyload placeholder</>,
        lazyLoad: true,
      })

      await flushPromiseQueue()

      expect(wrapper.find("QueryRenderer").length).toBe(1)
    })
  })
})
