import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { tests } from "../SoldRecently"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("v2/Components/Artwork/FillwidthItem", () => () => {
  const FillwidthItem = () => <div />
  return <FillwidthItem />
})

describe("SoldRecently", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint={"lg" as Breakpoint}>
          <tests.SoldRecentlyFragmentContainer
            targetSupply={props.targetSupply}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query SoldRecently_tests_Query @relay_test_operation {
        targetSupply {
          ...SoldRecently_targetSupply
        }
      }
    `,
  })

  it("renders correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("FillwidthItem").length).toBe(1)
  })

  it("contains additional fields in the carousel artworks", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain('mock-value-for-field-"realizedPrice"')
    expect(wrapper.html()).toContain(
      'mock-value-for-field-"realizedToEstimate"'
    )
  })
})
