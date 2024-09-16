import { getENV } from "Utils/getENV"

export const getMetaphysicsEndpoint = () => {
  const endpoint = `${getENV("METAPHYSICS_ENDPOINT")}/v2`

  return endpoint
}
