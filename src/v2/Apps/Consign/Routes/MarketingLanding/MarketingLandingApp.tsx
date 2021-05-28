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
import { ArtworkCredits } from "./Components/ArtworkCredits"
import { TemporaryOffer } from "./Components/TemporaryOffer"
import { BecomePartner } from "./Components/BecomePartner"

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
        <BecomePartner />
        <FAQ />
        <ArtworkCredits />
      </>
    </>
  )
}
