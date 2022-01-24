import { ViewingRoomFragmentContainer } from "../../../Routes/ViewingRooms"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ({ partner }: any) => {
    return <ViewingRoomFragmentContainer partner={partner} />
  },
  query: graphql`
    query ViewingRooms_Test_Query @relay_test_operation {
      partner(id: "white-cube") @principalField {
        ...ViewingRooms_partner
      }
    }
  `,
})

describe("ViewingRooms", () => {
  it("renders correctly Current/Upcoming VRs", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentViewingRooms: {
          edges: [
            {
              node: {
                internalID: "a504f437-12b3-4cb9-830d-6368403e5051",
              },
            },
          ],
        },
        upcomingViewingRooms: {
          edges: [
            {
              node: {
                internalID: "025014b9-8bc1-45d6-8b74-4dea8d37a4ed",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.find('div[children="Current Viewing Rooms"]').length).toBe(1)
    expect(wrapper.find('div[children="Upcoming Viewing Rooms"]').length).toBe(
      1
    )
  })
  it("doest't render Current VRs section if no currentVRs", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentViewingRooms: null,
        upcomingViewingRooms: {
          edges: [
            {
              node: {
                internalID: "025014b9-8bc1-45d6-8b74-4dea8d37a4ed",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.find('div[children="Current Viewing Rooms"]').length).toBe(0)
    expect(wrapper.find('div[children="Upcoming Viewing Rooms"]').length).toBe(
      1
    )
  })
  it("doest't render Upcoming VRs section if no upcomingVRs", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentViewingRooms: {
          edges: [
            {
              node: {
                internalID: "a504f437-12b3-4cb9-830d-6368403e5051",
              },
            },
          ],
        },
        upcomingViewingRooms: null,
      }),
    })

    expect(wrapper.find('div[children="Current Viewing Rooms"]').length).toBe(1)
    expect(wrapper.find('div[children="Upcoming Viewing Rooms"]').length).toBe(
      0
    )
  })
  it("doest't render Current and Upcoming VRs if no current and upcoming VRs", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentViewingRooms: null,
        upcomingViewingRooms: null,
      }),
    })

    expect(wrapper.find('div[children="Current Viewing Rooms"]').length).toBe(0)
    expect(wrapper.find('div[children="Upcoming Viewing Rooms"]').length).toBe(
      0
    )
  })
})
