import React from "react"
import { mount } from "enzyme"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { QueryRenderer, graphql } from "react-relay"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "../Components/ShowViewingRoom"
import { ShowViewingRoom_Test_Query } from "v2/__generated__/ShowViewingRoom_Test_Query.graphql"

jest.unmock("react-relay")

describe("ShowViewingRoom", () => {
  const getWrapper = (mocks = {}) => {
    const env = createMockEnvironment()

    const TestRenderer = () => (
      <QueryRenderer<ShowViewingRoom_Test_Query>
        environment={env}
        variables={{}}
        query={graphql`
          query ShowViewingRoom_Test_Query {
            show(id: "xxx") {
              ...ShowViewingRoom_show
            }
          }
        `}
        render={({ props, error }) => {
          if (props?.show) {
            return <ShowViewingRoom show={props.show} />
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const wrapper = mount(<TestRenderer />)

    env.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        ...mocks,
      })
    )
    wrapper.update()
    return wrapper
  }

  it("renders correctly", () => {
    const wrapper = getWrapper({
      ViewingRoom: () => ({
        title: "Example Viewing Room",
        status: "closed",
      }),
      Partner: () => ({
        name: "Example Partner Name",
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("Example Viewing Room")
    expect(html).toContain("Example Partner Name")
    expect(html).toContain("Closed")
  })
})
