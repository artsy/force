import { SortFilter } from "Components/SortFilter"
import { fireEvent, render, screen } from "@testing-library/react"

describe("SortFilter", () => {
  const mockedOnSort = jest.fn()

  const getWrapper = () => {
    return render(
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
      />,
    )
  }

  beforeAll(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const { container } = getWrapper()
    const select = screen.getByRole("combobox")
    expect(select).toHaveValue("foo")
    expect(container.textContent).toContain("Sort")
    expect(container.textContent).toContain("bar")
    expect(container.textContent).toContain("foo")
  })

  it("calls onSort callback when changing", () => {
    getWrapper()
    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "bar" } })
    expect(mockedOnSort).toBeCalledTimes(1)
    expect(mockedOnSort).toBeCalledWith("bar")
  })
})
