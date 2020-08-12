import { MockRelayRendererFixturesArtistQueryRawResponse } from "v2/__generated__/MockRelayRendererFixturesArtistQuery.graphql"
import { MockRelayRendererFixturesQueryRawResponse } from "v2/__generated__/MockRelayRendererFixturesQuery.graphql"
import React from "react"
import { renderRelayTree } from "../renderRelayTree"
import { Artwork, query, renderToString } from "./MockRelayRendererFixtures"

jest.unmock("react-relay")

describe("renderRelayTree", () => {
  it("resolves a promise once the full tree (including nested query renderers) has been rendered", async () => {
    const mockData: MockRelayRendererFixturesQueryRawResponse &
      MockRelayRendererFixturesArtistQueryRawResponse = {
      artwork: {
        id: "opaque-artwork-id",
        title: "Mona Lisa",
        image: {
          url: "http://test/image.jpg",
        },
        artist: {
          id: "opaque-artist-id",
          slug: "leonardo-da-vinci",
        },
      },
      artist: {
        id: "opaque-artist-id",
        name: "Leonardo da Vinci",
      },
    }
    const tree = await renderRelayTree({
      Component: Artwork,
      query,
      mockData,
    })
    expect(tree.html()).toEqual(
      renderToString(
        <div>
          <img src="http://test/image.jpg" />
          <div>Mona Lisa</div>
          <div>Leonardo da Vinci</div>
        </div>
      )
    )
  })

  it("resolves a promise once the optional `until` callback matches", async () => {
    class Component extends React.Component {
      state = {
        data: "",
      }

      componentDidMount() {
        setTimeout(() => {
          this.setState({ data: "ohai" })
        }, 1000)
      }

      render() {
        return (
          <div>
            <div className="much-later">{this.state.data}</div>
            <div>{this.props.children}</div>
          </div>
        )
      }
    }

    const mockData: MockRelayRendererFixturesQueryRawResponse = {
      artwork: {
        id: "opaque-artwork-id",
        title: "Mona Lisa",
        image: {
          url: "http://test/image.jpg",
        },
        artist: null,
      },
    }

    const tree = await renderRelayTree({
      renderUntil: wrapper => wrapper.find(".much-later").text().length > 0,
      Component: Artwork,
      query,
      mockData,
      wrapper: renderer => <Component>{renderer}</Component>,
    })
    expect(tree.find(".much-later").text()).toEqual("ohai")
  })
})
