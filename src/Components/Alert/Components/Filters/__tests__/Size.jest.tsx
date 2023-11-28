import { mount } from "enzyme"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { Size } from "Components/Alert/Components/Filters/Size"
import { Metric } from "Utils/metrics"
import { parseSizeRange } from "Utils/customSizeUtils"
import { AlertProvider } from "Components/Alert/AlertProvider"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("Size alert filter", () => {
  let alertContext

  const SizeFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <Size />
  }

  const getWrapper = (initialCriteria = {}, metric: Metric = "cm") => {
    return mount(
      <AlertProvider initialCriteria={initialCriteria} metric={metric}>
        <SizeFilterTestComponent />
      </AlertProvider>
    )
  }

  it("displays predefined filters", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Checkbox").length).toBe(3)

    expect(wrapper.html()).toContain("Small (under 40cm)")
    expect(wrapper.html()).toContain("Medium (40 – 100cm)")
    expect(wrapper.html()).toContain("Large (over 100cm)")
  })

  it("updates alert context's metric and predefined filters when metric is changed", () => {
    const wrapper = getWrapper()

    wrapper.find("Radio").last().simulate("click")

    expect(alertContext.state.metric).toEqual("in")

    expect(wrapper.html()).toContain("Small (under 16in)")
    expect(wrapper.html()).toContain("Medium (16in – 40in)")
    expect(wrapper.html()).toContain("Large (over 40in)")
  })

  it("updates alert context when selecting predefind filters", () => {
    const wrapper = getWrapper()

    wrapper.find("Checkbox").first().simulate("click")
    wrapper.find("Checkbox").last().simulate("click")

    expect(alertContext.state.criteria.sizes).toEqual(["SMALL", "LARGE"])
  })

  it("allows setting custom ranges, resets predefined sizes", () => {
    const wrapper = getWrapper()

    // select predefined sizes
    wrapper.find("Checkbox").first().simulate("click")
    expect(alertContext.state.criteria.sizes).toEqual(["SMALL"])

    // click on "Show custom size"
    wrapper.find("Clickable").simulate("click")

    // select min width
    //
    // TODO: I've tried wrapper.find(...).simulate("change", { target: { value: "100" } }) with no success.
    //       I use this suggestion: https://github.com/enzymejs/enzyme/issues/1943#issuecomment-715575176 instead.
    const minWidthInput = wrapper.find("input[name='width_min']")
    minWidthInput.getDOMNode().setAttribute("value", "100")
    minWidthInput.simulate("change", { currentTarget: minWidthInput })

    // set sizes
    wrapper.find("Button").first().simulate("click")

    // should reset predefined sizes and correctly sets custom size
    expect(alertContext.state.criteria.sizes).toEqual([])
    const parsedWidth = parseSizeRange(alertContext.state.criteria.width, "cm")
    expect(parsedWidth[0]).toEqual(100)
    expect(parsedWidth[1]).toEqual("*")
  })
})
