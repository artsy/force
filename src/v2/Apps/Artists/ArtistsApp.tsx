import React from "react"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface ArtistsAppProps {}

export const ArtistsApp: React.FC<ArtistsAppProps> = ({ children }) => {
  return <HorizontalPadding>{children}</HorizontalPadding>
}
