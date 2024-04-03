import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { PartnerShowOpenedNotification } from "Components/Notifications/PartnerShowOpenedNotification"
import { PartnerShowOpenedNotification_test_Query } from "__generated__/PartnerShowOpenedNotification_test_Query.graphql"

jest.unmock("react-relay")
jest.mock("System/useFeatureFlag", () => ({ useFeatureFlag: jest.fn() }))

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
  beforeAll(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(
      featureName => featureName === "onyx_new_notification_page"
    )
  })

  it("renders the notification", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    // header

    expect(
      screen.getByText("New Show: Water Works - Katherine Bradford")
    ).toBeInTheDocument()
    expect(screen.getByText("Show")).toBeInTheDocument()
    expect(screen.getByText("April 11 – April 14")).toBeInTheDocument()
    expect(screen.getByText("Presented by")).toBeInTheDocument()
    expect(screen.getByText("Galerie Charlot")).toBeInTheDocument()

    // artworks

    expect(screen.getByText("P2200_27831")).toBeInTheDocument()
    expect(screen.getByText("P2500-2217aa")).toBeInTheDocument()

    // buttons

    expect(screen.getByText("Visit Show")).toBeInTheDocument()
  })

  it("has working links to partner and show", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByTestId("partner-link")).toHaveAttribute(
      "href",
      "/partner/galerie-charlot"
    )
    expect(screen.getByTestId("visit-show-button")).toHaveAttribute(
      "href",
      "/show/galerie-charlot-galerie-charlot-at-expo-chicago-2024"
    )
  })
})

const notification = {
  id: "Tm90aWZpY2F0aW9uOjY2MGQyNmYwMjQwMmQ3YjYzZTQ2MzU5Yg==",
  internalID: "660d26f02402d7b63e46359b",
  notificationType: "PARTNER_SHOW_OPENED",
  targetHref: "/show/galerie-charlot-galerie-charlot-at-expo-chicago-2024",
  artworksConnection: {
    edges: [],
    totalCount: 0,
  },
  headline: "New Show: Water Works - Katherine Bradford",
  item: {
    __typename: "ShowOpenedNotificationItem",
    showsConnection: {
      edges: [
        {
          node: {
            startAt: "April 11",
            endAt: "April 14",
            artworksConnection: {
              edges: [
                {
                  node: {
                    slug: "manfred-mohr-p2200-27831",
                    href: "/artwork/manfred-mohr-p2200-27831",
                    title: "P2200_27831",
                  },
                },
                {
                  node: {
                    slug: "manfred-mohr-p2500-2217aa",
                    href: "/artwork/manfred-mohr-p2500-2217aa",
                    title: "P2500-2217aa",
                  },
                },
              ],
              totalCount: 22,
            },
          },
        },
      ],
    },
    partner: {
      href: "/partner/galerie-charlot",
      name: "Galerie Charlot",
    },
  },
}
