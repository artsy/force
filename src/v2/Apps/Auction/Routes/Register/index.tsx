import { Box, Separator, Serif } from "@artsy/palette"
import { Register_me } from "v2/__generated__/Register_me.graphql"
import { Register_sale } from "v2/__generated__/Register_sale.graphql"
import {
  RegisterCreateBidderMutation,
  RegisterCreateBidderMutationResponse,
} from "v2/__generated__/RegisterCreateBidderMutation.graphql"
import { createCreditCardAndUpdatePhone } from "v2/Apps/Auction/Operations/CreateCreditCardAndUpdatePhone"
import { RegistrationForm } from "v2/Apps/Auction/Components/RegistrationForm"
import { track } from "v2/System"
import * as Schema from "v2/System/Analytics/Schema"
import { ComponentProps } from "react"
import * as React from "react"
import { Title } from "react-head"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { TrackingProp } from "react-tracking"
import { bidderNeedsIdentityVerification } from "v2/Utils/identityVerificationRequirements"
import createLogger from "v2/Utils/logger"
import {
  errorMessageForCard,
  saleConfirmRegistrationPath,
  toStripeAddress,
} from "v2/Apps/Auction/Components/Utils/helpers"
import { createStripeWrapper } from "v2/Utils/createStripeWrapper"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import { CardElement } from "@stripe/react-stripe-js"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"
import { getENV } from "v2/Utils/getENV"

const logger = createLogger("Apps/Auction/Routes/Register")

function createBidder(
  relayEnvironment: RelayProp["environment"],
  saleID: string
) {
  return new Promise<RegisterCreateBidderMutationResponse>(
    (resolve, reject) => {
      commitMutation<RegisterCreateBidderMutation>(relayEnvironment, {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation RegisterCreateBidderMutation($input: CreateBidderInput!) {
            createBidder(input: $input) {
              bidder {
                internalID
              }
            }
          }
        `,

        onCompleted: resolve,

        onError: reject,
        variables: {
          input: { saleID },
        },
      })
    }
  )
}

type OnSubmitType = ComponentProps<typeof RegistrationForm>["onSubmit"]
type FormikHelpers = Parameters<OnSubmitType>[1]

interface RegisterProps {
  stripe: Stripe
  elements: StripeElements
  sale: Register_sale
  me: Register_me
  relay: RelayProp
  tracking: TrackingProp
}

export const RegisterRoute: React.FC<RegisterProps> = props => {
  const { me, relay, sale, tracking, stripe, elements } = props
  const { environment } = relay

  const commonProperties = {
    auction_slug: sale.slug,
    auction_state: sale.status,
    sale_id: sale.internalID,
    user_id: me.internalID,
  }

  function renderZendeskScript() {
    if (typeof window !== "undefined" && window.zEmbed) return
    return <ZendeskWrapper zdKey={getENV("AUCTION_ZENDESK_KEY")} />
  }

  function trackRegistrationFailed(errors: string[]) {
    tracking.trackEvent({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      error_messages: errors,
      ...commonProperties,
    })
  }

  function trackRegistrationSuccess(bidderId: string) {
    tracking.trackEvent({
      action_type: Schema.ActionType.RegistrationSubmitted,
      bidder_id: bidderId,
      ...commonProperties,
    })
  }

  function handleMutationError(helpers: FormikHelpers, error: Error) {
    logger.error(error)

    let errorMessages: string[]
    if (Array.isArray(error)) {
      errorMessages = error.map(e => e.message)
    } else if (typeof error === "string") {
      errorMessages = [error]
    } else if (error.message) {
      errorMessages = [error.message]
    }

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    trackRegistrationFailed(errorMessages)
    helpers.setStatus("submissionFailed")
  }

  const createTokenAndSubmit: OnSubmitType = async (values, helpers) => {
    const address = toStripeAddress(values.address)
    const { phoneNumber } = values.address
    const { setFieldError, setSubmitting } = helpers
    const element = elements.getElement(CardElement)

    try {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const { error, token } = await stripe.createToken(element, address)
      if (error) {
        setFieldError("creditCard", error.message)
        return
      }

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const { id } = token
      const {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        createCreditCard: { creditCardOrError },
      } = await createCreditCardAndUpdatePhone(environment, phoneNumber, id)
      // TODO: We are not handling errors for `updateMyUserProfile`. Should we?
      if (creditCardOrError.mutationError) {
        setFieldError(
          "creditCard",
          errorMessageForCard(creditCardOrError.mutationError.detail)
        )
        return
      }
      const data = await createBidder(environment, sale.internalID)

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      trackRegistrationSuccess(data.createBidder.bidder.internalID)
      window.location.assign(saleConfirmRegistrationPath(sale.slug))
    } catch (error) {
      handleMutationError(helpers, error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="10">Register to Bid on Artsy</Serif>
        <Separator mt={1} mb={2} />

        <RegistrationForm
          onSubmit={createTokenAndSubmit}
          trackSubmissionErrors={trackRegistrationFailed}
          needsIdentityVerification={bidderNeedsIdentityVerification({
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            sale,
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            user: me,
          })}
        />
      </Box>
      {renderZendeskScript()}
    </>
  )
}

const StripeWrappedRegisterRoute = createStripeWrapper(RegisterRoute)

const TrackingWrappedRegisterRoute = track({
  context_page: Schema.PageName.AuctionRegistrationPage,
})(StripeWrappedRegisterRoute)

export const RegisterRouteFragmentContainer = createFragmentContainer(
  TrackingWrappedRegisterRoute,
  {
    me: graphql`
      fragment Register_me on Me {
        internalID
        identityVerified
      }
    `,
    sale: graphql`
      fragment Register_sale on Sale {
        slug
        internalID
        status
        requireIdentityVerification
      }
    `,
  }
)
