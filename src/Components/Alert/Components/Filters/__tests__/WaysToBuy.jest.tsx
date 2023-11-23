import { mount } from "enzyme"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { WaysToBuy } from "Components/Alert/Components/Filters/WaysToBuy"
import { AlertProvider } from "Components/Alert/AlertProvider"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("WaysToBuyFilter", () => {
  let alertContext

  const WaysToBuyFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <WaysToBuy />
  }

  const getWrapper = (contextProps = {}, initialCriteria = {}) => {
    return mount(
      <AlertProvider initialCriteria={initialCriteria}>
        <WaysToBuyFilterTestComponent />
      </AlertProvider>
    )
  }

  it("displays all Ways To Buy", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Checkbox").length).toBe(4)

    expect(wrapper.html()).toContain("Purchase")
  })

  it("selects ways to buy and only updates alert context", () => {
    const wrapper = getWrapper()

    wrapper.find("Checkbox").first().simulate("click")

    expect(alertContext.state.criteria.acquireable).toEqual(true)
  })
})
