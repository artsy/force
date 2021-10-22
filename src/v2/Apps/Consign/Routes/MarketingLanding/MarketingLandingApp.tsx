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

export const MarketingLandingApp = () => {
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
