import { useContext } from "react"

import { AlertContext } from "Components/Alert/AlertContext"

export const useAlertContext = () => {
  return useContext(AlertContext)
}
