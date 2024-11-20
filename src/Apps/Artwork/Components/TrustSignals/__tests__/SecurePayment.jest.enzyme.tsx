import { graphql } from "react-relay"
import { SecurePaymentFragmentContainer } from "Apps/Artwork/Components/TrustSignals/SecurePayment"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: SecurePaymentFragmentContainer,
  query: graphql`
    query SecurePaymentTestQuery @relay_test_operation {
      artwork(id: "whatevs") {
        ...SecurePayment_artwork
      }
    }
  `,
})

describe("SecurePayment", () => {
  it("Doesn't render when work is neither acquireable nor offerable", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: false,
          is_offerable: false,
        }
      },
    })
    expect(wrapper.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the artwork is acquireable", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: true,
          is_offerable: false,
        }
      },
    })
    expect(wrapper.find("TrustSignal").length).toBe(1)
  })

  it("Renders when the artwork is offerable", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: false,
          is_offerable: true,
        }
      },
    })
    expect(wrapper.find("TrustSignal").length).toBe(1)
  })
})
