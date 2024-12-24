import { AlertProvider } from "Components/Alert/AlertProvider"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { mount } from "enzyme"

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
      </AlertProvider>,
    )
  }

  it("displays all mediums", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Checkbox").length).toBe(15)

    expect(wrapper.html()).toContain("Painting")
  })

  it("selects mediums and only updates alert context", () => {
    const wrapper = getWrapper()

    wrapper.find("Checkbox").first().simulate("click")

    expect(alertContext.state.criteria.additionalGeneIDs).toEqual(["painting"])
  })
})
