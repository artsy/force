import { fireEvent, render, screen } from "@testing-library/react"
import { FilterPill } from "../../types"
import {
  SavedSearchAlertPills,
  SavedSearchAlertPillsProps,
} from "../SavedSearchAlertPills"

const items: FilterPill[] = [
  {
    field: "colors",
    value: "red",
    displayValue: "Red",
  },
  {
    field: "attributionClass",
    value: "open-edition",
    displayValue: "Open Edition",
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
      field: "colors",
      value: "red",
      displayValue: "Red",
    })
  })
})
