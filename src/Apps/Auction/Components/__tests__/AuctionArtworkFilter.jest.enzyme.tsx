import { AuctionArtworkFilterRefetchContainer } from "Apps/Auction/Components/AuctionArtworkFilter"
import { getArtworkFilterInputArgs } from "Apps/Auction/Components/getArtworkFilterInputArgs"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import type { AuctionArtworkFilterTestQuery } from "__generated__/AuctionArtworkFilterTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
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
jest.mock("Components/ArtworkFilter/ArtworkFilterPlaceholder", () => ({
  ArtworkFilterPlaceholder: () => null,
}))
jest.mock("Components/ArtworkFilter", () => ({
  ArtworkFilter: () => null,
}))
jest.mock("Components/ArtworkGrid/ArtworkGridContext", () => ({
  ArtworkGridContextProvider: ({ children }) => children,
}))

describe("AuctionArtworkFilter", () => {
  const { getWrapper } = setupTestWrapper<AuctionArtworkFilterTestQuery>({
    Component: (props: any) => {
      return <AuctionArtworkFilterRefetchContainer {...props} />
    },
    query: graphql`
      query AuctionArtworkFilterTestQuery {
        viewer {
          ...AuctionArtworkFilter_viewer
            @arguments(saleID: "test-sale", isLoggedIn: false)
        }
      }
    `,
  })

  it("renders correct components", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("ArtworkGridContextProvider")).toHaveLength(1)
    expect(
      (wrapper.find("ArtworkGridContextProvider").props() as any)
        .isAuctionArtwork,
    ).toBe(true)
    expect(wrapper.find("ArtworkFilter")).toHaveLength(1)
  })

  it("displays correct default sort", () => {
    const { wrapper } = getWrapper()
    expect(
      (wrapper.find("ArtworkFilter").props() as any).sortOptions[0],
    ).toEqual({
      text: "Lot Number (asc.)",
      value: "sale_position",
    })
  })

  it("passes in correct slug from router into relayRefetchInputVariables", () => {
    const { wrapper } = getWrapper()
    expect(
      (wrapper.find("ArtworkFilter").props() as any).relayRefetchInputVariables,
    ).toEqual(
      expect.objectContaining({
        saleID: "test-sale",
      }),
    )
  })

  describe("#getArtworkFilterInputArgs", () => {
    it("returns default arguments", () => {
      expect(getArtworkFilterInputArgs()).toEqual({
        aggregations: ["ARTIST", "MEDIUM", "TOTAL", "MATERIALS_TERMS"],
        first: 40,
      })
    })
  })
})
