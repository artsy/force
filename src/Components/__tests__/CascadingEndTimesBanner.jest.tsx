import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: CascadingEndTimesBannerFragmentContainer,
  query: graphql`
    query CascadingEndTimesBanner_Test_Query @relay_test_operation {
      sale(id: "example") {
        ...CascadingEndTimesBanner_sale
      }
    }
  `,
})

const eitherBannerRegExp = /^(?:Closing|Lots)/

describe("CascadingEndTimesBanner", () => {
  describe("explanatory banner for extended end times", () => {
    it("includes banner when extended bidding are enabled", () => {
      renderWithRelay({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: 2,
          endedAt: null,
        }),
      })

      expect(
        screen.getByText(
          "Closing times may be extended due to last-minute competitive bidding."
        )
      ).toBeInTheDocument()
    })

    it("shows the cascading bidding banner when cascading is enabled but extended bidding is disabled", () => {
      renderWithRelay({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: null,
          endedAt: null,
        }),
      })

      expect(
        screen.getByText("Lots close at 1-minute intervals.")
      ).toBeInTheDocument()
    })

    it("does not show the banner when the sale is ended", () => {
      renderWithRelay({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: 2,
          endedAt: "2024-01-01T00:00:00+00:00",
        }),
      })

      expect(screen.queryByText(eitherBannerRegExp)).not.toBeInTheDocument()
    })

    it("does not show the banner when cascading is not enabled for the sale", () => {
      renderWithRelay({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: null,
          extendedBiddingIntervalMinutes: null,
          endedAt: null,
        }),
      })

      expect(screen.queryByText(eitherBannerRegExp)).not.toBeInTheDocument()
    })
  })
})
