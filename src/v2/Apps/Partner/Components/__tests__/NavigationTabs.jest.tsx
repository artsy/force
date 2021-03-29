import React from "react"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { NavigationTabs_Test_PartnerQuery } from "v2/__generated__/NavigationTabs_Test_PartnerQuery.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"

jest.unmock("react-relay")
jest.mock("v2/Components/RouteTabs")

const { getWrapper } = setupTestWrapper<NavigationTabs_Test_PartnerQuery>({
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
})

describe("PartnerNavigationTabs", () => {
  it("renders all tabs by default", () => {
    const wrapper = getWrapper({
      Partner: () => ({ id: "white-cube", slug: "white-cube" }),
    })
    const html = wrapper.html()

    expect(html).toContain("Overview")
    expect(html).toContain("Shows")
    expect(html).toContain("Works")
    expect(html).toContain("Artists")
    expect(html).toContain("Articles")
    expect(html).toContain("Contact")
  })

  it("doesn't display contact tab if no locations", () => {
    const wrapper = getWrapper({
      Partner: () => ({ locations: { totalCount: null } }),
    })
    const html = wrapper.html()

    expect(html).not.toContain("Contact")
  })

  it("doesn't display articles tab if no locations", () => {
    const wrapper = getWrapper({
      Partner: () => ({ articles: { totalCount: null } }),
    })
    const html = wrapper.html()

    expect(html).not.toContain("Articles")
  })
})
