import React from "react"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface GeneAppProps {}

export const GeneApp: React.FC<GeneAppProps> = ({ children }) => {
  return (
    <>
      <HorizontalPadding>{children}</HorizontalPadding>
    </>
  )
}
