import { FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ArtistRoute } from "Apps/Sell/Routes/ArtistRoute"
import { SellMeta } from "Apps/Sell/Routes/MarketingLanding/Components/SellMeta"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import * as React from "react"

export const NewRoute: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <FullBleed>
      <EnableRecaptcha />
      <SellMeta />

      <AppContainer>
        <SellFlowContextProvider>
          <ArtistRoute />
        </SellFlowContextProvider>
      </AppContainer>
    </FullBleed>
  )
}
