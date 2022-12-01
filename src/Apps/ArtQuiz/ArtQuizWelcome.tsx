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
import { SplitLayout } from "Components/SplitLayout"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useTranslation } from "react-i18next"

interface ArtQuizWelcomeProps {
  onStartQuiz: () => void
}

export const ArtQuizWelcome: FC<ArtQuizWelcomeProps> = ({ onStartQuiz }) => {
  const { t } = useTranslation()

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
          <Flex flexDirection="column" justifyContent="center" p={[2, 4]}>
            <Box width="100%" my={6}>
              <ArtsyLogoIcon />

              <Spacer mt={2} />

              <Text variant={["xl", "xxl"]}>{t("artQuizPage.title")}</Text>

              <Spacer mt={6} />

              <Text variant={["md", "lg"]}>
                {t("artQuizPage.welcomeScreen.subtitle1")}
              </Text>

              <Spacer mt={2} />

              <Text variant={["md", "lg-display"]}>
                {t("artQuizPage.welcomeScreen.subtitle2")}
              </Text>
            </Box>

            <Spacer mt={6} />

            <Box width="100%">
              <Button width="100%" onClick={onStartQuiz}>
                {t("artQuizPage.welcomeScreen.getStartedButton")}
              </Button>

              <Spacer mt={1} />

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
  )
}
