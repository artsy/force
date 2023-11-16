import { mount } from "enzyme"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { Color } from "Components/Alert/Components/Filters/Color"
import { AlertProvider } from "Components/Alert/AlertProvider"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("ColorFilter", () => {
  let alertContext

  const ColorFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <Color />
  }

  const getWrapper = (contextProps = {}, initialCriteria = {}) => {
    return mount(
      <AlertProvider initialCriteria={initialCriteria}>
        <ColorFilterTestComponent />
      </AlertProvider>
    )
  }

  it("displays all Colors", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Checkbox").length).toBe(10)

    expect(wrapper.html()).toContain("Red")
  })

  it("selects colors and only updates alert context", () => {
    const wrapper = getWrapper()

    wrapper.find("Checkbox").first().simulate("click")

    expect(alertContext.state.criteria.colors).toEqual(["red"])
  })
})
