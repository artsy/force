import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface FairsAppProps {}

export const FairsApp: React.FC<FairsAppProps> = ({ children }) => {
  return (
    <AppContainer>
      <HorizontalPadding>{children}</HorizontalPadding>
    </AppContainer>
  )
}
