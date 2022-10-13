import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  ArtsyMarkBlackIcon,
  FullBleed,
  ArtsyLogoIcon,
} from "@artsy/palette"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { SplitLayout } from "Components/SplitLayout"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useTranslation } from "react-i18next"

interface ArtQuizWelcomeProps {
  onStartQuiz: () => void
}

export const ArtQuizWelcome: FC<ArtQuizWelcomeProps> = ({ onStartQuiz }) => {
  const { desktop } = useNavBarHeight()
  const { t } = useTranslation()

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
              flexDirection="column"
              justifyContent="space-between"
              p={[2, 4]}
            >
              {/* Vertically centers next Box */}
              <Box />
              <Box width="100%">
                <ArtsyLogoIcon mb={2} />
                <Text variant={["xl", "xxl"]}>{t("artQuizPage.title")}</Text>

                <Spacer my={6} />

                <Text variant={["md", "lg-display"]}>
                  {t("artQuizPage.welcomeScreen.subtitle1")}
                  <Spacer my={4} />
                  {t("artQuizPage.welcomeScreen.subtitle2")}
                </Text>
              </Box>

              <Spacer my={1} />
              <Box width="100%">
                <Button width="100%" onClick={onStartQuiz}>
                  {t("artQuizPage.welcomeScreen.getStartedButton")}
                </Button>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  variant="tertiary"
                  mt={1}
                  width="100%"
                  to="/"
                >
                  {t("artQuizPage.welcomeScreen.skipButton")}
                </Button>
              </Box>
            </Flex>
          }
        />
      </Box>
    </FullBleed>
  )
}
