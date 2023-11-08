import { ShowContextualLinkFragmentContainer } from "Apps/Show/Components/ShowContextualLink"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ShowContextualLink_Test_Query } from "__generated__/ShowContextualLink_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ShowContextualLink_Test_Query>({
  Component: props => (
    <MockBoot breakpoint="lg">
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ShowContextualLinkFragmentContainer {...props} />
    </MockBoot>
  ),
  query: graphql`
    query ShowContextualLink_Test_Query @relay_test_operation {
      show(id: "catty-show") {
        ...ShowContextualLink_show
      }
    }
  `,
})

describe("ShowContextualLink", () => {
  describe("is a fair booth", () => {
    it("renders the fair link", () => {
      const { wrapper } = getWrapper({
        Show: () => ({ isFairBooth: true }),
        Fair: () => ({ name: "Catty Fair", isActive: true }),
      })

      expect(wrapper.text()).toContain("Part of Catty Fair")
    })

    it("hides link if show.isActive = false", () => {
      const { wrapper } = getWrapper({
        Show: () => ({ isFairBooth: true }),
        Fair: () => ({ name: "Catty Fair", isActive: false }),
      })

      expect(wrapper.text()).not.toContain("Part of Catty Fair")
    })
  })

  describe("when not a fair booth", () => {
    it("renders the partner link when the partner is linkable", () => {
      const { wrapper } = getWrapper({
        Show: () => ({ isFairBooth: false }),
        Partner: () => ({
          name: "Catty Partner",
          href: "/catty-partner",
          isLinkable: true,
        }),
      })

      expect(wrapper.find("RouterLink").length).toBeTruthy()
      expect(wrapper.find("RouterLink").first().props().to).toEqual(
        "/catty-partner"
      )
      expect(wrapper.text()).toContain("Presented by Catty Partner")
    })

    it("does not render the partner link when the partner is not linkable", () => {
      const { wrapper } = getWrapper({
        Show: () => ({ isFairBooth: false }),
        Partner: () => ({
          name: "Catty Partner",
          href: "/catty-partner",
          isLinkable: false,
        }),
      })

      expect(wrapper.find("RouterLink").length).not.toBeTruthy()
      expect(wrapper.text()).toContain("Presented by Catty Partner")
    })
  })
})
