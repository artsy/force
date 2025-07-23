import { createContextStore, Action, action } from "easy-peasy"
import type * as React from "react"
import { createContext, useContext } from "react"
import { InquiryLogin } from "./InquiryLogin"
import { InquiryResetPassword } from "./InquiryResetPassword"
import { InquirySignUp } from "./InquirySignUp"

export enum Screen {
  ExistingUser = 0,
  Login = 1,
  SignUp = 2,
  ResetPassword = 3,
}

// Easy-peasy store model interface
interface InquiryAccountStoreModel {
  // State
  screen: Screen

  // Actions
  navigateTo: Action<InquiryAccountStoreModel, Screen>
}

// Create the context store
export const InquiryAccountStore = createContextStore<InquiryAccountStoreModel>(
  runtimeModel => ({
    // State
    screen: runtimeModel?.screen || Screen.SignUp,

    // Actions
    navigateTo: action((state, payload) => {
      state.screen = payload
    }),
  }),
)

// Legacy context for backward compatibility
const InquiryAccountContext = createContext<{
  screen: Screen
  navigateTo: React.Dispatch<React.SetStateAction<Screen>>
}>({
  screen: Screen.ExistingUser,
  navigateTo: () => {},
})

// Backward compatible hook
export const useInquiryAccountContext = () => {
  return useContext(InquiryAccountContext)
}

export const InquiryAccount: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const screen = InquiryAccountStore.useStoreState(state => state.screen)
  const { navigateTo } = InquiryAccountStore.useStoreActions(actions => actions)

  return (
    <InquiryAccountStore.Provider>
      <InquiryAccountContext.Provider
        value={{ screen, navigateTo: navigateTo as any }}
      >
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
    </InquiryAccountStore.Provider>
  )
}
