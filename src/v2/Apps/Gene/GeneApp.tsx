import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface GeneAppProps {}

export const GeneApp: React.FC<GeneAppProps> = ({ children }) => {
  return (
    <AppContainer>
      <HorizontalPadding>{children}</HorizontalPadding>
    </AppContainer>
  )
}
