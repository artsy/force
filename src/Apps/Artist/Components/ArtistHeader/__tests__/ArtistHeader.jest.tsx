import { screen } from "@testing-library/react"
import { ArtistHeaderFragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
    contextPageOwnerSlug: "pablo-picasso",
    contextPageOwnerType: "artist",
  })),
}))
jest.mock("Components/FollowButton/FollowArtistButton", () => ({
  FollowArtistButtonQueryRenderer: ({ children }) => (
    <div data-testid="follow-button">{children && children("Follow")}</div>
  ),
}))
jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist",
  () => ({
    ProgressiveOnboardingFollowArtist: ({ children }) => children,
  }),
)

const mockUseTracking = useTracking as jest.Mock
const trackEvent = jest.fn()

beforeAll(() => {
  mockUseTracking.mockImplementation(() => ({ trackEvent }))
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    match: {
      location: {
        query: {},
      },
    },
  }))
})

beforeEach(() => {
  trackEvent.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistHeaderFragmentContainer,
  query: graphql`
    query ArtistHeader_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistHeader_artist
      }
    }
  `,
})

describe("ArtistHeaderFragmentContainer", () => {
  describe("Basic rendering", () => {
    it("renders artist name and nationality", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          formattedNationalityAndBirthday: "Spanish, 1881–1973",
        }),
      })

      expect(screen.getByText("Pablo Picasso")).toBeInTheDocument()
      expect(screen.getByText("Spanish, 1881–1973")).toBeInTheDocument()
    })

    it("renders follow button", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          internalID: "artist-id",
        }),
      })

      expect(screen.getByTestId("follow-button")).toBeInTheDocument()
    })

    it("renders follower count when available", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          counts: {
            follows: 1234,
          },
        }),
      })

      expect(screen.getByText("1.2k Followers")).toBeInTheDocument()
    })

    it("renders singular follower when count is 1", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          counts: {
            follows: 1,
          },
        }),
      })

      expect(screen.getByText("1 Follower")).toBeInTheDocument()
    })
  })

  describe("Biography rendering", () => {
    it("renders bio when artist has biographyBlurb text", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: "Pablo Picasso was a Spanish painter and sculptor.",
          },
        }),
      })

      expect(
        screen.getByText("Pablo Picasso was a Spanish painter and sculptor."),
      ).toBeInTheDocument()
    })

    it("renders bio when partner supplies biography", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: "This biography is provided by a gallery partner.",
          },
        }),
      })

      expect(
        screen.getByText("This biography is provided by a gallery partner."),
      ).toBeInTheDocument()
    })

    it("does not render bio section when biographyBlurb text is null", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: null,
          },
        }),
      })

      expect(screen.queryByText(/Pablo Picasso was/)).not.toBeInTheDocument()
    })

    it("does not render bio section when biographyBlurb text is empty", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: "",
          },
        }),
      })

      expect(screen.queryByText(/Pablo Picasso was/)).not.toBeInTheDocument()
    })

    it("does not render bio section when biographyBlurb is null", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: null,
        }),
      })

      expect(screen.queryByText(/Pablo Picasso was/)).not.toBeInTheDocument()
    })

    it("renders bio with ReadMore functionality for long text", () => {
      const longBio = `Pablo Picasso was a Spanish painter and sculptor. ${"A".repeat(250)}` // Text longer than 250 char limit

      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: longBio,
          },
        }),
      })

      // ReadMore component is present and processes the long text
      expect(
        screen.getByText(/Pablo Picasso was a Spanish painter/),
      ).toBeInTheDocument()
    })

    it("renders bio with credit when both text and credit are present", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: "Pablo Picasso was a Spanish painter and sculptor.",
            credit: "Courtesy of the Museum of Modern Art",
          },
        }),
      })

      expect(
        screen.getByText(
          "Pablo Picasso was a Spanish painter and sculptor. Courtesy of the Museum of Modern Art",
        ),
      ).toBeInTheDocument()
    })

    it("renders bio with only text when credit is null", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: "Pablo Picasso was a Spanish painter and sculptor.",
            credit: null,
          },
        }),
      })

      expect(
        screen.getByText("Pablo Picasso was a Spanish painter and sculptor."),
      ).toBeInTheDocument()
    })

    it("renders bio with only text when credit is empty string", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: "Pablo Picasso was a Spanish painter and sculptor.",
            credit: "",
          },
        }),
      })

      expect(
        screen.getByText("Pablo Picasso was a Spanish painter and sculptor."),
      ).toBeInTheDocument()
    })

    it("does not render bio section when only credit is present without text", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          biographyBlurb: {
            text: null,
            credit: "Courtesy of the Museum of Modern Art",
          },
        }),
      })

      expect(
        screen.queryByText(/Courtesy of the Museum/),
      ).not.toBeInTheDocument()
    })
  })

  describe("Cover artwork", () => {
    it("tracks clicks on cover artwork image", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          slug: "pablo-picasso",
          internalID: "artist-id-123",
          coverArtwork: {
            internalID: "artwork-id-456",
            slug: "pablo-picasso-les-demoiselles-davignon",
            title: "Les Demoiselles d'Avignon",
            imageTitle: "Les Demoiselles d'Avignon by Pablo Picasso",
            href: "/artwork/pablo-picasso-les-demoiselles-davignon",
            image: {
              src: "https://example.com/image.jpg",
              width: 400,
              height: 300,
            },
          },
        }),
      })

      const artworkLink = screen.getByRole("img").closest("a")
      artworkLink?.click()

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedArtistArtworkImage",
          context_module: "artistHeader",
          context_page_owner_type: "artist",
          context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
          context_page_owner_slug: "pablo-picasso",
          destination_page_owner_type: "artwork",
          destination_page_owner_id: "artwork-id-456",
          destination_page_owner_slug: "pablo-picasso-les-demoiselles-davignon",
        }),
      )
    })
  })

  describe("Verified representatives", () => {
    it("renders verified representatives section when available", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          verifiedRepresentatives: [
            {
              partner: {
                internalID: "partner-1",
                name: "Gagosian Gallery",
                href: "/partner/gagosian-gallery",
                profile: {
                  icon: {
                    src1x: { src: "https://example.com/icon-30.jpg" },
                    src2x: { src: "https://example.com/icon-60.jpg" },
                  },
                },
              },
            },
          ],
        }),
      })

      expect(screen.getByText("Featured representation")).toBeInTheDocument()
      expect(screen.getByText("Gagosian Gallery")).toBeInTheDocument()
    })

    it("tracks clicks on verified representatives", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          verifiedRepresentatives: [
            {
              partner: {
                internalID: "partner-1",
                name: "Gagosian Gallery",
                href: "/partner/gagosian-gallery",
                profile: {
                  icon: {
                    src1x: { src: "https://example.com/icon-30.jpg" },
                    src2x: { src: "https://example.com/icon-60.jpg" },
                  },
                },
              },
            },
          ],
        }),
      })

      const partnerLink = screen.getByText("Gagosian Gallery")
      partnerLink.click()

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedVerifiedRepresentative",
          context_module: "artistHeader",
          destination_page_owner_id: "partner-1",
          destination_page_owner_type: "partner",
        }),
      )
    })

    it("renders compact pills when more than 3 representatives", () => {
      const representatives = Array(5)
        .fill(null)
        .map((_, i) => ({
          partner: {
            internalID: `partner-${i}`,
            name: `Gallery ${i}`,
            href: `/partner/gallery-${i}`,
            profile: { icon: null },
          },
        }))

      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          verifiedRepresentatives: representatives,
        }),
      })

      expect(screen.getByText("Featured representation")).toBeInTheDocument()
      expect(screen.getByText("Gallery 0")).toBeInTheDocument()
      expect(screen.getByText("Gallery 4")).toBeInTheDocument()
    })
  })

  describe("Career highlights", () => {
    it("renders career highlights when insights are available", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          insights: [
            {
              kind: "COLLECTED",
              label: "Collected by major museums",
            },
            {
              kind: "REVIEWED",
              label: "Reviewed by art critics",
            },
          ],
        }),
      })

      // Career highlights would be rendered via ArtistCareerHighlightFragmentContainer
      // The exact text depends on that component's implementation
    })

    it("limits insights to ARTIST_HEADER_NUMBER_OF_INSIGHTS", () => {
      const validKinds = [
        "COLLECTED",
        "REVIEWED",
        "SOLO_SHOW",
        "GROUP_SHOW",
        "HIGH_AUCTION_RECORD",
        "TRENDING_NOW",
      ]
      const manyInsights = Array(10)
        .fill(null)
        .map((_, i) => ({
          kind: validKinds[i % validKinds.length],
          label: `Insight ${i}`,
        }))

      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          insights: manyInsights,
        }),
      })

      // Only first 4 insights should be rendered (ARTIST_HEADER_NUMBER_OF_INSIGHTS = 4)
    })

    it("shows up to 4 insights when there is no editorial", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          articlesConnection: { totalCount: 0, edges: [] },
          insights: [
            { kind: "COLLECTED", label: "Insight 0", entities: ["MoMA"] },
            { kind: "REVIEWED", label: "Insight 1", entities: ["MoMA"] },
            { kind: "SOLO_SHOW", label: "Insight 2", entities: ["MoMA"] },
            { kind: "GROUP_SHOW", label: "Insight 3", entities: ["MoMA"] },
            { kind: "TRENDING_NOW", label: "Insight 4", entities: ["MoMA"] },
          ],
        }),
      })

      expect(screen.getByText("Insight 0")).toBeInTheDocument()
      expect(screen.getByText("Insight 3")).toBeInTheDocument()
      expect(screen.queryByText("Insight 4")).not.toBeInTheDocument()
    })

    it("shows only 2 insights when the editorial module is present", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          articlesConnection: {
            totalCount: 1,
            edges: [
              {
                node: {
                  internalID: "article-1",
                  href: "/article/article-1",
                  title: "Article 1",
                  byline: "Artsy Editorial",
                  publishedAt: "Jan 1, 2026",
                  thumbnailImage: null,
                },
              },
            ],
          },
          insights: [
            { kind: "COLLECTED", label: "Insight 0", entities: ["MoMA"] },
            { kind: "REVIEWED", label: "Insight 1", entities: ["MoMA"] },
            { kind: "SOLO_SHOW", label: "Insight 2", entities: ["MoMA"] },
            { kind: "GROUP_SHOW", label: "Insight 3", entities: ["MoMA"] },
          ],
        }),
      })

      expect(
        screen.getByText("Artsy Editorial Featuring Pablo Picasso"),
      ).toBeInTheDocument()
      expect(screen.getByText("Insight 0")).toBeInTheDocument()
      expect(screen.getByText("Insight 1")).toBeInTheDocument()
      expect(screen.queryByText("Insight 2")).not.toBeInTheDocument()
      expect(screen.queryByText("Insight 3")).not.toBeInTheDocument()
    })

    it("does not let an empty insight consume a display slot", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          articlesConnection: {
            totalCount: 1,
            edges: [
              {
                node: {
                  internalID: "article-1",
                  href: "/article/article-1",
                  title: "Article 1",
                  byline: "Artsy Editorial",
                  publishedAt: "Jan 1, 2026",
                  thumbnailImage: null,
                },
              },
            ],
          },
          insights: [
            // Not renderable: no description and no entities. It should be
            // filtered out before slicing rather than occupying a slot.
            {
              kind: "COLLECTED",
              label: "Empty insight",
              entities: [],
              description: null,
            },
            { kind: "REVIEWED", label: "Insight 1", entities: ["MoMA"] },
            { kind: "SOLO_SHOW", label: "Insight 2", entities: ["MoMA"] },
          ],
        }),
      })

      expect(screen.queryByText("Empty insight")).not.toBeInTheDocument()
      // With editorial present (2 slots), both renderable insights show
      // because the empty one no longer takes a slot.
      expect(screen.getByText("Insight 1")).toBeInTheDocument()
      expect(screen.getByText("Insight 2")).toBeInTheDocument()
    })

    // TODO: Temporarily skipped while the styles and techniques section is
    // disabled (see ENABLED in ArtistStylesAndTechniques). Unskip to restore.
    it.skip("renders styles and techniques after career highlights", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          insights: [
            {
              kind: "COLLECTED",
              label: "Collected by major museums",
              entities: ["MoMA"],
            },
          ],
          movementGenes: [
            {
              internalID: "gene-id-cubism",
              name: "Cubism",
              slug: "cubism",
            },
          ],
          mediumGenes: [],
        }),
      })

      expect(screen.getByText("Styles")).toBeInTheDocument()
      expect(screen.getByText("Cubism")).toBeInTheDocument()
    })

    // TODO: Temporarily skipped while the styles and techniques section is
    // disabled (see ENABLED in ArtistStylesAndTechniques). Unskip to restore.
    it.skip("renders styles and techniques when there are no career highlights", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          insights: [],
          verifiedRepresentatives: [],
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

      expect(screen.queryByText("Styles")).not.toBeInTheDocument()
      expect(screen.getByText("Techniques")).toBeInTheDocument()
      expect(screen.getByText("Oil Paint")).toBeInTheDocument()
    })
  })

  describe("CV link", () => {
    it("renders CV link", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          slug: "pablo-picasso",
        }),
      })

      const cvLink = screen.getByText("See all past shows and fair booths")
      expect(cvLink).toBeInTheDocument()
      expect(cvLink.closest("a")).toHaveAttribute(
        "href",
        "/artist/pablo-picasso/cv",
      )
    })

    it("tracks clicks on CV link", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          slug: "pablo-picasso",
          internalID: "artist-id-123",
        }),
      })

      const cvLink = screen.getByText("See all past shows and fair booths")
      cvLink.click()

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedCV",
          context_module: "artistHeader",
          context_page_owner_type: "artist",
          context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
          context_page_owner_slug: "pablo-picasso",
        }),
      )
    })
  })

  describe("Layout behavior", () => {
    it("adjusts layout when no cover image is present", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          coverArtwork: null,
          verifiedRepresentatives: [
            {
              partner: {
                internalID: "partner-1",
                name: "Gagosian Gallery",
                href: "/partner/gagosian-gallery",
                profile: { icon: null },
              },
            },
          ],
        }),
      })

      expect(screen.getByText("Pablo Picasso")).toBeInTheDocument()
      expect(screen.getByText("Featured representation")).toBeInTheDocument()
    })

    it("shows different follow button layout when no content is present", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          internalID: "artist-id",
          coverArtwork: null,
          biographyBlurb: { text: null },
          verifiedRepresentatives: [],
          insights: [],
        }),
      })

      expect(screen.getByTestId("follow-button")).toBeInTheDocument()
    })
  })
})
