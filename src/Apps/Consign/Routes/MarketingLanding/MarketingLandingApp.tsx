import { Box, Flex, Join, Spacer } from "@artsy/palette"
import { CollectorsOverview } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/CollectorsOverview"
import { FAQSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FAQSWA"
import { FooterBanner } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FooterBanner"
import { HeaderSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HeaderSWA"
import { Highlights } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/Highlights"
import { HowItWorksSteps } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HowItWorksSteps"
import { MeetTheSpecialists } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/MeetTheSpecialists"
import { PreviouslySoldOnArtsyRailQueryRenderer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/PreviouslySoldOnArtsyRail"
import { SWAFooter } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SWAFooter"
import { SWAStickyFooter } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SWAStickyFooter"
import { SpeakToTheTeam } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpeakToTheTeam"
import { WaysWeSell } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/WaysWeSell"
import { SellMeta } from "Apps/Consign/Routes/MarketingLanding/Components/SellMeta"
import { UtmParams } from "Apps/Consign/Routes/SubmissionFlow/Utils/types"
import { Footer } from "Components/Footer/Footer"
import { useRouter } from "System/Hooks/useRouter"
import { Media } from "Utils/Responsive"
import { useEffect } from "react"

export const MarketingLandingApp = () => {
  const {
    match: {
      location: { query },
    },
  } = useRouter()

  useEffect(() => {
    const utmParamsSessionData = sessionStorage.getItem("utmParams")
    if (!utmParamsSessionData) {
      const queryUtmParams: UtmParams = {
        utmMedium: query?.utm_medium,
        utmSource: query?.utm_source,
        utmTerm: query?.utm_term,
      }

      if (Object.values(queryUtmParams).some(c => !!c)) {
        sessionStorage.setItem("utmParams", JSON.stringify(queryUtmParams))
      }
    }
  }, [query.utm_medium, query.utm_source, query.utm_term])

  return (
    <>
      <SellMeta />

      <Media lessThan="sm">
        <Flex flexDirection="column">
          <Box
            flex={1}
            overflow="auto"
            width="100%"
            style={{ WebkitOverflowScrolling: "touch" }}
            px={2}
          >
            <Join separator={<Spacer y={[6, 12]} />}>
              <HeaderSWA />
              <Highlights />
              <WaysWeSell />
              <HowItWorksSteps />
              <FAQSWA />
              <MeetTheSpecialists />
              <CollectorsOverview />
              <PreviouslySoldOnArtsyRailQueryRenderer />
              {/* <Reviews /> */}
              <SpeakToTheTeam />
              <FooterBanner />
            </Join>

            <Footer />
          </Box>

          <SWAStickyFooter />
        </Flex>
      </Media>

      <Media greaterThanOrEqual="sm">
        <Box px={4}>
          <Join separator={<Spacer y={[6, 12]} />}>
            <HeaderSWA />
            <Highlights />
            <WaysWeSell />
            <HowItWorksSteps />
            <SpeakToTheTeam />
            <MeetTheSpecialists />
            <CollectorsOverview />
            <PreviouslySoldOnArtsyRailQueryRenderer />
            {/* <Reviews /> */}
            <FAQSWA />
            <SWAFooter />
            <FooterBanner />
          </Join>

          <Footer />
        </Box>
      </Media>
    </>
  )
}
