import { mount } from "enzyme"
import { useTracking } from "react-tracking"
import {
  ArtworkFilterContextProvider,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterMobileOverlay } from "Components/ArtworkFilter/ArtworkFilterMobileOverlay"
import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilters"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({ sm: true }),
}))
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {}, pathname: "" },
    },
  }),
}))

describe("ArtworkFilterMobileOverlay", () => {
  let context
  let spy
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = (props = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...props}>
        <ArtworkFilterMobileOverlayTest />
      </ArtworkFilterContextProvider>
    )
  }

  const ArtworkFilterMobileOverlayTest = () => {
    context = useArtworkFilterContext()
    spy = jest.fn()

    return (
      <ArtworkFilterMobileOverlay onClose={spy}>
        <ArtworkFilters />
      </ArtworkFilterMobileOverlay>
    )
  }

  it("contains correct UI elements", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Button").first().text()).toEqual("Cancel")

    expect(wrapper.find("Clickable").first().text()).toEqual("Filter")

    expect(wrapper.find("Button").last().text()).toEqual("Show Results")
  })

  it("resets staged filters to defaults on `Reset` button click", () => {
    const wrapper = getWrapper({
      filters: {
        ...initialArtworkFilterState,
        page: 20,
      },
    })
    wrapper
      .find("Button")
      .findWhere(c => c.text() === "Clear all")
      .first()
      .simulate("click")

    expect(context.stagedFilters).toEqual({
      ...initialArtworkFilterState,
      reset: true,
    })
  })

  it("doesn't call onClose callback on `Apply` button click because it's disabled", () => {
    const wrapper = getWrapper()
    wrapper.find("Button").last().simulate("click")
    expect(spy).not.toHaveBeenCalled()
  })

  it("renders children content", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ArtworkFilters")).toHaveLength(1)
  })

  it("mutates staged filter state instead of 'real' filter state", () => {
    const wrapper = getWrapper()

    wrapper.find("WaysToBuyFilter").find("Checkbox").first().simulate("click")
    wrapper.find("SizeFilter").find("Checkbox").first().simulate("click")

    expect(context.stagedFilters).toMatchObject({
      acquireable: true,
      sizes: ["SMALL"],
    })
    expect(context.filters).not.toMatchObject({
      acquireable: true,
      sizes: ["SMALL"],
    })
  })

  describe("`Apply` button", () => {
    it("is disabled before selecting filter and enabled after that", () => {
      const wrapper = getWrapper()

      expect(wrapper.find("Button").last().prop("disabled")).toBeTruthy()

      wrapper.find("SizeFilter").find("Checkbox").first().simulate("click")

      expect(wrapper.find("Button").last().prop("disabled")).toBeFalsy()
    })
  })
})
