import { useEffect } from "react"
import { ConsignMeta } from "./Components/ConsignMeta"
import { PromoSpace } from "./Components/PromoSpace"
import { useRouter } from "v2/System/Router/useRouter"
import { UtmParams } from "../SubmissionFlow/Utils/types"
import { Join, Spacer } from "@artsy/palette"

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
      <ConsignMeta />

      {/* <Header /> */}

      <Join separator={<Spacer mt={[6, 12]} />}>
        <PromoSpace />

        {/* <ArtsyMissionStatement />
        <SellArtDifferently />
        <GetPriceEstimate />
        <HowToSell />
        <ContactUs />
        <ConsignInDemandNow />
        <SoldRecentlyQueryRenderer />
        <ReadMore />
        <BecomePartner />
        <FAQ />
        <ArtworkCredits /> */}
      </Join>
    </>
  )
}
