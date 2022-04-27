import { VerifiedIcon } from "@artsy/palette"
import { VerifiedSeller_artwork } from "v2/__generated__/VerifiedSeller_artwork.graphql"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"
import { shouldRenderVerifiedSeller } from "v2/Apps/Artwork/Utils/badges"

interface VerifiedSellerProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: VerifiedSeller_artwork
}

export const VerifiedSeller: React.FC<VerifiedSellerProps> = ({
  artwork,
  ...other
}) => {
  if (shouldRenderVerifiedSeller(artwork)) {
    return (
      <TrustSignal
        Icon={<VerifiedIcon />}
        label="Verified seller"
        description={`${artwork!.partner!.name} is a verified Artsy partner.`}
        {...other}
      />
    )
  }

  return null
}

export const VerifiedSellerFragmentContainer = createFragmentContainer(
  VerifiedSeller,
  {
    artwork: graphql`
      fragment VerifiedSeller_artwork on Artwork {
        is_biddable: isBiddable
        partner {
          isVerifiedSeller
          name
        }
      }
    `,
  }
)
