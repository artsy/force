import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import {
  AuctionArtworkFilterRefetchContainer,
  getArtworkFilterInputArgs,
} from "../AuctionArtworkFilter"
import { AuctionArtworkFilterTestQuery } from "v2/__generated__/AuctionArtworkFilterTestQuery.graphql"

jest.unmock("react-relay")

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "test-sale",
      },
      location: {
        query: {
          foo: "bar",
        },
      },
    },
  }),
}))
jest.mock("v2/Components/ArtworkFilter", () => ({
  ArtworkFilter: () => null,
}))
jest.mock("v2/Components/ArtworkGrid/ArtworkGridContext", () => ({
  ArtworkGridContextProvider: ({ children }) => children,
}))

describe("AuctionArtworkFilter", () => {
  const { getWrapper } = setupTestWrapper<AuctionArtworkFilterTestQuery>({
    Component: (props: any) => {
      return <AuctionArtworkFilterRefetchContainer {...props} />
    },
    query: graphql`
      query AuctionArtworkFilterTestQuery($input: FilterArtworksInput!) {
        viewer {
          ...AuctionArtworkFilter_viewer @arguments(input: $input)
        }
      }
    `,
    variables: {
      input: {},
    },
  })

  it("renders correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ArtworkGridContextProvider")).toHaveLength(1)
    expect(
      (wrapper.find("ArtworkGridContextProvider").props() as any)
        .isAuctionArtwork
    ).toBe(true)
    expect(wrapper.find("ArtworkFilter")).toHaveLength(1)
  })

  it("displays correct default sort", () => {
    const wrapper = getWrapper()
    expect(
      (wrapper.find("ArtworkFilter").props() as any).sortOptions[0]
    ).toEqual({
      text: "Lot Number (asc.)",
      value: "sale_position",
    })
  })

  it("passes in correct slug from router into relayRefetchInputVariables", () => {
    const wrapper = getWrapper()
    expect(
      (wrapper.find("ArtworkFilter").props() as any).relayRefetchInputVariables
    ).toEqual(
      expect.objectContaining({
        saleID: "test-sale",
      })
    )
  })

  describe("#getArtworkFilterInputArgs", () => {
    it("returns default arguments", () => {
      expect(getArtworkFilterInputArgs()).toEqual({
        aggregations: ["ARTIST", "MEDIUM", "TOTAL"],
        first: 39,
        sort: "sale_position",
      })
    })

    it("returns additional aggregation FOLLOWED_ARTISTS for logged in users", () => {
      expect(getArtworkFilterInputArgs({ id: "foo" }).aggregations).toEqual([
        "ARTIST",
        "MEDIUM",
        "TOTAL",
        "FOLLOWED_ARTISTS",
      ])
    })
  })
})
