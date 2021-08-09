import moment from "moment"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerTimingFragmentContainer } from "../FairOrganizerTiming"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairOrganizerTimingFragmentContainer,
  query: graphql`
    query FairOrganizerTiming_Test_Query {
      fair(id: "example") {
        ...FairOrganizerTiming_fair
      }
    }
  `,
})

describe("FairOrganizerTiming", () => {
  it("displays period", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        exhibitionPeriod: "Sep 10 - 19",
      }),
    })
    expect(wrapper.text()).toContain("Sep 10 - 19")
  })

  it("doesn't display timer if event is passed", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        startAt: "2020-09-01T05:00:00+03:00",
      }),
    })
    expect(wrapper.find("Timer").length).toBe(0)
  })

  it("displays timer if event starts in future", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        startAt: moment().add(1, "day"),
      }),
    })
    expect(wrapper.find("Timer").length).toBe(1)
    expect(wrapper.text()).toContain("Opens in:")
  })
})
