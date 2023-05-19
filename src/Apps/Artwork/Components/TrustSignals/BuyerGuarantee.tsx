import { Link } from "@artsy/palette"
import * as React from "react"
import { BuyerGuarantee_artwork$data } from "__generated__/BuyerGuarantee_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { TrustSignal } from "./TrustSignal"
import { BUYER_GUARANTEE_URL } from "Apps/Order/Components/BuyerGuarantee"
import { shouldRenderBuyerGuaranteeAndSecurePayment } from "Apps/Artwork/Utils/badges"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"

interface Props {
  artwork: BuyerGuarantee_artwork$data
}

const BuyerGuarantee: React.FC<Props> = props => {
  const { artwork } = props

  if (shouldRenderBuyerGuaranteeAndSecurePayment(artwork)) {
    return (
      <TrustSignal
        Icon={<CheckmarkStrokeIcon />}
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
  }

  return null
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
