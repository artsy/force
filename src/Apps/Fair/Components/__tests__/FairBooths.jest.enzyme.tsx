import { FairBoothsFragmentContainer } from "Apps/Fair/Components/FairBooths"
import { FairBooths_Test_Query } from "__generated__/FairBooths_Test_Query.graphql"
import { FairBoothRail } from "Apps/Fair/Components/FairBoothRail"
import { graphql } from "react-relay"
import { FairBoothSortFilter } from "Apps/Fair/Components/FairBoothSortFilter"
import { SortFilter } from "Components/SortFilter"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: {
          sort: "FEATURED_DESC",
        },
      },
    },
  }),
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("FairBooths", () => {
  const { getWrapper } = setupTestWrapper<FairBooths_Test_Query>({
    Component: ({ fair }) => {
      return (
        <MockBoot>
          <FairBoothsFragmentContainer fair={fair as any} />
        </MockBoot>
      )
    },
    query: graphql`
      query FairBooths_Test_Query(
        $id: String!
        $first: Int
        $page: Int
        $sort: ShowSorts
      ) @relay_test_operation {
        fair(id: $id) {
          ...FairBooths_fair @arguments(first: $first, page: $page, sort: $sort)
        }
      }
    `,
    variables: { id: "xxx", sort: "FEATURED_DESC" },
  })

  it("renders the rails from exhibitors that have artworks", async () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        edges: [
          {
            node: {
              counts: { artworks: 1 },
            },
          },
        ],
      }),
    })
    expect(wrapper.find(FairBoothRail).length).toBe(1)
  })

  it("skips over any partners with no artworks", async () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        edges: [
          {
            node: {
              counts: { artworks: 0 },
              partner: {
                name: "Partner Without Artworks",
              },
            },
          },
        ],
      }),
    })
    const text = wrapper.text()
    expect(text).not.toContain("Partner Without Artworks")
  })

  it("renders pagination", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find(Pagination)).toHaveLength(1)
  })

  describe("sort", () => {
    it("renders correctly", () => {
      const { wrapper } = getWrapper()
      const text = wrapper.find(FairBoothSortFilter).text()
      expect(wrapper.find(FairBoothSortFilter).length).toBe(1)
      expect(text).toContain("Sort")
      expect(text).toContain("Relevance")
      expect(text).toContain("Alphabetical (A-Z)")
    })

    it("changes selected value on click", () => {
      const { wrapper } = getWrapper()
      const sort = wrapper.find(SortFilter)
      expect(sort.find("option")).toHaveLength(2)
      expect(sort.prop("selected")).toEqual("FEATURED_DESC")
      sort.find("option").at(1).simulate("change")
      expect(wrapper.find(SortFilter).prop("selected")).toEqual("NAME_ASC")
    })

    it("calls refetch with proper params", () => {
      const { wrapper } = getWrapper()
      const refetchSpy = jest.spyOn(
        (wrapper.find("FairBooths").props() as any).relay,
        "refetch"
      )

      const sort = wrapper.find(SortFilter)
      sort.find("option").at(1).simulate("change")
      expect(refetchSpy).toHaveBeenCalledTimes(1)
      expect(refetchSpy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          id: "<Fair-mock-id-1>",
          first: 15,
          sort: "NAME_ASC",
          page: 1,
        })
      )
    })
  })
})
