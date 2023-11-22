import { mount } from "enzyme"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { AlertProvider } from "Components/Alert/AlertProvider"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("MediumFilter", () => {
  let alertContext

  const MediumFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <Medium />
  }

  const getWrapper = (contextProps = {}, initialCriteria = {}) => {
    return mount(
      <AlertProvider initialCriteria={initialCriteria}>
        <MediumFilterTestComponent />
      </AlertProvider>
    )
  }

  it("displays all mediums", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Checkbox").length).toBe(14)

    expect(wrapper.html()).toContain("Painting")
  })

  it("selects mediums and only updates alert context", () => {
    const wrapper = getWrapper()

    wrapper.find("Checkbox").first().simulate("click")

    expect(alertContext.state.criteria.additionalGeneIDs).toEqual(["painting"])
  })
})
