import { Box, Button, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getENV } from "Utils/getENV"

export const ArtQuizResults: FC = () => {
  const { t } = useTranslation()
  const name: string | undefined = getENV("CURRENT_USER")?.name
  const customGreeting: string = `${name}'s ${t("artQuizPage.results.title")}`
  const defaultGreeting: string = `Your ${t("artQuizPage.results.title")}`

  return (
    <Box>
      <Text mt={6} variant="xl">
        {name ? customGreeting : defaultGreeting}
      </Text>
      <Text color="black60">{t("artQuizPage.results.subtitle")}</Text>
      <Spacer mt={2} />
      <Button variant="secondaryBlack">
        {t("artQuizPage.results.emailButton")}
      </Button>
      <Spacer mt={6} />
      <Tabs>
        <Tab name={t("artQuizPage.results.tabs.worksYouLiked")} />
        <Tab name={t("artQuizPage.results.tabs.recommendedCollections")} />
        <Tab name={t("artQuizPage.results.tabs.recommendedArtists")} />
      </Tabs>
    </Box>
  )
}
