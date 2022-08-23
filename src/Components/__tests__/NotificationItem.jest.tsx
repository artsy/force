import { screen } from "@testing-library/react"
import {
  getDateLabel,
  NotificationItemFragmentContainer,
} from "Components/NotificationItem"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import { NotificationItem_test_Query } from "__generated__/NotificationItem_test_Query.graphql"

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

  it("should render 'x days ago' label", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByText("1 days ago")).toBeInTheDocument()
  })

  it("should render 'Today' label", () => {
    renderWithRelay({
      Notification: () => ({
        ...notification,
        createdAt: DateTime.utc().minus({ hours: 1 }),
      }),
    })

    expect(screen.getByText("Today")).toBeInTheDocument()
  })

  it("should render artwork images", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    const imageOne = screen.getByAltText("Artwork image of artwork one")
    expect(imageOne).toBeInTheDocument()

    const imageTwo = screen.getByAltText("Artwork image of artwork one")
    expect(imageTwo).toBeInTheDocument()
  })
})

describe("getDateLabel", () => {
  it("returns 'Today' label", () => {
    const result1 = getDateLabel(DateTime.utc().minus({ hours: 1 }))
    expect(result1).toEqual("Today")

    const result2 = getDateLabel(DateTime.utc().minus({ hours: 5 }))
    expect(result2).toEqual("Today")

    const result3 = getDateLabel(
      DateTime.utc().minus({ hours: 23, minutes: 59, seconds: 59 })
    )
    expect(result3).toEqual("Today")
  })

  it("returns 'x days ago' label", () => {
    const result1 = getDateLabel(DateTime.utc().minus({ days: 1 }))
    expect(result1).toEqual("1 days ago")

    const result2 = getDateLabel(DateTime.utc().minus({ days: 2 }))
    expect(result2).toEqual("2 days ago")

    const result3 = getDateLabel(DateTime.utc().minus({ days: 31 }))
    expect(result3).toEqual("31 days ago")

    const result4 = getDateLabel(DateTime.utc().minus({ days: 365 }))
    expect(result4).toEqual("365 days ago")
  })
})

const notificationEdges = [
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
]

const notification = {
  title: "Notification Title",
  message: "Notification Message",
  createdAt: DateTime.utc().minus({ days: 1 }),
  artworksConnection: {
    totalCount: 2,
    edges: notificationEdges,
  },
}
