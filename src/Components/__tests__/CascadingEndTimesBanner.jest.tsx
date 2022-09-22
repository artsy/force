import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { CascadingEndTimesBannerFragmentContainer } from "../CascadingEndTimesBanner"
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

describe("CascadingEndTimesBanner", () => {
  describe("explanatory banner for extended end times", () => {
    it("includes banner when extended bidding are enabled", () => {
      renderWithRelay({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: 2,
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
        }),
      })

      expect(
        screen.getByText("Lots close at 1-minute intervals.")
      ).toBeInTheDocument()
    })
  })
})
