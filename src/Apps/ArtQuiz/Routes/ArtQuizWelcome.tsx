import { Flex, Text, Spacer, Button, FullBleed, Box } from "@artsy/palette"
import { SplitLayout } from "Components/SplitLayout"
import { FC } from "react"
import { RouterLink } from "System/Components/RouterLink"
import { useTranslation } from "react-i18next"
import { ArtQuizFullScreen } from "Apps/ArtQuiz/Components/ArtQuizFullscreen"
import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"

interface ArtQuizWelcomeProps {
  onStartQuiz: () => void
}

export const ArtQuizWelcome: FC<ArtQuizWelcomeProps> = ({ onStartQuiz }) => {
  const { t } = useTranslation()

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
              flexDirection="column"
              justifyContent="center"
              p={[2, 4]}
              width="100%"
            >
              <Box flexShrink={0}>
                <ArtsyLogoIcon />
              </Box>

              <Spacer y={2} />

              <Text variant={["xl", "xxl"]}>{t("artQuizPage.title")}</Text>

              <Spacer y={6} />

              <Text variant={["md", "lg"]}>
                {t("artQuizPage.welcomeScreen.subtitle1")}
              </Text>

              <Spacer y={2} />

              <Text variant={["md", "lg-display"]}>
                {t("artQuizPage.welcomeScreen.subtitle2")}
              </Text>

              <Spacer y={12} />

              <Box flexShrink={0}>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  width="100%"
                  onClick={onStartQuiz}
                  to="/art-quiz/artworks"
                >
                  {t("artQuizPage.welcomeScreen.getStartedButton")}
                </Button>

                <Spacer y={1} />

                <Button
                  // @ts-ignore
                  as={RouterLink}
                  variant="tertiary"
                  width="100%"
                  to="/"
                >
                  {t("artQuizPage.welcomeScreen.skipButton")}
                </Button>
              </Box>
            </Flex>
          }
        />
      </FullBleed>
    </ArtQuizFullScreen>
  )
}
