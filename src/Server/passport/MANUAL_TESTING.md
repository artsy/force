# Passport Manual Test Plan

This checklist is for manually validating the Force passport auth integration after changes to `src/Server/passport`.

Run these against a local Force server configured with real, non-production credentials where possible. Use an incognito browser window for browser flows, keep DevTools Network open, and record the request URL, status code, redirect target, and visible UI result for each scenario.

## Prerequisites

1. Start Force with normal local auth configuration.
2. Confirm `APP_URL`, `API_URL`, `CLIENT_ID`, and `CLIENT_SECRET` point to the environment you intend to test.
3. Have these test accounts or tokens available:
   - A normal email/password user.
   - A user with two-factor authentication enabled.
   - A valid `X-Access-Token` for header-login checks.
   - Social auth accounts for Facebook, Google, and Apple if those app credentials are enabled locally.
4. Clear cookies before each major flow, or use a fresh incognito window.
5. Keep server logs visible and watch for unhandled promise rejections, uncaught exceptions, or full HTML documents appearing as error strings.

## Scenario 1: Anonymous Request And Locals

1. Open `/` while logged out.
2. Confirm the page loads normally.
3. Open DevTools Application storage and confirm no `CURRENT_USER` is set in the bootstrap data.
4. Open `/log_in`.
5. Confirm the login page renders and includes a CSRF token-backed form.
6. Confirm no server error is logged.

Expected result: logged-out pages render normally, auth locals do not contain a user, and CSRF-backed auth pages still load.

## Scenario 2: Email Login Success

1. Open `/log_in`.
2. Enter valid email and password for a normal user.
3. Submit the form.
4. Confirm the browser redirects to `/` or the requested `redirect-to` path.
5. Refresh the page.
6. Confirm the user remains logged in.
7. Confirm bootstrap data includes the expected current user fields, such as `id`, `email`, `name`, and `roles` if available.

Expected result: the session is serialized, persists across refreshes, and contains only the configured `userKeys` plus `accessToken` and `authentications`.

## Scenario 3: Email Login With Redirect

1. Clear cookies.
2. Open `/log_in?redirect-to=/artwork/andy-warhol-skull`.
3. Log in with a valid email/password user.
4. Observe the redirect chain.
5. Confirm the final destination is the artwork path or the Gravity SSO URL for artsy.net redirects, depending on local config.

Expected result: safe Artsy redirect targets are preserved. The user is not redirected to an unrelated external domain.

## Scenario 4: Unsafe Redirect Sanitization

1. Clear cookies.
2. Open `/log_in?redirect-to=https://example.com/phishing`.
3. Log in with a valid user.
4. Observe the final redirect.

Expected result: the app does not redirect to `example.com`; it falls back to `/` or another safe Artsy destination.

## Scenario 5: Invalid Email Or Password

1. Clear cookies.
2. Open `/log_in`.
3. Enter a valid-looking email and an incorrect password.
4. Submit the form.
5. Observe the page URL and visible error.
6. Repeat the same attempt through any XHR login surface, such as a login modal, if available.

Expected result: full-page login redirects to the login page with an invalid credentials message. XHR login returns `401` with `{ success: false, error: "invalid email or password" }` or the equivalent Gravity message.

## Scenario 6: Two-Factor Login

1. Clear cookies.
2. Open `/log_in`.
3. Log in as a two-factor-enabled user without an OTP code.
4. Confirm the missing-code state is shown and the request is not treated as a generic 500.
5. Retry with an invalid OTP code.
6. Confirm the invalid-code state is shown and the request is not treated as a generic 500.
7. Retry with a valid OTP code.
8. Confirm login succeeds and the session persists after refresh.

Expected result: missing and invalid OTP failures return `401`; valid OTP succeeds.

## Scenario 7: Email Signup Success

1. Clear cookies.
2. Open `/sign_up`.
3. Fill the signup form with a new test email, name, password, terms acceptance, email preference, and recaptcha if required.
4. Submit the form.
5. Confirm the user is created and then logged in.
6. Confirm the final redirect is `/` or the configured after-signup destination.
7. Confirm the user session persists after refresh.

Expected result: signup calls Gravity user creation, then local login, then redirects through the standard post-auth flow.

## Scenario 8: Email Signup Validation Error

1. Temporarily disable the `validationSchema` on the Formik sign up form.
2. Clear cookies.
3. Open `/sign_up`.
4. Submit an invalid signup, such as an invalid email or weak password.
5. Observe the visible error and response status.
6. Repeat through any XHR signup surface if available.

Expected result: invalid email returns the existing invalid-email behavior. XHR validation failures return JSON with `{ success: false, error: <Gravity message> }` and do not expose stack traces.

## Scenario 9: Header Login With X-Access-Token

1. Start Force locally and confirm the server is listening at `http://localhost:5000`.
2. Log in normally as the test user in a browser.
3. Open DevTools Console and copy the current user’s access token:

   ```js
   copy(sd.CURRENT_USER.accessToken)
   ```

   If `sd.CURRENT_USER` is missing, refresh after logging in and try again.

4. In a new terminal, save the local Force URL and paste the copied token:

   ```sh
   export FORCE_URL="http://localhost:5000"
   export ACCESS_TOKEN="PASTE_ACCESS_TOKEN_HERE"
   ```

5. Clear any old curl cookies:

   ```sh
   rm -f /tmp/force-header-login-cookies.txt
   ```

6. Request a normal Force page with the `X-Access-Token` header and save the response cookies:

   ```sh
   curl -i \
     -c /tmp/force-header-login-cookies.txt \
     -b /tmp/force-header-login-cookies.txt \
     -H "X-Access-Token: $ACCESS_TOKEN" \
     "$FORCE_URL/"
   ```

7. Confirm the response is successful and includes a session cookie. You can also watch the Force logs for Gravity `/api/v1/me` and `/api/v1/me/authentications` requests.
8. Reuse the saved cookies without sending the access-token header:

   ```sh
   curl -I \
     -b /tmp/force-header-login-cookies.txt \
     "$FORCE_URL/settings"
   ```

9. Confirm this request does not redirect to `/log_in`, which shows that the header login created a Force session.
10. Now confirm the logout path does not use the access-token header to create a session:

```sh
rm -f /tmp/force-header-login-logout-cookies.txt

curl -i \
  -c /tmp/force-header-login-logout-cookies.txt \
  -b /tmp/force-header-login-logout-cookies.txt \
  -H "X-Access-Token: $ACCESS_TOKEN" \
  "$FORCE_URL/users/sign_out"

curl -I \
  -b /tmp/force-header-login-logout-cookies.txt \
  "$FORCE_URL/settings"
```

11. Confirm the `/settings` request redirects to `/log_in`, and confirm the Force logs do not show the header token being serialized into a user session for the `/users/sign_out` request.

Expected result: header login works for normal paths and is skipped on the logout path.

## Scenario 10: Trust Token Login

1. Start Force locally and confirm the server is listening at `http://localhost:5000`.
2. Log in normally as the test user in a browser.
3. Open DevTools Console and request a Gravity trust token for the current user:

   ```js
   with ({ copy }) {
     await fetch(`${sd.API_URL}/api/v1/me/trust_token`, {
       method: "POST",
       headers: { "X-Access-Token": sd.CURRENT_USER.accessToken },
     })
       .then(response => response.json())
       .then(({ trust_token }) => copy(trust_token))
   }
   ```

   This copies the trust token to your clipboard. If the response does not include `trust_token`, confirm `sd.CURRENT_USER.accessToken` is present and try again.

4. Open a fresh incognito window, or clear cookies for `localhost`, so the next request starts logged out.
5. Paste the copied token into this URL and open it immediately:

   ```txt
   http://localhost:5000/?trust_token=TRUST_TOKEN_HERE&foo=bar
   ```

6. Confirm the browser redirects after the token exchange.
7. Confirm the final URL no longer contains `trust_token`.
8. Confirm unrelated query parameters remain, such as `foo=bar`.
9. Confirm the user is logged in after the redirect. For example, open `/settings` in the same incognito window and confirm it does not redirect to `/log_in`.
10. Clear cookies again and repeat with an invalid trust token:

    ```txt
    http://localhost:5000/?trust_token=not-a-real-trust-token&foo=bar
    ```

11. Confirm the page does not crash, the request does not redirect through the token-stripping flow, and `/settings` still redirects to `/log_in`.

Expected result: valid trust tokens create a session and redirect to the same path without the token. Invalid trust tokens call `next()` and do not redirect or crash.

## Scenario 11: Social Login Success

Run this scenario for each enabled provider: Facebook, Google, and Apple.

1. If testing locally, expose Force through a public URL so the provider can call back to your machine:

   ```sh
   ngrok http 5000
   ```

2. Confirm the public URL loads local Force, then restart Force with `APP_URL` set to that URL.
3. Register the exact callback URL for the provider you are testing:
   - Facebook: in Meta Developer Console, add the ngrok domain under **App settings > Basic > App domains**, then add `${APP_URL}/users/auth/facebook/callback` under **Facebook Login > Settings > Valid OAuth Redirect URIs**. The OAuth redirect allowlist is separate from App domains.
   - Google: in Google Cloud Platform, add `${APP_URL}/users/auth/google/callback` under authorized redirect URIs.
   - Apple: in Apple Developer, add `${APP_URL}/users/auth/apple/callback` as an allowed return URL for the configured service ID.
4. Confirm the provider credentials are enabled locally:
   - Facebook: `FACEBOOK_ID` and `FACEBOOK_SECRET`
   - Google: `GOOGLE_CLIENT_ID` and `GOOGLE_SECRET`
   - Apple: `APPLE_CLIENT_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY`, and `APPLE_TEAM_ID`
5. Clear cookies.
6. Open the provider login path through the same host configured in `APP_URL`:
   - `/users/auth/facebook`
   - `/users/auth/google`
   - `/users/auth/apple`
7. Complete the provider authorization flow using a test account for that provider.
8. Confirm the provider redirects back to Force at the matching callback path, such as `/users/auth/google/callback`.
9. Confirm a linked social account logs in successfully and lands on `/` or the requested post-auth redirect target.
10. Refresh the page and confirm the session persists.
11. Repeat with a provider account that is not linked to an Artsy user, if available, and confirm it either creates the user or follows the existing "no account linked" signup path.

Expected result: provider callbacks exchange the provider token for a Gravity access token, create a Force session, and redirect through the normal post-auth flow.

## Scenario 12: Social Auth Error Handling

Run the applicable checks for each enabled provider.

1. Start a provider auth flow and deny/cancel access at the provider.
2. Confirm Force handles the denial without an uncaught server error.
3. Attempt to log in with a provider email that already belongs to an Artsy account.
4. Confirm the redirect includes the expected `error_code`, such as `ALREADY_EXISTS` or `PREVIOUSLY_LINKED_SETTINGS`.
5. Attempt to link a provider already linked to another Artsy account.
6. Confirm the redirect includes `PREVIOUSLY_LINKED`.

Expected result: known provider failures redirect to login or settings with the existing error codes.

## Scenario 13: Social Account Linking

Run this scenario for each enabled provider.

1. Log in with an email/password user.
2. Open `/settings`.
3. Start provider linking.
4. Complete provider authorization.
5. Confirm the provider appears linked in settings.
6. Log out and log in again.
7. Confirm the linked provider state persists.

Expected result: linking calls the provider-specific Gravity authentication endpoint and returns to `/settings`.

## Scenario 14: Logout

1. Log in as a normal user.
2. Open `/users/sign_out` from an Artsy page.
3. Confirm the user is logged out and redirected back safely.
4. Log in again.
5. Trigger XHR or API logout with `DELETE /users/sign_out`.
6. Confirm the response is `200` with `{ msg: "success" }`.
7. Log in again.
8. Attempt a GET logout from a non-Artsy referrer if possible, for example with an API client setting `Referer: https://example.com`.

Expected result: normal logout clears the Force session and asks Gravity to delete the access token. Non-Artsy GET logout links are rejected.

## Scenario 15: Gravity HTML Error Body

This verifies the known existing bug remains documented until intentionally fixed.

1. Point `API_URL` at a local mock server that returns `500` and `<!DOCTYPE html><html>Error</html>` for `/oauth2/access_token`.
2. Start Force.
3. Attempt XHR login.
4. Observe the JSON error body and server logs.

Expected result today: the full HTML body may appear as the auth error message. This is a known bug captured by a failing Jest test and should be fixed in a separate behavior-change PR.

## Scenario 16: Gravity Network Failure Or Timeout

1. Point `API_URL` at an unroutable local endpoint, such as `http://127.0.0.1:9`.
2. Start Force.
3. Attempt email login.
4. Attempt signup.
5. Attempt trust-token login if you have a token URL prepared.
6. Watch server logs.

Expected result: requests fail gracefully through the existing error paths. There should be no uncaught exception, unhandled promise rejection, or crash from a missing Gravity response.

## Scenario 17: Gravity SSO Redirect

This verifies the extra SSO hop Force performs after login when the post-auth redirect target resolves to an `artsy.net` URL. Force asks Gravity for a trust token, redirects the browser to Gravity’s `/users/sign_in` endpoint, and Gravity redirects the browser back to the intended `redirect_uri`.

This is not a normal local-browser smoke test. If local `APP_URL` is `localhost` or an ngrok URL, a relative redirect like `/artwork/andy-warhol-skull` resolves to that local host and skips this SSO path. The current client-side auth flow may also normalize an off-origin `https://www.artsy.net/...` redirect back to `/` when it does not match local `APP_URL`.

1. Run this in a production-like or staging-like setup where `APP_URL` has an `artsy.net` hostname, or validate it with a targeted server-side test/debugger.
2. Clear cookies.
3. Open the login page with a relative redirect target:

   ```txt
   /log_in?redirect-to=/artwork/andy-warhol-skull
   ```

4. Log in with a valid user.
5. With DevTools Network open and **Preserve log** enabled, inspect the login response redirects.
6. Confirm Force makes a server-side request to Gravity `/api/v1/me/trust_token`. This may be easiest to confirm from Force logs, a debugger, or a temporary mock Gravity response.
7. Confirm the browser is sent through an intermediate Gravity URL shaped like:

   ```txt
   ${API_URL}/users/sign_in?redirect_uri=${APP_URL}%2Fartwork%2Fandy-warhol-skull&trust_token=...
   ```

8. Confirm the browser ultimately lands on `${APP_URL}/artwork/andy-warhol-skull`.
9. Repeat with Gravity trust-token creation forced to fail, if possible.

Expected result: successful trust-token creation redirects through Gravity SSO, then lands on the requested Artsy URL. If trust-token creation fails, Force skips the Gravity SSO hop and redirects directly to the parsed Artsy URL.

## Scenario 18: Current User Serialization

1. Log in as a user with known authentications.
2. Refresh the page.
3. Inspect bootstrap data and server-rendered locals.
4. Confirm the user object includes configured `userKeys`.
5. Confirm `authentications` is present.
6. Confirm unexpected Gravity user fields are not stored in the session.

Expected result: session serialization still fetches `/api/v1/me` and `/api/v1/me/authentications`, stores the picked fields, and rehydrates the current user on later requests.

## Required Regression Commands

After manual testing, run:

```sh
yarn type-check
yarn jest src/Server/passport
yarn lint $(git ls-files --modified --others --exclude-standard | while read f; do [ -e "$f" ] && printf '%s ' "$f"; done)
```

The filtered lint command avoids passing deleted `.js` rename paths to Biome.
