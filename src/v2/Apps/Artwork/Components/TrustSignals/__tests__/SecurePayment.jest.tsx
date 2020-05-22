import {
  SecurePaymentTestQueryRawResponse,
  SecurePaymentTestQueryResponse,
} from "v2/__generated__/SecurePaymentTestQuery.graphql"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { SecurePaymentFragmentContainer } from "../SecurePayment"

jest.unmock("react-relay")

const render = (
  artwork: SecurePaymentTestQueryRawResponse["artwork"],
  extraProps?: Partial<ExtractProps<typeof SecurePaymentFragmentContainer>>
) =>
  renderRelayTree({
    Component: (props: SecurePaymentTestQueryResponse) => (
      <SecurePaymentFragmentContainer
        artwork={{
          ...artwork,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      artwork,
    } as SecurePaymentTestQueryRawResponse,
    query: graphql`
      query SecurePaymentTestQuery @raw_response_type {
        artwork(id: "whatevs") {
          ...SecurePayment_artwork
        }
      }
    `,
  })

describe("SecurePayment", () => {
  it("Doesn't render when work is neither acquireable nor offerable", async () => {
    const component = await render({
      id: "opaque-payment-id",
      is_acquireable: false,
      is_offerable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the artwork is acquireable", async () => {
    const component = await render({
      id: "opaque-payment-id",
      is_acquireable: true,
      is_offerable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })

  it("Renders when the artwork is offerable", async () => {
    const component = await render({
      id: "opaque-payment-id",
      is_acquireable: false,
      is_offerable: true,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })
})
