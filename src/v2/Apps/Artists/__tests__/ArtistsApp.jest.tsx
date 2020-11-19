import React from "react"
import { graphql } from "react-relay"
import ArtistsApp from "../ArtistsApp"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistsApp_Test_Query } from "v2/__generated__/ArtistsApp_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ArtistsApp_Test_Query>({
  Component: props => (
    <MockBoot>
      <ArtistsApp {...props} />
    </MockBoot>
  ),
  query: graphql`
    query ArtistsApp_Test_Query {
      featuredArtists: orderedSets(key: "homepage:featured-artists") {
        ...ArtistsApp_featuredArtists
      }
      featuredGenes: orderedSets(key: "artists:featured-genes") {
        ...ArtistsApp_featuredGenes
      }
    }
  `,
})

describe("ArtistsApp", () => {
  it("renders the page", () => {
    const wrapper = getWrapper({
      OrderedSet: () => ({ name: "Featured Artists" }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Featured Artists")
  })
})
