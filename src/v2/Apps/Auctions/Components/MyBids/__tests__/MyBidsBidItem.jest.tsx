import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MyBidsBidItemFragmentContainer } from "../MyBidsBidItem"

jest.unmock("react-relay")

describe("MyBidsBidItem", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <MyBidsBidItemFragmentContainer saleArtwork={props.saleArtwork} />
    },
    query: graphql`
      query MyBidsBidItem_Test_Query {
        saleArtwork(id: "foo") {
          ...MyBidsBidItem_saleArtwork
        }
      }
    `,
  })

  it("renders correct components and data", () => {
    const wrapper = getWrapper({
      SaleArtwork: () => ({
        slug: "saleArtworkSlug",
        name: "saleArtworkName",
        formattedStartDateTime: "formattedStartDateTime",
        position: 1,
        isWatching: true,
        artwork: {
          artistNames: "artistNames",
          image: {
            resized: {
              src: "artworkImageResizedSrc",
              srcSet: "artworkImageResizedSrcSet",
            },
          },
        },
        partner: {
          name: "partnerName",
        },
      }),
    })

    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").props().to).toBe(
      "/artwork/saleArtworkSlug"
    )
    expect(wrapper.find("Image")).toBeDefined()
    expect(wrapper.find("Image").props().src).toEqual("artworkImageResizedSrc")
    expect(wrapper.find("Image").props().srcSet).toEqual(
      "artworkImageResizedSrcSet"
    )

    const text = wrapper.text()
    expect(text).toContain("artistNames")
    expect(text).toContain("Lot 1")
  })

  describe("component behavior", () => {
    describe("when watching", () => {
      it("shows highest bid amount", () => {
        const wrapper = getWrapper({
          SaleArtwork: () => ({
            isWatching: true,
            highestBid: {
              amount: "highestBidAmount",
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("highestBidAmount")
      })

      it("shows estimate if no highest bid", () => {
        const wrapper = getWrapper({
          SaleArtwork: () => ({
            isWatching: true,
            estimate: "estimate",
            highestBid: {
              amount: null,
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("estimate")
      })
    })

    describe("when not watching", () => {
      it("shows the current selling price", () => {
        const wrapper = getWrapper({
          SaleArtwork: () => ({
            isWatching: false,
            lotState: {
              sellingPrice: {
                display: "lotStateSellingPriceDisplay",
              },
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("lotStateSellingPriceDisplay")
      })

      it("shows proper bid label when only one bid", () => {
        const wrapper = getWrapper({
          SaleArtwork: () => ({
            isWatching: false,
            lotState: {
              bidCount: 1,
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("1 bid")
      })

      it("shows proper bid label when multiple bids", () => {
        const wrapper = getWrapper({
          SaleArtwork: () => ({
            isWatching: false,
            lotState: {
              bidCount: 2,
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("2 bids")
      })
    })
  })
})
