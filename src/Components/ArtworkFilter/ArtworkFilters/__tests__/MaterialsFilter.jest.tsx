import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"

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

  describe("expanded prop", () => {
    it("renders collapsed when not set", () => {
      render(<MaterialsFilter />)
      const button = screen.getByRole("button", {
        name: "Material",
        expanded: false,
      })
      expect(button).toHaveAttribute("aria-expanded", "false")
    })

    it("renders collapsed when false", () => {
      render(<MaterialsFilter expanded={false} />)
      const button = screen.getByRole("button", {
        name: "Material",
        expanded: false,
      })
      expect(button).toHaveAttribute("aria-expanded", "false")
    })

    it("renders expanded when true", () => {
      render(<MaterialsFilter expanded={true} />)
      const button = screen.getByRole("button", {
        name: "Material",
        expanded: true,
      })
      expect(button).toHaveAttribute("aria-expanded", "true")
      expect(screen.getAllByRole("checkbox")).toHaveLength(6) // First 6 items
    })
  })
})
