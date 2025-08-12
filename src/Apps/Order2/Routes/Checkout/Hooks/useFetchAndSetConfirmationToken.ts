import { useRelayEnvironment } from "react-relay"
import { useCheckoutContext } from "./useCheckoutContext"
import { fetchAndSetConfirmationToken } from "Apps/Order2/Utils/confirmationTokenUtils"
import { useCallback, useState } from "react"

export const useFetchAndSetConfirmationToken = () => {
  const environment = useRelayEnvironment()
  const { setConfirmationToken } = useCheckoutContext()
  const [saveCreditCard, setSaveCreditCard] = useState(true)

  const fetchAndSet = useCallback(
    async (tokenId: string, overrideSaveCreditCard?: boolean) => {
      return await fetchAndSetConfirmationToken(
        tokenId,
        environment,
        setConfirmationToken,
        overrideSaveCreditCard ?? saveCreditCard,
      )
    },
    [environment, setConfirmationToken, saveCreditCard],
  )

  return { fetchAndSet, saveCreditCard, setSaveCreditCard }
}
