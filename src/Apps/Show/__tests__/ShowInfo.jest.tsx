import { ShowInfoFragmentContainer } from "Apps/Show/Routes/ShowInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ShowInfoFragmentContainer,
  query: graphql`
    query ShowInfoTestQuery {
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

      renderWithRelay({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(
        screen.getByRole("heading", { level: 1, name: "About" })
      ).toBeInTheDocument()
      expect(screen.queryByText("Shows & Fairs")).not.toBeInTheDocument()
      expect(
        screen.getByRole("heading", { level: 2, name: "Gallery" })
      ).toBeInTheDocument()
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

      renderWithRelay({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(screen.getByText("Shows & Fairs")).toBeInTheDocument()
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: "Number one best event",
        })
      ).toBeInTheDocument()
      expect(screen.getByText("noon to 1:00")).toBeInTheDocument()
      expect(
        screen.getByText("This is going to be a fun event!")
      ).toBeInTheDocument()
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

      renderWithRelay({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(screen.getByText("Opening Ceremony")).toBeInTheDocument()
    })
  })

  describe("with a null event", () => {
    it("skips rendering that event", () => {
      const event = null

      const events = [event]

      renderWithRelay({
        Show: () => ({ events }),
        Partner: () => ({ type: "Gallery" }),
      })

      expect(screen.getByText("Shows & Fairs")).toBeInTheDocument()
      // No specific event headings should be present when event is null
      const headings = screen.getAllByRole("heading", { level: 3 })
      const eventHeadings = headings.filter(
        heading =>
          !["Statement", "Press Release", "Location"].includes(
            heading.textContent || ""
          )
      )
      expect(eventHeadings).toHaveLength(0)
    })
  })
})
