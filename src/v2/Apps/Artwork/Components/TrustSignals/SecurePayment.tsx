import { Link, LockIcon } from "@artsy/palette"
import { SecurePayment_artwork$data } from "v2/__generated__/SecurePayment_artwork.graphql"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"

interface SecurePaymentProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: SecurePayment_artwork$data
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
export const SecurePayment: React.FC<SecurePaymentProps> = ({
  artwork,
  ...other
}) => {
  return (
    (artwork.is_acquireable || artwork.is_offerable) && (
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
