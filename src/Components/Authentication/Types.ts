import { AuthContextModule, AuthIntent, Intent } from "@artsy/cohesion"
import { FormikProps } from "formik"
import { AfterAuthAction } from "Utils/Hooks/useAuthIntent"

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
  onGoogleLogin?: (e: Event) => void
  onBackButtonClicked?: (e: Event) => void
  entityName?: string
  showRecaptchaDisclaimer?: boolean
}

export const COMMERCIAL_AUTH_INTENTS = [
  Intent.bid,
  Intent.buyNow,
  Intent.createAlert,
  Intent.inquire,
  Intent.makeOffer,
  Intent.registerToBid,
]

export interface ModalOptions {
  /**
   * defines an action to take after the user successfully signs up
   *
   * @example
   * {
   *   action: 'save',
   *   objectId: artwork.id
   * }
   */
  afterSignUpAction?: AfterAuthAction
  /*
   * the location where the modal was triggered.
   */
  contextModule?: AuthContextModule
  /**
   * the subtitle of the form
   */
  copy?: string
  /**
   * The image rendered with the modal
   */
  image?: string
  /**
   * the action taken that prompted user to signup or login.
   */
  intent?: AuthIntent
  /**
   * the type of modal to display.
   */
  mode?: ModalType
  /*
   * Whether or not the user is using the form via gravity's oauth flow.
   */
  oauthLogin?: boolean
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
   * the number of seconds before a modal was triggered
   */
  triggerSeconds?: number
}

export type FormComponentType =
  | React.SFC<FormProps>
  | React.ComponentClass<FormProps>
