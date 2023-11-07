import { mount } from "enzyme"
import {
  AlertProvider,
  useAlertContext,
} from "Components/Alert/Hooks/useAlertContext"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("MediumFilter", () => {
  let filterContext
  let alertContext

  const MediumFilterTestComponent = () => {
    filterContext = useArtworkFilterContext()
    alertContext = useAlertContext()

    return <Medium />
  }

  const getWrapper = (contextProps = {}, initialCriteria = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <AlertProvider initialCriteria={initialCriteria}>
          <MediumFilterTestComponent />
        </AlertProvider>
      </ArtworkFilterContextProvider>
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
    expect(filterContext.filters.additionalGeneIDs).toEqual([])
  })
})
