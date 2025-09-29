import { Box, Spacer, Stack } from "@artsy/palette"
import { AboutContact } from "Apps/About/Components/AboutContact"
import { AboutDownload } from "Apps/About/Components/AboutDownload"
import { AboutHeader } from "Apps/About/Components/AboutHeader"
import { AboutHero } from "Apps/About/Components/AboutHero"
import { AboutJoin } from "Apps/About/Components/AboutJoin"
import { AboutMissionAndVision } from "Apps/About/Components/AboutMissionAndVision"
import { AboutNav, AboutNavEntry } from "Apps/About/Components/AboutNav"
import { AboutOurStory } from "Apps/About/Components/AboutOurStory"
import { AboutOurTeam } from "Apps/About/Components/AboutOurTeam"
import { AboutPress } from "Apps/About/Components/AboutPress"
import { AboutStats } from "Apps/About/Components/AboutStats"
import {
  AboutStructuredData,
  DESCRIPTION,
} from "Apps/About/Components/AboutStructuredData"
import { AboutTagline } from "Apps/About/Components/AboutTagline"
import { AboutWhatWeDo } from "Apps/About/Components/AboutWhatWeDo"
import { MetaTags } from "Components/MetaTags"

export const AboutApp: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <MetaTags
        title="About | Artsy"
        description={DESCRIPTION}
        imageURL="https://files.artsy.net/images/00_CVP_About_Hero_og.png"
        pathname="/about"
      />

      <AboutStructuredData />

      <AboutNavEntry />

      <AboutNav />

      <Spacer y={4} />

      <AboutHeader />

      <Spacer y={4} />

      <AboutHero />

      <Spacer y={[4, 6]} />

      <AboutStats />

      <Spacer y={12} />

      <Stack gap={[6, 12]}>
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
    </>
  )
}
