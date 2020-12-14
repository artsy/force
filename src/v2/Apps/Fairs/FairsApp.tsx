import React from "react"
import { Separator } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"

interface FairsAppProps {}

export const FairsApp: React.FC<FairsAppProps> = ({ children }) => {
  return (
    <AppContainer>
      <HorizontalPadding>
        {children}

        <Separator as="hr" my={3} />

        <Footer />
      </HorizontalPadding>
    </AppContainer>
  )
}
