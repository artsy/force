import { GridColumns, Column } from "@artsy/palette"
import { SignupForm } from "Apps/Authentication/Routes/SignupLanding/Components/SignupForm"
import { SignupHeroContent } from "Apps/Authentication/Routes/SignupLanding/Components/SignupHeroContent"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export const SignupHero = () => {
  return (
    <HorizontalPadding py={[4, 6, 12]}>
      <GridColumns gridRowGap={[6, 4]}>
        <Column span={[12, 12, 7]} pr={[0, 0, 4]}>
          <SignupHeroContent />
        </Column>
        <Column span={[12, 12, 5]} pl={[0, 0, 4]}>
          <SignupForm />
        </Column>
      </GridColumns>
    </HorizontalPadding>
  )
}
