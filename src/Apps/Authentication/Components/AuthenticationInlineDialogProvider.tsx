import {
  AuthDialogContext,
  type AuthDialogMode,
  INITIAL_STATE,
  reducer,
} from "Components/AuthDialog/AuthDialogContext"
import { type FC, useReducer } from "react"

interface AuthenticationInlineDialogProviderProps {
  mode: AuthDialogMode
}

export const AuthenticationInlineDialogProvider: FC<
  React.PropsWithChildren<AuthenticationInlineDialogProviderProps>
> = ({ children, mode }) => {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE, mode })

  return (
    <AuthDialogContext.Provider
      value={{
        state,
        dispatch,
        // Not used
        showAuthDialog: () => {},
        hideAuthDialog: () => {},
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  )
}
