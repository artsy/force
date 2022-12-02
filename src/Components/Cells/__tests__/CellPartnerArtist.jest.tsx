import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { CellPartnerArtistFragmentContainer_Test_Query } from "__generated__/CellPartnerArtistFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { CellPartnerArtistFragmentContainer } from "Components/Cells/CellPartnerArtist"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  CellPartnerArtistFragmentContainer_Test_Query
>({
  Component: props => (
    <CellPartnerArtistFragmentContainer
      artistPartnerEdge={props.partner?.artistsConnection?.edges![0]!}
    />
  ),
  query: graphql`
    query CellPartnerArtistFragmentContainer_Test_Query @relay_test_operation {
      partner(id: "foo") {
        artistsConnection {
          edges {
            ...CellPartnerArtist_partnerArtist
          }
        }
      }
    }
  `,
})

describe("CellPartnerArtist", () => {
  it("renders the image from the partner artist level not the artist level", () => {
    renderWithRelay({
      Image: () => ({
        cropped: {
          src: "https://example.com/right_image.jpg",
          srcSet: "https://example.com/right_image.jpg 1x",
        },
      }),
      Artist: () => ({
        name: "Example Artist",
        image: {
          cropped: {
            src: "https://example.com/wrong_image.jpg",
            srcSet: "https://example.com/wrong_image.jpg 1x",
          },
        },
      }),
    })
    const displayedImage = screen.getByRole("img") as HTMLImageElement
    expect(displayedImage.src).toContain("https://example.com/right_image.jpg")
    expect(displayedImage.src).not.toContain(
      "https://example.com/wrong_image.jpg"
    )
  })
})
