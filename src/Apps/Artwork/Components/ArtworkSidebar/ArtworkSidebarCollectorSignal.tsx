import { RouterLink } from "System/Components/RouterLink"
import FairIcon from "@artsy/icons/FairIcon"
import TrendingIcon from "@artsy/icons/TrendingIcon"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import { Flex, Stack, Text } from "@artsy/palette"
import type { ArtworkSidebarCollectorSignal_artwork$key } from "__generated__/ArtworkSidebarCollectorSignal_artwork.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtworkSidebarCollectorSignalProps {
  artwork: ArtworkSidebarCollectorSignal_artwork$key
}

export const ArtworkSidebarCollectorSignal: React.FC<
  React.PropsWithChildren<ArtworkSidebarCollectorSignalProps>
> = ({ artwork }) => {
  const data = useFragment(artworkSidebarCollectorSignalFragment, artwork)

  const isShowingNow = data.collectorSignals?.runningShow ?? false
  const primaryLabel = data.collectorSignals?.primaryLabel

  if (!data.collectorSignals) {
    return null
  }

  if (primaryLabel === "CURATORS_PICK") {
    return (
      <Flex alignItems="top" my={4} data-testid="curators_pick">
        <VerifiedIcon color="mono100" width={18} mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="mono100">
            Curators’ Pick
          </Text>
          <Text variant="sm" color="mono60">
            Hand selected by Artsy curators this week
          </Text>
        </Stack>
      </Flex>
    )
  }

  if (primaryLabel === "INCREASED_INTEREST") {
    return (
      <Flex alignItems="top" my={4} data-testid="increased_interest">
        <TrendingIcon color="mono100" width={18} mr={1} mt={0.5} />
        <Stack gap={0}>
          <Text variant="sm" color="mono100">
            Increased Interest
          </Text>
          <Text variant="sm" color="mono60">
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
          <Text variant="sm" color="mono100">
            Showing now • {startAt}–{endAt}
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

const artworkSidebarCollectorSignalFragment = graphql`
  fragment ArtworkSidebarCollectorSignal_artwork on Artwork {
    collectorSignals {
      primaryLabel(ignore: [PARTNER_OFFER])
      runningShow {
        name
        href
        startAt
        endAt
      }
    }
  }
`
