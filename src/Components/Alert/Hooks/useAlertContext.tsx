import { AlertContext } from "Components/Alert/AlertContext"
import { useContext } from "react"

export const useAlertContext = () => {
  return useContext(AlertContext)
}
