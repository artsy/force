import { GridColumns, Column, Box } from "@artsy/palette"
import { SignupForm } from "Apps/Authentication/Routes/SignupLanding/Components/SignupForm"
import { SignupHeroContent } from "Apps/Authentication/Routes/SignupLanding/Components/SignupHeroContent"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export const SignupHero = () => {
  return (
    <HorizontalPadding>
      <Box mx="auto" px={[2, 4]} py={[4, 6, 12]}>
        <GridColumns gridRowGap={[6, 4]} gridColumnGap={[4, 6, 8]}>
          <Column span={[12, 12, 7]} pr={[0, 2, 4]}>
            <SignupHeroContent />
          </Column>
          <Column span={[12, 12, 5]} pl={[0, 2, 4]}>
            <SignupForm />
          </Column>
        </GridColumns>
      </Box>
    </HorizontalPadding>
  )
}
