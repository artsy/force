import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { getENV } from "Utils/getENV"
import { render, screen } from "@testing-library/react"

jest.mock("Utils/getENV")

describe("FilterExpandable", () => {
  const getWrapper = () => {
    return render(
      <FilterExpandable expanded>
        <span>Some render content</span>
      </FilterExpandable>,
    )
  }

  const mockGetENV = getENV as jest.Mock

  beforeAll(() => {
    mockGetENV.mockImplementation(() => false)
  })

  it("renders correctly", () => {
    getWrapper()

    expect(screen.getByText("Some render content")).toBeInTheDocument()
  })

  it("should be hidden by default for mobile devices", () => {
    mockGetENV.mockImplementation(() => true)
    getWrapper()

    expect(screen.getByText("Some render content")).not.toBeVisible()
  })
})
