import { Flex, Text, Spacer, FullBleed, Spinner, Box } from "@artsy/palette"
import { ArtQuizFullScreen } from "Apps/ArtQuiz/Components/ArtQuizFullscreen"
import { SplitLayout } from "Components/SplitLayout"
import { useState, useEffect, FC } from "react"
import { useTranslation } from "react-i18next"
import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"

interface ArtQuizResultsLoaderProps {
  onReady(): void
}

export const ArtQuizResultsLoader: FC<ArtQuizResultsLoaderProps> = ({
  onReady,
}) => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []

    // TODO: Add support for cancellation in `wait` util
    timeouts.push(
      setTimeout(() => {
        setLoading(false)
        timeouts.push(setTimeout(onReady, 1000))
      }, 2000)
    )

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [onReady])

  return (
    <ArtQuizFullScreen>
      <FullBleed height="100%">
        <SplitLayout
          hideLogo
          left={
            <Flex height="100%" alignItems="center" justifyContent="center">
              <ArtsyMarkIcon height={65} width={65} fill="white100" />
            </Flex>
          }
          right={
            <Flex
              width="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={[2, 4]}
            >
              <Box position="relative" height={25} width={25}>
                <Spinner color="brand" />
              </Box>

              <Spacer y={2} />

              <Text variant={["lg", "xl"]}>
                {loading
                  ? t("artQuizPage.loadingScreen.findingArt")
                  : t("artQuizPage.loadingScreen.resultsReady")}
              </Text>

              <Spacer y={2} />

              <Text variant={["sm", "md"]} color="black60">
                {loading
                  ? t("artQuizPage.loadingScreen.calculatingResults")
                  : t("artQuizPage.loadingScreen.resultsComplete")}
              </Text>
            </Flex>
          }
        />
      </FullBleed>
    </ArtQuizFullScreen>
  )
}
