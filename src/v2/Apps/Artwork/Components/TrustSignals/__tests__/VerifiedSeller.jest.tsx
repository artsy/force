import {
  VerifiedSellerTestQueryRawResponse,
  VerifiedSellerTestQueryResponse,
} from "v2/__generated__/VerifiedSellerTestQuery.graphql"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { VerifiedSellerFragmentContainer } from "../VerifiedSeller"

jest.unmock("react-relay")

const render = (
  artwork: VerifiedSellerTestQueryRawResponse["artwork"],
  extraProps?: Partial<ExtractProps<typeof VerifiedSellerFragmentContainer>>
) =>
  renderRelayTree({
    Component: (props: VerifiedSellerTestQueryResponse) => (
      <VerifiedSellerFragmentContainer
        artwork={{
          ...artwork,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      artwork,
    } as VerifiedSellerTestQueryRawResponse,
    query: graphql`
      query VerifiedSellerTestQuery @raw_response_type {
        artwork(id: "whatevs") {
          ...VerifiedSeller_artwork
        }
      }
    `,
  })

const partnerName = "partner-name"

describe("VerifiedSeller", () => {
  it("Doesn't render when the partner is a verified seller", async () => {
    const component = await render({
      id: "opaque-seller-id",
      partner: {
        id: "opaque-partner-id",
        name: partnerName,
        isVerifiedSeller: false,
      },
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Doesn't render when the artwork is biddable", async () => {
    const component = await render({
      id: "opaque-seller-id",
      partner: {
        id: "opaque-partner-id",
        name: partnerName,
        isVerifiedSeller: true,
      },
      is_biddable: true,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the partner is a verified seller, but the work is not biddable", async () => {
    const component = await render({
      id: "opaque-seller-id",
      partner: {
        id: "opaque-partner-id",
        name: partnerName,
        isVerifiedSeller: true,
      },
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
    expect(component.text()).toContain(partnerName)
  })
})
