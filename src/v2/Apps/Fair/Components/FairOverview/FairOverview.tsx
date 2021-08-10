import React from "react"
import {
  Box,
  BoxProps,
  GridColumns,
  Column,
  Text,
  Spacer,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import {
  FairEditorialFragmentContainer,
  FAIR_EDITORIAL_AMOUNT,
} from "../FairEditorial"
import { FairCollectionsFragmentContainer } from "../FairCollections"
import { FairFollowedArtistsFragmentContainer } from "../FairFollowedArtists"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FairOverview_fair } from "v2/__generated__/FairOverview_fair.graphql"
import { InfoSection } from "v2/Components/InfoSection"
import { moment } from "desktop/lib/template_modules"
import { FairTimerFragmentContainer as FairTimer } from "./FairTimer"

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
  const hasEnded = endAt && moment().isAfter(new Date(endAt))

  return (
    <Box>
      <GridColumns mt={[2, 4]}>
        {!hasEnded && (
          <Column span={6}>
            <FairTimer fair={fair} />
          </Column>
        )}

        <Column span={hasEnded ? 12 : 6}>
          <Text variant="md" textTransform="uppercase">
            About
          </Text>
          <Spacer mt={2} />

          {summary && <InfoSection type="html" info={summary} />}
          {about && <InfoSection type="html" info={about} />}
          {tagline && <InfoSection type="text" info={tagline} />}
          {location?.summary && (
            <InfoSection label="Location" type="text" info={location.summary} />
          )}
          {hours && <InfoSection label="Hours" type="html" info={hours} />}
          {tickets && (
            <InfoSection label="Tickets" type="html" info={tickets} />
          )}
          {ticketsLink && (
            <a href={ticketsLink}>
              <Text variant="md">Buy Tickets</Text>
            </a>
          )}
          {links && <InfoSection label="Links" type="html" info={links} />}
          {contact && (
            <InfoSection label="Contact" type="html" info={contact} />
          )}
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
        ...FairTimer_fair
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
