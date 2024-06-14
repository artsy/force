import { SystemContext } from "System/Contexts/SystemContext"
import { useContext } from "react"

/**
 * Custom hook to access SystemContext
 */
export const useSystemContext = () => {
  const systemContext = useContext(SystemContext)
  return systemContext
}
