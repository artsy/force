import { requestGravity } from "Apps/CollectorProfile/Routes/Sales/Utils/requestGravity"

export interface SellerAccount {
  id: string
  external_id: string
  created_at: string
  deactivated_at: string | null
  action_needed: boolean | null
}

interface SellerAccountRequestParams {
  accessToken?: string
}

const SELLER_ACCOUNT_PATH = "/api/v1/me/seller_account"

/**
 * Resolves to null when the user has no active seller account.
 */
export const fetchSellerAccount = async ({
  accessToken,
}: SellerAccountRequestParams): Promise<SellerAccount | null> => {
  const response = await requestGravity({
    path: SELLER_ACCOUNT_PATH,
    accessToken,
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch seller account (status ${response.status})`,
    )
  }

  return await response.json()
}

export const deleteSellerAccount = async ({
  accessToken,
}: SellerAccountRequestParams): Promise<void> => {
  const response = await requestGravity({
    path: SELLER_ACCOUNT_PATH,
    method: "DELETE",
    accessToken,
  })

  if (!response.ok) {
    throw new Error(
      `Failed to delete seller account (status ${response.status})`,
    )
  }
}
