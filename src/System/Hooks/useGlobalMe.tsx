import { useContext } from "react"
import {
  GlobalMeContext,
  GlobalMeContextProps,
} from "System/Contexts/GlobalMeContext"

export const useGlobalMe = (): GlobalMeContextProps => {
  return useContext(GlobalMeContext)
}
