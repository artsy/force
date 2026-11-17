import {
  type SellerAccount,
  deleteSellerAccount,
  fetchSellerAccount,
} from "Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useCallback, useEffect, useState } from "react"

type LoadStatus = "loading" | "loaded" | "failed"

/**
 * Loads the user's active seller account (null when there is none) and
 * deletes it. `deleteAccount` rethrows so the caller can show its own error.
 */
export const useSellerAccount = () => {
  const { user } = useSystemContext()
  const accessToken = user?.accessToken

  const [status, setStatus] = useState<LoadStatus>("loading")
  const [sellerAccount, setSellerAccount] = useState<SellerAccount | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const reload = useCallback(async () => {
    setStatus("loading")

    try {
      setSellerAccount(await fetchSellerAccount({ accessToken }))
      setStatus("loaded")
    } catch (error) {
      console.error(error)
      setStatus("failed")
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
    status,
    isDeleting,
    reload,
    deleteAccount,
  }
}
