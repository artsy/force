import { screen, fireEvent } from "@testing-library/react"
import { ArtistRelatedGeneCategoriesFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistRelatedGeneCategories"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
    contextPageOwnerSlug: "andy-warhol",
    contextPageOwnerType: "artist",
  })),
}))

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("ArtistGenes", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ArtistRelatedGeneCategoriesFragmentContainer,
    query: graphql`
      query ArtistRelatedGeneCategories_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistRelatedGeneCategories_artist
        }
      }
    `,
  })

  it("does not render if no genes", () => {
    renderWithRelay({
      Artist: () => ({
        related: { genes: { edges: null } },
      }),
    })

    expect(screen.queryByText("Related Categories")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        related: {
          genes: { edges: [{ node: { name: "example", href: "/gene/href" } }] },
        },
      }),
    })

    expect(screen.getByText("Related Categories")).toBeInTheDocument()
    expect(screen.queryAllByText("example")[0]).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks gene click", () => {
      renderWithRelay({
        Artist: () => ({
          related: {
            genes: {
              edges: [
                {
                  node: {
                    internalID: "52333b71a09a67177c000082",
                    slug: "celebrity",
                    name: "Celebrity",
                    href: "/gene/celebrity",
                  },
                },
              ],
            },
          },
        }),
      })

      const geneLink = screen.getByText("Celebrity")
      fireEvent.click(geneLink)

      expect(trackEvent).toBeCalledWith({
        action: "clickedGene",
        context_module: "relatedCategories",
        context_page_owner_type: "artist",
        context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
        context_page_owner_slug: "andy-warhol",
        destination_page_owner_type: "gene",
        destination_page_owner_id: "52333b71a09a67177c000082",
        destination_page_owner_slug: "celebrity",
      })
    })
  })
})
