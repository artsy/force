import { mount } from "enzyme"
import {
  AlertProvider,
  useAlertContext,
} from "Components/Alert/Hooks/useAlertContext"
import { Medium } from "Components/Alert/Components/Filters/Medium"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("MediumFilter", () => {
  let alertContext

  const MediumFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <Medium />
  }

  const getWrapper = (initialCriteria = {}) => {
    return mount(
      <AlertProvider initialCriteria={initialCriteria}>
        <MediumFilterTestComponent />
      </AlertProvider>
    )
  }

  it("only shows custom mediums if aggregations passed to context", () => {
    const wrapper = getWrapper()

    expect(wrapper.html()).toContain("Painting")
  })

  it("shows a maximum of six mediums when not expanded.", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Checkbox").length).toBe(6)
  })
})
