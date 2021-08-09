import React from "react"
import {
  Box,
  BoxProps,
  GridColumns,
  Column,
  HTML,
  Text,
  Spacer,
  Join,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import {
  FairEditorialFragmentContainer,
  FAIR_EDITORIAL_AMOUNT,
} from "../FairEditorial"
import { FairCollectionsFragmentContainer } from "../FairCollections"
import { FairFollowedArtistsFragmentContainer } from "../FairFollowedArtists"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FairOverview_fair } from "v2/__generated__/FairOverview_fair.graphql"
import { Timer } from "v2/Components/Timer"
import { DateTime, Duration } from "luxon"
import { useCurrentTime } from "v2/Utils/Hooks/useCurrentTime"
import { Media } from "v2/Utils/Responsive"

const TextWithNewlines = styled(Text)`
  white-space: pre-wrap;
`

interface FairInfoSectionProps {
  label?: string
  info: string
  isHTML?: boolean
}

const FairInfoSection: React.FC<FairInfoSectionProps> = ({
  label,
  info,
  isHTML = false,
}) => (
  <>
    {label && <Text variant="md">{label}</Text>}
    {isHTML ? (
      <HTML variant="md" html={info} />
    ) : (
      <TextWithNewlines variant="md">{info}</TextWithNewlines>
    )}
  </>
)

const hasEventEnded = (endDate: string, currentTime: string) => {
  const duration = Duration.fromISO(
    DateTime.fromISO(endDate).diff(DateTime.fromISO(currentTime)).toString()
  )

  return Math.floor(duration.seconds) <= 0
}

interface FairOverviewProps extends BoxProps {
  fair: FairOverview_fair
}

const FairOverview: React.FC<FairOverviewProps> = ({ fair }) => {
  const {
    about,
    tagline,
    location,
    ticketsLink,
    hours,
    links,
    contact,
    summary,
    tickets,
    endAt,
  } = fair

  const { user } = useSystemContext()
  const hasArticles = (fair.articlesConnection?.edges?.length ?? 0) > 0
  const hasCollections = (fair.marketingCollections?.length ?? 0) > 0
  const currentTime = useCurrentTime({ syncWithServer: true })
  const hasEnded = endAt && hasEventEnded(endAt, currentTime)

  return (
    <Box>
      <GridColumns mt={[2, 4]}>
        {endAt && !hasEnded && (
          <Column span={6}>
            {/* Desktop Fair Timer */}
            <Media greaterThan="xs">
              <Text variant="xl">Closes in:</Text>
              <Timer
                endDate={endAt}
                labelWithoutTimeRemaining="Closed"
                size="xl"
                alignItems="start"
              />
            </Media>

            {/* Mobile Fair Timer */}
            <Media at="xs">
              <Box my={2}>
                <Text variant="md">Closes in:</Text>
                <Timer
                  endDate={endAt}
                  labelWithoutTimeRemaining="Closed"
                  size="lg"
                  alignItems="start"
                />
              </Box>
            </Media>
          </Column>
        )}

        <Column span={hasEnded ? 12 : 6}>
          <Join separator={<Spacer mt={2} />}>
            <Text variant="md" textTransform="uppercase">
              About
            </Text>

            {summary && <FairInfoSection isHTML info={summary} />}
            {about && <FairInfoSection isHTML info={about} />}
            {tagline && <FairInfoSection info={tagline} />}
            {location?.summary && (
              <FairInfoSection label="Location" info={location.summary} />
            )}
            {hours && <FairInfoSection label="Hours" isHTML info={hours} />}
            {tickets && (
              <FairInfoSection label="Tickets" isHTML info={tickets} />
            )}
            {ticketsLink && (
              <a href={ticketsLink}>
                <Text variant="md">Buy Tickets</Text>
              </a>
            )}
            {links && <FairInfoSection label="Links" isHTML info={links} />}
            {contact && (
              <FairInfoSection label="Contact" isHTML info={contact} />
            )}
          </Join>
        </Column>
      </GridColumns>

      {hasArticles && (
        <Box my={4} pt={4} borderTop="1px solid" borderColor="black10">
          <Box display="flex" justifyContent="space-between">
            {(fair.articlesConnection?.totalCount ?? 0) >
              FAIR_EDITORIAL_AMOUNT && (
              <RouterLink to={`${fair.href}/articles`} noUnderline>
                <Text variant="sm">View all</Text>
              </RouterLink>
            )}
          </Box>

          <FairEditorialFragmentContainer fair={fair} />
        </Box>
      )}

      {hasCollections && (
        <Box my={4} pt={4} borderTop="1px solid" borderColor="black10">
          <Text variant="lg" as="h3" mb={2}>
            Curated Highlights
          </Text>

          <FairCollectionsFragmentContainer fair={fair} />
        </Box>
      )}

      {!!user && (
        <FairFollowedArtistsFragmentContainer
          fair={fair}
          my={2}
          pt={2}
          borderTop="1px solid"
          borderColor="black10"
        />
      )}

      <Spacer my={[4, 80]} />
    </Box>
  )
}

export const FairOverviewFragmentContainer = createFragmentContainer(
  FairOverview,
  {
    fair: graphql`
      fragment FairOverview_fair on Fair {
        ...FairEditorial_fair
        ...FairCollections_fair
        ...FairFollowedArtists_fair
        endAt
        href
        about(format: HTML)
        slug
        tagline
        location {
          summary
        }
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          totalCount
          edges {
            __typename
          }
        }
        marketingCollections(size: 5) {
          id
        }
        ticketsLink
        hours(format: HTML)
        links(format: HTML)
        tickets(format: HTML)
        summary(format: HTML)
        contact(format: HTML)
      }
    `,
  }
)
