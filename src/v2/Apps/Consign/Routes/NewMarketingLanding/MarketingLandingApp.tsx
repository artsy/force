import { useEffect } from "react"
import { useRouter } from "v2/System/Router/useRouter"
import { UtmParams } from "../SubmissionFlow/Utils/types"
import { Join, Spacer } from "@artsy/palette"
import {
  ConsignMeta,
  CtaBanner,
  FAQ,
  Header,
  HowItWorks,
  PromoSpace,
  SoldRecentlyOnArtsyQueryRenderer,
  WhySellWithArtsy,
} from "./Components"
import { StickyProvider } from "v2/Components/Sticky"

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
    <StickyProvider>
      <ConsignMeta />

      <Header />

      <CtaBanner />

      <Join separator={<Spacer mt={[6, 12]} />}>
        <PromoSpace />
        <WhySellWithArtsy />
        <HowItWorks />
        <SoldRecentlyOnArtsyQueryRenderer />
        <FAQ />
      </Join>
    </StickyProvider>
  )
}
