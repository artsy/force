import React from "react"
import {
  Box,
  BoxProps,
  GridColumns,
  Column,
  Flex,
  HTML,
  Text,
  Spacer,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { FairTimingFragmentContainer as FairTiming } from "./FairTiming"
import { FairHeaderImageFragmentContainer as FairHeaderImage } from "./FairHeaderImage"
import { FairHeaderIconFragmentContainer } from "./FairHeaderIcon"
import { RouterLink } from "v2/System/Router/RouterLink"

interface FairHeaderProps extends BoxProps {
  fair: FairHeader_fair
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair, ...rest }) => {
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
  } = fair

  const canShowMoreInfoLink =
    !!about ||
    !!tagline ||
    !!location?.summary ||
    !!ticketsLink ||
    !!hours ||
    !!links ||
    !!contact ||
    !!summary ||
    !!tickets

  const previewText = summary || about

  return (
    <Box {...rest}>
      <FairHeaderImage fair={fair} />

      <GridColumns mt={[2, 6]}>
        <Column span={6}>
          <Flex mb={2}>
            <FairHeaderIconFragmentContainer fair={fair} mr={2} />
            <Box>
              <Text as="h1" variant="xl">
                {fair.name}
              </Text>

              <FairTiming fair={fair} />
            </Box>
          </Flex>
        </Column>

        <Column span={6}>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          <HTML variant="sm" html={previewText} />

          {canShowMoreInfoLink && (
            <>
              <Spacer mt={2} />

              <RouterLink to={`/fair/${fair.slug}/info`}>
                <Text variant="sm">More info</Text>
              </RouterLink>
            </>
          )}
        </Column>
      </GridColumns>
    </Box>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      ...FairTiming_fair
      ...FairHeaderImage_fair
      ...FairHeaderIcon_fair
      about(format: HTML)
      summary(format: HTML)
      name
      slug
      # Used to figure out if we should render the More info link
      tagline
      location {
        summary
      }
      ticketsLink
      hours(format: HTML)
      links(format: HTML)
      tickets(format: HTML)
      contact(format: HTML)
    }
  `,
})
