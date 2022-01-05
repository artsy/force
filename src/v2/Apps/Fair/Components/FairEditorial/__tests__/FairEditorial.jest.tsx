import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairEditorialFragmentContainer } from ".."

jest.unmock("react-relay")

describe("FairEditorial", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <FairEditorialFragmentContainer fair={props.fair} />
    },
    query: graphql`
      query FairEditorial_Test_Query @relay_test_operation {
        fair(id: "test") {
          ...FairEditorial_fair
        }
      }
    `,
  })

  it("renders title correctly", () => {
    const wrapper = getWrapper({})
    expect(wrapper.text()).toContain("Explore Further")
  })

  it("renders articles rail", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("FairEditorialRailArticles").length).toBe(1)
  })
})
