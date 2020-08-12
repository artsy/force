import { MockRelayRendererFixturesBadQueryRawResponse } from "v2/__generated__/MockRelayRendererFixturesBadQuery.graphql"
import { MockRelayRendererFixturesQueryRawResponse } from "v2/__generated__/MockRelayRendererFixturesQuery.graphql"
import { renderUntil } from "v2/DevTools/renderUntil"
import { mount } from "enzyme"
import React from "react"
import { MockRelayRenderer } from "../MockRelayRenderer"
import {
  Artwork,
  badQuery,
  query,
  renderToString,
} from "./MockRelayRendererFixtures"

jest.unmock("react-relay")

describe("MockRelayRenderer", () => {
  const originalConsoleError = console.error

  afterAll(() => {
    console.error = originalConsoleError
  })

  it("renders a Relay tree", async () => {
    const tree = await renderUntil(
      wrapper => wrapper.text().includes("Mona Lisa"),
      <MockRelayRenderer
        Component={Artwork}
        query={query}
        mockData={
          {
            artwork: {
              title: "Mona Lisa",
              image: {
                url: "http://test/image.jpg",
              },
              artist: null,
            },
          } as MockRelayRendererFixturesQueryRawResponse
        }
      />
    )
    expect(tree.html()).toEqual(
      renderToString(
        <div>
          <img src="http://test/image.jpg" />
          <div>Mona Lisa</div>
        </div>
      )
    )
  })

  it("renders an error when child components throw", () => {
    console.error = () => null // MockRelayRenderer prints out error info to the console, let's silence it.
    const tree = mount(
      <MockRelayRenderer
        Component={Artwork}
        query={badQuery}
        mockData={
          {
            something_that_is_not_expected: {
              title: "Mona Lisa",
              image: {
                url: "http://test/image.jpg",
              },
              artist: null,
            },
          } as MockRelayRendererFixturesBadQueryRawResponse
        }
      />
    )
    tree.setState({
      caughtError: {
        error: new Error("Hey it's an error!"),
        errorInfo: {},
      },
    })
    expect(tree.update().text()).toEqual(
      "Error occurred while rendering Relay component: Error: Hey it's an error!"
    )
  })
})
