import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppContainer } from "../Components/AppContainer"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { ConsignMeta } from "./Components/ConsignMeta"
import { Header } from "./Components/Header"
import { SellArtDifferently } from "./Components/SellArtDifferently"
import { GetPriceEstimate } from "./Components/GetPriceEstimate"
import { HowToSell } from "./Components/HowToSell"
import { ConsignInDemandNow } from "./Components/InDemandNow/ConsignInDemandNow"
import { SoldRecently } from "./Components/SoldRecently"
import { ReadMore } from "./Components/ReadMore"
import { ContactUs } from "./Components/ContactUs"
import { FAQ } from "./Components/FAQ"
import { SellWithArtsy } from "./Components/SellWithArtsy"
import { Footer } from "v2/Components/Footer"

const ConsignApp = props => {
  return (
    <AnalyticsContext.Provider
      value={{
        // TODO: Need proper tracking props
        contextPageOwnerType: null,
      }}
    >
      <>
        <ConsignMeta />

        <AppContainer maxWidth="100%">
          <Header />
          <GetPriceEstimate />
          <SellArtDifferently />

          <HorizontalPadding>
            <HowToSell />
            <ConsignInDemandNow />
            <SoldRecently />
            <ReadMore />
            <ContactUs />
            <FAQ />
            <SellWithArtsy />
            <Footer />
          </HorizontalPadding>
        </AppContainer>
      </>
    </AnalyticsContext.Provider>
  )
}

export default createFragmentContainer(ConsignApp, {
  artist: graphql`
    fragment ConsignApp_artist on Artist {
      name
    }
  `,
})
