import { LoadingArea } from "Components/LoadingArea"
import { useRouter } from "System/Hooks/useRouter"
import { Box } from "@artsy/palette"
import { type FC, useCallback, useEffect } from "react"
import { usePartnerOfferCheckoutMutation } from "./Mutations/UsePartnerOfferCheckoutMutation"

export const PartnerOfferCheckout: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { match, router } = useRouter()
  const partnerOfferId = match.params.partnerOfferID
  const { submitMutation: partnerCheckoutMutation } =
    usePartnerOfferCheckoutMutation()

  const handleRedirect = useCallback(async () => {
    if (partnerOfferId) {
      try {
        const response = await partnerCheckoutMutation({
          variables: {
            input: {
              partnerOfferId: partnerOfferId,
            },
          },
        })

        let redirectUrl = "/"
        const orderOrError =
          response.commerceCreatePartnerOfferOrder?.orderOrError

        if (orderOrError?.error) {
          const errorCode = orderOrError.error.code
          const errorData = JSON.parse(
            orderOrError.error.data?.toString() ?? "",
          )

          switch (errorCode) {
            case "expired_partner_offer":
              redirectUrl = `/artwork/${errorData.artwork_id}?expired_offer=true`
              break
            case "not_acquireable":
              redirectUrl = `/artwork/${errorData.artwork_id}?unavailable=true`
              break
          }
        } else {
          redirectUrl = `/orders/${orderOrError?.order?.internalID}`
        }
        router?.push(redirectUrl)
      } catch (error) {
        console.error("Error creating partner offer order", error)
      }
    }
  }, [partnerCheckoutMutation, partnerOfferId, router])

  useEffect(() => {
    handleRedirect()
  }, [])

  return (
    <LoadingArea isLoading={true}>
      <Box height={300} />
    </LoadingArea>
  )
}
