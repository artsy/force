import {
  ArtistBioTestQueryRawResponse,
  ArtistBioTestQueryResponse,
} from "v2/__generated__/ArtistBioTestQuery.graphql"
import React from "react"

import { MockBoot, renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { ArtistBioFragmentContainer as ArtistBio } from "../ArtistBio"

jest.unmock("react-relay")

describe("ArtistBio", () => {
  const biographyBlurb = {
    credit: "",
    text: '<a href="hi">hello how are you</a>',
  }

  const getWrapper = () => {
    return renderRelayTree({
      Component: ({ bio }: ArtistBioTestQueryResponse) => (
        <MockBoot breakpoint="xl">
          <ArtistBio bio={bio} />
        </MockBoot>
      ),
      mockData: {
        bio: {
          biographyBlurb,
          id: "unused",
        },
      } as ArtistBioTestQueryRawResponse,
      query: graphql`
        query ArtistBioTestQuery @raw_response_type {
          bio: artist(id: "unused") {
            ...ArtistBio_bio
          }
        }
      `,
    })
  }

  it("renders html text", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.html()).toContain(biographyBlurb.text)
  })
})
