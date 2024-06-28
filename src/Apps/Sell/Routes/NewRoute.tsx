import { FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { SellMeta } from "Apps/Consign/Routes/MarketingLanding/Components/SellMeta"
import { ArtistRoute } from "Apps/Sell/Routes/ArtistRoute"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import * as React from "react"

export const NewRoute: React.FC = () => {
  return (
    <FullBleed>
      <SellMeta />

      <AppContainer>
        <SellFlowContextProvider>
          <ArtistRoute />
        </SellFlowContextProvider>
      </AppContainer>
    </FullBleed>
  )
}
