import { useEffect } from "react"
import { useRouter } from "System/Router/useRouter"
import { UtmParams } from "Apps/Consign/Routes/SubmissionFlow/Utils/types"
import { Join, Spacer } from "@artsy/palette"
import {
  SellMeta,
  CtaBanner,
  CtaSection,
  FAQ,
  Header,
  HowItWorks,
  PromoSpace,
  SoldRecentlyOnArtsyQueryRenderer,
  WhySellWithArtsy,
} from "./Components"

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
  }, [])

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
