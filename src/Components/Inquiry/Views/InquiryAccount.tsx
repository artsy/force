import type * as React from "react"
import { createContext, useContext, useState } from "react"
import { InquiryLogin } from "./InquiryLogin"
import { InquiryResetPassword } from "./InquiryResetPassword"
import { InquirySignUp } from "./InquirySignUp"

export enum Screen {
  ExistingUser = 0,
  Login = 1,
  SignUp = 2,
  ResetPassword = 3,
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

export const InquiryAccount: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
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
