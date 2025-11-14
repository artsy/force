import { ViewingRoomCardFragmentContainer } from "Apps/Partner/Components/PartnerViewingRooms/ViewingRoomCard"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Utils/getENV", () => ({
  getENV: () => "",
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ partner }: any) => {
    return (
      <ViewingRoomCardFragmentContainer
        viewingRoom={partner.viewingRoomsConnection.edges[0].node}
      />
    )
  },
  query: graphql`
    query ViewingRoomCardTestQuery @relay_test_operation {
      partner(id: "white-cube") @principalField {
        viewingRoomsConnection(first: 12) {
          edges {
            node {
              internalID
              ...ViewingRoomCard_viewingRoom
            }
          }
        }
      }
    }
  `,
})

describe("ViewingRoomCard", () => {
  it("renders correctly", () => {
    renderWithRelay({
      ViewingRoom: () => ({
        title: "Ceramic Girl(s)",
        href: "/viewing-room/antonio-colombo-ceramic-girl-s",
        exhibitionPeriod: "Aug 20 – Sep 20",
        coverImage: {
          imageURLs: {
            normalized:
              "https://d32dm0rphc51dk.cloudfront.net/CTSbMK5RHzG9k8wJDp2jdw/normalized.jpg",
          },
          width: 2262,
          height: 2362,
        },
      }),
    })

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/viewing-room/antonio-colombo-ceramic-girl-s",
    )

    const image = screen.getByRole("img")
    expect(image).toHaveAttribute(
      "src",
      "?height=222&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCTSbMK5RHzG9k8wJDp2jdw%2Fnormalized.jpg&width=263",
    )
    expect(image).toHaveAttribute(
      "srcSet",
      "?height=222&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCTSbMK5RHzG9k8wJDp2jdw%2Fnormalized.jpg&width=263 1x, ?height=444&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCTSbMK5RHzG9k8wJDp2jdw%2Fnormalized.jpg&width=526 2x",
    )
    expect(image).toHaveAttribute("alt", "Ceramic Girl(s)")

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Viewing Room",
    )
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Ceramic Girl(s)",
    )
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Aug 20 – Sep 20",
    )
  })

  it("not renders the text if no data is null/undefined", () => {
    renderWithRelay({
      ViewingRoom: () => ({
        title: null,
        href: null,
        exhibitionPeriod: null,
        coverImage: null,
      }),
    })

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { level: 5 })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { level: 4 })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { level: 6 })).not.toBeInTheDocument()
  })
})
