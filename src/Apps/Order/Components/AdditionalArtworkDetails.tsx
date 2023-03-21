import { AdditionalArtworkDetails_order$data } from "__generated__/AdditionalArtworkDetails_order.graphql"
import { Omit } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FlexProps, Text, Spacer, StackableBorderBox } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"

export interface AdditionalArtworkDetailsProps
  extends Omit<FlexProps, "order"> {
  order: AdditionalArtworkDetails_order$data
}

const AdditionalArtworkDetails: React.FC<AdditionalArtworkDetailsProps> = ({
  order: { artworkDetails, lineItems },
  ...others
}) => {
  const artworkVersion = extractNodes(lineItems)[0]?.artworkVersion

  return (
    <StackableBorderBox flexDirection="column" {...others}>
      <Text variant="xs" fontWeight={600}>
        Artwork Description
      </Text>
      <Spacer y={1} />
      {artworkDetails && (
        <Text variant="xs" color="black60">
          {artworkDetails}
        </Text>
      )}
      {artworkVersion?.provenance && (
        <Text variant="xs" color="black60">
          Provenance: {artworkVersion.provenance}
        </Text>
      )}
      {artworkVersion?.condition_description && (
        <Text variant="xs" color="black60">
          Condition: {artworkVersion.condition_description}
        </Text>
      )}
    </StackableBorderBox>
  )
}

export const AdditionalArtworkDetailsFragmentContainer = createFragmentContainer(
  AdditionalArtworkDetails,
  {
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
  }
)
