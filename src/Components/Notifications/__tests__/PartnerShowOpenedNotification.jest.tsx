import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { PartnerShowOpenedNotification } from "Components/Notifications/PartnerShowOpenedNotification"
import { PartnerShowOpenedNotification_test_Query } from "__generated__/PartnerShowOpenedNotification_test_Query.graphql"

jest.unmock("react-relay")
jest.mock("System/Hooks/useFeatureFlag", () => ({ useFeatureFlag: jest.fn() }))

const { renderWithRelay } = setupTestWrapperTL<
  PartnerShowOpenedNotification_test_Query
>({
  Component: props => {
    const notification = props.notificationsConnection?.edges?.[0]?.node

    if (notification) {
      return <PartnerShowOpenedNotification notification={notification} />
    }

    return null
  },
  query: graphql`
    query PartnerShowOpenedNotification_test_Query @relay_test_operation {
      notificationsConnection(first: 1) {
        edges {
          node {
            ...PartnerShowOpenedNotification_notification
          }
        }
      }
    }
  `,
})

describe("PartnerShowOpenedNotification", () => {
  it("renders the notification", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    // header

    expect(screen.getByText("1 show opened at THEO")).toBeInTheDocument()
    expect(screen.getByText("Show")).toBeInTheDocument()
    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.getByText("THEO")).toBeInTheDocument()

    // show

    expect(screen.getByText("THEO at ART OnO")).toBeInTheDocument()
    expect(screen.getByText("April 19 – 21, 2022 — Closed")).toBeInTheDocument()
    expect(screen.getByText("show description")).toBeInTheDocument()
  })

  it("has working links to partner and show", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByTestId("partner-link")).toHaveAttribute(
      "href",
      "/partner/theo"
    )
    expect(screen.getByTestId("view-show-button")).toHaveAttribute(
      "href",
      "/show/theo-theo-at-art-ono"
    )
  })
})

const notification = {
  notificationType: "PARTNER_SHOW_OPENED",
  targetHref: "/show/theo-theo-at-art-ono",
  artworksConnection: {
    edges: [],
    totalCount: 0,
  },
  headline: "1 show opened at THEO ",
  item: {
    __typename: "ShowOpenedNotificationItem",
    partner: {
      href: "/partner/theo",
      name: "THEO",
      profile: {
        internalID: "profile-id",
      },
    },
    showsConnection: {
      edges: [
        {
          node: {
            location: {
              city: null,
            },
            exhibitionPeriod: "April 19 – 21, 2022",
            startAt: "2022-04-19T14:00:00+02:00",
            endAt: "2022-04-21T14:00:00+02:00",
            name: "THEO  at ART OnO",
            description: "show description",
            href: "/show/theo-theo-at-art-ono",
          },
        },
      ],
    },
  },
  publishedAt: "Today",
  offerArtworksConnection: {
    edges: [],
  },
}
