import { Box, Separator, Serif } from "@artsy/palette"
import { Register_me } from "v2/__generated__/Register_me.graphql"
import { Register_sale } from "v2/__generated__/Register_sale.graphql"
import {
  RegisterCreateBidderMutation,
  RegisterCreateBidderMutationResponse,
} from "v2/__generated__/RegisterCreateBidderMutation.graphql"
import { RegisterCreateCreditCardAndUpdatePhoneMutation } from "v2/__generated__/RegisterCreateCreditCardAndUpdatePhoneMutation.graphql"
import {
  FormResult,
  StripeWrappedRegistrationForm,
} from "v2/Apps/Auction/Components/RegistrationForm"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { track } from "v2/Artsy"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { FormikHelpers as FormikActions } from "formik"
import React from "react"
import { Title } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { TrackingProp } from "react-tracking"
import { data as sd } from "sharify"
import { bidderNeedsIdentityVerification } from "v2/Utils/identityVerificationRequirements"
import createLogger from "v2/Utils/logger"

const logger = createLogger("Apps/Auction/Routes/Register")

interface RegisterProps {
  sale: Register_sale
  me: Register_me
  relay: RelayProp
  tracking: TrackingProp
}

// TODO: Extract.
export function createCreditCardAndUpdatePhone(relayEnvironment, phone, token) {
  return new Promise(async (resolve, reject) => {
    commitMutation<RegisterCreateCreditCardAndUpdatePhoneMutation>(
      relayEnvironment,
      {
        onCompleted: (data, errors) => {
          const {
            createCreditCard: { creditCardOrError },
          } = data

          if (creditCardOrError.creditCardEdge) {
            resolve()
          } else {
            if (errors) {
              reject(errors)
            } else {
              reject(creditCardOrError.mutationError)
            }
          }
        },
        onError: reject,
        mutation: graphql`
          mutation RegisterCreateCreditCardAndUpdatePhoneMutation(
            $creditCardInput: CreditCardInput!
            $profileInput: UpdateMyProfileInput!
          ) {
            updateMyUserProfile(input: $profileInput) {
              user {
                internalID
              }
            }

            createCreditCard(input: $creditCardInput) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCardEdge {
                    node {
                      lastDigits
                    }
                  }
                }
                ... on CreditCardMutationFailure {
                  mutationError {
                    type
                    message
                    detail
                  }
                }
              }
            }
          }
        `,
        variables: {
          creditCardInput: { token },
          profileInput: { phone },
        },
      }
    )
  })
}

export const RegisterRoute: React.FC<RegisterProps> = props => {
  const { me, relay, sale, tracking } = props

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

  function createBidder() {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegisterCreateBidderMutation>(relay.environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
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
          input: { saleID: sale.internalID },
        },
      })
    })
  }

  function handleMutationError(actions: FormikActions<object>, error: Error) {
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

    actions.setSubmitting(false)
    actions.setStatus("submissionFailed")
  }

  function handleSubmit(actions: FormikActions<object>, result: FormResult) {
    createCreditCardAndUpdatePhone(
      relay.environment,
      result.phoneNumber,
      result.token.id
    )
      .then(() => {
        createBidder()
          .then((data: RegisterCreateBidderMutationResponse) => {
            trackRegistrationSuccess(data.createBidder.bidder.internalID)

            window.location.assign(
              `${sd.APP_URL}/auction/${sale.slug}/confirm-registration`
            )
          })
          .catch(error => {
            handleMutationError(actions, error)
          })
      })
      .catch(error => {
        handleMutationError(actions, error)
      })
  }

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="10">Register to Bid on Artsy</Serif>
        <Separator mt={1} mb={2} />

        <StripeWrappedRegistrationForm
          onSubmit={handleSubmit}
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

const TrackingWrappedRegisterRoute: React.FC<RegisterProps> = props => {
  const Component = track({
    context_page: Schema.PageName.AuctionRegistrationPage,
  })(RegisterRoute)

  return <Component {...props} />
}

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
