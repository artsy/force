import { Flex, Text, Stack } from "@artsy/palette"
import { useFragment, graphql } from "react-relay"
import { ArtworkSidebarSignal_artwork$key } from "__generated__/ArtworkSidebarSignal_artwork.graphql"
import FairIcon from "@artsy/icons/FairIcon"
import { RouterLink } from "System/Components/RouterLink"
import TrendingIcon from "@artsy/icons/TrendingIcon"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

interface ArtworkSidebarSignalProps {
  artwork: ArtworkSidebarSignal_artwork$key
}

export const ArtworkSidebarSignal: React.FC<ArtworkSidebarSignalProps> = ({
  artwork,
}) => {
  const data = useFragment(artworkSidebarSignalFragment, artwork)

  const isShowingNow = data.collectorSignals?.runningShow ?? false
  const primaryLabel = data.collectorSignals?.primaryLabel

  const increasedInterestCuratorsPickEnabled = useFeatureFlag(
    "emerald_signals-increased-interest-curators-pick"
  )

  if (!data.collectorSignals) {
    return null
  }

  if (
    primaryLabel === "CURATORS_PICK" &&
    increasedInterestCuratorsPickEnabled
  ) {
    return (
      <Flex alignItems="top" my={4} data-testid="curators_pick">
        <VerifiedIcon color="black100" width={18} mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="black100">
            Curators' Pick
          </Text>
          <Text variant="sm" color="black60">
            Hand selected by Artsy curators this week
          </Text>
        </Stack>
      </Flex>
    )
  }

  if (
    primaryLabel === "INCREASED_INTEREST" &&
    increasedInterestCuratorsPickEnabled
  ) {
    return (
      <Flex alignItems="top" my={4} data-testid="increased_interest">
        <TrendingIcon color="black100" width={18} mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="black100">
            Increased Interest
          </Text>
          <Text variant="sm" color="black60">
            Based on collector activity in the past 14 days
          </Text>
        </Stack>
      </Flex>
    )
  }

  if (isShowingNow) {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }

    const startAt = formatDate(
      data.collectorSignals?.runningShow?.startAt ?? ""
    )
    const endAt = formatDate(data.collectorSignals?.runningShow?.endAt ?? "")

    return (
      <Flex alignItems="top" my={4} data-testid="showing-now">
        <FairIcon mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="black100">
            Showing now • {startAt}-{endAt}
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

const artworkSidebarSignalFragment = graphql`
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
