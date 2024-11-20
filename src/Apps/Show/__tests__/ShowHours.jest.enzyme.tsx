import { graphql } from "react-relay"
import { ShowHoursFragmentContainer } from "Apps/Show/Components/ShowHours"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ShowHoursFragmentContainer,
  query: graphql`
    query ShowHours_Test_Query @relay_test_operation {
      show(id: "example") {
        ...ShowHours_show
      }
    }
  `,
})

describe("ShowHours", () => {
  it("renders the schedules if they exist", () => {
    const { wrapper } = getWrapper({
      Location: () => ({ openingHours: { __typename: "OpeningHoursArray" } }),
      OpeningHoursArray: () => ({
        schedules: [
          {
            days: "Monday, Sunday",
            hours: "Closed",
          },
          {
            days: "Tuesday–Saturday",
            hours: "12pm–6pm",
          },
        ],
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("Monday, Sunday, Closed")
    expect(html).toContain("Tuesday–Saturday, 12pm–6pm")
  })

  it("renders the text if it exists", () => {
    const { wrapper } = getWrapper({
      Location: () => ({ openingHours: { __typename: "OpeningHoursText" } }),
      OpeningHoursText: () => ({ text: "Open 24-7" }),
    })

    const html = wrapper.html()

    expect(html).toContain("Open 24-7")
  })

  it("renders nothing if the opening hours are text but the text is null", () => {
    const { wrapper } = getWrapper({
      Location: () => ({ openingHours: { __typename: "OpeningHoursText" } }),
      OpeningHoursText: () => ({ text: null }),
    })

    const html = wrapper.html()

    expect(html).toBe("")
  })

  it("renders nothing if the opening hours are an array but null", () => {
    const { wrapper } = getWrapper({
      Location: () => ({ openingHours: { __typename: "OpeningHoursArray" } }),
      OpeningHoursArray: () => ({ schedules: null }),
    })

    const html = wrapper.html()

    expect(html).toBe("")
  })
})
