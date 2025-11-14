import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Z } from "Apps/Components/constants"
import { AppDownloadFooter } from "Components/AppDownloadFooter"
import { Footer } from "Components/Footer/Footer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Media } from "Utils/Responsive"
import type { FC } from "react"

export const LayoutFooter: FC<React.PropsWithChildren<unknown>> = () => {
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
