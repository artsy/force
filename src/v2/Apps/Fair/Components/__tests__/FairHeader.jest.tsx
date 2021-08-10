import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairHeaderFragmentContainer } from "../FairHeader"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairHeaderFragmentContainer,
  query: graphql`
    query FairHeader_Test_Query {
      fair(id: "example") {
        ...FairHeader_fair
      }
    }
  `,
})

describe("FairHeader", () => {
  it("displays fair name", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        name: "Miart 2020",
        slug: "miart-2020",
      }),
    })

    expect(wrapper.text()).toContain("Miart 2020")
  })

  it("displays the relevant timing info", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        startAt: "2020-08-19T08:00:00+00:00",
        endAt: "2020-09-19T08:00:00+00:00",
      }),
    })

    expect(wrapper.text()).toContain("Closed")
  })
})
