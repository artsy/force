import { FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ArtistRoute } from "Apps/Sell/Routes/ArtistRoute"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import { EnableRecaptcha } from "Utils/EnableRecaptcha"
import * as React from "react"

export const NewRoute: React.FC = () => {
  return (
    <FullBleed>
      <EnableRecaptcha />

      <AppContainer>
        <SellFlowContextProvider>
          <ArtistRoute />
        </SellFlowContextProvider>
      </AppContainer>
    </FullBleed>
  )
}
