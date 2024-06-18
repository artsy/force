import { waitFor, screen } from "@testing-library/react"
import { ArtworkPageBanner } from "Apps/Artwork/Components/ArtworkPageBanner"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { DeepPartial } from "Utils/typeSupport"
import { ArtworkPageBanner_Test_Query$rawResponse } from "__generated__/ArtworkPageBanner_Test_Query.graphql"
import { graphql } from "react-relay"

const mockUseRouter = useRouter as jest.Mock
const mockUseFeatureFlag = useFeatureFlag as jest.Mock

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({ match: { location: { query: {} } } })),
}))

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

jest.unmock("react-relay")
let artworkMock: DeepPartial<
  ArtworkPageBanner_Test_Query$rawResponse["artwork"]
>
let meMock: DeepPartial<ArtworkPageBanner_Test_Query$rawResponse["me"]>

beforeEach(() => {
  // Enable all feature flags
  mockUseFeatureFlag.mockClear()
  mockUseRouter.mockClear()
  artworkMock = {
    sale: null,
    isPurchasable: true,
  }
  meMock = {}
})

const getAllBannerTexts = () =>
  screen.queryAllByText(/.+/).map(el => el.textContent)

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <ArtworkPageBanner artwork={props.artwork} me={props.me} />
  },
  query: graphql`
    query ArtworkPageBanner_Test_Query @raw_response_type {
      artwork(id: "erik-s-mona-lisa") {
        ...ArtworkPageBanner_artwork
      }
      me {
        ...ArtworkPageBanner_me @arguments(artworkID: "erik-s-mona-lisa")
      }
    }
  `,
})

describe("ArtworkPageBanner", () => {
  it("shows the unpublished artwork banner if the artwork is not published", async () => {
    renderWithRelay({
      Artwork: () => ({
        published: false,
        sale: null,
      }),
      Me: () => meMock,
    })

    await waitFor(() => {
      expect(
        screen.getByText("This work is not currently published on Artsy.")
      ).toBeInTheDocument()
      expect(getAllBannerTexts()).toEqual([
        "This work is not currently published on Artsy.",
      ])
    })
  })

  describe("Artwork is in a sale with cascading end times", () => {
    it("shows the cascading end times banner if enabled without extended bidding intervals", async () => {
      renderWithRelay({
        Artwork: () => ({
          sale: {
            cascadingEndTimeIntervalMinutes: 10,
            extendedBiddingIntervalMinutes: null,
          },
        }),
        Me: () => meMock,
      })

      await waitFor(() => {
        expect(
          screen.getByText("Lots close at 10-minute intervals.")
        ).toBeInTheDocument()
        expect(getAllBannerTexts()).toEqual([
          "Lots close at 10-minute intervals.",
        ])
      })
    })
  })

  it("shows the unavailable banner if the query string includes ?unavailable=true", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          query: {
            unavailable: "true",
          },
        },
      },
    })

    renderWithRelay({
      Artwork: () => artworkMock,
      Me: () => meMock,
    })

    expect(
      screen.getByText(
        "Sorry, this artwork is no longer available. Please create an alert or contact the gallery to find similar artworks."
      )
    ).toBeInTheDocument()
  })

  it("shows the expired offer banner if the query string includes ?expired_offer=true", async () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          query: {
            expired_offer: "true",
          },
        },
      },
    })

    renderWithRelay({
      Artwork: () => artworkMock,
      Me: () => ({
        ...meMock,
        partnerOffersConnection: {
          edges: [
            {
              // even though we do have a matching partner offer
              node: {},
            },
          ],
        },
      }),
    })

    await waitFor(() => {
      expect(
        screen.getByText(
          "This offer has expired. Please make an offer, purchase, or contact the gallery."
        )
      ).toBeInTheDocument()
      expect(getAllBannerTexts()).toEqual([
        "This offer has expired. Please make an offer, purchase, or contact the gallery.",
      ])
    })
  })

  describe("page query string expects a partner offer", () => {
    beforeEach(() => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            query: {
              partner_offer_id: "123",
            },
          },
        },
      })
    })

    it("shows the partner offer banner if the user doesn't have a matching partner offer", async () => {
      renderWithRelay({
        Artwork: () => artworkMock,
        Me: () => ({
          ...meMock,
          partnerOffersConnection: {
            edges: [],
          },
        }),
      })

      await waitFor(() => {
        expect(
          screen.getByText(
            "This offer has expired. Please make an offer, purchase, or contact the gallery."
          )
        ).toBeInTheDocument()

        expect(getAllBannerTexts()).toEqual([
          "This offer has expired. Please make an offer, purchase, or contact the gallery.",
        ])
      })
    })

    it("shows the partner offer banner if the user has a matching partner offer but it is not purchasable", async () => {
      renderWithRelay({
        Artwork: () => ({ ...artworkMock, isPurchasable: false }),
        Me: () => ({
          ...meMock,
          partnerOffersConnection: {
            edges: [
              {
                node: {
                  internalID: "123",
                },
              },
            ],
          },
        }),
      })

      await waitFor(() => {
        expect(
          screen.getByText(
            "Sorry, this artwork is no longer available. Please create an alert or contact the gallery to find similar artworks."
          )
        ).toBeInTheDocument()

        expect(getAllBannerTexts()).toEqual([
          "Sorry, this artwork is no longer available. Please create an alert or contact the gallery to find similar artworks.",
        ])
      })
    })

    it("shows the partner offer banner if the user has no matching partner offer and it is not purchasable", async () => {
      renderWithRelay({
        Artwork: () => ({ ...artworkMock, isPurchasable: false }),
        Me: () => ({
          ...meMock,
          partnerOffersConnection: {
            edges: [],
          },
        }),
      })

      await waitFor(() => {
        expect(
          screen.getByText(
            "Sorry, this artwork is no longer available. Please create an alert or contact the gallery to find similar artworks."
          )
        ).toBeInTheDocument()

        expect(getAllBannerTexts()).toEqual([
          "Sorry, this artwork is no longer available. Please create an alert or contact the gallery to find similar artworks.",
        ])
      })
    })

    it("does not show the partner offer banner if the user has a matching partner offer", async () => {
      renderWithRelay({
        Artwork: () => artworkMock,
        Me: () => ({
          ...meMock,
          partnerOffersConnection: {
            edges: [
              {
                node: {
                  internalID: "123",
                },
              },
            ],
          },
        }),
      })

      await flushPromiseQueue()
      expect(
        screen.queryByText("This offer has expired.")
      ).not.toBeInTheDocument()

      expect(getAllBannerTexts()).toEqual([])
    })
  })
})
