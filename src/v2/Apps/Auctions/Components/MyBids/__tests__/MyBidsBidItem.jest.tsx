import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MyBidsBidItemFragmentContainer } from "../MyBidsBidItem"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyBidsBidItem", () => {
  const useTracking = baseUseTracking as jest.Mock
  const trackEvent = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MyBidsBidItemFragmentContainer
          saleArtwork={props.saleArtwork}
          horizontalSlidePosition={2}
        />
      )
    },
    query: graphql`
      query MyBidsBidItem_Test_Query @relay_test_operation {
        saleArtwork(id: "foo") {
          ...MyBidsBidItem_saleArtwork
        }
      }
    `,
  })

  beforeEach(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correct components and data", () => {
    const wrapper = getWrapper({
      SaleArtwork: () => ({
        slug: "saleArtworkSlug",
        name: "saleArtworkName",
        formattedStartDateTime: "formattedStartDateTime",
        lotLabel: 1,
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
            currentBid: {
              display: "currentBidDisplay",
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("currentBidDisplay")
      })

      it("shows estimate if no highest bid", () => {
        const wrapper = getWrapper({
          SaleArtwork: () => ({
            isWatching: true,
            estimate: "estimate",
            currentBid: {
              display: null,
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("estimate")
      })
    })

    describe("when not watching", () => {
      it("shows the current bid", () => {
        const wrapper = getWrapper({
          SaleArtwork: () => ({
            isWatching: false,
            currentBid: {
              display: "currentBidDisplay",
            },
          }),
        })

        const text = wrapper.text()
        expect(text).toContain("currentBidDisplay")
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

  it("tracks clicks", () => {
    const wrapper = getWrapper()
    wrapper.find("RouterLink").first().simulate("click")
    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "clickedArtworkGroup",
          "context_module": "yourActiveBids",
          "context_page_owner_type": undefined,
          "destination_page_owner_id": "<mock-value-for-field-\\"internalID\\">",
          "destination_page_owner_slug": "<mock-value-for-field-\\"slug\\">",
          "destination_page_owner_type": "artwork",
          "horizontal_slide_position": 2,
          "type": "thumbnail",
        },
      ]
    `)
  })
})
