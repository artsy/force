# Account Linking — Web Implementation Plan

Porting the inline account-linking flow from Eigen to Force. When a user tries to sign up via OAuth but an Artsy account already exists with that email, show a "Link Accounts" UI instead of a generic error toast.

Reference doc: `account_linking_flow.md`

---

## Overview of changes

The implementation splits cleanly into two halves:

- **Server** (passport lib): preserve the original OAuth token in the session on error, then complete the link after re-auth via a new middleware
- **Client** (React/Force): replace the toast-only behavior with a proper link-accounts UI driven by the `existing_providers` query param

---

## Server-side changes

### 1. `src/Server/passport/lib/types.ts`

Add two new fields:

```ts
// PassportRequest
socialOAuthToken?: LinkingTokenData   // set in callbacks, consumed by lifecycle

// PassportSession
linkingToken?: LinkingTokenData       // persisted across the re-auth redirect
```

Add a new shared type:

```ts
export type LinkingTokenData =
  | { provider: "google" | "facebook"; oauth_token: string }
  | {
      provider: "apple"
      apple_uid: string
      id_token: string
      email?: string
      name?: string | null
    }
```

### 2. `src/Server/passport/lib/passport/callbacks.ts`

Attach `req.socialOAuthToken` in each provider callback before calling `onAccessToken`, so the token is available in `lifecycle.ts` when the error is caught.

**`google()`** (line ~159):

```ts
req.socialOAuthToken = { provider: "google", oauth_token: accessToken }
```

**`facebook()`** (line ~100):

```ts
req.socialOAuthToken = { provider: "facebook", oauth_token: token }
```

**`apple()`** (line ~254):

```ts
req.socialOAuthToken = {
  provider: "apple",
  apple_uid: decodedIdToken.sub,
  id_token: idToken,
  email: decodedIdToken.email,
  name: displayName,
}
```

### 3. `src/Server/passport/lib/app/lifecycle.ts`

**A) In `afterSocialAuth()`, update the "User Already Exists" branch:**

```ts
if (
  err?.response?.body?.error === "User Already Exists" &&
  req.socialProfileEmail
) {
  req.session.linkingToken = req.socialOAuthToken // preserve across re-auth
  return res.redirect(
    redirectWithQuery(redirectPath, {
      email: req.socialProfileEmail,
      error_code: "ALREADY_EXISTS",
      provider,
      existing_providers: (err.response.body.providers ?? []).join(","),
    }),
  )
}
```

**B) Add new exported `completeLinking` middleware:**

Runs after every successful auth (password or OAuth). If `req.session.linkingToken` is set and `req.user` is logged in, call Gravity's authentication-linking endpoint, then clear the session.

```ts
export const completeLinking = async (
  req: Req,
  res: ArtsyResponse,
  next: NextFunction,
) => {
  const token = req.session.linkingToken

  if (!token || !req.user) {
    return next()
  }

  delete req.session.linkingToken // clear regardless of outcome

  const body =
    token.provider === "apple"
      ? {
          apple_uid: token.apple_uid,
          id_token: token.id_token,
          email: token.email,
          name: token.name,
          oauth_token: "",
          access_token: req.user.accessToken,
        }
      : {
          oauth_token: token.oauth_token,
          access_token: req.user.accessToken,
        }

  try {
    await requestGravity({
      body,
      headers: { "User-Agent": req.get("user-agent") },
      method: "POST",
      url: `${opts.ARTSY_URL}/api/v1/me/authentications/${token.provider}`,
    })
    // Signal success to the client via query param
    req.session.linkedProvider = token.provider
  } catch (err) {
    // Log but don't block the login — user is authenticated, linking just failed
    console.error("completeLinking failed", err)
    req.session.linkingError = true
  }

  next()
}
```

Success/failure is communicated by setting a session variable; `ssoAndRedirectBack` will forward it as a query param (see next step).

**C) In `ssoAndRedirectBack`, append linking result to the redirect URL:**

After the existing redirect logic, check for `req.session.linkedProvider` / `req.session.linkingError` and include them in the redirect query string so the client can show the appropriate toast.

### 4. `src/Server/passport/lib/app/index.ts`

Insert `completeLinking` before `ssoAndRedirectBack` on **all** auth routes:

```ts
// Local login
app.post(opts.loginPagePath, ..., onLocalLogin, completeLinking, ssoAndRedirectBack)

// Social auth callbacks
app.post(opts.appleCallbackPath, afterSocialAuth("apple"), setAuthTrackingCookie(...), completeLinking, ssoAndRedirectBack)
app.get(opts.facebookCallbackPath, afterSocialAuth("facebook"), setAuthTrackingCookie(...), completeLinking, ssoAndRedirectBack)
app.get(opts.googleCallbackPath, afterSocialAuth("google"), setAuthTrackingCookie(...), completeLinking, ssoAndRedirectBack)
app.post(opts.googleOneTapCallbackPath, afterSocialAuth("google", "one-tap"), setAuthTrackingCookie(...), completeLinking, ssoAndRedirectBack)
```

---

## Client-side changes

### 5. `src/Utils/authConstants.ts`

No change to `AUTH_ERROR_CODES.ALREADY_EXISTS`. Add a new entry for the success case (used in step 7):

```ts
export const LINKED_PROVIDER_SUCCESS_MESSAGE =
  "Your {provider} account has been successfully linked."
```

### 6. New mode: `"LinkAccounts"` in `src/Components/AuthDialog/AuthDialogContext.tsx`

Add `"LinkAccounts"` to `AUTH_DIALOG_MODES`. This keeps the mode typed and lets `AuthDialogView` route to the new view component.

```ts
export const AUTH_DIALOG_MODES = [
  "Welcome",
  "Login",
  "SignUp",
  "ForgotPassword",
  "LinkAccounts",
] as const
```

### 7. New view: `src/Components/AuthDialog/Views/AuthDialogLinkAccounts.tsx`

Mirrors `OnboardingSocialLink.tsx` from Eigen. Receives `existingProviders` and `providerToBeLinked` from query params (via context).

**Logic:**

```
existingProviders = query.existing_providers.split(",")
permittedProviders = existingProviders.filter(p => ["email","google","facebook","apple"].includes(p))

if permittedProviders === ["email"]:
  → render password form directly (no provider buttons)
else:
  → render provider buttons for each permitted provider
  → if "email" is in permittedProviders, include a "Sign in with password" button
    that switches to a sub-state showing the password form
```

**Provider button behavior:**

- `email` → show password sub-form
- `google` / `facebook` / `apple` → navigate to the existing OAuth URL (same as the regular auth dialog social buttons), which will kick off re-auth and land back in the passport callback chain where `completeLinking` fires

**Password form submit:**

- `POST` to existing login endpoint (no new endpoint needed)
- Server's `completeLinking` middleware handles the rest

**Copy** (matching Eigen):

- Email-only: _"You already have an Artsy account with {email}. Enter your password to link both log-in options to your account."_
- Multiple providers: _"You already have an account with that email address. Link both log-in options to your Artsy account by logging in with your previous log-in method."_
- Password sub-form: _"Enter your password to link both log-in options to your account."_

### 8. `src/Apps/Authentication/Components/AuthenticationInlineDialog.tsx`

**Replace the `ALREADY_EXISTS` toast with a mode switch:**

```ts
useEffect(() => {
  if (location.query.error_code === "ALREADY_EXISTS") {
    // Switch auth dialog to link-accounts mode instead of showing a toast
    dispatch({ type: "MODE", payload: { mode: "LinkAccounts" } })
    return
  }

  if (!location.query.error_code) return
  // ... existing toast logic for all other error codes
}, [...])
```

**Add `linked_provider` success handling:**

```ts
useEffect(() => {
  if (!location.query.linked_provider) return

  const provider =
    AUTH_PROVIDERS[location.query.linked_provider] ||
    location.query.linked_provider
  sendToast({
    message: `Your ${provider} account has been successfully linked.`,
    variant: "success",
  })
}, [location.query.linked_provider, sendToast])
```

### 9. `src/Apps/Authentication/Hooks/useAuthDialogOptions.tsx`

When in `LinkAccounts` mode, pass `existing_providers`, `provider` (the one being linked), and `email` through context so `AuthDialogLinkAccounts` can read them. These are already available in `location.query`.

---

## Edge cases

| Case                                         | Handling                                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 2FA-enabled account                          | Password auth fails at `onLocalLogin` before `completeLinking` runs — standard 2FA error flow applies                                       |
| Linking API call fails                       | `completeLinking` logs error, sets `session.linkingError = true`, `ssoAndRedirectBack` passes `linking_error=true` → client toast           |
| `existing_providers` missing from error body | Fall back to showing the password form (safest default)                                                                                     |
| User navigates away mid-flow                 | `session.linkingToken` remains; cleared on next successful login (harmless — calling `/api/v1/me/authentications/{provider}` is idempotent) |
| `PREVIOUSLY_LINKED_SETTINGS` error code      | Unchanged — existing toast behavior is correct for this case                                                                                |

---

## What we're NOT changing

- `PREVIOUSLY_LINKED_SETTINGS` and `PREVIOUSLY_LINKED` error paths in `lifecycle.ts` — those remain toast-only
- The modal (popup) auth dialog — `LinkAccounts` mode is only wired into `AuthenticationInlineDialog` (the `/login` page)
- Any existing linking UI in Settings

---

## Open questions

- **Apple on web**: The Apple `id_token` / `apple_uid` stored in the session should be sufficient for the linking call — confirm with a test against staging Gravity
- **Session token expiry**: If the user takes a long time on the link screen, `req.session.linkingToken` will still be present on next login. The Gravity `/api/v1/me/authentications` call will simply succeed or fail as normal — no special TTL needed
