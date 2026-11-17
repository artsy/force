import { requestGravity } from "Apps/CollectorProfile/Routes/Sales/Utils/requestGravity"

interface FetchStripeClientSecretParams {
  accessToken?: string
}

export const fetchStripeClientSecret = async ({
  accessToken,
}: FetchStripeClientSecretParams): Promise<string> => {
  const response = await requestGravity({
    path: "/api/v1/me/seller_account_session",
    method: "POST",
    accessToken,
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Stripe client secret (status ${response.status})`,
    )
  }

  const { client_secret: clientSecret } = await response.json()

  return clientSecret
}
