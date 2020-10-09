import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import React from "react"
import { ShowArtworksRefetchContainer } from "../components/ShowArtworks"
import { QueryRenderer, graphql } from "react-relay"
import { ShowArtworks_Query } from "v2/__generated__/ShowArtworks_Query.graphql"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { mount } from "enzyme"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {} },
    },
  }),
}))

describe("ShowArtworks", () => {
  let env = createMockEnvironment() as ReturnType<typeof createMockEnvironment>

  const getWrapper = (breakpoint = "xs") => {
    const TestRenderer = () => (
      <QueryRenderer<ShowArtworks_Query>
        environment={env}
        query={graphql`
          query ShowArtworks_Query($slug: String!) {
            show(id: $slug) {
              ...ShowArtworks_show
            }
          }
        `}
        variables={{ slug: "show-id" }}
        render={({ props, error }) => {
          if (props?.show) {
            return (
              <MockBoot breakpoint={breakpoint as Breakpoint}>
                <ShowArtworksRefetchContainer show={props.show} />
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
      MockPayloadGenerator.generate(operation)
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

  it("renders correctly", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
    expect(wrapper.find("GridItem__ArtworkGridItem").length).toBe(1)
  })
})
