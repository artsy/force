import React from "react"
import { mount } from "enzyme"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { QueryRenderer, graphql } from "react-relay"
import ShowInfo from "../Routes/ShowInfo"

jest.unmock("react-relay")

describe("ShowInfo", () => {
  const getWrapper = (response = {}) => {
    const env = createMockEnvironment()

    const TestRenderer = () => (
      <QueryRenderer<any>
        environment={env}
        variables={{}}
        query={graphql`
          query ShowInfo_Test_Query {
            show(id: "xxx") {
              ...ShowInfo_show
            }
          }
        `}
        render={({ props, error }) => {
          if (props?.show) {
            return <ShowInfo show={props.show} />
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const wrapper = mount(<TestRenderer />)

    env.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Show: () => response,
      })
    )
    wrapper.update()
    return wrapper
  }

  it("renders the info page", () => {
    const wrapper = getWrapper({
      partner: {
        type: "Gallery",
      },
    })
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("About")
    expect(wrapper.find("h2").text()).toEqual("Gallery")
  })
})
