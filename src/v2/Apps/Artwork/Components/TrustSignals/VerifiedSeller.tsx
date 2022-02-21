import { VerifiedIcon } from "@artsy/palette"
import { VerifiedSeller_artwork$data } from "v2/__generated__/VerifiedSeller_artwork.graphql"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"

interface VerifiedSellerProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: VerifiedSeller_artwork$data
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
export const VerifiedSeller: React.FC<VerifiedSellerProps> = ({
  artwork,
  ...other
}) => {
  return (
    !artwork.is_biddable &&
    artwork.partner &&
    artwork.partner.isVerifiedSeller && (
      <TrustSignal
        Icon={<VerifiedIcon />}
        label="Verified seller"
        description={`${artwork.partner.name} is a verified Artsy partner.`}
        {...other}
      />
    )
  )
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
