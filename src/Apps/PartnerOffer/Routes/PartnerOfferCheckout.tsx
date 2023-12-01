import { FC, useCallback, useEffect } from "react"
import { useSystemContext } from "System/SystemContext"
import { usePartnerOfferCheckoutMutation } from "./Mutations/UsePartnerOfferCheckoutMutation"
import { useRouter } from "System/Router/useRouter"
import { LoadingArea } from "Components/LoadingArea"
import { Box } from "@artsy/palette"

export const PartnerOfferCheckout: FC = () => {
  const { router } = useSystemContext()
  const { match } = useRouter()
  const partnerOfferId = match.params.partnerOfferID
  const {
    submitMutation: partnerCheckoutMutation,
  } = usePartnerOfferCheckoutMutation()

  const handleRedirect = useCallback(async () => {
    try {
      const response = await partnerCheckoutMutation({
        variables: {
          input: {
            partnerOfferId: partnerOfferId,
          },
        },
      })

      let redirectUrl = "/"
      let orderOrError = response.commerceCreatePartnerOfferOrder?.orderOrError

      if (orderOrError?.error) {
        const errorCode = orderOrError.error.code
        const errorData = JSON.parse(orderOrError.error.data?.toString() ?? "")

        switch (errorCode) {
          case "expired_partner_offer":
            // TODO: Show error message in artwork page
            redirectUrl = `/artwork/${errorData.artwork_id}`
            break
          case "not_acquireable":
            // TODO: Show error message in artwork page
            redirectUrl = `/artwork/${errorData.artwork_id}`
            break
        }
      } else {
        redirectUrl = `/orders/${orderOrError?.order?.internalID}`
      }
      router?.push(redirectUrl)
    } catch (error) {
      console.error("Error creating partner offer order", error)
    }
  }, [partnerCheckoutMutation, partnerOfferId, router])

  useEffect(() => {
    if (router) {
      handleRedirect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <LoadingArea isLoading={true}>
      <Box height={300} />
    </LoadingArea>
  )
}
