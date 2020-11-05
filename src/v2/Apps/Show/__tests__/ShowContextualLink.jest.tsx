import { ShowContextualLinkFragmentContainer } from "../Components/ShowContextualLink"
import { Link } from "@artsy/palette"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ShowContextualLink_Test_Query } from "v2/__generated__/ShowContextualLink_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ShowContextualLink_Test_Query>({
  Component: ShowContextualLinkFragmentContainer,
  query: graphql`
    query ShowContextualLink_Test_Query {
      show(id: "catty-show") {
        ...ShowContextualLink_show
      }
    }
  `,
})

describe("ShowInstallShots", () => {
  describe("is a fair booth", () => {
    it("renders the fair link", () => {
      const wrapper = getWrapper({
        Show: () => ({ isFairBooth: true }),
        Fair: () => ({ name: "Catty Fair" }),
      })

      expect(wrapper.text()).toContain("Part of Catty Fair")
    })
  })

  describe("when not a fair booth", () => {
    it("renders the partner link when the partner is linkable", () => {
      const wrapper = getWrapper({
        Show: () => ({ isFairBooth: false }),
        Partner: () => ({
          name: "Catty Partner",
          href: "/catty-partner",
          isLinkable: true,
        }),
      })

      expect(wrapper.find(Link).length).toBeTruthy()
      expect(wrapper.find(Link).first().props().href).toEqual("/catty-partner")
      expect(wrapper.text()).toContain("Presented by Catty Partner")
    })

    it("does not render the partner link when the partner is not linkable", () => {
      const wrapper = getWrapper({
        Show: () => ({ isFairBooth: false }),
        Partner: () => ({
          name: "Catty Partner",
          href: "/catty-partner",
          isLinkable: false,
        }),
      })

      expect(wrapper.find(Link).length).not.toBeTruthy()
      expect(wrapper.text()).toContain("Presented by Catty Partner")
    })
  })
})
