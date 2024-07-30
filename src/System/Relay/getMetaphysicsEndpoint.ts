import { isServer } from "Server/isServer"
import { getENV } from "Utils/getENV"

export const getMetaphysicsEndpoint = () => {
  const APP_URL = getENV("APP_URL") ?? "http://localhost:4000"

  const endpoint = (() => {
    const metaphysicsEndpoint = `${getENV("METAPHYSICS_ENDPOINT")}/v2`

    // Always return MP on the server.
    if (isServer) {
      return metaphysicsEndpoint
    }

    if (getENV("ENABLE_GRAPHQL_PROXY")) {
      return `${APP_URL}/api/metaphysics`
    }

    // Fallback to MP as a default
    return metaphysicsEndpoint
  })()

  return endpoint
}
