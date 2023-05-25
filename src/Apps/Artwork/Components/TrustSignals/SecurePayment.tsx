import { Link } from "@artsy/palette"
import { SecurePayment_artwork$data } from "__generated__/SecurePayment_artwork.graphql"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"
import { shouldRenderBuyerGuaranteeAndSecurePayment } from "Apps/Artwork/Utils/badges"
import LockIcon from "@artsy/icons/LockIcon"

interface SecurePaymentProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: SecurePayment_artwork$data
}

export const SecurePayment: React.FC<SecurePaymentProps> = ({
  artwork,
  ...other
}) => {
  if (shouldRenderBuyerGuaranteeAndSecurePayment(artwork)) {
    return (
      <TrustSignal
        Icon={<LockIcon />}
        label="Secure Checkout"
        description={
          <>
            {"Secure transactions by credit card through Stripe."}
            <br />
            <Link
              href="https://stripe.com/docs/security/stripe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </Link>
            {"."}
          </>
        }
        {...other}
      />
    )
  }

  return null
}

export const SecurePaymentFragmentContainer = createFragmentContainer(
  SecurePayment,
  {
    artwork: graphql`
      fragment SecurePayment_artwork on Artwork {
        is_acquireable: isAcquireable
        is_offerable: isOfferable
      }
    `,
  }
)
