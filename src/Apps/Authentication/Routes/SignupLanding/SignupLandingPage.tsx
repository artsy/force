import { Join, Spacer } from "@artsy/palette"
import { SignupCTA } from "Apps/Authentication/Routes/SignupLanding/Components/SignupCTA"
import { SignupHero } from "Apps/Authentication/Routes/SignupLanding/Components/SignupHero"
import { SignupHeader } from "Apps/Authentication/Routes/SignupLanding/Components/SignupHeader"
import { SignupStats } from "Apps/Authentication/Routes/SignupLanding/Components/SignupStats"
import { SignupValueProps } from "Apps/Authentication/Routes/SignupLanding/Components/SignupValueProps"
import { MetaTags } from "Components/MetaTags"
import type { FC } from "react"
import { AuthenticationInlineDialogProvider } from "Apps/Authentication/Components/AuthenticationInlineDialogProvider"

export const SignupLandingPage: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <AuthenticationInlineDialogProvider mode="SignUp">
        <MetaTags
          title="Join Artsy - Discover and Buy Art That Moves You"
          description="Join over 3.4 million art collectors and enthusiasts. Explore 1.6 million original artworks for sale from galleries, museums, and artists worldwide."
          pathname="/signup"
        />

        <SignupHeader />
        <Join separator={<Spacer y={[6, 6]} />}>
          <SignupHero />
          <SignupValueProps />
          <SignupStats />
          <SignupCTA />
        </Join>
      </AuthenticationInlineDialogProvider>
    </>
  )
}
