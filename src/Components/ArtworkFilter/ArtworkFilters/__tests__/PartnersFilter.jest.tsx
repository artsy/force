import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { PartnersFilter } from "Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"

describe(PartnersFilter, () => {
  const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
    aggregations: [
      {
        slice: "PARTNER",
        counts: [
          { name: "Percy Z", count: 10, value: "percy-z" },
          { name: "Gallery ABC", count: 5, value: "gallery-abc" },
        ],
      },
    ],
  }

  const render = createArtworkFilterTestRenderer(artworkFilterContext)

  it("renders partners from aggregations", () => {
    render(<PartnersFilter expanded />)

    expect(screen.getByText("Percy Z")).toBeInTheDocument()
    expect(screen.getByText("Gallery ABC")).toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<PartnersFilter expanded />)
    expect(currentArtworkFilterContext().filters?.partnerIDs).toEqual([])

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.partnerIDs).toEqual([
      "gallery-abc",
    ])

    userEvent.click(screen.getAllByRole("checkbox")[1])
    expect(currentArtworkFilterContext().filters?.partnerIDs).toEqual([
      "gallery-abc",
      "percy-z",
    ])
  })

  it("clears local input state after Clear All", () => {
    render(<PartnersFilter expanded />)

    userEvent.click(screen.getByText("Percy Z"))
    expect(currentArtworkFilterContext().filters?.partnerIDs).toEqual([
      "percy-z",
    ])

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.partnerIDs).toEqual([])
  })

  it("can render in expanded or collapsed state", () => {
    render(<PartnersFilter />)
    expect(screen.queryByText("Percy Z")).not.toBeInTheDocument()

    render(<PartnersFilter expanded={false} />)
    expect(screen.queryByText("Percy Z")).not.toBeInTheDocument()

    render(<PartnersFilter expanded={true} />)
    expect(screen.getByText("Percy Z")).toBeInTheDocument()
    expect(screen.getByText("Gallery ABC")).toBeInTheDocument()
  })

  it("renders custom label when provided", () => {
    render(<PartnersFilter expanded label="Custom label" />)

    expect(screen.getByText("Custom label")).toBeInTheDocument()
    expect(
      screen.queryByText("Galleries and Institutions"),
    ).not.toBeInTheDocument()
  })

  it("renders default label when no custom label is provided", () => {
    render(<PartnersFilter expanded />)

    expect(screen.getByText("Galleries and Institutions")).toBeInTheDocument()
  })

  it("has a search input with correct placeholder", () => {
    render(<PartnersFilter expanded />)

    expect(screen.getByPlaceholderText("Enter a gallery")).toBeInTheDocument()
  })
})
