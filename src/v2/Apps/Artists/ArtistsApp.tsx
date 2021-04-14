import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface ArtistsAppProps {}

export const ArtistsApp: React.FC<ArtistsAppProps> = ({ children }) => {
  return (
    <AppContainer>
      <HorizontalPadding>{children}</HorizontalPadding>
    </AppContainer>
  )
}
