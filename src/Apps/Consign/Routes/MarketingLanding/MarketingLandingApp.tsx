import { useEffect } from "react"
import { useRouter } from "System/Router/useRouter"
import { UtmParams } from "Apps/Consign/Routes/SubmissionFlow/Utils/types"
import { Box, Flex, Join, Spacer } from "@artsy/palette"
import { HeaderSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HeaderSWA"
import { Highlights } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/Highlights"
import { WaysWeSell } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/WaysWeSell"
import { HowItWorksSteps } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HowItWorksSteps"
import { FAQSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FAQSWA"
import { CollectorsOverview } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/CollectorsOverview"
import { PreviouslySoldOnArtsyRailQueryRenderer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/PreviouslySoldOnArtsyRail"
import { FooterBanner } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FooterBanner"
import { SpeakToTheTeam } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpeakToTheTeam"
import { SellMeta } from "Apps/Consign/Routes/MarketingLanding/Components/SellMeta"
import { MeetTheSpecialists } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/MeetTheSpecialists"
import { Media } from "Utils/Responsive"
import { MOBILE_NAV_AUTHENTICATION_HEIGHT } from "Components/NavBar/constants"
import { SWAFooterMobile } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SWAFooterMobile"
import { SWAFooter } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SWAFooter"
import { Footer } from "Components/Footer/Footer"

const MOBILE_HEIGHT = `calc(100vh - ${MOBILE_NAV_AUTHENTICATION_HEIGHT}px)`

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
        <Flex
          flexDirection="column"
          maxHeight={MOBILE_HEIGHT}
          overflow="hidden"
        >
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

          <SWAFooterMobile />
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
