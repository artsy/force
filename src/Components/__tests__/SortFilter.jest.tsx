import { mount } from "enzyme"
import { SortFilter } from "Components/SortFilter"

describe("SortFilter", () => {
  const mockedOnSort = jest.fn()

  const getWrapper = () => {
    return mount(
      <SortFilter
        selected="foo"
        sortOptions={[
          {
            value: "foo",
            text: "foo",
          },
          {
            value: "bar",
            text: "bar",
          },
        ]}
        onSort={mockedOnSort}
      />
    )
  }

  beforeAll(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Select").prop("selected")).toEqual("foo")
    const text = wrapper.find("Select").text()
    expect(text).toContain("Sort")
    expect(text).toContain("bar")
    expect(text).toContain("foo")
  })

  it("calls onSort callback when changing", () => {
    const wrapper = getWrapper()
    wrapper.find("Select").find("option").at(1).simulate("change")
    expect(mockedOnSort).toBeCalledTimes(1)
    expect(mockedOnSort).toBeCalledWith("bar")
  })
})
