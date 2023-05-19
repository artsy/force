import { Spacer, Tabs, Tab, Text } from "@artsy/palette"
import { ArtQuizTrendingArtistsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizTrendingArtists"
import { ArtQuizTrendingCollectionsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizTrendingCollections"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const ArtQuizResultsEmpty: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Spacer y={[4, 6]} />

      <Text variant={["lg-display", "xl"]}>
        {t("artQuizPage.results.empty.title")}
      </Text>

      <Spacer y={[0, 1]} />

      <Text color="black60" variant={["lg-display", "md"]}>
        {t("artQuizPage.results.empty.subtitle")}
      </Text>

      <Spacer y={[4, 6]} />

      <Tabs fill>
        <Tab name="Trending Collections">
          <Spacer y={4} />

          <ArtQuizTrendingCollectionsQueryRenderer />
        </Tab>

        <Tab name="Trending Artists">
          <Spacer y={4} />

          <ArtQuizTrendingArtistsQueryRenderer />
        </Tab>
      </Tabs>

      <Spacer y={[4, 6]} />
    </>
  )
}
