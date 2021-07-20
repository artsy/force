import React from "react"
import { graphql } from "relay-runtime"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtworkImageBrowserSmallFragmentContainer } from "../ArtworkImageBrowserSmall"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const { getWrapper } = setupTestWrapper({
  Component: props => {
    return (
      <MockBoot>
        <ArtworkImageBrowserSmallFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkImageBrowserSmall_Test_Query {
      artwork(id: "example") {
        ...ArtworkImageBrowserSmall_artwork
      }
    }
  `,
})

describe("ArtworkImageBrowserSmall", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Image: () => ({ isDefault: true }),
      ResizedImageUrl: () => ({
        width: 800,
        height: 600,
        src: "example.jpg",
        srcSet: "example.jpg 1x",
      }),
    })

    expect(wrapper.html()).toContain("max-width: 800px")
    expect(wrapper.html()).toContain('src="example.jpg"')
    expect(wrapper.html()).toContain('srcset="example.jpg 1x"')
  })
})
