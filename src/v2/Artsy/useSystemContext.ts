import { useContext } from "react"
import { SystemContext } from "./SystemContext"

/**
 * Custom hook to access SystemContext
 */
export const useSystemContext = () => {
  const systemContext = useContext(SystemContext)
  return systemContext
}
