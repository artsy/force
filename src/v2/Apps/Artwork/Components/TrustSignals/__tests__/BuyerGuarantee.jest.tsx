import { graphql } from "react-relay"
import { BuyerGuaranteeFragmentContainer } from "../BuyerGuarantee"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: BuyerGuaranteeFragmentContainer,
  query: graphql`
    query BuyerGuaranteeTestQuery @relay_test_operation {
      artwork(id: "whatevs") {
        ...BuyerGuarantee_artwork
      }
    }
  `,
})

describe("BuyerGuarantee", () => {
  it("Doesn't render when work is neither acquireable nor offerable", async () => {
    const component = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: false,
          is_offerable: false,
        }
      },
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the artwork is acquireable", async () => {
    const component = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: true,
          is_offerable: false,
        }
      },
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })

  it("Renders when the artwork is offerable", async () => {
    const component = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: false,
          is_offerable: true,
        }
      },
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })
})
