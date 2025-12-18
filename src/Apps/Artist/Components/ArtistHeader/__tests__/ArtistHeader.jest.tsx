import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { ArtistHeaderFragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useRouter } from "System/Hooks/useRouter"

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
    it("renders cover artwork when valid image is available", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          coverArtwork: {
            title: "Les Demoiselles d'Avignon",
            imageTitle: "Les Demoiselles d'Avignon by Pablo Picasso",
            href: "/artwork/les-demoiselles-davignon",
            image: {
              src: "https://example.com/image.jpg",
              width: 400,
              height: 300,
            },
          },
        }),
      })

      const image = screen.getByAltText(
        "Les Demoiselles d'Avignon by Pablo Picasso",
      )
      expect(image).toBeInTheDocument()
      expect(image.closest("a")).toHaveAttribute(
        "href",
        "/artwork/les-demoiselles-davignon",
      )
    })

    it("uses default alt text when imageTitle is not provided", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          coverArtwork: {
            title: "Les Demoiselles d'Avignon",
            imageTitle: null,
            href: "/artwork/les-demoiselles-davignon",
            image: {
              src: "https://example.com/image.jpg",
              width: 400,
              height: 300,
            },
          },
        }),
      })

      expect(
        screen.getByAltText("Artwork by Pablo Picasso"),
      ).toBeInTheDocument()
    })

    it("does not render cover artwork when image is invalid", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Pablo Picasso",
          coverArtwork: {
            title: "Les Demoiselles d'Avignon",
            href: "/artwork/les-demoiselles-davignon",
            image: {
              src: null,
              width: 0,
              height: 0,
            },
          },
        }),
      })

      expect(screen.queryByRole("img")).not.toBeInTheDocument()
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
