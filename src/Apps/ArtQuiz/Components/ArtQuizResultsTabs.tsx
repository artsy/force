import { Button, Spacer, Tab, Tabs, Text, useToasts } from "@artsy/palette"
import { ArtQuizLikedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizLikedArtworks"
import { ArtQuizRecommendedArtistsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizRecommendedArtists"
import { ArtQuizResultsRecommendedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizResultsRecommendedArtworks"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSystemContext } from "System"

export const ArtQuizResultsTabs: FC = () => {
  const { t } = useTranslation()

  const { user } = useSystemContext()

  const { sendToast } = useToasts()

  const handleClick = () => {
    // TODO: Trigger email

    sendToast({
      variant: "success",
      message: t("artQuizPage.results.emailSuccess", { email: user?.email }),
    })
  }

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

      <Button
        variant="secondaryBlack"
        size={["small", "large"]}
        onClick={handleClick}
      >
        {t("artQuizPage.results.emailButton")}
      </Button>

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
    </>
  )
}
