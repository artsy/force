import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"
import { fireEvent, render, screen } from "@testing-library/react"

describe("ShowMore", () => {
  it("shows more when clicked", () => {
    render(
      <ShowMore initial={2}>
        <div>is visible</div>
        <div>is visible</div>
        <div>is hidden</div>
      </ShowMore>,
    )

    expect(screen.getAllByText("is visible")).toHaveLength(2)
    expect(screen.queryByText("is hidden")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button"))

    expect(screen.getAllByText("is visible")).toHaveLength(2)
    expect(screen.getByText("is hidden")).toBeInTheDocument()
  })

  it("and hides it", () => {
    render(
      <ShowMore initial={2} expanded>
        <div>is visible</div>
        <div>is visible</div>
        <div>is hidden</div>
      </ShowMore>,
    )

    expect(screen.getAllByText("is visible")).toHaveLength(2)
    expect(screen.getByText("is hidden")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button"))

    expect(screen.getAllByText("is visible")).toHaveLength(2)
    expect(screen.queryByText("is hidden")).not.toBeInTheDocument()
  })
})
