import React from "react"
import {
  Box,
  BoxProps,
  GridColumns,
  Column,
  Flex,
  Text,
  Spacer,
  Join,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { FairTimingFragmentContainer as FairTiming } from "./FairTiming"
import { FairHeaderIconFragmentContainer } from "./FairHeaderIcon"
import {
  FairEditorialFragmentContainer,
  FAIR_EDITORIAL_AMOUNT,
} from "../FairEditorial"
import { FairCollectionsFragmentContainer } from "../FairCollections"
import { FairFollowedArtistsFragmentContainer } from "../FairFollowedArtists"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { InfoSection } from "v2/Components/InfoSection"

interface FairHeaderProps extends BoxProps {
  fair: FairHeader_fair
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair }) => {
  const {
    name,
    about,
    tagline,
    location,
    ticketsLink,
    hours,
    links,
    contact,
    summary,
    tickets,
  } = fair

  const { user } = useSystemContext()
  const hasArticles = (fair.articlesConnection?.edges?.length ?? 0) > 0
  const hasCollections = (fair.marketingCollections?.length ?? 0) > 0

  return (
    <Box>
      <GridColumns mt={[2, 6]}>
        <Column span={6}>
          <Flex mb={2}>
            <FairHeaderIconFragmentContainer fair={fair} mr={2} />
            <Box>
              <Text as="h1" variant="xl">
                {name}
              </Text>

              <FairTiming fair={fair} />
            </Box>
          </Flex>
        </Column>

        <Column span={6}>
          <Join separator={<Spacer mt={2} />}>
            <Text variant="md" textTransform="uppercase">
              About
            </Text>

            {summary && <InfoSection type="html" info={summary} />}
            {about && <InfoSection type="html" info={about} />}
            {tagline && <InfoSection type="text" info={tagline} />}
            {location?.summary && (
              <InfoSection
                type="text"
                label="Location"
                info={location.summary}
              />
            )}
            {hours && <InfoSection type="html" label="Hours" info={hours} />}
            {tickets && (
              <InfoSection type="html" label="Tickets" info={tickets} />
            )}
            {ticketsLink && (
              <a href={ticketsLink}>
                <Text variant="md">Buy Tickets</Text>
              </a>
            )}
            {links && <InfoSection type="html" label="Links" info={links} />}
            {contact && (
              <InfoSection type="html" label="Contact" info={contact} />
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

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      ...FairTiming_fair
      ...FairHeaderIcon_fair
      ...FairEditorial_fair
      ...FairCollections_fair
      ...FairFollowedArtists_fair
      href
      about(format: HTML)
      name
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
})
