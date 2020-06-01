import { merge } from "lodash"
import React from "react"
import { graphql } from "react-relay"
import { HeadProvider } from "react-head"
import { ArtworkMetaFragmentContainer } from "../ArtworkMeta"
import { SeoDataForArtworkFixture } from "../Seo/__tests__/SeoDataForArtwork.fixture"
import {
  ArtworkMetaTestQueryResponse,
  ArtworkMetaTestQueryRawResponse,
} from "v2/__generated__/ArtworkMetaTestQuery.graphql"
import { renderRelayTree } from "v2/DevTools"

jest.unmock("react-relay")

const baseArtwork: ArtworkMetaTestQueryRawResponse["artwork"] = merge(
  {
    internalID: "123",
    sale_message: "for sale",
    image_rights: "image rights",
    is_in_auction: false,
    is_acquireable: true,
    is_shareable: true,
    unlisted: false,
    meta: {
      long_description: "Long description",
    },
    context: null,
  },
  SeoDataForArtworkFixture
)

describe("ArtworkMeta", () => {
  function getWrapper(
    mockData: ArtworkMetaTestQueryRawResponse = {
      artwork: {
        ...mockArtwork,
      },
    }
  ) {
    return renderRelayTree({
      Component: (props: ArtworkMetaTestQueryResponse) => (
        <HeadProvider>
          <ArtworkMetaFragmentContainer {...props} />
        </HeadProvider>
      ),
      mockData: mockData as ArtworkMetaTestQueryRawResponse,
      query: graphql`
        query ArtworkMetaTestQuery @raw_response_type {
          artwork(id: "opaque-artwork-id", includeUnlisted: true) {
            ...ArtworkMeta_artwork
          }
        }
      `,
    })
  }

  let mockArtwork

  it("renders noindex meta tag if artwork is unlisted", async () => {
    mockArtwork = Object.assign({}, baseArtwork, { unlisted: true })
    const wrapper = await getWrapper()
    expect(wrapper.html()).toContain(
      '<meta name="robots" content="noindex, nofollow">'
    )
  })

  it("does not render noindex meta tag if artwork is not unlisted", async () => {
    mockArtwork = Object.assign({}, baseArtwork, { unlisted: false })
    const wrapper = await getWrapper()
    expect(wrapper.html()).not.toContain(
      '<meta name="robots" content="noindex, nofollow">'
    )
  })
})
