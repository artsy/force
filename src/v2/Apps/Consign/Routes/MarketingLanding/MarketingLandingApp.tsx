import { ConsignMeta } from "./Components/ConsignMeta"
import { Header } from "./Components/Header"
import { SellArtDifferently } from "./Components/SellArtDifferently"
import { GetPriceEstimate } from "./Components/GetPriceEstimate/GetPriceEstimate"
import { HowToSell } from "./Components/HowToSell"
import { ConsignInDemandNow } from "./Components/InDemandNow/ConsignInDemandNow"
import { SoldRecentlyQueryRenderer } from "./Components/SoldRecently"
import { ReadMore } from "./Components/ReadMore"
import { ContactUs } from "./Components/ContactUs"
import { FAQ } from "./Components/FAQ"
import { ArtworkCredits } from "./Components/ArtworkCredits"
import { PromoSpace } from "./Components/PromoSpace"
import { BecomePartner } from "./Components/BecomePartner"
import { ArtsyMissionStatement } from "./Components/ArtsyMissionStatement"
import { Join, Spacer } from "@artsy/palette"
import { useRouter } from "v2/System/Router/useRouter"
import { useEffect } from "react"
import { UtmParams } from "../SubmissionFlow/Utils/types"

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

      <Header />
      <PromoSpace />

      <Join separator={<Spacer mt={6} />}>
        <ArtsyMissionStatement />
        <SellArtDifferently />
        <GetPriceEstimate />
        <HowToSell />
        <ContactUs />
        <ConsignInDemandNow />
        <SoldRecentlyQueryRenderer />
        <ReadMore />
        <BecomePartner />
        <FAQ />
        <ArtworkCredits />
      </Join>
    </>
  )
}
