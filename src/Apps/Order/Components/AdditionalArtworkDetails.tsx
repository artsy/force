import { AdditionalArtworkDetails_order$data } from "__generated__/AdditionalArtworkDetails_order.graphql"
import { Omit } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FlexProps, Text, Spacer, StackableBorderBox } from "@artsy/palette"

export interface AdditionalArtworkDetailsProps
  extends Omit<FlexProps, "order"> {
  order: AdditionalArtworkDetails_order$data
}

const AdditionalArtworkDetails: React.FC<AdditionalArtworkDetailsProps> = ({
  order: { artworkDetails },
  ...others
}) => {
  return (
    <StackableBorderBox flexDirection="column" {...others}>
      <Text variant="xs" fontWeight={600}>
        Artwork Description
      </Text>
      <Spacer y={1} />
      <Text variant="xs" color="black60">
        {artworkDetails}
      </Text>
    </StackableBorderBox>
  )
}

export const AdditionalArtworkDetailsFragmentContainer = createFragmentContainer(
  AdditionalArtworkDetails,
  {
    order: graphql`
      fragment AdditionalArtworkDetails_order on CommerceOrder {
        artworkDetails
      }
    `,
  }
)
