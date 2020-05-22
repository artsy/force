import {
  AuthenticityCertificateTestQueryRawResponse,
  AuthenticityCertificateTestQueryResponse,
} from "v2/__generated__/AuthenticityCertificateTestQuery.graphql"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { AuthenticityCertificateFragmentContainer } from "../AuthenticityCertificate"

jest.unmock("react-relay")

const render = (
  artwork: AuthenticityCertificateTestQueryRawResponse["artwork"],
  extraProps?: Partial<
    ExtractProps<typeof AuthenticityCertificateFragmentContainer>
  >
) =>
  renderRelayTree({
    Component: (props: AuthenticityCertificateTestQueryResponse) => (
      <AuthenticityCertificateFragmentContainer
        artwork={{
          ...artwork,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      artwork,
    } as AuthenticityCertificateTestQueryRawResponse,
    query: graphql`
      query AuthenticityCertificateTestQuery @raw_response_type {
        artwork(id: "whatevs") {
          ...AuthenticityCertificate_artwork
        }
      }
    `,
  })

describe("AuthenticityCertificate", () => {
  it("Doesn't render when there's no certificate of authenticity", async () => {
    const component = await render({
      id: "opaque-cert-id",
      hasCertificateOfAuthenticity: false,
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Doesn't render when the artwork is biddable", async () => {
    const component = await render({
      id: "opaque-cert-id",
      hasCertificateOfAuthenticity: true,
      is_biddable: true,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when there's a certificate of authenticity, but the work is not biddable", async () => {
    const component = await render({
      id: "opaque-cert-id",
      hasCertificateOfAuthenticity: true,
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })

  it.todo("Click on certificate of authenticity link opens modal")

  it.todo("Click on modal close button closes modal")
})
