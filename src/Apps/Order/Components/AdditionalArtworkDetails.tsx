import {
  type FlexProps,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import type { AdditionalArtworkDetails_order$data } from "__generated__/AdditionalArtworkDetails_order.graphql"
import type { Omit } from "lodash"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface AdditionalArtworkDetailsProps
  extends Omit<FlexProps, "order"> {
  order: AdditionalArtworkDetails_order$data
}

const AdditionalArtworkDetails: React.FC<
  React.PropsWithChildren<AdditionalArtworkDetailsProps>
> = ({ order: { artworkDetails, lineItems }, ...others }) => {
  const artworkVersion = extractNodes(lineItems)[0]?.artworkVersion

  return (
    <StackableBorderBox flexDirection="column" {...others}>
      <Text variant="xs" fontWeight={600}>
        Artwork Description
      </Text>
      <Spacer y={1} />
      {artworkDetails && (
        <Text variant="xs" color="mono60">
          {artworkDetails}
        </Text>
      )}
      {artworkVersion?.provenance && (
        <Text variant="xs" color="mono60">
          Provenance: {artworkVersion.provenance}
        </Text>
      )}
      {artworkVersion?.condition_description && (
        <Text variant="xs" color="mono60">
          Condition: {artworkVersion.condition_description}
        </Text>
      )}
    </StackableBorderBox>
  )
}

export const AdditionalArtworkDetailsFragmentContainer =
  createFragmentContainer(AdditionalArtworkDetails, {
    order: graphql`
      fragment AdditionalArtworkDetails_order on CommerceOrder {
        artworkDetails
        lineItems {
          edges {
            node {
              artworkVersion {
                provenance
                condition_description
              }
            }
          }
        }
      }
    `,
  })
