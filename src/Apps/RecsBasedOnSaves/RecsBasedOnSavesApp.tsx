import { Spacer, Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { BecauseYouSavedRail } from "./Components/BecauseYouSavedRail"
import { BasedOnYourRecentSavesRail } from "Apps/RecsBasedOnSaves/Components/BasedOnYourRecentSavesRail"

export const RecsBasedOnSavesApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Artwork Recommendations Based on Recent Saves | Artsy"
        description="Discover personalized artwork recommendations based on your recent saves."
        pathname="/recs-based-on-saves"
      />

      <Spacer y={4} />

      <Text as="h1" variant="xl">
        Artwork Recommendations Based on Recent Saves
      </Text>

      <Spacer y={4} />

      <BecauseYouSavedRail />
      <Spacer y={4} />
      <BasedOnYourRecentSavesRail />
    </>
  )
}
