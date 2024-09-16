import { Flex, Text, Stack } from "@artsy/palette"
import { useFragment, graphql } from "react-relay"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarSignal_artwork$key } from "__generated__/ArtworkSidebarSignal_artwork.graphql"
import FairIcon from "@artsy/icons/FairIcon"
import { RouterLink } from "System/Components/RouterLink"
import TrendingIcon from "@artsy/icons/TrendingIcon"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"

interface ArtworkSidebarSignalProps {
  artwork: ArtworkSidebarSignal_artwork$key
}

export const ArtworkSidebarSignal: React.FC<ArtworkSidebarSignalProps> = ({
  artwork,
}) => {
  const data = useFragment(ArtworkSidebarSignalFragmentContainer, artwork)
  const { t } = useTranslation()

  const isShowingNow = data.collectorSignals?.runningShow ?? false
  const shouldRenderCuratorsPick =
    data.collectorSignals?.primaryLabel === "CURATORS_PICK"
  const shouldRenderIncreasedInterest =
    data.collectorSignals?.primaryLabel === "INCREASED_INTEREST"

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const startAt = formatDate(data.collectorSignals?.runningShow?.startAt ?? "")
  const endAt = formatDate(data.collectorSignals?.runningShow?.endAt ?? "")

  if (shouldRenderCuratorsPick) {
    return (
      <Flex alignItems="top" my={4} data-testid="curators_pick">
        <VerifiedIcon color="black100" width={18} mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="black100">
            {t("artworkPage.sidebar.details.curatorsPick.label")}
          </Text>
          <Text variant="sm" color="black60">
            {t("artworkPage.sidebar.details.curatorsPick.description")}
          </Text>
        </Stack>
      </Flex>
    )
  }

  if (shouldRenderIncreasedInterest) {
    return (
      <Flex alignItems="top" my={4} data-testid="curators_pick">
        <TrendingIcon color="black100" width={18} mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="black100">
            {t("artworkPage.sidebar.details.increasedInterest.label")}
          </Text>
          <Text variant="sm" color="black60">
            {t("artworkPage.sidebar.details.increasedInterest.description")}
          </Text>
        </Stack>
      </Flex>
    )
  }

  if (isShowingNow) {
    return (
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
    )
  }

  return null
}

const ArtworkSidebarSignalFragmentContainer = graphql`
  fragment ArtworkSidebarSignal_artwork on Artwork {
    collectorSignals {
      primaryLabel
      runningShow {
        name
        href
        startAt
        endAt
      }
    }
  }
`
