import {
  ArtistBioTestQuery$rawResponse,
  ArtistBioTestQuery$data,
} from "__generated__/ArtistBioTestQuery.graphql"

import { renderRelayTree } from "DevTools/renderRelayTree"
import { MockBoot } from "DevTools/MockBoot"
import { graphql } from "react-relay"
import { ArtistBioFragmentContainer as ArtistBio } from "Components/ArtistBio"

jest.unmock("react-relay")

describe("ArtistBio", () => {
  const biographyBlurb = {
    credit: "",
    partnerID: "",
    text: '<a href="hi">hello how are you</a>',
  }

  const getWrapper = () => {
    return renderRelayTree({
      Component: ({ bio }: ArtistBioTestQuery$data) => (
        <MockBoot breakpoint="lg">
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          <ArtistBio bio={bio} />
        </MockBoot>
      ),
      query: graphql`
        query ArtistBioTestQuery @raw_response_type @relay_test_operation {
          bio: artist(id: "unused") {
            ...ArtistBio_bio
          }
        }
      `,
      mockData: {
        bio: {
          id: "unused",
          biographyBlurb,
        },
      } as ArtistBioTestQuery$rawResponse,
    })
  }

  it("renders html text", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.html()).toContain(biographyBlurb.text)
    expect(wrapper.html()).not.toContain("Submitted by")
  })

  it("renders credit when available", async () => {
    biographyBlurb.credit = "Submitted by Great Gallery"
    biographyBlurb.partnerID = "great-gallery"

    const wrapper = await getWrapper()

    expect(wrapper.html()).toContain("Submitted by Great Gallery")
    expect(wrapper.html()).toContain("great-gallery")
  })
})
