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
import { range } from "lodash"

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

  it("only shows custom mediums if aggregations passed to context", () => {
    const wrapper = getWrapper({
      aggregations: [
        {
          slice: "MEDIUM",
          counts: [
            {
              name: "Foo Medium",
              value: "foo-medium",
            },
          ],
        },
      ],
    })

    expect(wrapper.html()).toContain("Foo Medium")
    expect(wrapper.html()).not.toContain("Painting")
  })

  it("selects mediums and only updates alert context", () => {
    const wrapper = getWrapper()

    wrapper.find("Checkbox").first().simulate("click")

    expect(alertContext.state.criteria.additionalGeneIDs).toEqual(["painting"])
    expect(filterContext.filters.additionalGeneIDs).toEqual([])
  })

  it("shows a maximum of six mediums when not expanded.", () => {
    const wrapper = getWrapper({
      aggregations: [
        {
          slice: "MEDIUM",
          counts: range(7).map(i => [
            {
              name: `Foo Medium ${i}`,
              value: `foo-medium-${i}`,
            },
          ]),
        },
      ],
    })

    expect(wrapper.find("Checkbox").length).toBe(6)
  })
})
