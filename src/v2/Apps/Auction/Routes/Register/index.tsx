import { Box, Separator, Serif } from "@artsy/palette"
import { Register_me } from "v2/__generated__/Register_me.graphql"
import { Register_sale } from "v2/__generated__/Register_sale.graphql"
import {
  RegisterCreateBidderMutation,
  RegisterCreateBidderMutationResponse,
} from "v2/__generated__/RegisterCreateBidderMutation.graphql"
import { createCreditCardAndUpdatePhone } from "v2/Apps/Auction/Operations/CreateCreditCardAndUpdatePhone"
import { RegistrationForm } from "v2/Apps/Auction/Components/RegistrationForm"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { track } from "v2/Artsy"
import * as Schema from "v2/Artsy/Analytics/Schema"
import React, { ComponentProps } from "react"
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
  createStripeWrapper,
  errorMessageForCard,
  saleConfirmRegistrationPath,
  toStripeAddress,
} from "v2/Apps/Auction/Components/Form"
import { ReactStripeElements } from "react-stripe-elements"

const logger = createLogger("Apps/Auction/Routes/Register")

function createBidder(
  relayEnvironment: RelayProp["environment"],
  saleID: string
) {
  return new Promise<RegisterCreateBidderMutationResponse>(
    (resolve, reject) => {
      commitMutation<RegisterCreateBidderMutation>(relayEnvironment, {
        onCompleted: resolve,
        onError: reject,
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
        variables: {
          input: { saleID },
        },
      })
    }
  )
}

type OnSubmitType = ComponentProps<typeof RegistrationForm>["onSubmit"]
type FormikHelpers = Parameters<OnSubmitType>[1]

interface RegisterProps extends ReactStripeElements.InjectedStripeProps {
  sale: Register_sale
  me: Register_me
  relay: RelayProp
  tracking: TrackingProp
}

export const RegisterRoute: React.FC<RegisterProps> = props => {
  const { me, relay, sale, tracking, stripe } = props
  const { environment } = relay

  const commonProperties = {
    auction_slug: sale.slug,
    auction_state: sale.status,
    sale_id: sale.internalID,
    user_id: me.internalID,
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

    trackRegistrationFailed(errorMessages)
    helpers.setStatus("submissionFailed")
  }

  const createTokenAndSubmit: OnSubmitType = async (values, helpers) => {
    // FIXME: workaround for Formik calling `setSubmitting(false)` when the
    //  `onSubmit` function does not block.
    setTimeout(() => helpers.setSubmitting(true), 0)

    const address = toStripeAddress(values.address)
    const { phoneNumber } = values.address
    const { setFieldError, setSubmitting } = helpers

    try {
      const { error, token } = await stripe.createToken(address)

      if (error) {
        setFieldError("creditCard", error.message)
        return
      }

      const { id } = token
      const {
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

      trackRegistrationSuccess(data.createBidder.bidder.internalID)
      window.location.assign(saleConfirmRegistrationPath(sale.slug))
    } catch (error) {
      handleMutationError(helpers, error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="10">Register to Bid on Artsy</Serif>
        <Separator mt={1} mb={2} />

        <RegistrationForm
          onSubmit={createTokenAndSubmit}
          trackSubmissionErrors={trackRegistrationFailed}
          needsIdentityVerification={bidderNeedsIdentityVerification({
            sale,
            user: me,
          })}
        />
      </Box>
    </AppContainer>
  )
}

const StripeWrappedRegisterRoute = createStripeWrapper(RegisterRoute)

const TrackingWrappedRegisterRoute = track({
  context_page: Schema.PageName.AuctionRegistrationPage,
})(StripeWrappedRegisterRoute)

export const RegisterRouteFragmentContainer = createFragmentContainer(
  TrackingWrappedRegisterRoute,
  {
    sale: graphql`
      fragment Register_sale on Sale {
        slug
        internalID
        status
        requireIdentityVerification
      }
    `,
    me: graphql`
      fragment Register_me on Me {
        internalID
        identityVerified
      }
    `,
  }
)

// For bundle splitting in router
export default RegisterRouteFragmentContainer
