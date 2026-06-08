import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { NextFunction } from "express"

export interface PassportOptions {
  APP_URL?: string
  APPLE_CLIENT_ID?: string
  APPLE_KEY_ID?: string
  APPLE_PRIVATE_KEY_BASE64?: string
  APPLE_TEAM_ID?: string
  ARTSY_ID?: string
  ARTSY_SECRET?: string
  ARTSY_URL?: string
  FACEBOOK_ID?: string
  FACEBOOK_SECRET?: string
  GOOGLE_CLIENT_ID?: string
  GOOGLE_SECRET?: string
  SEGMENT_WRITE_KEY?: string
  afterSignupPagePath: string
  appleCallbackPath: string
  applePath: string
  facebookCallbackPath: string
  facebookPath: string
  googleCallbackPath: string
  googleOneTapCallbackPath: string
  googlePath: string
  loginPagePath: string
  logoutPath: string
  settingsPagePath: string
  signupPagePath: string
  userKeys: string[]
}

export interface PassportUser {
  accessToken: string
  authentications?: unknown
  id?: string
  [key: string]: unknown
}

export type LinkingTokenData =
  | { provider: "google" | "facebook"; oauth_token: string }
  | {
      provider: "apple"
      apple_uid: string
      id_token: string
      email?: string
      name?: string | null
    }

export interface PassportSession {
  accepted_terms_of_service?: unknown
  acquisitionInitiative?: unknown
  agreed_to_receive_emails?: unknown
  contextModule?: unknown
  linkingError?: boolean
  linkingToken?: LinkingTokenData
  linkedProvider?: string
  modalId?: unknown
  redirectTo?: string
  sign_up_intent?: unknown
  sign_up_referer?: unknown
  skipOnboarding?: unknown
  trigger?: unknown
  [key: string]: unknown
}

export interface AppleProfile {
  name?: {
    firstName?: string
    lastName?: string
  }
}

export interface OAuthProfile {
  displayName?: string
  emails?: Array<{ value?: string }>
}

export interface PassportRequest extends ArtsyRequest {
  appleProfile?: AppleProfile
  artsyPassportSignedUp?: boolean
  body: Record<string, any>
  connection: ArtsyRequest["connection"] & { remoteAddress: string }
  csrfToken?: () => string
  login: (user: PassportUser, callback: (error?: Error | null) => void) => void
  logout: () => void
  params: Record<string, any>
  query: Record<string, any>
  session: PassportSession
  socialOAuthToken?: LinkingTokenData
  socialProfileEmail?: string
  user?: PassportUser | null
  xhr: boolean
}

export type PassportResponse = ArtsyResponse

export type Middleware = (
  req: PassportRequest,
  res: PassportResponse,
  next: NextFunction,
) => void

export type PassportDone = (
  error?: Error | null,
  user?: PassportUser | false | null,
) => void
