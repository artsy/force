import { screen } from "@testing-library/react"

import { ArtistBioFragmentContainer as ArtistBio } from "Components/ArtistBio"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtistBio", () => {
  const biographyBlurb = {
    credit: "",
    text: '<a href="hi">hello how are you</a>',
  }

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint="lg">
          <ArtistBio bio={props.bio} />
        </MockBoot>
      )
    },
    query: graphql`
      query ArtistBioJestQuery @raw_response_type @relay_test_operation {
        bio: artist(id: "unused") {
          ...ArtistBio_bio
        }
      }
    `,
  })

  it("renders html text", async () => {
    renderWithRelay({
      Artist: () => ({
        id: "unused",
        biographyBlurb,
      }),
    })

    // Check for the link text content
    expect(screen.getByText("hello how are you")).toBeInTheDocument()

    // Check that the link has correct href
    const link = screen.getByRole("link", { name: "hello how are you" })
    expect(link).toHaveAttribute("href", "hi")

    // Check that credit is not rendered when empty
    expect(screen.queryByText(/Submitted by/)).not.toBeInTheDocument()
  })

  it("renders credit when available", async () => {
    renderWithRelay({
      Artist: () => ({
        id: "unused",
        biographyBlurb: {
          ...biographyBlurb,
          credit: "Submitted by Great Gallery",
        },
      }),
    })

    expect(screen.getByText("Submitted by Great Gallery")).toBeInTheDocument()
  })
})
