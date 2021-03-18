import { NavigationTabs_Test_PartnerQueryRawResponse } from "v2/__generated__/NavigationTabs_Test_PartnerQuery.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("v2/Components/RouteTabs")

describe("PartnerNavigationTabs", () => {
  const getWrapper = async (
    response: NavigationTabs_Test_PartnerQueryRawResponse["partner"] = NavigationTabsFixture
  ) => {
    return await renderRelayTree({
      Component: ({ partner }: any) => {
        return <NavigationTabs partner={partner} />
      },
      query: graphql`
        query NavigationTabs_Test_PartnerQuery @raw_response_type {
          partner(id: "white-cube") {
            ...NavigationTabs_partner
          }
        }
      `,
      mockData: {
        partner: response,
      } as NavigationTabs_Test_PartnerQueryRawResponse,
    })
  }

  it("renders all tabs by default", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Overview")
    expect(html).toContain("Shows")
    expect(html).toContain("Works")
    expect(html).toContain("Artists")
    expect(html).toContain("Articles")
    expect(html).toContain("Contact")
  })
})

const NavigationTabsFixture: NavigationTabs_Test_PartnerQueryRawResponse["partner"] = {
  id: "white-cube",
  slug: "white-cube",
}
