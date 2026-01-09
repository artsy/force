import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  ColorFilter,
  COLOR_OPTIONS,
} from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"

describe(ColorFilter, () => {
  const artworkFilterContext: Partial<ArtworkFilterContextProps> = {}
  const render = createArtworkFilterTestRenderer(artworkFilterContext)

  it("initially renders only the first 6 colors", () => {
    render(<ColorFilter expanded />)

    // The first 6 colors should be visible
    expect(screen.getByText("Red")).toBeInTheDocument()
    expect(screen.getByText("Orange")).toBeInTheDocument()
    expect(screen.getByText("Yellow")).toBeInTheDocument()
    expect(screen.getByText("Green")).toBeInTheDocument()
    expect(screen.getByText("Blue")).toBeInTheDocument()
    expect(screen.getByText("Purple")).toBeInTheDocument()

    // Colors beyond the first 6 should not be visible initially
    expect(screen.queryByText("Black and White")).not.toBeInTheDocument()
    expect(screen.queryByText("Brown")).not.toBeInTheDocument()
    expect(screen.queryByText("Gray")).not.toBeInTheDocument()
    expect(screen.queryByText("Pink")).not.toBeInTheDocument()

    expect(screen.getByText("Show more")).toBeInTheDocument()
  })

  it("renders all colors when 'Show more' is clicked", () => {
    render(<ColorFilter expanded />)

    userEvent.click(screen.getByText("Show more"))

    // All colors should now be visible
    COLOR_OPTIONS.forEach(color => {
      expect(screen.getByText(color.name)).toBeInTheDocument()
    })

    expect(screen.getByText("Hide")).toBeInTheDocument()
  })

  it("selects a color when clicked", () => {
    render(<ColorFilter expanded />)

    expect(currentArtworkFilterContext().filters?.colors).toEqual([])

    userEvent.click(screen.getByText("Red"))

    expect(currentArtworkFilterContext().filters?.colors).toEqual(["red"])
  })

  it("selects multiple colors when clicked", () => {
    render(<ColorFilter expanded />)

    expect(currentArtworkFilterContext().filters?.colors).toEqual([])

    userEvent.click(screen.getByText("Red"))
    userEvent.click(screen.getByText("Purple"))

    expect(currentArtworkFilterContext().filters?.colors).toContain("red")
    expect(currentArtworkFilterContext().filters?.colors).toContain("purple")
    expect(currentArtworkFilterContext().filters?.colors).toHaveLength(2)
  })

  it("unselects a selected color when clicked again", () => {
    render(<ColorFilter expanded />)

    expect(currentArtworkFilterContext().filters?.colors).toEqual([])

    userEvent.click(screen.getByText("Red"))
    userEvent.click(screen.getByText("Purple"))

    expect(currentArtworkFilterContext().filters?.colors).toEqual([
      "red",
      "purple",
    ])

    userEvent.click(screen.getByText("Red"))

    expect(currentArtworkFilterContext().filters?.colors).toEqual(["purple"])
  })

  it("clears selected colors after Clear All", () => {
    render(<ColorFilter expanded />)

    userEvent.click(screen.getByText("Red"))
    userEvent.click(screen.getByText("Purple"))

    expect(currentArtworkFilterContext().filters?.colors).toEqual([
      "red",
      "purple",
    ])

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.colors).toEqual([])
  })

  describe("expanded prop", () => {
    it("renders collapsed when not set", () => {
      render(<ColorFilter />)
      const button = screen.getByRole("button", {
        name: "Color",
        expanded: false,
      })
      expect(button).toHaveAttribute("aria-expanded", "false")
    })

    it("renders collapsed when false", () => {
      render(<ColorFilter expanded={false} />)
      const button = screen.getByRole("button", {
        name: "Color",
        expanded: false,
      })
      expect(button).toHaveAttribute("aria-expanded", "false")
    })

    it("renders expanded when true", () => {
      render(<ColorFilter expanded={true} />)
      const button = screen.getByRole("button", {
        name: "Color",
        expanded: true,
      })
      expect(button).toHaveAttribute("aria-expanded", "true")
      expect(screen.getByText("Red")).toBeInTheDocument()
    })
  })
})
