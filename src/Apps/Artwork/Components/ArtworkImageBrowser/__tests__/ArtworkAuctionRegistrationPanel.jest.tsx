import { DateTime } from "luxon"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkAuctionRegistrationPanelQuery } from "__generated__/ArtworkAuctionRegistrationPanelQuery.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkAuctionRegistrationPanelQuery
>({
  Component: ArtworkAuctionRegistrationPanelFragmentContainer,
  query: graphql`
    query ArtworkAuctionRegistrationPanelQuery {
      artwork(id: "example") {
        ...ArtworkAuctionRegistrationPanel_artwork
      }
    }
  `,
})

describe("ArtworkAuctionRegistrationPanel", () => {
  it("renders countdown timer and button", () => {
    renderWithRelay({
      Artwork: () => ({
        sale: {
          registrationEndsAt: DateTime.local().plus({ days: 1 }).toString(),
        },
      }),
    })

    const timer = screen.getByText("Registration for this auction ends:")
    const button = screen.getByText("Register to Bid")

    expect(timer).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it("renders only button", () => {
    renderWithRelay({
      Artwork: () => ({
        sale: {
          registrationEndsAt: null,
        },
      }),
    })

    const timer = screen.queryByText("Registration for this auction ends:")
    const button = screen.getByText("Register to Bid")

    expect(timer).not.toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})
