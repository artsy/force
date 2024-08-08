import { getENV } from "Utils/getENV"

export const getMetaphysicsEndpoint = () => {
  const APP_URL = getENV("APP_URL") ?? "http://localhost:4000"

  const endpoint =
    // Only use the proxy if logged out
    getENV("ENABLE_GRAPHQL_PROXY")
      ? `${APP_URL}/api/metaphysics`
      : `${getENV("METAPHYSICS_ENDPOINT")}/v2`

  return endpoint
}
