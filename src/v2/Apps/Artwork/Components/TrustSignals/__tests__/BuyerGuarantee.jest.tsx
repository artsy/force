import {
  BuyerGuaranteeTestQueryRawResponse,
  BuyerGuaranteeTestQueryResponse,
} from "v2/__generated__/BuyerGuaranteeTestQuery.graphql"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { BuyerGuaranteeFragmentContainer } from "../BuyerGuarantee"

jest.unmock("react-relay")

const render = (
  artwork: BuyerGuaranteeTestQueryRawResponse["artwork"],
  extraProps?: Partial<ExtractProps<typeof BuyerGuaranteeFragmentContainer>>
) =>
  renderRelayTree({
    Component: (props: BuyerGuaranteeTestQueryResponse) => (
      <BuyerGuaranteeFragmentContainer
        artwork={{
          ...artwork,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      artwork,
    } as BuyerGuaranteeTestQueryRawResponse,
    query: graphql`
      query BuyerGuaranteeTestQuery @raw_response_type {
        artwork(id: "whatevs") {
          ...BuyerGuarantee_artwork
        }
      }
    `,
  })

describe("BuyerGuarantee", () => {
  it("Doesn't render when work is neither acquireable nor offerable", async () => {
    const component = await render({
      id: "artwork-id",
      is_acquireable: false,
      is_offerable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the artwork is acquireable", async () => {
    const component = await render({
      id: "artwork-id",
      is_acquireable: true,
      is_offerable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })

  it("Renders when the artwork is offerable", async () => {
    const component = await render({
      id: "artwork-id",
      is_acquireable: false,
      is_offerable: true,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })
})
