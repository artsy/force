import { ViewingRoomFragmentContainer } from "../../../Routes/ViewingRooms"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import React from "react"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ({ partner }: any) => {
    return <ViewingRoomFragmentContainer partner={partner} />
  },
  query: graphql`
    query ViewingRooms_Test_Query {
      partner(id: "white-cube") @principalField {
        ...ViewingRooms_partner
      }
    }
  `,
})

describe("ViewingRooms", () => {
  it("renders correctly Current/Upcoming Events", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentEvents: {
          edges: [
            {
              node: {
                internalID: "a504f437-12b3-4cb9-830d-6368403e5051",
              },
            },
          ],
        },
        upcomingEvents: {
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

    expect(wrapper.find('div[children="Current Events"]').length).toBe(1)
    expect(wrapper.find('div[children="Upcoming Events"]').length).toBe(1)
  })
  it("doest't render Current Events section if no currentEvents", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentEvents: null,
        upcomingEvents: {
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

    expect(wrapper.find('div[children="Current Events"]').length).toBe(0)
    expect(wrapper.find('div[children="Upcoming Events"]').length).toBe(1)
  })
  it("doest't render Upcoming Events section if no upcomingEvents", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentEvents: {
          edges: [
            {
              node: {
                internalID: "a504f437-12b3-4cb9-830d-6368403e5051",
              },
            },
          ],
        },
        upcomingEvents: null,
      }),
    })

    expect(wrapper.find('div[children="Current Events"]').length).toBe(1)
    expect(wrapper.find('div[children="Upcoming Events"]').length).toBe(0)
  })
  it("doest't render Current and Upcoming Events if no current and upcoming events", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        slug: "antonio-colombo",
        currentEvents: null,
        upcomingEvents: null,
      }),
    })

    expect(wrapper.find('div[children="Current Events"]').length).toBe(0)
    expect(wrapper.find('div[children="Upcoming Events"]').length).toBe(0)
  })
})
