import { fireEvent, screen } from "@testing-library/react"
import { ArtistAbout } from "Apps/Artist/Components/Artist2/Components/ArtistAbout"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

const mockTrackEvent = jest.fn()

jest.mock("react-tracking", () => ({
  useTracking: jest.fn(() => ({ trackEvent: mockTrackEvent })),
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "artist",
    contextPageOwnerId: "artist-id-123",
    contextPageOwnerSlug: "francesca-mollett",
  })),
}))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ReadMore: ({ content, onReadMoreClicked, onReadLessClicked }: any) => (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <button type="button" onClick={onReadMoreClicked}>
        Read more
      </button>
      <button type="button" onClick={onReadLessClicked}>
        Read less
      </button>
    </>
  ),
}))

describe("ArtistAbout", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear()
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: mockTrackEvent,
    }))
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return <ArtistAbout artist={props.artist} />
    },
    query: graphql`
      query ArtistAbout_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistAbout_artist
        }
      }
    `,
  })

  describe("biography", () => {
    it("renders the biography section heading", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          biographyBlurb: {
            text: "A painter of landscapes.",
            credit: null,
          },
          movementGenes: [],
          mediumGenes: [],
        }),
      })

      expect(screen.getByText("About Francesca Mollett")).toBeInTheDocument()
    })

    it("renders the biography text", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          biographyBlurb: {
            text: "A painter of landscapes.",
            credit: null,
          },
          movementGenes: [],
          mediumGenes: [],
        }),
      })

      expect(screen.getByText(/A painter of landscapes\./)).toBeInTheDocument()
    })

    it("appends credit to biography text when both are present", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          biographyBlurb: {
            text: "A painter of landscapes.",
            credit: "Submitted by [Galerie Foo](/foo)",
          },
          movementGenes: [],
          mediumGenes: [],
        }),
      })

      expect(
        screen.getByText(
          /A painter of landscapes\. Submitted by \[Galerie Foo\]\(\/foo\)/,
        ),
      ).toBeInTheDocument()
    })

    it("does not render biography section when biographyBlurb is absent", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          biographyBlurb: null,
          movementGenes: [],
          mediumGenes: [],
        }),
      })

      expect(
        screen.queryByText("About Francesca Mollett"),
      ).not.toBeInTheDocument()
    })
  })

  describe("key facts", () => {
    it("renders the key facts section", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          movementGenes: [
            { name: "Impressionism", slug: "impressionism" },
            { name: "Post-Impressionism", slug: "post-impressionism" },
          ],
          mediumGenes: [
            { name: "Oil Paint", slug: "oil-paint" },
            { name: "Watercolor", slug: "watercolor" },
          ],
        }),
      })

      expect(screen.getByText("Impressionism")).toBeInTheDocument()
      expect(screen.getByText("Post-Impressionism")).toBeInTheDocument()
      expect(screen.getByText("Oil Paint")).toBeInTheDocument()
      expect(screen.getByText("Watercolor")).toBeInTheDocument()
    })

    it("does not render movements when empty", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          movementGenes: [],
          mediumGenes: [
            { name: "Oil Paint", slug: "oil-paint" },
            { name: "Watercolor", slug: "watercolor" },
          ],
        }),
      })

      expect(screen.queryByText("Movements")).not.toBeInTheDocument()
      expect(screen.queryByText("Mediums")).toBeInTheDocument()
    })

    it("does not render mediums when empty", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          movementGenes: [
            { name: "Impressionism", slug: "impressionism" },
            { name: "Post-Impressionism", slug: "post-impressionism" },
          ],
          mediumGenes: [],
        }),
      })

      expect(screen.queryByText("Movements")).toBeInTheDocument()
      expect(screen.queryByText("Mediums")).not.toBeInTheDocument()
    })

    it("does not render key facts section at all when all genes are empty", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Francesca Mollett",
          movementGenes: [],
          mediumGenes: [],
        }),
      })

      expect(screen.queryByText("Movements")).not.toBeInTheDocument()
      expect(screen.queryByText("Mediums")).not.toBeInTheDocument()
      expect(screen.queryByTestId("artist-key-facts")).not.toBeInTheDocument()
    })
  })

  describe("tracking", () => {
    describe("bio toggle", () => {
      it("fires toggledArtistBio with expand: true when Read more is clicked", () => {
        renderWithRelay({
          Artist: () => ({
            name: "Francesca Mollett",
            biographyBlurb: {
              text: "A painter of landscapes.",
              credit: null,
            },
            movementGenes: [],
            mediumGenes: [],
          }),
        })

        fireEvent.click(screen.getByText("Read more"))

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "toggledArtistBio",
          context_module: "artistHeader",
          context_page_owner_type: "artist",
          context_page_owner_id: "artist-id-123",
          context_page_owner_slug: "francesca-mollett",
          expand: true,
        })
      })

      it("fires toggledArtistBio with expand: false when Read less is clicked", () => {
        renderWithRelay({
          Artist: () => ({
            name: "Francesca Mollett",
            biographyBlurb: {
              text: "A painter of landscapes.",
              credit: null,
            },
            movementGenes: [],
            mediumGenes: [],
          }),
        })

        fireEvent.click(screen.getByText("Read less"))

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "toggledArtistBio",
          context_module: "artistHeader",
          context_page_owner_type: "artist",
          context_page_owner_id: "artist-id-123",
          context_page_owner_slug: "francesca-mollett",
          expand: false,
        })
      })
    })

    describe("gene clicks", () => {
      it("fires clickedGene when a movement gene is clicked", () => {
        renderWithRelay({
          Artist: () => ({
            name: "Francesca Mollett",
            movementGenes: [
              {
                internalID: "gene-id-impressionism",
                name: "Impressionism",
                slug: "impressionism",
              },
            ],
            mediumGenes: [],
          }),
        })

        fireEvent.click(screen.getByText("Impressionism"))

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "clickedGene",
          context_module: "artistHeader",
          context_page_owner_type: "artist",
          context_page_owner_id: "artist-id-123",
          context_page_owner_slug: "francesca-mollett",
          destination_page_owner_type: "gene",
          destination_page_owner_id: "gene-id-impressionism",
          destination_page_owner_slug: "impressionism",
        })
      })

      it("fires clickedGene when a medium gene is clicked", () => {
        renderWithRelay({
          Artist: () => ({
            name: "Francesca Mollett",
            movementGenes: [],
            mediumGenes: [
              {
                internalID: "gene-id-oil-paint",
                name: "Oil Paint",
                slug: "oil-paint",
              },
            ],
          }),
        })

        fireEvent.click(screen.getByText("Oil Paint"))

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "clickedGene",
          context_module: "artistHeader",
          context_page_owner_type: "artist",
          context_page_owner_id: "artist-id-123",
          context_page_owner_slug: "francesca-mollett",
          destination_page_owner_type: "gene",
          destination_page_owner_id: "gene-id-oil-paint",
          destination_page_owner_slug: "oil-paint",
        })
      })
    })
  })

  it("renders null when neither bio nor key facts are present", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        biographyBlurb: {
          text: "",
          credit: null,
        },
        movementGenes: [],
        mediumGenes: [],
      }),
    })

    expect(screen.queryByTestId("artist-about")).not.toBeInTheDocument()
  })
})
