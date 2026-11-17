import {
  type SellerAccount,
  deleteSellerAccount,
  fetchSellerAccount,
} from "Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useCallback, useEffect, useState } from "react"

/**
 * Loads the user's active seller account (null when there is none) and
 * deletes it. `deleteAccount` rethrows so the caller can show its own error.
 */
export const useSellerAccount = () => {
  const { user } = useSystemContext()
  const accessToken = user?.accessToken

  const [sellerAccount, setSellerAccount] = useState<SellerAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoadFailed, setHasLoadFailed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const reload = useCallback(async () => {
    setIsLoading(true)

    try {
      setSellerAccount(await fetchSellerAccount({ accessToken }))
      setHasLoadFailed(false)
    } catch (error) {
      console.error(error)
      setHasLoadFailed(true)
    } finally {
      setIsLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    reload()
  }, [reload])

  const deleteAccount = async () => {
    setIsDeleting(true)

    try {
      await deleteSellerAccount({ accessToken })
      setSellerAccount(null)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    sellerAccount,
    isLoading,
    hasLoadFailed,
    isDeleting,
    reload,
    deleteAccount,
  }
}
