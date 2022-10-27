import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { UnlistedArtworkBannerFragmentContainer } from "Components/UnlistedArtworkBanner"
import { screen, fireEvent } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: UnlistedArtworkBannerFragmentContainer,
  query: graphql`
    query UnlistedArtworkBanner_Test_Query @relay_test_operation {
      partner(id: "example") {
        ...UnlistedArtworkBanner_partner
      }
    }
  `,
})

describe("UnlistedArtworkBanner", () => {
  describe("explanatory banner for unlisted artworks", () => {
    it("includes partner name when it is present", () => {
      renderWithRelay({
        Partner: () => ({
          name: "Commerce Test Partner",
        }),
      })
      const bannerText = screen.getByTestId("unlisted-text").innerHTML
      expect(bannerText).toContain("Commerce Test Partner")
      expect(bannerText).toContain("private listing")
    })

    it("shows the private listing message without the partner name when it is not present", () => {
      renderWithRelay({
        Partner: () => ({
          name: null,
        }),
      })
      const bannerText = screen.getByTestId("unlisted-text").innerHTML
      expect(bannerText).not.toContain("Commerce Test Partner")
      expect(bannerText).toContain("private listing")
    })

    it("opens a modal when you click on private listing", () => {
      renderWithRelay({
        Partner: () => ({
          name: null,
        }),
      })
      const button = screen.getByText("private listing")
      fireEvent.click(button)
      const modalText = screen.getByTestId("unlisted-modal-text").innerHTML
      expect(modalText).toContain(
        "Private listings are shared by galleries with select collectors."
      )
    })
  })
})
