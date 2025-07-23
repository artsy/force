import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
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
import type { AfterAuthAction } from "Utils/Hooks/useAuthIntent"
import { merge } from "lodash"
import { type FC } from "react"

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

// Store model interface
interface AuthDialogStoreModel {
  // State
  analytics: AuthDialogAnalytics
  isFallback: boolean
  isVisible: boolean
  mode: AuthDialogMode
  options: AuthDialogOptions
  values: { email?: string }

  // Actions
  setMode: Action<AuthDialogStoreModel, { mode: AuthDialogMode }>
  setState: Action<AuthDialogStoreModel, Partial<State>>
  show: Action<AuthDialogStoreModel>
  hide: Action<AuthDialogStoreModel>
  fallback: Action<AuthDialogStoreModel>
  showAuthDialog: Thunk<AuthDialogStoreModel, ShowAuthDialogOptions>
  hideAuthDialog: Thunk<AuthDialogStoreModel>
}

// Create the context store
export const AuthDialogStore = createContextStore<AuthDialogStoreModel>(
  runtimeModel => ({
    // State
    analytics: runtimeModel?.analytics || INITIAL_STATE.analytics,
    isFallback: runtimeModel?.isFallback || false,
    isVisible: runtimeModel?.isVisible || false,
    mode: runtimeModel?.mode || "Welcome",
    options: runtimeModel?.options || {},
    values: runtimeModel?.values || {},

    // Actions
    setMode: action((state, payload) => {
      state.mode = payload.mode
    }),

    setState: action((state, payload) => {
      merge(state, payload)
    }),

    show: action(state => {
      state.isVisible = true
    }),

    hide: action(state => {
      // Reset to initial state
      Object.assign(state, INITIAL_STATE)
    }),

    fallback: action(state => {
      state.mode = "Login"
      state.isFallback = true
    }),

    showAuthDialog: thunk((actions, payload, { getState }) => {
      const { analytics, mode = "Welcome", options } = payload

      actions.setState({
        analytics: {
          // Set a default intent based on the view mode
          intent: DEFAULT_AUTH_MODAL_INTENTS[mode],
          ...analytics,
        },
        isVisible: true,
        mode,
        options,
      })
    }),

    hideAuthDialog: thunk(actions => {
      actions.hide()
    }),
  }),
)

// Provider component with auth logic
export const AuthDialogProvider: FC<
  React.PropsWithChildren<Omit<AuthDialogProps, "onClose">>
> = ({ children }) => {
  const { isLoggedIn } = useSystemContext()
  const { sendToast } = useToasts()

  // Use the store
  const state = AuthDialogStore.useStoreState(state => state)
  const { showAuthDialog: _showAuthDialog, hideAuthDialog } =
    AuthDialogStore.useStoreActions(actions => actions)

  // Wrap showAuthDialog to check if logged in
  const showAuthDialog = (options: ShowAuthDialogOptions) => {
    if (isLoggedIn) {
      sendToast({
        variant: "message",
        message: "You are already logged in.",
      })
      return
    }

    _showAuthDialog(options)
  }

  return (
    <AuthDialogStore.Provider>
      {children}
      {state.isVisible && <AuthDialog onClose={hideAuthDialog} />}
    </AuthDialogStore.Provider>
  )
}

// Backward compatible hook
export const useAuthDialogContext = () => {
  const state = AuthDialogStore.useStoreState(state => state)
  const actions = AuthDialogStore.useStoreActions(actions => actions)

  // Map actions to match original reducer dispatch API
  const dispatch = (action: any) => {
    switch (action.type) {
      case "MODE":
        actions.setMode(action.payload)
        break
      case "SET":
        actions.setState(action.payload)
        break
      case "SHOW":
        actions.show()
        break
      case "HIDE":
        actions.hide()
        break
      case "FALLBACK":
        actions.fallback()
        break
    }
  }

  return {
    state,
    dispatch,
    showAuthDialog: actions.showAuthDialog,
    hideAuthDialog: actions.hideAuthDialog,
  }
}

// Export alias for migration compatibility
export const AuthDialogContext = AuthDialogStore
