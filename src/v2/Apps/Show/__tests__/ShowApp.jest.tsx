import React from "react"
import { mount } from "enzyme"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { QueryRenderer, graphql } from "react-relay"
import ShowApp from "../ShowApp"
import { ShowViewingRoom } from "../Components/ShowViewingRoom"

jest.unmock("react-relay")

jest.mock("v2/Apps/Show/Components/ShowMeta", () => ({
  ShowMetaFragmentContainer: () => null,
}))

jest.mock("v2/Apps/Show/Components/ShowArtworks", () => ({
  ShowArtworksRefetchContainer: () => null,
}))

jest.mock("v2/Apps/Show/Components/ShowInstallShots", () => ({
  ShowInstallShotsFragmentContainer: () => null,
}))

describe("ShowApp", () => {
  const getWrapper = (mocks = {}) => {
    const env = createMockEnvironment()

    const TestRenderer = () => (
      <QueryRenderer<any>
        environment={env}
        variables={{}}
        query={graphql`
          query ShowApp_Test_Query {
            show(id: "xxx") {
              ...ShowApp_show
            }
          }
        `}
        render={({ props, error }) => {
          if (props?.show) {
            return <ShowApp show={props.show} />
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const wrapper = mount(<TestRenderer />)

    env.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, mocks)
    )
    wrapper.update()
    return wrapper
  }

  it("renders the title", () => {
    const wrapper = getWrapper({
      Show: () => ({ name: "Example Show" }),
    })
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Show")
  })

  it("renders the appropriate info", () => {
    const wrapper = getWrapper({
      Show: () => ({
        href: "/show/example-href",
        metaDescription: "Information about the show",
        pressRelease: "Press Release",
      }),
      Partner: () => ({
        name: "Example Partner",
      }),
    })

    expect(wrapper.text()).toContain("Information about the show")
    expect(wrapper.text()).toContain("Example Partner")

    // If a press release exists, link to the more info page
    const moreInfoLink = wrapper
      .find("a")
      .findWhere(node => node.text() === "More info")
      .first()
    expect(moreInfoLink.prop("href")).toEqual("/show2/example-href/info")
  })

  it("renders a viewing room if there are any", () => {
    const wrapper = getWrapper({
      Show: () => ({
        viewingRoomIDs: ["xxx"],
      }),
    })

    expect(wrapper.find(ShowViewingRoom)).toHaveLength(1)
  })
})
