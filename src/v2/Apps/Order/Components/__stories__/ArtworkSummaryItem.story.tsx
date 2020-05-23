import { Flex } from "@artsy/palette"
import { ArtworkSummaryItem_order } from "v2/__generated__/ArtworkSummaryItem_order.graphql"
import { mockResolver, UntouchedBuyOrder } from "v2/Apps/__tests__/Fixtures/Order"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { ArtworkSummaryItemFragmentContainer } from "../ArtworkSummaryItem"

const makeLineItems = ({ artistName, artworkTitle }) => ({
  edges: [
    {
      node: {
        artwork: {
          artist_names: artistName,
          title: artworkTitle,
          date: "2018",
          shippingOrigin: "New York, NY",
          image: {
            resized: {
              url:
                "https://d32dm0rphc51dk.cloudfront.net/SCShf97jlpFZpDBJUBqntg/small.jpg",
            },
          },
        },
      },
    },
  ],
})

const orderQuery = graphql`
  query ArtworkSummaryItemStoryQuery {
    order: commerceOrder(id: "foo") {
      ...ArtworkSummaryItem_order
    }
  }
`

const render = (extraOrderProps?: Partial<ArtworkSummaryItem_order>) => {
  return (
    <MockRelayRenderer
      Component={ArtworkSummaryItemFragmentContainer}
      mockResolvers={mockResolver({
        ...UntouchedBuyOrder,
        ...extraOrderProps,
      })}
      query={orderQuery}
    />
  )
}
storiesOf("Apps/Order/Components", module)
  .add("ArtworkSummaryItem", () => {
    return (
      <Section title="Artwork Summary">
        <Flex width={280} flexDirection="column">
          {render()}
        </Flex>
      </Section>
    )
  })
  .add("ArtworkSummaryItem (with long titles)", () => (
    <Section title="Artwork Summary">
      <Flex width={280} flexDirection="column">
        {render({
          lineItems: makeLineItems({
            artistName: "Francesca DiMattio and Orta Theroxicus",
            artworkTitle: "Some quite long title you know how artists can be",
          }) as any,
          sellerDetails: {
            __typename: "Partner",
            name: "Salon Nineteen Eighty Four and Three Quarters",
          } as any,
        })}
      </Flex>
    </Section>
  ))
