import {
  type AuthContextModule,
  type AuthIntent,
  AuthModalType,
  type AuthTrigger,
  ContextModule,
  Intent,
} from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import {
  AuthDialog,
  type AuthDialogProps,
} from "Components/AuthDialog/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { prefetchUrl } from "System/Utils/prefetchUrl"
import type { AfterAuthAction } from "Utils/Hooks/useAuthIntent"
import { merge } from "lodash"
import {
  type FC,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react"

export const AUTH_DIALOG_MODES = [
  "Welcome",
  "Login",
  "SignUp",
  "ForgotPassword",
] as const

export type AuthDialogMode = (typeof AUTH_DIALOG_MODES)[number]

export const AUTH_MODAL_TYPES: Record<AuthDialogMode, AuthModalType> = {
  ForgotPassword: AuthModalType.forgot,
  Login: AuthModalType.login,
  SignUp: AuthModalType.signup,
  Welcome: AuthModalType.welcome, // FIXME: Needs to be removed or updated
}

export const DEFAULT_AUTH_MODAL_INTENTS: Record<AuthDialogMode, AuthIntent> = {
  ForgotPassword: Intent.forgot,
  Login: Intent.login,
  SignUp: Intent.signup,
  Welcome: Intent.signup, // Is updated once the status of the email is determined
}

export type AuthDialogOptions = {
  /** Whether or not to display an evergreen side panel for visual interest */
  image?: boolean
  /** Custom desired image url to be displayed */
  imageUrl?: string | null
  /** Applies to SignUp or Login, not ForgotPassword */
  afterAuthAction?: AfterAuthAction
  /** Applies to SignUp or Login, not ForgotPassword */
  redirectTo?: string
  /** Copy displayed in dialog header */
  title?: string | ((mode: AuthDialogMode) => string)
  onClose?: () => void
  onSuccess?: () => void
  /** Controls whether the modal can be closed by user (X button, ESC, backdrop). Defaults to true. */
  isCloseable?: boolean
}

export type AuthDialogAnalytics = {
  contextModule: AuthContextModule
  intent?: AuthIntent
  trigger?: AuthTrigger
}

type State = {
  /** Values passed to analytics for tracking */
  analytics: AuthDialogAnalytics
  isFallback: boolean
  isVisible: boolean
  mode: AuthDialogMode
  options: AuthDialogOptions
  values: { email?: string }
}

export const INITIAL_STATE: State = {
  analytics: { contextModule: ContextModule.header, trigger: "click" },
  isFallback: false,
  isVisible: false,
  mode: "Welcome",
  options: {},
  values: {},
}

export interface ShowAuthDialogOptions {
  /** Values passed to analytics for tracking */
  analytics: AuthDialogAnalytics
  /** View mode to open dialog in */
  mode?: AuthDialogMode
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
  | { type: "FALLBACK" }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "MODE": {
      return { ...state, mode: action.payload.mode }
    }

    case "SET": {
      return merge({}, state, action.payload)
    }

    case "SHOW": {
      return { ...state, isVisible: true }
    }

    case "HIDE": {
      // Resets state on close
      return INITIAL_STATE
    }

    case "FALLBACK": {
      return { ...state, mode: "Login", isFallback: true }
    }

    default: {
      return state
    }
  }
}

export const AuthDialogProvider: FC<
  React.PropsWithChildren<Omit<AuthDialogProps, "onClose">>
> = ({ children }) => {
  const { isLoggedIn } = useSystemContext()
  const { sendToast } = useToasts()

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const hideAuthDialog = () => {
    dispatch({ type: "HIDE" })
  }

  const showAuthDialog = useCallback(
    ({
      analytics,
      mode = "Welcome",
      options,
    }: {
      analytics: AuthDialogAnalytics
      mode?: AuthDialogMode
      options?: AuthDialogOptions
    }) => {
      if (!isLoggedIn && options?.imageUrl) {
        // Prefetch custom image if provided
        prefetchUrl(options.imageUrl)
      }
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
    },
    [isLoggedIn, sendToast],
  )

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
