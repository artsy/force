import { Spacer, Tab, Tabs, Text } from "@artsy/palette"
import { ArtQuizLikedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizLikedArtworks"
import { ArtQuizRecommendedArtistsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizRecommendedArtists"
import { ArtQuizResultsRecommendedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizResultsRecommendedArtworks"
import { TriggerCampaignButton } from "Apps/ArtQuiz/Components/TriggerCampaignButton"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"

interface ArtQuizResultsTabsProps {
  savedQuizArtworksCount: number
}

export const ArtQuizResultsTabs: FC<ArtQuizResultsTabsProps> = ({
  savedQuizArtworksCount,
}) => {
  const { t } = useTranslation()

  const limit = useMemo(() => {
    if (savedQuizArtworksCount <= 1) return 100
    if (savedQuizArtworksCount <= 3) return 8
    return 4
  }, [savedQuizArtworksCount])

  return (
    <>
      <Spacer y={[4, 6]} />
      <Text variant={["lg-display", "xl"]}>
        {t("artQuizPage.results.title")}
      </Text>
      <Spacer y={[0, 1]} />
      <Text color="black60" variant={["lg-display", "md"]}>
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
          <ArtQuizResultsRecommendedArtworksQueryRenderer limit={limit} />
        </Tab>

        <Tab name={t("artQuizPage.results.tabs.recommendedArtists")}>
          <Spacer y={4} />

          <ArtQuizRecommendedArtistsQueryRenderer />
        </Tab>
      </Tabs>
    </>
  )
}
