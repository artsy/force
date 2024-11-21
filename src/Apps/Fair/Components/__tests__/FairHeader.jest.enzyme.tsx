import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { FairHeaderFragmentContainer } from "Apps/Fair/Components/FairHeader"

jest.unmock("react-relay")

jest.mock("Components/HeaderIcon", () => ({
  HeaderIcon: () => null,
}))

const { getWrapper } = setupTestWrapper({
  Component: FairHeaderFragmentContainer,
  query: graphql`
    query FairHeader_Test_Query @relay_test_operation {
      fair(id: "example") {
        ...FairHeader_fair
      }
    }
  `,
})

describe("FairHeader", () => {
  it("displays fair name", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        name: "Miart 2020",
        slug: "miart-2020",
      }),
    })

    expect(wrapper.text()).toContain("Miart 2020")
  })
})
