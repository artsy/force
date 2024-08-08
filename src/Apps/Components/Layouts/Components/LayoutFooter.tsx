import { AppContainer } from "Apps/Components/AppContainer"
import { Z } from "Apps/Components/constants"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { AppDownloadFooter } from "Components/AppDownloadFooter"
import { Footer } from "Components/Footer/Footer"
import { FC } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Media } from "Utils/Responsive"

export const LayoutFooter: FC = () => {
  const { isEigen } = useSystemContext()

  if (isEigen) return null

  return (
    <>
      <Media at="xs">
        <AppDownloadFooter />
      </Media>

      <AppContainer>
        <HorizontalPadding>
          <Footer zIndex={Z.footer} />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}
