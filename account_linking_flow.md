# Account Linking Flow

This document describes how inline account linking works in Eigen — the flow triggered when a user tries to sign up with an OAuth provider but an account already exists with that email. Understanding this flow is useful context for porting it to web.

## Overview

When a user attempts OAuth sign-up (Google/Facebook/Apple) but an Artsy account already exists with that email, the backend returns an error instead of creating a new account. Rather than failing silently, the app presents a "Link Accounts" screen that lets the user authenticate with their existing method and then link the new OAuth provider to their account.

## The Trigger

`POST /api/v1/user` returns HTTP 400:

```json
{
  "error": "User Already Exists",
  "providers": ["email", "google"],
  "has_password": true
}
```

The `useSocialLogin()` hook in `src/app/utils/auth/socialSignInHelpers.ts` catches this and navigates to `OnboardingSocialLink`, passing:

| Param                        | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `email`                      | The existing account's email                                                          |
| `name`                       | The user's display name                                                               |
| `providers`                  | What auth methods are already linked on the account                                   |
| `providerToBeLinked`         | The new OAuth provider they just tried                                                |
| `tokenForProviderToBeLinked` | **The original OAuth token from the failed attempt** — preserved for the linking step |

## The Screen

`src/app/Scenes/Onboarding/Screens/OnboardingSocialLink.tsx` shows one of two UIs based on what providers are linked:

- **Password form** — if the account is email-only (`providers === ["email"]`)
- **Provider buttons** — if the account has OAuth methods linked

## The Two-Step Link

### Step 1: Authenticate with existing method

The user proves ownership of the existing account by either:

- Entering their Artsy password (`POST /oauth2/access_token` with `grant_type: "credentials"`)
- Re-authenticating via their existing OAuth provider (`POST /oauth2/access_token` with `grant_type: "oauth_token"` or `"apple_uid"`)

### Step 2: Link the new provider

Once signed in, an `onSignIn` callback fires that calls the `linkAuthentication` GraphQL mutation with the **original saved OAuth token** from the failed sign-up attempt:

```graphql
linkAuthentication(input: {
  provider: GOOGLE,       # or FACEBOOK, APPLE
  oauthToken: "..."       # token saved from step 1 of the flow
})
```

Apple requires additional fields: `appleUid`, `idToken`, `email`, `name` (and `oauthToken: ""`).

## Full Data Flow

```
1. USER ATTEMPTS OAUTH SIGN-UP
   └─> POST /api/v1/user → 400 "User Already Exists"
       Returns: { providers: [...], has_password: true }

2. ERROR CAUGHT IN useSocialLogin
   ├─> Extracts existingProviders + original OAuth token from error metadata
   └─> navigation.navigate("OnboardingSocialLink", {
           email, name,
           providers,                       // existing methods on account
           providerToBeLinked,              // what the user tried
           tokenForProviderToBeLinked       // token saved for linking
       })

3. ONBOARDING SOCIAL LINK SCREEN
   └─> Shows password form or provider buttons

4A. USER SIGNS IN WITH PASSWORD
    ├─> POST /oauth2/access_token (grant_type: "credentials")
    └─> On success → fires onSignIn callback

4B. USER SIGNS IN WITH EXISTING OAUTH
    ├─> Triggers native OAuth dialog (Google / Facebook / Apple)
    ├─> POST /oauth2/access_token (grant_type: "oauth_token" or "apple_uid")
    └─> On success → fires onSignIn callback

5. onSignIn CALLBACK: LINK NEW PROVIDER
   └─> GraphQL: linkAuthentication(input: { provider, oauthToken/appleUid/idToken })
       Uses the token saved in step 2 (from the original failed sign-up)

6. SUCCESS
   └─> Toast: "Account has been successfully linked."
```

## Edge Cases

| Case                                           | Handling                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| 2FA-enabled account                            | `signIn()` returns `"otp_missing"` → alert: "2FA-enabled accounts cannot be linked" |
| Wrong password                                 | Formik error: "Incorrect password"                                                  |
| Token already linked to another account        | `linkAuthentication` mutation fails → toast error                                   |
| Apple email not returned (subsequent attempts) | Falls back to current user's email via `unsafe_getUserEmail()`                      |
| Blocked IP / rate limit                        | `showBlockedAuthError()` → alert to try different network                           |

## Key Files

| File                                                         | Purpose                                                                    |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `src/app/utils/auth/socialSignInHelpers.ts`                  | Catches "User Already Exists", navigates to linking screen                 |
| `src/app/Scenes/Onboarding/Screens/OnboardingSocialLink.tsx` | UI: provider buttons + password form                                       |
| `src/app/utils/LinkedAccounts/google.ts`                     | `useGoogleLink()` — `linkUsingOauthToken()` mutation                       |
| `src/app/utils/LinkedAccounts/facebook.ts`                   | `useFacebookLink()` — `linkUsingOauthToken()` mutation                     |
| `src/app/utils/LinkedAccounts/apple.ts`                      | `useAppleLink()` — `linkUsingOauthToken()` mutation                        |
| `src/app/store/AuthModel.ts`                                 | OAuth orchestration: `signUp()`, `signIn()`, `authGoogle/Facebook/Apple()` |

## Porting to Web

The GraphQL `linkAuthentication` mutation is provider-agnostic and reusable as-is. The main differences to address:

| Concern                           | Mobile                            | Web                                                                |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| OAuth sign-in                     | Native Google/Facebook/Apple SDKs | Web OAuth SDKs (Google Identity, FB JS SDK, Sign In with Apple JS) |
| "Already exists" detection        | Same — `/api/v1/user` HTTP 400    | Identical API contract                                             |
| Token preservation across re-auth | Navigation params                 | Session storage or auth context                                    |
| Auth session                      | `GlobalStore`                     | Cookies / JWT in web auth context                                  |
| Apple email quirk                 | Falls back to current user email  | Same issue applies                                                 |
| 2FA bail-out                      | Alert                             | Same logic needed                                                  |

The trickiest piece is **preserving the original OAuth token** across the re-authentication step. On mobile it lives in navigation params; on web you'll need session storage or a context provider to hold it while the user authenticates with their existing method.
