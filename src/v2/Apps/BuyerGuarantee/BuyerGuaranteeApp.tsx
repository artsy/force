import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"

interface BuyerGuaranteeAppProps {}

export const BuyerGuaranteeApp: React.FC<BuyerGuaranteeAppProps> = ({
  children,
}) => {
  return <AppContainer>{children}</AppContainer>
}
