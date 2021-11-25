import { mount } from "enzyme"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { FiltersPills } from "../SavedSearch/Components/FiltersPills"

const savedSearchAttributes: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "test-artist-name",
}

const mockedPills = [
  { name: "Red", isDefault: false },
  { name: "Open Edition", isDefault: false },
]

const getWrapper = ({ pills = mockedPills }) =>
  mount(
    <FiltersPills pills={pills} savedSearchAttributes={savedSearchAttributes} />
  )

describe("FiltersPills", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("Pill").length).toBe(2)
    expect(wrapper.find("Pill CloseIcon").length).toBe(2)
    expect(wrapper.find("CreateAlertButton").length).toBe(1)
    const wrapperText = wrapper.text()
    expect(wrapperText).toContain("Red")
    expect(wrapperText).toContain("Open Edition")
  })

  it("renders default pills without CloseIcon", () => {
    const wrapper = getWrapper({
      pills: [{ name: "Banksy", isDefault: true }, ...mockedPills],
    })
    const pills = wrapper.find("Pill")
    expect(pills.length).toBe(3)
    expect(pills.find("CloseIcon").length).toBe(2)
    expect(pills.at(0).text()).toContain("Banksy")
    expect(pills.at(0).find("CloseIcon").length).toBe(0)
    expect(pills.at(1).text()).toContain("Red")
    expect(pills.at(1).find("CloseIcon").length).toBe(1)
    expect(pills.at(2).text()).toContain("Open Edition")
    expect(pills.at(2).find("CloseIcon").length).toBe(1)
  })
})
