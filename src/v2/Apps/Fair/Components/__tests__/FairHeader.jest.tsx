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
})
