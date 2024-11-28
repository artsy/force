import { ViewingRoomCardFragmentContainer } from "Apps/Partner/Components/PartnerViewingRooms/ViewingRoomCard"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Utils/getENV", () => ({
  getENV: () => "",
}))

const { getWrapper } = setupTestWrapper({
  Component: ({ partner }: any) => {
    return (
      <ViewingRoomCardFragmentContainer
        viewingRoom={partner.viewingRoomsConnection.edges[0].node}
      />
    )
  },
  query: graphql`
    query ViewingRoomCard_Test_Query @relay_test_operation {
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
    const { wrapper } = getWrapper({
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

    expect(wrapper.find("a").props().href).toEqual(
      "/viewing-room/antonio-colombo-ceramic-girl-s"
    )
    expect(wrapper.find("img").props().src).toEqual(
      "?height=222&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCTSbMK5RHzG9k8wJDp2jdw%2Fnormalized.jpg&width=263"
    )
    expect(wrapper.find("img").props().srcSet).toEqual(
      "?height=222&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCTSbMK5RHzG9k8wJDp2jdw%2Fnormalized.jpg&width=263 1x, ?height=444&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCTSbMK5RHzG9k8wJDp2jdw%2Fnormalized.jpg&width=526 2x"
    )
    expect(wrapper.find("img").props().alt).toEqual("Ceramic Girl(s)")
    expect(wrapper.find("h5").first().text()).toEqual("Viewing Room")
    expect(wrapper.find("h4").first().text()).toEqual("Ceramic Girl(s)")
    expect(wrapper.find("h6").first().text()).toEqual("Aug 20 – Sep 20")
  })

  it("not renders the text if no data is null/undefined", () => {
    const { wrapper } = getWrapper({
      ViewingRoom: () => ({
        title: null,
        href: null,
        exhibitionPeriod: null,
        coverImage: null,
      }),
    })
    expect(wrapper.find("img").length).toEqual(0)
    expect(wrapper.find("h5").length).toEqual(0)
    expect(wrapper.find("h4").length).toEqual(0)
    expect(wrapper.find("h6").length).toEqual(0)
  })
})
