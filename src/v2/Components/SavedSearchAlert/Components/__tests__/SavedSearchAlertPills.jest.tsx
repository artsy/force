import { fireEvent, render, screen } from "@testing-library/react"
import { FilterPill } from "../../types"
import {
  SavedSearchAlertPills,
  SavedSearchAlertPillsProps,
} from "../SavedSearchAlertPills"

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

const defaultProps: SavedSearchAlertPillsProps = {
  items,
  onDeletePress: jest.fn,
}

describe("SavedSearchAlertPills", () => {
  it("renders pills", () => {
    render(<SavedSearchAlertPills {...defaultProps} />)

    expect(screen.getByText("Red")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
  })

  it('should call "onDeletePress" handler when pill is pressed', () => {
    const onDeletePressMock = jest.fn()
    render(
      <SavedSearchAlertPills
        {...defaultProps}
        onDeletePress={onDeletePressMock}
      />
    )

    fireEvent.click(screen.getByText("Red"))

    expect(onDeletePressMock).toBeCalledWith({
      filterName: "colors",
      name: "red",
      displayName: "Red",
    })
  })
})
