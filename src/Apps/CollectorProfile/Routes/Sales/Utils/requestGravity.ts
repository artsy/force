import { getENV } from "Utils/getENV"

interface RequestGravityParams {
  path: string
  accessToken?: string
  method?: "GET" | "POST" | "DELETE"
}

// TODO: Replace the Gravity calls in this app with Metaphysics once it exposes
// the seller account. For now they go to Gravity directly.
export const requestGravity = async ({
  path,
  accessToken,
  method = "GET",
}: RequestGravityParams): Promise<Response> => {
  if (!accessToken) {
    throw new Error("Missing access token")
  }

  return await fetch(`${getENV("API_URL")}${path}`, {
    method,
    headers: { "X-Access-Token": accessToken },
  })
}
