import { mount } from "enzyme"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { getENV } from "Utils/getENV"

jest.mock("Utils/getENV")

describe("FilterExpandable", () => {
  const getWrapper = () => {
    return mount(
      <FilterExpandable expanded>
        <span>Some render content</span>
      </FilterExpandable>
    )
  }

  const mockGetENV = getENV as jest.Mock

  beforeAll(() => {
    mockGetENV.mockImplementation(() => false)
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Expandable")).toHaveLength(1)
    expect(wrapper.find("Expandable").prop("onToggle")).toBeTruthy()
    expect(wrapper.find("span").length).toBe(1)
  })

  it("should be hidden by default for mobile devices", () => {
    mockGetENV.mockImplementation(() => true)
    const wrapper = getWrapper()

    expect(wrapper.find("span").length).toBe(0)
  })
})
