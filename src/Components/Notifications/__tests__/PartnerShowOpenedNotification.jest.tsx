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

    expect(
      screen.getByText("2 shows published by Institute of Contemporary Art")
    ).toBeInTheDocument()
    expect(
      screen.getByText("Show • March 1 – April 1, 2024")
    ).toBeInTheDocument()
    expect(
      screen.getByText("Presented by Institute of Contemporary Art")
    ).toBeInTheDocument()

    expect(screen.getByText("Artwork Title 1")).toBeInTheDocument()
    expect(screen.getByText("Artwork Title 2")).toBeInTheDocument()

    // buttons

    expect(screen.getByText("Visit Show")).toBeInTheDocument()
  })
})

const notification = {
  title: "Institute of Contemporary Art",
  message: "2 shows published",
  headline: "2 shows published by Institute of Contemporary Art",
  publishedAt: "2 days ago",
  isUnread: false,
  notificationType: "PARTNER_SHOW_OPENED",
  objectsCount: 1,
  item: {
    partner: {
      href: "/partner/institute-of-contemporary-art",
      name: "Institute of Contemporary Art",
      profile: {
        internalID: "ica-profile-id",
      },
    },
    showsConnection: {
      edges: {
        node: {
          internalID: "show-one",
          headline: "Damon Zucconi: When You’re Here, You’re Familiar",
          href: "/show/damon-zucconi-when-youre-here-youre-familiar",
          artworkConnection: {
            edges: [
              {
                node: {
                  title: "Artwork Title 1",
                  internalID: "artwork-one",
                  href: "/artwork/damon-zucconi-when-youre-here-youre-familiar",
                  image: {
                    imageURLs: {
                      normalized: "artwork-image-one",
                    },
                    width: 6720,
                    height: 4480,
                  },
                },
              },
              {
                node: {
                  title: "Artwork Title 2",
                  internalID: "artwork-two",
                  href: "/artwork/damon-zucconi-when-youre-here-youre-familiar",
                  image: {
                    imageURLs: {
                      normalized: "artwork-image-two",
                    },
                    width: 6720,
                    height: 4480,
                  },
                },
              },
            ],
          },
          introStatement: "intro statement...",
          image: {
            imageURLs: {
              normalized: "artwork-image-one",
            },
            width: 6720,
            height: 4480,
          },
        },
      },
    },
  },
}
