import {
  Flex,
  Text,
  Spacer,
  ArtsyMarkBlackIcon,
  FullBleed,
  Spinner,
  Box,
} from "@artsy/palette"
import { SplitLayout } from "Components/SplitLayout"
import { useState, useEffect, FC } from "react"
import { useTranslation } from "react-i18next"
import { wait } from "Utils/wait"

interface ArtQuizResultsLoaderProps {
  onReady(): void
}

export const ArtQuizResultsLoader: FC<ArtQuizResultsLoaderProps> = ({
  onReady,
}) => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const exec = async () => {
      await wait(2000)

      setLoading(false)

      await wait(1000)

      onReady()
    }

    exec()
  }, [onReady])

  return (
    <FullBleed height="100%">
      <SplitLayout
        hideLogo
        left={
          <Flex height="100%" alignItems="center" justifyContent="center">
            <ArtsyMarkBlackIcon height={65} width={65} fill="white100" />
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
            <Box position="relative" height={25} width={25}>
              <Spinner color="brand" />
            </Box>

            <Spacer y={2} />

            <Text variant={["lg", "xl"]}> {t("artQuizPage.title")}</Text>

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
  )
}
