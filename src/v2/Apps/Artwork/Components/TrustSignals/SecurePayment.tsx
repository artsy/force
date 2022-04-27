import { Link, LockIcon } from "@artsy/palette"
import { SecurePayment_artwork } from "v2/__generated__/SecurePayment_artwork.graphql"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"
import { shouldRenderGuarantee } from "v2/Apps/Artwork/Utils/badges"

interface SecurePaymentProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: SecurePayment_artwork
}

export const SecurePayment: React.FC<SecurePaymentProps> = ({
  artwork,
  ...other
}) => {
  return (
    shouldRenderGuarantee(artwork) && (
      <TrustSignal
        Icon={<LockIcon />}
        label="Secure payment"
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
  )
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
