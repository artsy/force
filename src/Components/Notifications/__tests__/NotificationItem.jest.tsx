import { screen } from "@testing-library/react"
import { SUPPORTED_NOTIFICATION_TYPES } from "Components/Notifications/Notification"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { NotificationItem_test_Query } from "__generated__/NotificationItem_test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<NotificationItem_test_Query>({
  Component: (props: any) => {
    const notification = props.notificationsConnection?.edges?.[0]?.node
    const mode = props.mode || "page"

    if (notification) {
      return (
        <NotificationItemFragmentContainer
          notification={notification}
          mode={mode}
        />
      )
    }

    return null
  },
  query: graphql`
    query NotificationItem_test_Query @relay_test_operation {
      notificationsConnection(first: 1) {
        edges {
          node {
            ...NotificationItem_notification
          }
        }
      }
    }
  `,
})

describe("NotificationItem", () => {
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

    expect(screen.getAllByRole("presentation")).toHaveLength(4)
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

      const indicator = screen.queryByLabelText("Unread")
      expect(indicator).not.toBeInTheDocument()
    })

    it("should be rendered when notification is unread", () => {
      renderWithRelay({
        Notification: () => ({
          ...notification,
          isUnread: true,
        }),
      })

      const indicator = screen.queryByLabelText("Unread")
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

  describe("notification url", () => {
    describe("dropdown mode with single-object notifications", () => {
      describe("partner show notification", () => {
        it("returns notification page url", () => {
          renderWithRelay(
            {
              Notification: () => ({
                ...notification,
                notificationType: "PARTNER_OFFER_CREATED",
                objectsCount: 1,
                targetHref: "/partner-offer-url",
              }),
            },
            { mode: "dropdown" },
          )

          expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            "/notification/notification-internal-id",
          )
        })
      })

      describe("other notifications", () => {
        it.each(
          SUPPORTED_NOTIFICATION_TYPES.filter(
            type => type !== "PARTNER_OFFER_CREATED",
          ),
        )("navigates to targetHref for %s", notificationType => {
          renderWithRelay(
            {
              Notification: () => ({
                ...notification,
                notificationType: notificationType,
                objectsCount: 1,
                targetHref: "/target-href",
              }),
            },
            { mode: "dropdown" },
          )

          expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            "/target-href",
          )
        })
      })
    })

    describe("supported notification types", () => {
      it.each(SUPPORTED_NOTIFICATION_TYPES)(
        "returns notification page url",
        notificationType => {
          renderWithRelay({
            Notification: () => ({
              ...notification,
              notificationType: notificationType,
              objectsCount: 2,
              targetHref: "/target-href",
            }),
          })

          expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            "/notification/notification-internal-id",
          )
        },
      )
    })
  })
})

const notification = {
  internalID: "notification-internal-id",
  title: "Notification Title",
  message: "Notification Message",
  headline: "Notification Headline",
  publishedAt: "2 days ago",
  isUnread: false,
  notificationType: "ARTWORK_PUBLISHED",
  objectsCount: 0,
  previewImages: [
    {
      resized: {
        srcSet: "artwork-image-one",
      },
    },
    {
      resized: {
        srcSet: "artwork-image-two",
      },
    },
    {
      resized: {
        srcSet: "artwork-image-three",
      },
    },
    {
      resized: {
        srcSet: "artwork-image-four",
      },
    },
  ],
}
