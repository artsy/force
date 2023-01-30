import {
  AuthDialogContext,
  reducer,
  INITIAL_STATE,
  AuthDialogMode,
} from "Components/AuthDialog/AuthDialogContext"
import { FC, useReducer } from "react"

interface AuthenticationInlineDialogProviderProps {
  mode: AuthDialogMode
}

export const AuthenticationInlineDialogProvider: FC<AuthenticationInlineDialogProviderProps> = ({
  children,
  mode,
}) => {
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
