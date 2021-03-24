import { ThemeProviderV3 } from "@artsy/palette"
import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"

interface GeneAppProps {}

export const GeneApp: React.FC<GeneAppProps> = ({ children }) => {
  return (
    <ThemeProviderV3>
      <AppContainer>
        <HorizontalPadding>
          {children}

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </ThemeProviderV3>
  )
}
