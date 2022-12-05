import { AuthContextModule, AuthIntent } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { AuthDialog, AuthDialogProps } from "Components/AuthDialog/AuthDialog"
import { createContext, FC, useContext, useReducer } from "react"
import { useSystemContext } from "System"
import { AfterAuthAction } from "Utils/Hooks/useAuthIntent"

export const AUTH_DIALOG_MODES = ["Login", "SignUp", "ForgotPassword"] as const

export type AuthDialogMode = typeof AUTH_DIALOG_MODES[number]

export type AuthDialogOptions = {
  contextModule?: AuthContextModule
  /** Whether or not to display an evergreen side panel for visual interest */
  image?: boolean
  intent?: AuthIntent
  /** Applies to SignUp or Login, not ForgotPassword */
  afterAuthAction?: AfterAuthAction
  /** Applies to SignUp or Login, not ForgotPassword */
  redirectTo?: string
  title?: string
}

type State = {
  isVisible: boolean
  mode: AuthDialogMode
  options: AuthDialogOptions
}

const INITIAL_STATE: State = { mode: "SignUp", isVisible: false, options: {} }

const AuthDialogContext = createContext<{
  dispatch: React.Dispatch<Action>
  hideAuthDialog(): void
  showAuthDialog(options: {
    mode: AuthDialogMode
    options?: AuthDialogOptions
  }): void
  state: State
}>({
  dispatch: () => null,
  hideAuthDialog: () => null,
  showAuthDialog: () => null,
  state: INITIAL_STATE,
})

type Action =
  | { type: "MODE"; payload: { mode: AuthDialogMode } }
  | { type: "SHOW" }
  | { type: "HIDE" }
  | { type: "OPTIONS"; payload: AuthDialogOptions }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "MODE":
      return { ...state, mode: action.payload.mode }
    case "SHOW":
      return { ...state, isVisible: true }
    case "HIDE": // Resets state on close
      return INITIAL_STATE
    case "OPTIONS":
      return { ...state, options: action.payload }
    default:
      return state
  }
}

export const AuthDialogProvider: FC<Omit<AuthDialogProps, "onClose">> = ({
  children,
}) => {
  const { isLoggedIn } = useSystemContext()
  const { sendToast } = useToasts()

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const hideAuthDialog = () => {
    dispatch({ type: "HIDE" })
  }

  const showAuthDialog = ({
    mode,
    options,
  }: {
    mode: AuthDialogMode
    options?: AuthDialogOptions
  }) => {
    if (isLoggedIn) {
      sendToast({
        variant: "message",
        message: "You are already logged in.",
      })

      return
    }

    // Move dialog into the appropriate view
    dispatch({ type: "MODE", payload: { mode } })

    // Set any options
    if (options) dispatch({ type: "OPTIONS", payload: options })

    // Display the dialog
    dispatch({ type: "SHOW" })
  }

  return (
    <AuthDialogContext.Provider
      value={{ state, dispatch, showAuthDialog, hideAuthDialog }}
    >
      {children}

      {state.isVisible && <AuthDialog onClose={hideAuthDialog} />}
    </AuthDialogContext.Provider>
  )
}

export const useAuthDialogContext = () => {
  return useContext(AuthDialogContext)
}
