import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { formatCentsToDollars } from "v2/Apps/Consign/Routes/MarketingLanding/Utils/formatCentsToDollars"
import {
  Box,
  Button,
  Image,
  Spacer,
  Text,
  Select,
  DROP_SHADOW,
  Skeleton,
  SkeletonText,
  SkeletonBox,
} from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { cropped } from "v2/Utils/resized"

export const ArtistInsightResult: React.FC = () => {
  const {
    artistInsights,
    isFetching,
    mediums,
    medium,
    selectedSuggestion,
    setMedium,
  } = usePriceEstimateContext()

  if (isFetching) {
    return <Placeholder />
  }

  if (!artistInsights.length) {
    return <ZeroState />
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const mediumSelectOptions = mediums.map(medium => ({
    text: medium,
    value: medium,
  }))

  const { node: artistInsight } = artistInsights.find(
    ({ node }) => node.medium === medium
  )

  // TODO: Look into why we need to coerce these types from mp
  const lowRangeCents: number = Number(artistInsight.lowRangeCents)
  const midRangeCents: number = Number(artistInsight.midRangeCents)
  const highRangeCents: number = Number(artistInsight.highRangeCents)

  const lowEstimateDollars = formatCentsToDollars(lowRangeCents)
  const highEstimateDollars = formatCentsToDollars(highRangeCents)
  const medianEstimateDollars = formatCentsToDollars(midRangeCents)

  const imageUrl = selectedSuggestion?.node?.imageUrl
  const artistSlug = selectedSuggestion?.node?.slug
  const { artistName } = artistInsight

  const img = !!imageUrl ? cropped(imageUrl, { width: 125, height: 125 }) : null

  const handleMediumChange = (medium: string) => {
    setMedium?.(medium)
  }

  return (
    <>
      <Container>
        {img && (
          <Image
            src={img.src}
            srcSet={img.srcSet}
            width={125}
            height={125}
            alt=""
            lazyLoad
            style={{ display: "block" }}
            mb={2}
            mx="auto"
          />
        )}

        <Text variant="xl">{artistName}</Text>

        <Select
          my={1}
          selected={artistInsight.medium}
          options={mediumSelectOptions}
          onSelect={handleMediumChange}
        />

        <Text variant="xl">
          {lowEstimateDollars}–{highEstimateDollars}
        </Text>

        <Text variant="xs">Median: {medianEstimateDollars}</Text>

        <Spacer mt={2} />

        <Text variant="sm">
          An Artsy specialist can provide a custom valuation for your work.
        </Text>

        <Spacer mb={2} />

        <Media greaterThanOrEqual="md">
          <Button
            variant="secondaryOutline"
            mr={2}
            // @ts-ignore
            as={RouterLink}
            to={`/artist/${artistSlug}/auction-results`}
          >
            Explore auction data
          </Button>

          <Button
            // @ts-ignore
            as={RouterLink}
            to="/consign/submission/artwork-details"
          >
            Get a valuation
          </Button>
        </Media>

        <Media lessThan="md">
          <Button
            width="100%"
            mb={2}
            // @ts-ignore
            as={RouterLink}
            to="/consign/submission/artwork-details"
          >
            Get a valuation
          </Button>

          <RouterLink
            textDecoration="none"
            to={`/artist/${artistSlug}/auction-results`}
          >
            <Text variant="sm">Explore auction data</Text>
          </RouterLink>
        </Media>
      </Container>

      <Spacer mt={2} />

      <Text variant="xs" color="black60">
        Price estimate is based on 36 months of secondary market data for this
        artist.
      </Text>
    </>
  )
}

const ZeroState: React.FC = () => {
  const { selectedSuggestion } = usePriceEstimateContext()

  return (
    <Container>
      <Text variant="xs" mb={0.5}>
        Price estimate for works by
      </Text>

      <Text
        variant="xl"
        borderBottom="1px solid"
        borderBottomColor="black60"
        pb={1}
        mb={2}
      >
        {selectedSuggestion.node.displayLabel}
      </Text>

      <Text variant="sm" mb={1}>
        Sorry, there isn’t enough secondary market data to provide a price
        estimate for this artist.
        <br />
        Try searching for another artist.
      </Text>
    </Container>
  )
}

const Container = styled(Box).attrs({
  p: 2,
  bg: "white100",
})`
  text-align: center;
  box-shadow: ${DROP_SHADOW};
`

const Placeholder: React.FC = () => {
  return (
    <Container>
      <Skeleton>
        <SkeletonBox mb={2} height={125} width={125} mx="auto" />

        <SkeletonText variant="xl" mb={1}>
          Artist name
        </SkeletonText>

        <SkeletonText variant="xl" mb={1}>
          Example text
        </SkeletonText>

        <SkeletonText variant="sm">Etcetera</SkeletonText>
      </Skeleton>
    </Container>
  )
}
