import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { DeepZoomFragmentContainer } from "../DeepZoom"
import { DeepZoom_Test_Query } from "v2/__generated__/DeepZoom_Test_Query.graphql"

jest.unmock("react-relay")

const handleClose = jest.fn()

const { getWrapper } = setupTestWrapper<DeepZoom_Test_Query>({
  Component: ({ artwork }) => {
    const image = artwork!.images![0]!
    return <DeepZoomFragmentContainer image={image} onClose={handleClose} />
  },
  query: graphql`
    query DeepZoom_Test_Query {
      artwork(id: "example") {
        images {
          ...DeepZoom_image
        }
      }
    }
  `,
})

describe("DeepZoom", () => {
  beforeEach(() => {
    handleClose.mockReset()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()

    expect(wrapper.html()).toContain(
      'input min="0" max="1" step="0.001" type="range"'
    )
  })

  it("calls onClose when the close button is clicked", () => {
    const wrapper = getWrapper()

    expect(handleClose).not.toBeCalled()

    wrapper.find("button").first().simulate("click")

    expect(handleClose).toBeCalledTimes(1)
  })
})
