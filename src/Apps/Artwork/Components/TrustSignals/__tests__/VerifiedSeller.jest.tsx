import { graphql } from "react-relay"
import { VerifiedSellerFragmentContainer } from "Apps/Artwork/Components/TrustSignals/VerifiedSeller"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: VerifiedSellerFragmentContainer,
  query: graphql`
    query VerifiedSellerTestQuery @relay_test_operation {
      artwork(id: "whatevs") {
        ...VerifiedSeller_artwork
      }
    }
  `,
})

const partnerName = "partner-name"

describe("VerifiedSeller", () => {
  it("Doesn't render when the partner is a verified seller", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          id: "opaque-seller-id",
          is_biddable: false,
          partner: {
            id: "opaque-partner-id",
            isVerifiedSeller: false,
            name: partnerName,
          },
        }
      },
    })
    expect(wrapper.find("TrustSignal").length).toBe(0)
  })

  it("Doesn't render when the artwork is biddable", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          id: "opaque-seller-id",
          is_biddable: true,
          partner: {
            id: "opaque-partner-id",
            isVerifiedSeller: true,
            name: partnerName,
          },
        }
      },
    })
    expect(wrapper.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the partner is a verified seller, but the work is not biddable", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          id: "opaque-seller-id",
          is_biddable: false,
          partner: {
            id: "opaque-partner-id",
            isVerifiedSeller: true,
            name: partnerName,
          },
        }
      },
    })
    expect(wrapper.find("TrustSignal").length).toBe(1)
    expect(wrapper.text()).toContain(partnerName)
  })
})
