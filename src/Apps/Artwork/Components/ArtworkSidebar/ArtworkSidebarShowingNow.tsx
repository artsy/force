import { Flex, Text, Stack } from "@artsy/palette"
import { useFragment, graphql } from "react-relay"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarShowingNow_artwork$key } from "__generated__/ArtworkSidebarShowingNow_artwork.graphql"
import FairIcon from "@artsy/icons/FairIcon"
import { RouterLink } from "System/Components/RouterLink"

interface ArtworkSidebarShowingNowProps {
  artwork: ArtworkSidebarShowingNow_artwork$key
}

export const ArtworkSidebarShowingNow: React.FC<ArtworkSidebarShowingNowProps> = ({
  artwork,
}) => {
  const data = useFragment(ArtworkSidebarShowingNowFragmentContainer, artwork)
  const { t } = useTranslation()

  const shouldRenderShowingNow = data.collectorSignals?.runningShow ?? false

  if (!shouldRenderShowingNow) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const startAt = formatDate(data.collectorSignals?.runningShow?.startAt ?? "")
  const endAt = formatDate(data.collectorSignals?.runningShow?.endAt ?? "")

  return (
    <>
      <Flex alignItems="top" my={4} data-testid="showing-now">
        <FairIcon mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="black100">
            {t("artworkPage.sidebar.details.showingNow")} • {startAt}-{endAt}
          </Text>
          <RouterLink to={data.collectorSignals?.runningShow?.href}>
            <Text variant="sm">{data.collectorSignals?.runningShow?.name}</Text>
          </RouterLink>
        </Stack>
      </Flex>
    </>
  )
}

const ArtworkSidebarShowingNowFragmentContainer = graphql`
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
`
