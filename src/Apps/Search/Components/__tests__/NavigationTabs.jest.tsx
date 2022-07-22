import { NavigationTabsProps, tabCountMap } from "../NavigationTabs"

const props: NavigationTabsProps = {
  artworkCount: 601,
  term: "whitney",
  searchableConnection: {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    " $refType": null,
    aggregations: [
      {
        slice: "TYPE",
        counts: [
          {
            count: 424,
            name: "artwork",
          },
          {
            count: 143,
            name: "partner_show",
          },
          {
            count: 35,
            name: "article",
          },
          {
            count: 35,
            name: "artist",
          },
          {
            count: 4,
            name: "tag",
          },
          {
            count: 2,
            name: "feature",
          },
          {
            count: 1,
            name: "PartnerInstitution",
          },
          {
            count: 1,
            name: "PartnerInstitutionalSeller",
          },
          {
            count: 1,
            name: "sale",
          },
        ],
      },
    ],
  },
}

describe("Search NavigationTabs tabCountMap", () => {
  it("returns the correct Institutions count with PartnerInstution and PartnerInstitutionSeller combined", () => {
    const countMap = tabCountMap(props.searchableConnection)
    expect(countMap.Institutions).toEqual(2)
  })
})
