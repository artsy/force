import { graphql } from "react-relay"
import { AuthenticityCertificateFragmentContainer } from "Apps/Artwork/Components/TrustSignals/AuthenticityCertificate"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: AuthenticityCertificateFragmentContainer,
  query: graphql`
    query AuthenticityCertificateTestQuery @relay_test_operation {
      artwork(id: "whatevs") {
        ...AuthenticityCertificate_artwork
      }
    }
  `,
})

describe("AuthenticityCertificate", () => {
  it("Doesn't render when there's no certificate of authenticity", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          hasCertificateOfAuthenticity: false,
          id: "opaque-cert-id",
          is_biddable: false,
        }
      },
    })
    expect(wrapper.text()).not.toContain(
      "Includes a Certificate of Authenticity."
    )
  })

  it("Doesn't render when the artwork is biddable", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          hasCertificateOfAuthenticity: true,
          id: "opaque-cert-id",
          is_biddable: true,
        }
      },
    })
    expect(wrapper.text()).not.toContain(
      "Includes a Certificate of Authenticity."
    )
  })

  it("Renders when there's a certificate of authenticity, but the work is not biddable", async () => {
    const { wrapper } = getWrapper({
      Artwork: () => {
        return {
          hasCertificateOfAuthenticity: true,
          id: "opaque-cert-id",
          is_biddable: false,
        }
      },
    })
    expect(wrapper.text()).toContain("Includes a Certificate of Authenticity.")
  })

  it.todo("Click on certificate of authenticity link opens modal")

  it.todo("Click on modal close button closes modal")
})
