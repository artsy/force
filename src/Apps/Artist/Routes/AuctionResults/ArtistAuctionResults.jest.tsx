import { useRouter } from "System/Hooks/useRouter"
import { buildPaginatedHeading } from "Utils/PaginationMeta"

jest.mock("System/Hooks/useRouter")
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

jest.mock("Utils/PaginationMeta", () => ({
  PaginationMeta: ({ title }: { title: string }) => <title>{title}</title>,
  buildPaginatedHeading: jest.requireActual("Utils/PaginationMeta")
    .buildPaginatedHeading,
}))

describe("ArtistAuctionResults pagination", () => {
  it("shows correct heading for page 1", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: { query: {} },
        params: {},
      },
    } as any)

    const heading = buildPaginatedHeading("Auction Results", 1)
    expect(heading).toBe("Auction Results")
  })

  it("shows correct heading for page 2+", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: { query: { page: "3" } },
        params: {},
      },
    } as any)

    const heading = buildPaginatedHeading("Auction Results", 3)
    expect(heading).toBe("Page 3: Auction Results")
  })
})
