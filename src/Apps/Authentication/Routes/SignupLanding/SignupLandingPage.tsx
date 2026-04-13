import { Join, Spacer } from "@artsy/palette"
import { SignupCTA } from "Apps/Authentication/Routes/SignupLanding/Components/SignupCTA"
import { SignupHero } from "Apps/Authentication/Routes/SignupLanding/Components/SignupHero"
import { SignupHeader } from "Apps/Authentication/Routes/SignupLanding/Components/SignupHeader"
import { SignupStats } from "Apps/Authentication/Routes/SignupLanding/Components/SignupStats"
import { SignupValueProps } from "Apps/Authentication/Routes/SignupLanding/Components/SignupValueProps"

import { MetaTags } from "Components/MetaTags"
import type { FC } from "react"

export const SignupLandingPage: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <MetaTags
        title="Join Artsy - Discover and Buy Art That Moves You"
        description="Join over 3.4 million art collectors and enthusiasts. Explore 1.6 million original artworks for sale from galleries, museums, and artists worldwide."
        pathname="/signup-new"
      />

      <SignupHeader />
      <Join separator={<Spacer y={[6, 12]} />}>
        {/* Hero Section DI-90 */}
        <SignupHero />
        {/* Value Props Section DI-91 */}
        <SignupValueProps />
        {/* Stats Section DI-91 */}
        <SignupStats />
        {/* Bottom CTA Section DI-92 */}
        <SignupCTA />
      </Join>
    </>
  )
}
