import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { useSystemContext } from "System/Hooks/useSystemContext"

jest.mock("System/Hooks/useSystemContext")

const mockUseSystemContext = useSystemContext as jest.Mock

describe(ArtistsFilter, () => {
  beforeEach(() => {
    mockUseSystemContext.mockImplementation(() => ({
      user: { id: "user-id" },
      relayEnvironment: {},
    }))
  })

  describe("with artist aggregations", () => {
    const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
      aggregations: [
        {
          slice: "ARTIST",
          counts: [
            { name: "Percy A", count: 10, value: "percy-a" },
            { name: "Percy B", count: 10, value: "percy-b" },
            { name: "Percy C", count: 10, value: "percy-c" },
            { name: "Percy D", count: 10, value: "percy-d" },
            { name: "Percy E", count: 10, value: "percy-e" },
            { name: "Percy F", count: 10, value: "percy-f" },
            { name: "Percy G", count: 10, value: "percy-g" },
          ],
        },
      ],
    }

    const render = createArtworkFilterTestRenderer(artworkFilterContext)

    it("renders artist options", () => {
      render(<ArtistsFilter expanded />)

      expect(screen.getByText("Artists You Follow")).toBeInTheDocument()
      expect(screen.getByText("Percy A")).toBeInTheDocument()
      expect(screen.getByText("Percy F")).toBeInTheDocument()
    })

    it("updates context on filter change", () => {
      render(<ArtistsFilter expanded />)
      expect(currentArtworkFilterContext().filters?.artistIDs).toEqual([])

      userEvent.click(screen.getAllByRole("checkbox")[1])
      expect(currentArtworkFilterContext().filters?.artistIDs).toEqual([
        "percy-a",
      ])

      userEvent.click(screen.getAllByRole("checkbox")[2])
      expect(currentArtworkFilterContext().filters?.artistIDs).toEqual([
        "percy-a",
        "percy-b",
      ])

      userEvent.click(screen.getAllByRole("checkbox")[2])
      expect(currentArtworkFilterContext().filters?.artistIDs).toEqual([
        "percy-a",
      ])
    })

    it("clears selected artists after Clear All", () => {
      render(<ArtistsFilter expanded />)

      userEvent.click(screen.getByText("Percy A"))
      userEvent.click(screen.getByText("Percy B"))

      expect(currentArtworkFilterContext().filters?.artistIDs).toEqual([
        "percy-a",
        "percy-b",
      ])

      userEvent.click(screen.getByText("Clear all"))

      expect(currentArtworkFilterContext().filters?.artistIDs).toEqual([])
    })

    describe("expanded prop", () => {
      it("renders collapsed when not set", () => {
        render(<ArtistsFilter />)
        const button = screen.getByRole("button", {
          name: "Artists",
          expanded: false,
        })
        expect(button).toHaveAttribute("aria-expanded", "false")
      })

      it("renders collapsed when false", () => {
        render(<ArtistsFilter expanded={false} />)
        const button = screen.getByRole("button", {
          name: "Artists",
          expanded: false,
        })
        expect(button).toHaveAttribute("aria-expanded", "false")
      })

      it("renders expanded when true", () => {
        render(<ArtistsFilter expanded={true} />)
        const button = screen.getByRole("button", {
          name: "Artists",
          expanded: true,
        })
        expect(button).toHaveAttribute("aria-expanded", "true")
        expect(screen.getAllByRole("checkbox")).toHaveLength(7)
      })
    })
  })

  describe("followed artists checkbox", () => {
    it("is disabled if there is no current user", () => {
      mockUseSystemContext.mockImplementation(() => ({
        user: null,
        relayEnvironment: {},
      }))

      const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
        aggregations: [
          {
            slice: "ARTIST",
            counts: [
              { name: "Percy A", count: 10, value: "percy-a" },
              { name: "Percy B", count: 10, value: "percy-b" },
            ],
          },
        ],
      }

      const render = createArtworkFilterTestRenderer(artworkFilterContext)

      render(<ArtistsFilter expanded />)

      const followedArtistsCheckbox = screen.getByTestId(
        "followedArtistsCheckbox",
      )

      expect(followedArtistsCheckbox).toHaveAttribute("disabled")
    })
  })
})
