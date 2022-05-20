import { mount } from "enzyme"
import { FilterExpandable } from "../FilterExpandable"
import { data as sd } from "sharify"

jest.mock("sharify")

describe("FilterExpandable", () => {
  const getWrapper = () => {
    return mount(
      <FilterExpandable expanded={true}>
        <span>Some render content</span>
      </FilterExpandable>
    )
  }

  beforeAll(() => {
    sd.IS_MOBILE = false
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Expandable")).toHaveLength(1)
    expect(wrapper.find("Expandable").prop("onClick")).toBeTruthy()
    expect(wrapper.find("span").length).toBe(1)
  })

  it("should be hidden by default for mobile devices", () => {
    sd.IS_MOBILE = true
    const wrapper = getWrapper()

    expect(wrapper.find("span").length).toBe(0)
  })
})
