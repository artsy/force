import { getENV } from "Utils/getENV"

interface FetchStripeClientSecretParams {
  accessToken?: string
}

// TODO: Replace with a Metaphysics mutation once it exists. For now this calls
// Gravity directly, which creates the seller's Stripe account on first use.
export const fetchStripeClientSecret = async ({
  accessToken,
}: FetchStripeClientSecretParams): Promise<string> => {
  if (!accessToken) {
    throw new Error("Missing access token")
  }

  const response = await fetch(
    `${getENV("API_URL")}/api/v1/me/seller_account_session`,
    { method: "POST", headers: { "X-Access-Token": accessToken } },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Stripe client secret (status ${response.status})`,
    )
  }

  const { client_secret: clientSecret } = await response.json()

  return clientSecret
}
