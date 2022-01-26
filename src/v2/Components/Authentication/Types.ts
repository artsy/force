import { AuthContextModule, AuthIntent } from "@artsy/cohesion"
import { FormikProps } from "formik"

export enum ModalType {
  login = "login",
  signup = "signup",
  forgot = "forgot",
}

export interface InputValues {
  name?: string
  email?: string
  password?: string
  otp_attempt?: string
  accepted_terms_of_service?: boolean
  agreed_to_receive_emails?: boolean
}

export type SubmitHandler = (
  values: InputValues,
  formikBag: FormikProps<InputValues>
) => void

export interface FormProps {
  contextModule: AuthContextModule
  /**
   * any global error that comes from an external data source
   * (e.g. server)
   */
  error?: string
  values?: InputValues
  handleSubmit?: SubmitHandler
  handleTypeChange?: (modalType: ModalType) => void
  intent: AuthIntent
  onAppleLogin?: (e: Event) => void
  onFacebookLogin?: (e: Event) => void
  onBackButtonClicked?: (e: Event) => void
  title?: string
  entityName?: string
  showRecaptchaDisclaimer?: boolean
}

export interface AfterSignUpAction {
  action: "save" | "follow" | "editorialSignup" | "createAlert"
  objectId?: string
  kind?: "artist" | "artworks" | "gene" | "profile" | "show"
}

export interface ModalOptions {
  /**
   * Hook to be called after the modal has closed
   */
  afterClose?: () => void
  /**
   * MOBILE ONLY
   * Used to construct afterSignupAction from query params
   */
  action?: AfterSignUpAction["action"]
  /**
   * defines an action to take after the user successfully signs up
   *
   * @example
   * {
   *   action: 'save',
   *   objectId: artwork.id
   * }
   */
  afterSignUpAction?: AfterSignUpAction
  /*
   * the location where the modal was triggered.
   */
  contextModule?: AuthContextModule
  /**
   * the subtitle of the form
   */
  copy?: string
  /**
   * the page path the user is redirected to after successfully
   * login or account creation after onboarding.
   */
  destination?: string
  /**
   * Prevents users from clicking outside the modal to close it
   */
  disableCloseOnBackgroundClick?: boolean
  /**
   * The image rendered with the modal
   */
  image?: string
  /**
   * the action taken that prompted user to signup or login.
   */
  intent?: AuthIntent
  /**
   * MOBILE ONLY
   * Used to construct afterSignupAction from query params
   */
  kind?: AfterSignUpAction["kind"]
  /**
   * the type of modal to display.
   */
  mode?: ModalType
  /*
   * Whether or not the user is using the form via gravity's oauth flow.
   */
  oauthLogin?: boolean
  /**
   * MOBILE ONLY
   * Used to construct afterSignupAction from query params
   */
  objectId?: AfterSignUpAction["objectId"]
  /**
   * the page path the user is redirected to after successfully
   * login or account creation (skips onboarding).
   */
  redirectTo?: string
  /**
   * the page before the page on which the sign up was triggered.
   */
  signupReferer?: string
  /**
   * The form or modal title in case it needs to be customized
   */
  title?: string
  /**
   * the number of seconds before a modal was triggered
   */
  triggerSeconds?: number
}

export type FormComponentType =
  | React.SFC<FormProps>
  | React.ComponentClass<FormProps>
