import { Flex, Text, Spacer, Stack } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarShowingNow_artwork$data } from "__generated__/ArtworkSidebarShowingNow_artwork.graphql"
import FairIcon from "@artsy/icons/FairIcon"
import { RouterLink } from "System/Components/RouterLink"

interface ArtworkSidebarShowingNowProps {
  artwork: ArtworkSidebarShowingNow_artwork$data
}

export const ArtworkSidebarShowingNow: React.FC<ArtworkSidebarShowingNowProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()

  const shouldRenderShowingNow = artwork.collectorSignals?.runningShow ?? false

  if (!shouldRenderShowingNow) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const startAt = formatDate(
    artwork.collectorSignals?.runningShow?.startAt ?? ""
  )
  const endAt = formatDate(artwork.collectorSignals?.runningShow?.endAt ?? "")

  return (
    <>
      <Spacer y={4} />
      <Flex alignItems="top" data-testid="showing-now">
        <FairIcon mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="black100">
            {t("artworkPage.sidebar.details.showingNow")} • {startAt}-{endAt}
          </Text>
          <RouterLink to={artwork.collectorSignals?.runningShow?.href}>
            <Text variant="sm">
              {artwork.collectorSignals?.runningShow?.name}
            </Text>
          </RouterLink>
        </Stack>
      </Flex>
      <Spacer y={4} />
    </>
  )
}

export const ArtworkSidebarShowingNowFragmentContainer = createFragmentContainer(
  ArtworkSidebarShowingNow,
  {
    artwork: graphql`
      fragment ArtworkSidebarShowingNow_artwork on Artwork {
        collectorSignals {
          runningShow {
            name
            href
            startAt
            endAt
          }
        }
      }
    `,
  }
)
