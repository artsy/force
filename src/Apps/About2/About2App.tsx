import { Box, Spacer, Stack } from "@artsy/palette"
import { AboutContact } from "Apps/About2/Components/AboutContact"
import { AboutDownload } from "Apps/About2/Components/AboutDownload"
import { AboutHeader } from "Apps/About2/Components/AboutHeader"
import { AboutHero } from "Apps/About2/Components/AboutHero"
import { AboutJoin } from "Apps/About2/Components/AboutJoin"
import { AboutMissionAndVision } from "Apps/About2/Components/AboutMissionAndVision"
import { AboutNav, AboutNavProvider } from "Apps/About2/Components/AboutNav"
import { AboutOurStory } from "Apps/About2/Components/AboutOurStory"
import { AboutOurTeam } from "Apps/About2/Components/AboutOurTeam"
import { AboutPress } from "Apps/About2/Components/AboutPress"
import { AboutStats } from "Apps/About2/Components/AboutStats"
import { AboutTagline } from "Apps/About2/Components/AboutTagline"
import { AboutWhatWeDo } from "Apps/About2/Components/AboutWhatWeDo"
import { MetaTags } from "Components/MetaTags"

export const DESCRIPTION =
  "Artsy’s mission is to expand the art market to support more artists and art in the world."

export const About2App: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <AboutNavProvider>
      <MetaTags
        title="About | Artsy"
        description={DESCRIPTION}
        imageURL="https://files.artsy.net/images/00_CVP_About_Hero_og.png"
        pathname="/about"
      />

      <AboutNav />

      <Spacer y={4} />

      <AboutHeader />

      <Spacer y={4} />

      <AboutHero />

      <Spacer y={[4, 6]} />

      <AboutStats />

      <Spacer y={12} />

      <Stack gap={12}>
        <AboutMissionAndVision />

        <AboutTagline />

        <AboutOurStory />

        <AboutWhatWeDo />

        <Box>
          <AboutOurTeam />

          <AboutDownload />
        </Box>

        <AboutPress />

        <AboutJoin />

        <AboutContact />
      </Stack>
    </AboutNavProvider>
  )
}
