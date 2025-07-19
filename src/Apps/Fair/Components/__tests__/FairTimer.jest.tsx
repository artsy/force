import { FairTimerFragmentContainer } from "Apps/Fair/Components/FairOverview/FairTimer"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairTimer_Test_Query } from "__generated__/FairTimer_Test_Query.graphql"
import { DateTime } from "luxon"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("FairTimer", () => {
  const { renderWithRelay } = setupTestWrapperTL<FairTimer_Test_Query>({
    Component: ({ fair }) => <FairTimerFragmentContainer fair={fair!} />,
    query: graphql`
      query FairTimer_Test_Query @relay_test_operation {
        fair(id: "example") {
          ...FairTimer_fair
        }
      }
    `,
  })

  it("should return closed if the fair has passed", () => {
    renderWithRelay({
      Fair: () => ({
        startAt: "2020-08-19T08:00:00+00:00",
        endAt: "2020-09-19T08:00:00+00:00",
      }),
    })

    expect(screen.getByText("Closed")).toBeInTheDocument()
  })

  it("displays the relevant timing info", () => {
    const startAt = DateTime.local().plus({ days: 1 }).toString()
    const endAt = DateTime.local().plus({ days: 2 }).toString()

    renderWithRelay({
      Fair: () => ({
        startAt,
        endAt,
      }),
    })

    expect(screen.getByText("Closes in:")).toBeInTheDocument()
  })
})
