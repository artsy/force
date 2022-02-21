import { CheckCircleIcon, Link } from "@artsy/palette"
import * as React from "react"
import { BuyerGuarantee_artwork$data } from "v2/__generated__/BuyerGuarantee_artwork.graphql"

import { createFragmentContainer, graphql } from "react-relay"
import { TrustSignal } from "./TrustSignal"
import { BUYER_GUARANTEE_URL } from "v2/Apps/Order/Components/BuyerGuarantee"

interface Props {
  artwork: BuyerGuarantee_artwork$data
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
              href={BUYER_GUARANTEE_URL}
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
