import { Box, Button, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const ArtQuizResults: FC = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Text mt={6} variant="xl">
        {t("artQuizPage.results.title")}
      </Text>
      <Text color="black60">{t("artQuizPage.results.subtitle")}</Text>
      <Spacer mt={2} />
      <Button variant="secondaryBlack">
        {t("artQuizPage.results.emailButton")}
      </Button>
      <Spacer mt={6} />
      <Tabs fill>
        <Tab name={t("artQuizPage.results.tabs.worksYouLiked")} />
        <Tab name={t("artQuizPage.results.tabs.recommendedCollections")} />
        <Tab name={t("artQuizPage.results.tabs.recommendedArtists")} />
      </Tabs>
    </Box>
  )
}
