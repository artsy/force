import { mount } from "enzyme"
import { SystemQueryRenderer } from "../SystemQueryRenderer"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"

jest.mock("v2/Utils/Hooks/useDidMount")
jest.mock("v2/Utils/Hooks/useLazyLoadComponent")

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
  let mockuseLazyLoadComponent = useLazyLoadComponent as jest.Mock

  beforeAll(() => {
    mockuseLazyLoadComponent.mockImplementation(() => ({
      Waypoint: () => <div />,
      isEnteredView: false,
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
    it("injects a <Waypoint />", () => {
      const wrapper = getWrapper({
        placeholder: <>lazyload placeholder</>,
        lazyLoad: true,
      })
      expect(wrapper.find("Waypoint").length).toBe(1)
      expect(wrapper.text()).toContain("lazyload placeholder")
      expect(wrapper.find("QueryRenderer").length).toBe(0)
    })

    it("renders if isEnteredView is true", () => {
      mockuseLazyLoadComponent.mockImplementation(() => ({
        Waypoint: () => <div />,
        isEnteredView: true,
      }))
      const wrapper = getWrapper({
        placeholder: <>lazyload placeholder</>,
        lazyLoad: true,
      })
      expect(wrapper.find("QueryRenderer").length).toBe(1)
    })
  })
})
