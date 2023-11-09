import { graphql } from "react-relay"
import { ShowInfoFragmentContainer } from "Apps/Show/Routes/ShowInfo"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ShowInfoFragmentContainer,
  query: graphql`
    query ShowInfo_Test_Query {
      show(id: "xxx") {
        ...ShowInfo_show
      }
    }
  `,
})

describe("ShowInfo", () => {
  describe("default rendering", () => {
    it("renders the basic page", () => {
      const events = []

      const { wrapper } = getWrapper({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(wrapper.find("h1")).toHaveLength(1)
      expect(wrapper.find("h1").text()).toEqual("About")
      expect(wrapper.find("EventList")).toHaveLength(0)
      expect(wrapper.find("h2").text()).toEqual("Gallery")
    })
  })

  describe("with an event", () => {
    it("renders that event", () => {
      const event = {
        title: "Number one best event",
        dateTimeRange: "noon to 1:00",
        description: "This is going to be a fun event!",
      }

      const events = [event]

      const { wrapper } = getWrapper({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(wrapper.find("EventList")).toHaveLength(1)
      const eventList = wrapper.find("EventList")

      expect(eventList.find("h3").text()).toEqual("Number one best event")
      expect(eventList.text()).toContain("noon to 1:00")
      expect(eventList.text()).toContain("This is going to be a fun event!")
    })
  })

  describe("with an event that has no title", () => {
    it("renders the event type instead", () => {
      const event = {
        title: null,
        eventType: "Opening Ceremony",
        dateTimeRange: "noon to 1:00",
        description: "This is going to be a fun event!",
      }

      const events = [event]

      const { wrapper } = getWrapper({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(wrapper.text()).toContain("Opening Ceremony")
    })
  })

  describe("with a null event", () => {
    it("skips rendering that event", () => {
      const event = null

      const events = [event]

      const { wrapper } = getWrapper({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(wrapper.find("EventList")).toHaveLength(1)
      const eventList = wrapper.find("EventList")
      expect(eventList.find("h3")).toHaveLength(0)
    })
  })
})
