import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

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

    it("can render in expanded or collapsed state", () => {
      render(<ArtistsFilter />)
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

      render(<ArtistsFilter expanded={false} />)
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

      render(<ArtistsFilter expanded={true} />)
      expect(screen.getAllByRole("checkbox")).toHaveLength(7)
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
