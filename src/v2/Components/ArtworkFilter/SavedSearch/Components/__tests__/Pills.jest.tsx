import { fireEvent, render, screen } from "@testing-library/react"
import { FilterPill } from "../../Utils/SavedSearchContext"
import { Pills, PillsProps } from "../Pills"

const items: FilterPill[] = [
  {
    filterName: "colors",
    name: "red",
    displayName: "Red",
  },
  {
    filterName: "attributionClass",
    name: "open-edition",
    displayName: "Open Edition",
  },
]

const defaultProps: PillsProps = {
  items,
  onDeletePress: jest.fn,
}

describe("Pills", () => {
  it("renders pills", () => {
    render(<Pills {...defaultProps} />)

    expect(screen.getByText("Red")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
  })

  it('should call "onDeletePress" handler when pill is pressed', () => {
    const onDeletePressMock = jest.fn()
    render(<Pills {...defaultProps} onDeletePress={onDeletePressMock} />)

    fireEvent.click(screen.getByText("Red"))

    expect(onDeletePressMock).toBeCalledWith({
      filterName: "colors",
      name: "red",
      displayName: "Red",
    })
  })
})
