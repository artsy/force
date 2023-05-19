import { Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { ArtQuizLikedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizLikedArtworks"
import { ArtQuizRecommendedArtistsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizRecommendedArtists"
import { ArtQuizResultsRecommendedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizResultsRecommendedArtworks"
import { TriggerCampaignButton } from "Apps/ArtQuiz/Components/TriggerCampaignButton"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const ArtQuizResultsTabs: FC = ({}) => {
  const { t } = useTranslation()

  return (
    <>
      <Spacer y={[4, 6]} />

      <Text variant={["lg", "xl"]}>{t("artQuizPage.results.title")}</Text>

      <Spacer y={[0, 1]} />

      <Text color="black60" variant={["sm", "md"]}>
        {t("artQuizPage.results.subtitle")}
      </Text>

      <Spacer y={[2, 4]} />

      <TriggerCampaignButton />

      <Spacer y={[4, 6]} />

      <Tabs fill>
        <Tab name={t("artQuizPage.results.tabs.worksYouLiked")}>
          <ArtQuizLikedArtworksQueryRenderer />
        </Tab>

        <Tab name={t("artQuizPage.results.tabs.recommendedArtworks")}>
          <ArtQuizResultsRecommendedArtworksQueryRenderer />
        </Tab>

        <Tab name={t("artQuizPage.results.tabs.recommendedArtists")}>
          <Spacer y={4} />

          <ArtQuizRecommendedArtistsQueryRenderer />
        </Tab>
      </Tabs>

      <Spacer y={[4, 6]} />
    </>
  )
}
