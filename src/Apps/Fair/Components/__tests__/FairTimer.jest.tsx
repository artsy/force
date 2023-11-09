import { graphql } from "react-relay"
import { DateTime } from "luxon"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { FairTimer_Test_Query } from "__generated__/FairTimer_Test_Query.graphql"
import { FairTimerFragmentContainer } from "Apps/Fair/Components/FairOverview/FairTimer"

jest.unmock("react-relay")

describe("FairTimer", () => {
  const { getWrapper } = setupTestWrapper<FairTimer_Test_Query>({
    Component: FairTimerFragmentContainer,
    query: graphql`
      query FairTimer_Test_Query @relay_test_operation {
        fair(id: "example") {
          ...FairTimer_fair
        }
      }
    `,
  })

  it("should return closed if the fair has passed", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        startAt: "2020-08-19T08:00:00+00:00",
        endAt: "2020-09-19T08:00:00+00:00",
      }),
    })

    expect(wrapper.text()).toContain("Closed")
  })

  it("displays the relevant timing info", () => {
    const startAt = DateTime.local().plus({ days: 1 }).toString()
    const endAt = DateTime.local().plus({ days: 2 }).toString()

    const { wrapper } = getWrapper({
      Fair: () => ({
        startAt,
        endAt,
      }),
    })

    expect(wrapper.text()).toContain("Closes in:")
  })
})
