import { screen } from "@testing-library/react"
import { ShowHoursFragmentContainer } from "Apps/Show/Components/ShowHours"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ShowHoursFragmentContainer,
  query: graphql`
    query ShowHoursTestQuery @relay_test_operation {
      show(id: "example") {
        ...ShowHours_show
      }
    }
  `,
})

describe("ShowHours", () => {
  it("renders the schedules if they exist", () => {
    renderWithRelay({
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

    expect(screen.getByText(/Monday, Sunday, Closed/)).toBeInTheDocument()
    expect(screen.getByText(/Tuesday–Saturday, 12pm–6pm/)).toBeInTheDocument()
  })

  it("renders the text if it exists", () => {
    renderWithRelay({
      Location: () => ({ openingHours: { __typename: "OpeningHoursText" } }),
      OpeningHoursText: () => ({ text: "Open 24-7" }),
    })

    expect(screen.getByText("Open 24-7")).toBeInTheDocument()
  })

  it("renders nothing if the opening hours are text but the text is null", () => {
    const { container } = renderWithRelay({
      Location: () => ({ openingHours: { __typename: "OpeningHoursText" } }),
      OpeningHoursText: () => ({ text: null }),
    })

    expect(container.firstChild).toBeNull()
  })

  it("renders nothing if the opening hours are an array but null", () => {
    const { container } = renderWithRelay({
      Location: () => ({ openingHours: { __typename: "OpeningHoursArray" } }),
      OpeningHoursArray: () => ({ schedules: null }),
    })

    expect(container.firstChild).toBeNull()
  })
})
