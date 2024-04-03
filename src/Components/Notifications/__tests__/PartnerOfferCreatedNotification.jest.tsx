import { screen } from "@testing-library/react"
import { PartnerOfferCreatedNotification } from "Components/Notifications/PartnerOfferCreatedNotification"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { PartnerOfferCreatedNotification_test_Query } from "__generated__/PartnerOfferCreatedNotification_test_Query.graphql"

jest.unmock("react-relay")
jest.mock("System/useFeatureFlag", () => ({ useFeatureFlag: jest.fn() }))

const { renderWithRelay } = setupTestWrapperTL<
  PartnerOfferCreatedNotification_test_Query
>({
  Component: props => {
    const notification = props.notificationsConnection?.edges?.[0]?.node

    if (notification) {
      return <PartnerOfferCreatedNotification notification={notification} />
    }

    return null
  },
  query: graphql`
    query PartnerOfferCreatedNotification_test_Query @relay_test_operation {
      notificationsConnection(first: 1) {
        edges {
          node {
            ...PartnerOfferCreatedNotification_notification
          }
        }
      }
    }
  `,
})

describe("PartnerOfferCreatedNotification", () => {
  beforeAll(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(
      featureName => featureName === "onyx_new_notification_page"
    )
  })

  it("renders page", () => {
    renderWithRelay({
      Notification: () => notification(),
    })

    // header
    expect(screen.getByText("Saved work by Damon Zucconi")).toBeInTheDocument()
    expect(
      screen.getByText("Review the offer on your saved artwork")
    ).toBeInTheDocument()
    expect(screen.getByTestId("manage-saves-link")).toHaveAttribute(
      "href",
      "/collector-profile/saves"
    )

    // artwork
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "undefined?quality=80&resize_to=width&src=artwork-image-one&width=600"
    )
    expect(screen.getByText("$900")).toBeInTheDocument()
    expect(screen.getByText("(List price: $1,000)")).toBeInTheDocument()

    // Continue to purchase button
    expect(screen.getByTestId("partner-offer-artwork-button")).toHaveAttribute(
      "href",
      "/partner-offer/offer-id/checkout"
    )
  })

  describe("when note is present", () => {
    it("renders note", () => {
      renderWithRelay({
        Notification: () =>
          notification("2099-01-01T00:00:00+00:00", true, "Please buy this!"),
      })

      expect(screen.getByText("Note from the gallery:")).toBeInTheDocument()
      expect(screen.getByText("Please buy this!")).toBeInTheDocument()
    })
  })

  describe("button states", () => {
    describe("when offer is expired", () => {
      it("renders View Work button", () => {
        renderWithRelay({
          Notification: () => notification("2021-01-01T00:00:00+00:00"),
        })

        expect(screen.getByText("View Work")).toBeInTheDocument()
        expect(
          screen.getByTestId("partner-offer-artwork-button")
        ).toHaveAttribute("href", "/artwork/artwork-one?expired_offer=true")
      })
    })

    describe("when artwork is not available", () => {
      it("renders Create Alert button", () => {
        renderWithRelay({
          Notification: () => notification("2099-01-01T00:00:00+00:00", false),
        })

        expect(screen.getByText("Create Alert")).toBeInTheDocument()
        expect(
          screen.getByTestId("partner-offer-artwork-button")
        ).toHaveAttribute("href", "/artwork/artwork-one?unavailable=true")
      })
    })
  })
})

const notification = (
  endAt = "2099-01-01T00:00:00+00:00",
  isAvailable = true,
  note = ""
) => {
  return {
    headline: "Saved work by Damon Zucconi",
    targetHref: "/partner-offer/offer-id/checkout",
    item: {
      partnerOffer: {
        endAt: endAt,
        isAvailable: isAvailable,
        note: note,
        priceWithDiscount: {
          display: "$900",
        }
      },
    },
    offerArtworksConnection: {
      edges: [
        {
          node: {
            internalID: "artwork-one",
            href: "/artwork/artwork-one",
            title: "Artwork One",
            artistNames: "Artist One",
            price: "$1,000",
            image: {
              src: "artwork-image-one",
              width: 6720,
              height: 4480,
            },
          },
        },
      ],
    },
  }
}
