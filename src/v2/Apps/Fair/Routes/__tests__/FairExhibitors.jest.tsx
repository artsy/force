import React from "react"
import { ReactWrapper } from "enzyme"
import { FairExhibitorsFragmentContainer } from "../FairExhibitors"
import { FairExhibitors_QueryRawResponse } from "v2/__generated__/FairExhibitors_Query.graphql"
import { FairExhibitorRail } from "../../Components/FairExhibitorRail"
import { graphql } from "react-relay"
import { FairExhibitorSortFilter } from "../../Components/FairExhibitorSortFilter"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { Breakpoint } from "v2/Utils/Responsive"
import { SortFilter } from "v2/Components/SortFilter"
import { Sticky } from "v2/Components/Sticky"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
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

describe("FairExhibitors", () => {
  const getWrapper = async ({
    response = FAIR_EXHIBITORS_FIXTURE,
    breakpoint = "lg",
  }: {
    response?: FairExhibitors_QueryRawResponse
    breakpoint?: Breakpoint
  }) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <FairExhibitorsFragmentContainer fair={fair} />
          </MockBoot>
        )
      },
      query: graphql`
        query FairExhibitors_Query(
          $id: String!
          $first: Int
          $page: Int
          $sort: ShowSorts
        ) @raw_response_type {
          fair(id: $id) {
            ...FairExhibitors_fair
              @arguments(first: $first, page: $page, sort: $sort)
          }
        }
      `,
      variables: { id: "xxx", slug: "miart-2020", sort: "FEATURED_DESC" },
      mockData: response,
    })
  }

  let wrapper: ReactWrapper

  let refetchSpy
  beforeEach(async () => {
    wrapper = await getWrapper({})
    refetchSpy = jest.spyOn(
      (wrapper.find("FairExhibitors").props() as any).relay,
      "refetch"
    )
  })

  it("renders the rails from exhibitors that have artworks", async () => {
    expect(wrapper.find(FairExhibitorRail).length).toBe(2)
    const text = wrapper.text()
    expect(text).toContain("First Partner Has Artworks")
    expect(text).toContain("Second Partner Has Artworks")
  })

  it("skips over any partners with no artworks", async () => {
    const text = wrapper.text()
    expect(text).not.toContain("Partner Without Artworks")
  })

  it("renders pagination", () => {
    expect(wrapper.find(Pagination)).toHaveLength(1)
  })

  describe("sort", () => {
    it("renders correctly", () => {
      const text = wrapper.find(FairExhibitorSortFilter).text()
      expect(wrapper.find(FairExhibitorSortFilter).length).toBe(1)
      expect(text).toContain("Sort:")
      expect(text).toContain("Relevance")
      expect(text).toContain("Alphabetical (A-Z)")
    })

    it("changes selected value on click", () => {
      const sort = wrapper.find(SortFilter)
      expect(sort.find("option")).toHaveLength(2)
      expect(sort.prop("selected")).toEqual("FEATURED_DESC")
      sort.find("option").at(1).simulate("change")
      expect(wrapper.find(SortFilter).prop("selected")).toEqual("NAME_ASC")
    })

    it("calls refetch with proper params", () => {
      const sort = wrapper.find(SortFilter)
      sort.find("option").at(1).simulate("change")
      expect(refetchSpy).toHaveBeenCalledTimes(1)
      expect(refetchSpy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          id: "xxx",
          first: 15,
          sort: "NAME_ASC",
          page: 1,
        })
      )
    })

    describe("on mobile", () => {
      it("renders correctly", async () => {
        const wrapper = await getWrapper({ breakpoint: "xs" })
        const text = wrapper.find(FairExhibitorSortFilter).text()
        expect(wrapper.find(FairExhibitorSortFilter).length).toBe(1)
        expect(wrapper.find(Sticky).length).toBe(1)
        expect(text).toContain("Sort:")
        expect(text).toContain("Relevance")
        expect(text).toContain("Alphabetical (A-Z)")
      })
    })
  })
})

const FAIR_EXHIBITORS_FIXTURE: FairExhibitors_QueryRawResponse = {
  fair: {
    id: "xxx",
    slug: "xxx",
    exhibitors: {
      pageInfo: {
        hasNextPage: false,
      },
      pageCursors: {
        around: [
          {
            cursor: "YXJyYXljb25uZWN0aW9uOi0x",
            page: 1,
            isCurrent: true,
          },
        ],
        first: null,
        last: null,
        previous: null,
      },
      edges: [
        {
          node: {
            id: "xxx-1",
            internalID: "xxx-1",
            slug: "show-slug",
            counts: { artworks: 0 },
            href: "/show/example-1",
            partner: {
              __typename: "Partner",
              id: "example-1",
              name: "Partner Without Artworks",
            },
          },
        },
        {
          node: {
            id: "xxx-2",
            internalID: "xxx-2",
            slug: "show-slug",
            counts: { artworks: 10 },
            href: "/show/example-2",
            partner: {
              __typename: "Partner",
              id: "example-2",
              name: "First Partner Has Artworks",
            },
          },
        },
        {
          node: {
            id: "xxx-3",
            internalID: "xxx-3",
            slug: "show-slug",
            counts: { artworks: 10 },
            href: "/show/example-3",
            partner: {
              __typename: "Partner",
              id: "example-3",
              name: "Second Partner Has Artworks",
            },
          },
        },
      ],
    },
  },
}
