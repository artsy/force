/**
 * Export globally available React components from this file.
 *
 * Keep in mind that components exported from here (and their dependencies)
 * increase the size of our `common.js` bundle, so when the stitched component
 * is no longer used be sure to remove it from this list.
 *
 * To find which components are still being stiched can search for
 * ".SomeComponentName(", since this is how the component is invoked from our
 * jade / pug components.
 */

import { Box } from "@artsy/palette"

export { StitchWrapper } from "./StitchWrapper"
export { NavBar } from "./NavBar"
export { CollectionsHubsHomepageNav } from "./CollectionsHubsHomepageNav"
export {
  TwoFactorAuthenticationQueryRenderer as TwoFactorAuthentication,
} from "v2/Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication"
export { ReactionCCPARequest as CCPARequest } from "./CCPARequest"
import { Footer as BaseFooter } from "v2/Components/Footer"

export const Footer = () => {
  return (
    <Box px={2}>
      <BaseFooter />
    </Box>
  )
}