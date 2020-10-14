import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import React from "react"
import { ShowContextCardFragmentContainer } from "../Components/ShowContextCard"
import { QueryRenderer, graphql } from "react-relay"
import { ShowContextCard_Test_Query } from "v2/__generated__/ShowContextCard_Test_Query.graphql"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { mount } from "enzyme"

jest.unmock("react-relay")

describe("ShowContextCard", () => {
  let env = createMockEnvironment() as ReturnType<typeof createMockEnvironment>

  const getWrapper = (breakpoint = "xs", types = {}) => {
    const TestRenderer = () => (
      <QueryRenderer<ShowContextCard_Test_Query>
        environment={env}
        query={graphql`
          query ShowContextCard_Test_Query($slug: String!) {
            show(id: $slug) {
              ...ShowContextCard_show
            }
          }
        `}
        variables={{ slug: "show-id" }}
        render={({ props, error }) => {
          if (props?.show) {
            return (
              <MockBoot breakpoint={breakpoint as Breakpoint}>
                <ShowContextCardFragmentContainer show={props.show} />
              </MockBoot>
            )
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const wrapper = mount(<TestRenderer />)
    env.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, types)
    )
    wrapper.update()
    return wrapper
  }

  beforeEach(() => {
    env = createMockEnvironment()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly for a fair", () => {
    const wrapper = getWrapper("lg", {
      Fair: () => {
        return {
          name: "Catty Art Fair",
        }
      },
    })
    expect(wrapper.text()).toContain("Part of Catty Art Fair")
  })

  it("renders correctly for a partner", () => {
    const wrapper = getWrapper("lg", {
      Show: () => {
        return {
          isFairBooth: false,
        }
      },
      Partner: () => {
        return {
          name: "Catty Gallery",
          locations: [{ city: "Wakefield" }],
        }
      },
    })
    expect(wrapper.text()).toContain("Presented by Catty Gallery")
    expect(wrapper.text()).toContain("Wakefield")
  })
})
