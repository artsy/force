import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NotificationItem_test_Query } from "__generated__/NotificationItem_test_Query.graphql"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.unmock("react-relay")
jest.mock("System/useFeatureFlag", () => ({ useFeatureFlag: jest.fn() }))

const { renderWithRelay } = setupTestWrapperTL<NotificationItem_test_Query>({
  Component: props => {
    const notification = props.notificationsConnection?.edges?.[0]?.node

    if (notification) {
      return <NotificationItemFragmentContainer item={notification} />
    }

    return null
  },
  query: graphql`
    query NotificationItem_test_Query @relay_test_operation {
      notificationsConnection(first: 1) {
        edges {
          node {
            ...NotificationItem_item
          }
        }
      }
    }
  `,
})

describe("NotificationItem", () => {
  beforeAll(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(
      featureName => featureName === "onyx_new_notification_page"
    )
  })

  it("should render headline", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByText("Notification Headline")).toBeInTheDocument()
  })

  it("should render artwork images", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getAllByRole("img")).toHaveLength(4)
  })

  describe("the remaining artworks count", () => {
    it("should NOT be rendered if there are less or equal to 4", () => {
      renderWithRelay({
        Notification: () => notification,
      })

      const label = screen.queryByLabelText("Remaining artworks count")
      expect(label).not.toBeInTheDocument()
    })

    it("should be rendered if there are more than 4", () => {
      renderWithRelay({
        Notification: () => ({
          ...notification,
          objectsCount: 10,
        }),
      })

      expect(screen.getByText("+ 6")).toBeInTheDocument()
    })

    it("should not be rendered when notification is not artwork-based", () => {
      renderWithRelay({
        Notification: () => ({
          ...notification,
          notificationType: "PARTNER_SHOW_OPENED",
          objectsCount: 10,
        }),
      })

      const label = screen.queryByLabelText("Remaining artworks count")
      expect(label).not.toBeInTheDocument()
    })
  })

  describe("Unread notification indicator", () => {
    it("should NOT be rendered by default", () => {
      renderWithRelay({
        Notification: () => notification,
      })

      const indicator = screen.queryByLabelText("Unread notification indicator")
      expect(indicator).not.toBeInTheDocument()
    })

    it("should be rendered when notification is unread", () => {
      renderWithRelay({
        Notification: () => ({
          ...notification,
          isUnread: true,
        }),
      })

      const indicator = screen.queryByLabelText("Unread notification indicator")
      expect(indicator).toBeInTheDocument()
    })
  })

  describe("Notification type", () => {
    it("should render 'Alert'", () => {
      renderWithRelay({
        Notification: () => ({
          ...notification,
          notificationType: "ARTWORK_ALERT",
        }),
      })

      const label = screen.getByLabelText("Notification type: Alert")
      expect(label).toBeInTheDocument()
    })

    it("should render 'Follow'", () => {
      renderWithRelay({
        Notification: () => ({
          ...notification,
          notificationType: "ARTWORK_PUBLISHED",
        }),
      })

      const label = screen.getByLabelText("Notification type: Follow")
      expect(label).toBeInTheDocument()
    })

    it("should render 'Artsy Editorial'", () => {
      renderWithRelay({
        Notification: () => ({
          ...notification,
          notificationType: "ARTICLE_FEATURED_ARTIST",
        }),
      })

      const label = screen.getByLabelText("Notification type: Artsy Editorial")
      expect(label).toBeInTheDocument()
    })
  })
})

const notification = {
  title: "Notification Title",
  message: "Notification Message",
  headline: "Notification Headline",
  publishedAt: "2 days ago",
  isUnread: false,
  notificationType: "ARTWORK_PUBLISHED",
  objectsCount: 0,
  previewImages: [
    {
      url: "artwork-image-one",
    },
    {
      url: "artwork-image-two",
    },
    {
      url: "artwork-image-three",
    },
    {
      url: "artwork-image-four",
    },
  ],
}
