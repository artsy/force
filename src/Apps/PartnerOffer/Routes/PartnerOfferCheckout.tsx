import { FC, useEffect } from "react"
import { graphql } from "react-relay"
import { commitMutation } from "relay-runtime"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { useSystemContext } from "System/SystemContext"
import { PartnerOfferCheckoutMutation } from "__generated__/PartnerOfferCheckoutMutation.graphql"
import { useRouter } from "System/Router/useRouter"
import { ErrorWithMetadata } from "Utils/errors"
import { logger } from "@sentry/utils"
import { LoadingArea } from "Components/LoadingArea"
import { Box } from "@artsy/palette"

export const PartnerOfferCheckout: FC = () => {
  const { relayEnvironment, router } = useSystemContext()
  const { match } = useRouter()
  const partnerOfferId = match.params.partnerOfferID
  const onMutationError = (error: ErrorWithMetadata) => {
    logger.error(error)
  }

  useEffect(() => {
    commitMutation<PartnerOfferCheckoutMutation>(
      relayEnvironment as RelayModernEnvironment,
      {
        mutation: graphql`
          mutation PartnerOfferCheckoutMutation(
            $input: CommerceCreatePartnerOfferOrderInput!
          ) {
            commerceCreatePartnerOfferOrder(input: $input) {
              orderOrError {
                ... on CommerceOrderWithMutationSuccess {
                  __typename
                  order {
                    internalID
                    mode
                  }
                }
                ... on CommerceOrderWithMutationFailure {
                  error {
                    type
                    code
                    data
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            partnerOfferId: partnerOfferId,
          },
        },
        onCompleted: data => {
          const {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            commerceCreatePartnerOfferOrder: { orderOrError },
          } = data
          let redirectUrl = "/"

          if (orderOrError.error) {
            const error_code = orderOrError.error.code
            const error_data = JSON.parse(orderOrError.error.data)
            switch (error_code) {
              case "expired_partner_offer":
                // TODO: Show error message in artwork page
                redirectUrl = `/artwork/${error_data.artwork_id}`
                break
              case "not_acquireable":
                // TODO: Show error message in artwork page
                redirectUrl = `/artwork/${error_data.artwork_id}`
                break
            }
          } else {
            redirectUrl = `/orders/${orderOrError.order.internalID}`
          }
          router?.push(redirectUrl)
        },
        onError: onMutationError,
      }
    )
  })

  return (
    <LoadingArea isLoading={true}>
      <Box height={300}></Box>
    </LoadingArea>
  )
}
