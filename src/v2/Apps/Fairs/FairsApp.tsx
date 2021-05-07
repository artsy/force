import React from "react"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface FairsAppProps {}

export const FairsApp: React.FC<FairsAppProps> = ({ children }) => {
  return (
    <>
      <HorizontalPadding>{children}</HorizontalPadding>
    </>
  )
}
