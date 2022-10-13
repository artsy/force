import {
  Box,
  Flex,
  Text,
  Spacer,
  ArtsyMarkBlackIcon,
  FullBleed,
  Spinner,
} from "@artsy/palette"
import { SplitLayout } from "Components/SplitLayout"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

export const waitTime = 2000

export const ArtQuizResultsLoader = () => {
  const { desktop } = useNavBarHeight()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, waitTime)
  }, [])

  const keypath = loading
    ? "artQuizPage.loadingScreen.calculatingResults"
    : "artQuizPage.loadingScreen.resultsComplete"

  return (
    <FullBleed height={`calc(100vh - ${desktop}px)`}>
      <Box height="100%" padding={0}>
        <SplitLayout
          hideLogo
          left={
            <Flex height="100%" alignItems="center" justifyContent="center">
              <ArtsyMarkBlackIcon height="65px" width="65px" fill="white100" />
            </Flex>
          }
          leftProps={{ display: ["none", "block"] }}
          right={
            <Flex
              width="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={[2, 4]}
            >
              {/* Vertically centers next Box */}

              {loading ? (
                <Spinner position="inherit" display="flex" />
              ) : (
                <Flex height="6px" />
              )}
              <Spacer my={2} />
              <Text variant={["lg", "xl"]}> {t("artQuizPage.title")}</Text>

              <Spacer my={2} />

              <Text variant={["sm", "md"]} color="black60">
                {t(keypath)}
              </Text>
            </Flex>
          }
        />
      </Box>
    </FullBleed>
  )
}
