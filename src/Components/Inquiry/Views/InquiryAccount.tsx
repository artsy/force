import * as React from "react"
import { InquirySignUp } from "./InquirySignUp"
import { InquiryLogin } from "./InquiryLogin"
import { InquiryResetPassword } from "./InquiryResetPassword"
import { useState } from "react"
import { createContext } from "react"
import { useContext } from "react"

export enum Screen {
  ExistingUser,
  Login,
  SignUp,
  ResetPassword,
}

const InquiryAccountContext = createContext<{
  screen: Screen
  navigateTo: React.Dispatch<React.SetStateAction<Screen>>
}>({
  screen: Screen.ExistingUser,
  navigateTo: () => {},
})

export const useInquiryAccountContext = () => {
  return useContext(InquiryAccountContext)
}

export const InquiryAccount: React.FC = () => {
  const [screen, navigateTo] = useState(Screen.SignUp)

  return (
    <InquiryAccountContext.Provider value={{ screen, navigateTo }}>
      {(() => {
        switch (screen) {
          case Screen.Login:
            return <InquiryLogin />
          case Screen.SignUp:
            return <InquirySignUp />
          case Screen.ResetPassword:
            return <InquiryResetPassword />
        }
      })()}
    </InquiryAccountContext.Provider>
  )
}
