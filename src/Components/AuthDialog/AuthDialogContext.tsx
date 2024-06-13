import {
  AuthContextModule,
  AuthIntent,
  Intent,
  AuthModalType,
  ContextModule,
  AuthTrigger,
} from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { AuthDialog, AuthDialogProps } from "Components/AuthDialog/AuthDialog"
import { merge } from "lodash"
import { createContext, FC, useContext, useReducer } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { AfterAuthAction } from "Utils/Hooks/useAuthIntent"

export const AUTH_DIALOG_MODES = ["Login", "SignUp", "ForgotPassword"] as const

export type AuthDialogMode = typeof AUTH_DIALOG_MODES[number]

export const AUTH_MODAL_TYPES: Record<AuthDialogMode, AuthModalType> = {
  ForgotPassword: AuthModalType.forgot,
  Login: AuthModalType.login,
  SignUp: AuthModalType.signup,
}

export const DEFAULT_AUTH_MODAL_INTENTS: Record<AuthDialogMode, AuthIntent> = {
  ForgotPassword: Intent.forgot,
  Login: Intent.login,
  SignUp: Intent.signup,
}

export type AuthDialogOptions = {
  /** Whether or not to display an evergreen side panel for visual interest */
  image?: boolean
  /** Applies to SignUp or Login, not ForgotPassword */
  afterAuthAction?: AfterAuthAction
  /** Applies to SignUp or Login, not ForgotPassword */
  redirectTo?: string
  /** Copy displayed in dialog header */
  title?: string | ((mode: AuthDialogMode) => string)
  onClose?: () => void
  onSuccess?: () => void
}

export type AuthDialogAnalytics = {
  contextModule: AuthContextModule
  intent?: AuthIntent
  trigger?: AuthTrigger
}

type State = {
  /** Values passed to analytics for tracking */
  analytics: AuthDialogAnalytics
  isVisible: boolean
  mode: AuthDialogMode
  options: AuthDialogOptions
}

export const INITIAL_STATE: State = {
  analytics: {
    contextModule: ContextModule.header,
    trigger: "click",
  },
  mode: "SignUp",
  isVisible: false,
  options: {},
}

export interface ShowAuthDialogOptions {
  /** Values passed to analytics for tracking */
  analytics: AuthDialogAnalytics
  /** View mode to open dialog in */
  mode: AuthDialogMode
  options?: AuthDialogOptions
}

export const AuthDialogContext = createContext<{
  dispatch: React.Dispatch<Action>
  hideAuthDialog(): void
  showAuthDialog(options: ShowAuthDialogOptions): void
  state: State
}>({
  dispatch: () => null,
  hideAuthDialog: () => null,
  showAuthDialog: () => null,
  state: INITIAL_STATE,
})

type Action =
  | { type: "MODE"; payload: { mode: AuthDialogMode } }
  | { type: "SET"; payload: Partial<State> }
  | { type: "SHOW" }
  | { type: "HIDE" }

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "MODE":
      return { ...state, mode: action.payload.mode }

    case "SET":
      return merge({}, state, action.payload)

    case "SHOW":
      return { ...state, isVisible: true }

    case "HIDE": // Resets state on close
      return INITIAL_STATE

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
    analytics,
    mode,
    options,
  }: {
    analytics: AuthDialogAnalytics
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

    dispatch({
      type: "SET",
      payload: {
        analytics: {
          // Set a default intent based on the view mode
          intent: DEFAULT_AUTH_MODAL_INTENTS[mode],
          ...analytics,
        },
        isVisible: true,
        mode,
        options,
      },
    })
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
