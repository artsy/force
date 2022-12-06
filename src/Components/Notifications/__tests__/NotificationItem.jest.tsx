import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NotificationItem_test_Query } from "__generated__/NotificationItem_test_Query.graphql"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"

jest.unmock("react-relay")

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
  it("should render title", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByText("Notification Title")).toBeInTheDocument()
  })

  it("should render message", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByText("Notification Message")).toBeInTheDocument()
  })

  it("should render the formatted publication date", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByText("2 days ago")).toBeInTheDocument()
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
          artworksConnection: {
            ...notification.artworksConnection,
          },
        }),
      })

      expect(screen.getByText("+ 6")).toBeInTheDocument()
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
    it("should NOT be rendered by default", () => {
      renderWithRelay({
        Notification: () => notification,
      })

      const label = screen.queryByLabelText(/Notification type: .+/i)
      expect(label).not.toBeInTheDocument()
    })

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
  })
})

const artworks = [
  {
    node: {
      internalID: "artwork-id-one",
      title: "artwork one",
      image: {
        thumb: {
          src: "artwork-image-one",
          srcSet: "artwork-image-one",
        },
      },
    },
  },
  {
    node: {
      internalID: "artwork-id-two",
      title: "artwork two",
      image: {
        thumb: {
          src: "artwork-image-two",
          srcSet: "artwork-image-two",
        },
      },
    },
  },
  {
    node: {
      internalID: "artwork-id-three",
      title: "artwork three",
      image: {
        thumb: {
          src: "artwork-image-three",
          srcSet: "artwork-image-three",
        },
      },
    },
  },
  {
    node: {
      internalID: "artwork-id-four",
      title: "artwork four",
      image: {
        thumb: {
          src: "artwork-image-four",
          srcSet: "artwork-image-four",
        },
      },
    },
  },
]

const notification = {
  title: "Notification Title",
  message: "Notification Message",
  publishedAt: "2 days ago",
  isUnread: false,
  notificationType: "ARTWORK_PUBLISHED",
  objectsCount: 0,
  artworksConnection: {
    edges: artworks,
  },
}
