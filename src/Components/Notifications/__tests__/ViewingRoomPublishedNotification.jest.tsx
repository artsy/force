import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ViewingRoomPublishedNotification } from "Components/Notifications/ViewingRoomPublishedNotification"
import { ViewingRoomPublishedNotification_test_Query } from "__generated__/ViewingRoomPublishedNotification_test_Query.graphql"

jest.unmock("react-relay")
jest.mock("System/Hooks/useFeatureFlag", () => ({ useFeatureFlag: jest.fn() }))

const { renderWithRelay } = setupTestWrapperTL<
  ViewingRoomPublishedNotification_test_Query
>({
  Component: props => {
    const notification = props.notificationsConnection?.edges?.[0]?.node

    if (notification) {
      return <ViewingRoomPublishedNotification notification={notification} />
    }

    return null
  },
  query: graphql`
    query ViewingRoomPublishedNotification_test_Query @relay_test_operation {
      notificationsConnection(first: 1) {
        edges {
          node {
            ...ViewingRoomPublishedNotification_notification
          }
        }
      }
    }
  `,
})

describe("ViewingRoomPublishedNotification", () => {
  it("renders viewing rooms", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    // first viewing room
    expect(screen.getByText(viewingRooms[0].node.title)).toBeInTheDocument()
    expect(
      screen.getByText(viewingRooms[0].node.introStatement)
    ).toBeInTheDocument()
    expect(screen.getAllByTestId("view-works-button")[0]).toHaveAttribute(
      "href",
      viewingRooms[0].node.href
    )
    expect(screen.getAllByRole("img")[0]).toHaveAttribute(
      "src",
      `undefined?quality=80&resize_to=width&src=${viewingRooms[0].node.image.imageURLs.normalized}&width=600`
    )

    // second viewing room
    expect(screen.getByText(viewingRooms[1].node.title)).toBeInTheDocument()
    expect(
      screen.getByText(viewingRooms[1].node.introStatement)
    ).toBeInTheDocument()
    expect(screen.getAllByTestId("view-works-button")[1]).toHaveAttribute(
      "href",
      viewingRooms[1].node.href
    )
    expect(screen.getAllByRole("img")[1]).toHaveAttribute(
      "src",
      `undefined?quality=80&resize_to=width&src=${viewingRooms[1].node.image.imageURLs.normalized}&width=600`
    )
  })
})

const viewingRooms = [
  {
    node: {
      internalID: "viewing-room-one",
      title: "Damon Zucconi: When You’re Here, You’re Familiar",
      href: "/viewing-room/damon-zucconi-when-youre-here-youre-familiar",
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
  {
    node: {
      internalID: "viewing-room-two",
      title: "Chris Pappas: When You’re Not Here, You’re Not Familiar",
      href: "/viewing-room/chris-pappas-when-youre-not-here-youre-not-familiar",
      introStatement: "intro statement 2...",
      image: {
        imageURLs: {
          normalized: "artwork-image-two",
        },
        width: 6720,
        height: 4480,
      },
    },
  },
]

const notification = {
  title: "Institute of Contemporary Art",
  message: "2 viewing rooms published",
  headline: "2 viewing rooms published by Institute of Contemporary Art",
  publishedAt: "2 days ago",
  isUnread: false,
  notificationType: "VIEWING_ROOM_PUBLISHED",
  objectsCount: 2,
  item: {
    partner: {
      href: "/partner/institute-of-contemporary-art",
      name: "Institute of Contemporary Art",
      profile: {
        internalID: "ica-profile-id",
      },
    },
    viewingRoomsConnection: {
      edges: viewingRooms,
    },
  },
}
