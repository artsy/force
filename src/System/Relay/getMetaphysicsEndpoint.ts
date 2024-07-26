import { getENV } from "Utils/getENV"

export const getMetaphysicsEndpoint = () => {
  const APP_URL = getENV("APP_URL") ?? "http://localhost:4000"

  const endpoint = `${APP_URL}/api/metaphysics`

  return endpoint
}
