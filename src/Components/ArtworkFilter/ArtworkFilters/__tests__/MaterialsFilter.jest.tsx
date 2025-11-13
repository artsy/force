import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
  aggregations: [
    {
      slice: "MATERIALS_TERMS",
      counts: [
        { name: "Acrylic", value: "acrylic", count: 42 },
        { name: "Brass", value: "brass", count: 42 },
        { name: "Bronze", value: "bronze", count: 42 },
        { name: "Canvas", value: "canvas", count: 42 },
        { name: "Drypoint", value: "drypoint", count: 42 },
        { name: "Enamel", value: "enamel", count: 42 },
        { name: "Foam", value: "foam", count: 42 },
        { name: "Glass", value: "glass", count: 42 },
      ],
    },
  ],
}

const render = createArtworkFilterTestRenderer(artworkFilterContext)

describe(MaterialsFilter, () => {
  it("renders the first 6 material term names", () => {
    render(<MaterialsFilter expanded />)
    expect(screen.getByText("Acrylic")).toBeInTheDocument()
    expect(screen.getByText("Enamel")).toBeInTheDocument()
    expect(screen.queryByText("Foam")).not.toBeInTheDocument()
    expect(screen.queryByText("Glass")).not.toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<MaterialsFilter expanded />)
    expect(currentArtworkFilterContext().filters?.materialsTerms).toEqual([])

    userEvent.click(screen.getAllByRole("checkbox")[0]) // Acrylic
    expect(currentArtworkFilterContext().filters?.materialsTerms).toEqual([
      "acrylic",
    ])

    userEvent.click(screen.getAllByRole("checkbox")[5]) // Enamel
    expect(currentArtworkFilterContext().filters?.materialsTerms).toEqual([
      "acrylic",
      "enamel",
    ])
  })

  it("autocompletes available options", () => {
    render(<MaterialsFilter expanded />)

    const input = screen.getByPlaceholderText("Enter a material")
    userEvent.click(input)
    userEvent.type(input, "b")

    expect(screen.getByText("Brass")).toBeInTheDocument()
    expect(screen.getByText("Bronze")).toBeInTheDocument()

    expect(screen.queryByText("Acrylic")).not.toBeInTheDocument()
    expect(screen.queryByText("Canvas")).not.toBeInTheDocument()
    expect(screen.queryByText("Drypoint")).not.toBeInTheDocument()
    expect(screen.queryByText("Enamel")).not.toBeInTheDocument()
    expect(screen.queryByText("Foam")).not.toBeInTheDocument()
    expect(screen.queryByText("Glass")).not.toBeInTheDocument()
  })

  it("clears local input state after Clear All", () => {
    render(<MaterialsFilter expanded />)

    userEvent.click(screen.getAllByRole("checkbox")[0])
    userEvent.click(screen.getAllByRole("checkbox")[5])
    expect(currentArtworkFilterContext().filters?.materialsTerms).toEqual([
      "acrylic",
      "enamel",
    ])

    userEvent.click(screen.getByText("Clear all"))
    expect(currentArtworkFilterContext().filters?.materialsTerms).toEqual([])
  })

  it("can render in expanded or collapsed state", () => {
    render(<MaterialsFilter />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<MaterialsFilter expanded={false} />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<MaterialsFilter expanded={true} />)
    expect(screen.getAllByRole("checkbox")).toHaveLength(6) // First 6 items
  })
})
