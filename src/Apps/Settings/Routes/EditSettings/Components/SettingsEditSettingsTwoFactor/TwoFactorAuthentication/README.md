## Migration Notes

- Moved from `src/Components/UserSettings/TwoFactorAuthentication`
- No files were renamed and no attempts at reorganization were made.
- Clicking App Authenticator "Edit", confirming password, then closing the resulting pop up, prevents the user from repeating this action without a page refresh. Since the state in AppSecondFactor is governed by the confluence of a number of boolean flags, they aren't reset correctly. Should be remodelled as a single state.
- Need to fix many, many @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
