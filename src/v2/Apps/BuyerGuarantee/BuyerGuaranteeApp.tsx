import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface BuyerGuaranteeAppProps {}

export const BuyerGuaranteeApp: React.FC<BuyerGuaranteeAppProps> = ({
  children,
}) => {
  return (
    <AppContainer>
      <HorizontalPadding>{children}</HorizontalPadding>
    </AppContainer>
  )
}
