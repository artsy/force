import { Button, Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const ArtQuizResultsTabs: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Text mt={6} variant={["lg", "xl"]}>
        {t("artQuizPage.results.title")}
      </Text>

      <Spacer y={1} />

      <Text color="black60" variant={["sm", "md"]}>
        {t("artQuizPage.results.subtitle")}
      </Text>

      <Spacer y={4} />

      <Button variant="secondaryBlack">
        {t("artQuizPage.results.emailButton")}
      </Button>

      <Spacer y={6} />

      <Tabs fill>
        <Tab name={t("artQuizPage.results.tabs.worksYouLiked")} />
        <Tab name={t("artQuizPage.results.tabs.recommendedCollections")} />
        <Tab name={t("artQuizPage.results.tabs.recommendedArtists")} />
      </Tabs>
    </>
  )
}
