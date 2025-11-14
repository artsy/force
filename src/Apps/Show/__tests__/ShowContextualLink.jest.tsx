import { ShowContextualLinkFragmentContainer } from "Apps/Show/Components/ShowContextualLink"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ShowContextualLinkTestQuery } from "__generated__/ShowContextualLinkTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ShowContextualLinkTestQuery>({
  Component: props => (
    <MockBoot breakpoint="lg">
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ShowContextualLinkFragmentContainer {...props} />
    </MockBoot>
  ),
  query: graphql`
    query ShowContextualLinkTestQuery @relay_test_operation {
      show(id: "catty-show") {
        ...ShowContextualLink_show
      }
    }
  `,
})

describe("ShowContextualLink", () => {
  describe("is a fair booth", () => {
    it("renders the fair link", () => {
      renderWithRelay({
        Show: () => ({ isFairBooth: true }),
        Fair: () => ({ name: "Catty Fair", isActive: true }),
      })

      expect(screen.getByText("Part of")).toBeInTheDocument()
      expect(screen.getByText("Catty Fair")).toBeInTheDocument()
    })

    it("hides link if show.isActive = false", () => {
      renderWithRelay({
        Show: () => ({ isFairBooth: true }),
        Fair: () => ({ name: "Catty Fair", isActive: false }),
      })

      expect(screen.queryByText("Part of Catty Fair")).not.toBeInTheDocument()
    })
  })

  describe("when not a fair booth", () => {
    it("renders the partner link when the partner is linkable", () => {
      renderWithRelay({
        Show: () => ({ isFairBooth: false }),
        Partner: () => ({
          name: "Catty Partner",
          href: "/catty-partner",
          isLinkable: true,
        }),
      })

      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/catty-partner")
      expect(screen.getByText("Presented by")).toBeInTheDocument()
      expect(screen.getByText("Catty Partner")).toBeInTheDocument()
    })

    it("does not render the partner link when the partner is not linkable", () => {
      renderWithRelay({
        Show: () => ({ isFairBooth: false }),
        Partner: () => ({
          name: "Catty Partner",
          href: "/catty-partner",
          isLinkable: false,
        }),
      })

      expect(screen.queryByRole("link")).not.toBeInTheDocument()
      expect(screen.getByText(/Presented by Catty Partner/)).toBeInTheDocument()
    })

    it("displays location when show has location and is not a fair booth", () => {
      renderWithRelay({
        Show: () => ({
          isFairBooth: false,
          hasLocation: true,
          location: { display: "123 Art Street, New York" },
        }),
        Partner: () => ({
          name: "Catty Gallery",
          href: "/catty-gallery",
          isLinkable: true,
        }),
      })

      expect(screen.getByText("Presented by")).toBeInTheDocument()
      expect(screen.getByText("Catty Gallery")).toBeInTheDocument()
      expect(screen.getByText("123 Art Street, New York")).toBeInTheDocument()
    })

    it("does not display location when show has no location", () => {
      renderWithRelay({
        Show: () => ({
          isFairBooth: false,
          hasLocation: false,
          location: null,
        }),
        Partner: () => ({
          name: "Catty Gallery",
          href: "/catty-gallery",
          isLinkable: true,
        }),
      })

      expect(screen.getByText("Presented by")).toBeInTheDocument()
      expect(screen.getByText("Catty Gallery")).toBeInTheDocument()
      expect(
        screen.queryByText("123 Art Street, New York"),
      ).not.toBeInTheDocument()
    })

    it("does not display location when show is a fair booth", () => {
      renderWithRelay({
        Show: () => ({
          isFairBooth: true,
          hasLocation: true,
          location: { display: "123 Art Street, New York" },
        }),
        Fair: () => ({ name: "Art Fair", isActive: true }),
      })

      expect(screen.getByText("Part of")).toBeInTheDocument()
      expect(screen.getByText("Art Fair")).toBeInTheDocument()
      expect(
        screen.queryByText("123 Art Street, New York"),
      ).not.toBeInTheDocument()
    })
  })
})
