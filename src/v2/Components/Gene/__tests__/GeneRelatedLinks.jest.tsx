import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { GeneRelatedLinksFragmentContainer } from "../GeneRelatedLinks"

jest.unmock("react-relay")

const similar = {
  edges: [
    {
      node: {
        href: "https://www.artsy.net/artwork/david-shrigley-im-dead",
        name: "meow",
      },
    },
  ],
}

const artists = {
  edges: [
    {
      node: {
        href: "https://kawsone.com/",
        name: "kaws",
      },
    },
  ],
}

describe("GeneRelatedLinks", () => {
  const getWrapper = (similarData = similar, artistsData = artists) => {
    return renderRelayTree({
      Component: GeneRelatedLinksFragmentContainer,
      query: graphql`
        query GeneRelatedLinks_Test_Query @raw_response_type {
          gene(id: "cats") {
            ...GeneRelatedLinks_gene
          }
        }
      `,
      mockData: {
        gene: {
          similar: similarData,
          artists: artistsData,
        },
      },
    })
  }

  it("should render related genes and related artists", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.html()).toContain("<h2>Related Categories</h2>")
    expect(wrapper.html()).toContain("<h2>Related Artists</h2>")
  })

  it("should render related genes even if no related artists", async () => {
    const wrapper = await getWrapper(similar, null)
    expect(wrapper.contains(<h2>Related Categories</h2>)).toBeTruthy()
    expect(wrapper.contains(<h2>Related Artists</h2>)).toBeFalsy()
  })

  it("should render related artists even if no related genes", async () => {
    const wrapper = await getWrapper(null, artists)
    expect(wrapper.contains(<h2>Related Categories</h2>)).toBeFalsy()
    expect(wrapper.contains(<h2>Related Artists</h2>)).toBeTruthy()
  })

  it("should comma seperate the list if multiple items are present", async () => {
    const wrapper = await getWrapper({
      edges: [
        { node: { name: "a", href: "" } },
        { node: { name: "b", href: "" } },
      ],
    })
    expect(wrapper.text().includes("a, b")).toBeTruthy()
  })
})
