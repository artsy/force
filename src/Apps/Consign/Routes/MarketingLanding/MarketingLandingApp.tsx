import { useEffect } from "react"
import { useRouter } from "System/Router/useRouter"
import { UtmParams } from "Apps/Consign/Routes/SubmissionFlow/Utils/types"
import { Join, Spacer } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"
import { HeaderSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HeaderSWA"
import { Highlights } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/Highlights"
import { WaysWeSell } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/WaysWeSell"
import { HowItWorksSteps } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HowItWorksSteps"
import { MeetTheSpecialists } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/MeetTheSpecialists"
import { FAQSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FAQSWA"
import { Footer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/Footer"
import { Reviews } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/Reviews"
import { CollectorsOverview } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/CollectorsOverview"
import { PreviouslySoldOnArtsyRailQueryRenderer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/PreviouslySoldOnArtsyRail"
import { FooterBanner } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/FooterBanner"
import { SpeakToTheTeam } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpeakToTheTeam"
import { CtaBanner } from "Apps/Consign/Routes/MarketingLanding/Components/CtaBanner"
import { CtaSection } from "Apps/Consign/Routes/MarketingLanding/Components/CtaSection"
import { FAQ } from "Apps/Consign/Routes/MarketingLanding/Components/FAQ"
import { HowItWorks } from "Apps/Consign/Routes/MarketingLanding/Components/HowItWorks"
import { PromoSpace } from "Apps/Consign/Routes/MarketingLanding/Components/PromoSpace"
import { SellMeta } from "Apps/Consign/Routes/MarketingLanding/Components/SellMeta"
import { SoldRecentlyOnArtsyQueryRenderer } from "Apps/Consign/Routes/MarketingLanding/Components/SoldRecentlyOnArtsy"
import { WhySellWithArtsy } from "Apps/Consign/Routes/MarketingLanding/Components/WhySellWithArtsy"
import { Header } from "Apps/Consign/Routes/MarketingLanding/Components/Header"

export const MarketingLandingApp = () => {
  const enableNewSWALandingPage = useFeatureFlag(
    "cx-swa-landing-page-redesign-2023"
  )

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

  if (enableNewSWALandingPage) {
    return (
      <>
        <SellMeta />

        <Join separator={<Spacer y={[6, 12]} />}>
          <HeaderSWA />
          <Highlights />
          <WaysWeSell />
          <HowItWorksSteps />
          <SpeakToTheTeam />
          <MeetTheSpecialists />
          <PreviouslySoldOnArtsyRailQueryRenderer />
          <CollectorsOverview />
          <Reviews />
          <FAQSWA />
          <Footer />
          <FooterBanner />
        </Join>
      </>
    )
  }

  return (
    <>
      <SellMeta />

      <Header />

      <CtaBanner />

      <Join separator={<Spacer y={[6, 12]} />}>
        <PromoSpace />

        <WhySellWithArtsy />

        <HowItWorks />

        <SoldRecentlyOnArtsyQueryRenderer />

        <CtaSection />

        <FAQ />
      </Join>
    </>
  )
}
