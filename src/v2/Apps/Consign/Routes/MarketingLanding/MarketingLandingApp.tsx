import React from "react"
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
import { Footer } from "v2/Components/Footer"
import { SectionContainer } from "./Components/SectionContainer"
import { ArtworkCredits } from "./Components/ArtworkCredits"
import { TemporaryOffer } from "./Components/TemporaryOffer"

export const MarketingLandingApp = () => {
  return (
    <>
      <ConsignMeta />

      <>
        <Header />
        <TemporaryOffer />
        <SellArtDifferently />
        <GetPriceEstimate />
        <HowToSell />
        <ContactUs />
        <ConsignInDemandNow />
        <SoldRecentlyQueryRenderer />
        <ReadMore />
        <ContactUs darkVariant />
        <FAQ />
        <ArtworkCredits />
        <SectionContainer py={0}>
          <Footer mt={0} borderTop={0} />
        </SectionContainer>
      </>
    </>
  )
}
