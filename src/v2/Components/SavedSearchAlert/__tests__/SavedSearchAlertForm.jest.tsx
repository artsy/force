import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
  initialArtworkFilterState,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { MockBoot } from "v2/DevTools"
import { SystemContextProvider } from "v2/System"
import { Breakpoint } from "v2/Utils/Responsive"
import { SavedSearchAlertForm } from "../SavedSearchAlertForm"

const formInitialValues = {
  name: "",
  email: true,
}

const savedSearchProps: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "test-artist-name",
}

const savedSearchFilters = {
  ...initialArtworkFilterState,
  attributionClass: ["unique", "open edition"],
  priceRange: "25000-50000",
}

const getWrapper = (
  breakpoint: Breakpoint = "lg",
  filters: ArtworkFiltersState = savedSearchFilters
) =>
  mount(
    <MockBoot breakpoint={breakpoint}>
      <SystemContextProvider>
        <ArtworkFilterContextProvider filters={filters}>
          <SavedSearchAlertForm
            initialValues={formInitialValues}
            savedSearchAttributes={savedSearchProps}
          />
        </ArtworkFilterContextProvider>
      </SystemContextProvider>
    </MockBoot>
  )

describe("SavedSearchAlertForm", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper()

    const wrapperText = wrapper.text()

    expect(wrapperText).toContain("Name")
    expect(wrapperText).toContain("Email Alerts")
    expect(wrapperText).toContain("Save Alert")

    expect(wrapper.find("div[role='checkbox']").prop("aria-checked")).toBe(true)
    expect(wrapper.find("input[name='name']").prop("value")).toBe("")
  })

  it("name generated correctly", () => {
    const wrapper = getWrapper()
    const nameInput = wrapper.find("input[name='name']")

    expect(nameInput.prop("placeholder")).toEqual(
      "test-artist-name • 3 filters"
    )
  })

  it("email value changes correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("div[role='checkbox']").prop("aria-checked")).toBe(true)

    wrapper.find("div[role='checkbox']").simulate("click")

    expect(wrapper.find("div[role='checkbox']").prop("aria-checked")).toBe(
      false
    )
  })
})
