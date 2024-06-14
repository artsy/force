import { AppContainer } from "Apps/Components/AppContainer"
import { Z } from "Apps/Components/constants"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Footer } from "Components/Footer/Footer"
import { FC } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"

export const LayoutFooter: FC = () => {
  const { isEigen } = useSystemContext()

  if (isEigen) return null

  return (
    <AppContainer>
      <HorizontalPadding>
        <Footer zIndex={Z.footer} />
      </HorizontalPadding>
    </AppContainer>
  )
}
