import { CheckCircleIcon, Link } from "@artsy/palette"
import React from "react"
import { BuyerGuarantee_artwork } from "v2/__generated__/BuyerGuarantee_artwork.graphql"

import { createFragmentContainer, graphql } from "react-relay"
import { TrustSignal } from "./TrustSignal"

interface Props {
  artwork: BuyerGuarantee_artwork
}

const BuyerGuarantee: React.FC<Props> = props => {
  const { artwork } = props
  return (
    (artwork.is_acquireable || artwork.is_offerable) && (
      <TrustSignal
        Icon={<CheckCircleIcon />}
        label="Your purchase is protected"
        description={
          <>
            {"Learn more about "}
            <Link
              href="https://support.artsy.net/hc/en-us/articles/360048946973-How-does-Artsy-protect-me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Artsy’s buyer protection.
            </Link>
            {"."}
          </>
        }
      />
    )
  )
}

export const BuyerGuaranteeFragmentContainer = createFragmentContainer(
  BuyerGuarantee,
  {
    artwork: graphql`
      fragment BuyerGuarantee_artwork on Artwork {
        is_acquireable: isAcquireable
        is_offerable: isOfferable
      }
    `,
  }
)
