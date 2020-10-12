import React from "react"
import { Box, BoxProps, CSSGrid, HTML, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { ForwardLink } from "v2/Components/Links/ForwardLink"
import { FairTimingFragmentContainer as FairTiming } from "./FairTiming"
import { FairHeaderImageFragmentContainer as FairHeaderImage } from "./FairHeaderImage"

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

  const columnCount = previewText ? 2 : 1

  return (
    <Box {...rest}>
      <FairHeaderImage fair={fair} />

      <CSSGrid
        mt={[2, 4]}
        gridAutoFlow="row"
        gridColumnGap={3}
        gridRowGap={2}
        gridTemplateColumns={["repeat(1, 1fr)", `repeat(${columnCount}, 1fr)`]}
        textAlign={columnCount === 1 ? "center" : undefined}
      >
        <Box>
          <Text as="h1" variant="largeTitle">
            {fair.name}
          </Text>

          <FairTiming fair={fair} />
        </Box>

        <Box>
          <HTML variant="subtitle" lineHeight="body" html={previewText} />

          {canShowMoreInfoLink && (
            <ForwardLink
              to={`/fair/${fair.slug}/info`}
              mt={previewText ? 1 : undefined}
              justifyContent={columnCount === 1 ? "center" : undefined}
            >
              More info
            </ForwardLink>
          )}
        </Box>
      </CSSGrid>
    </Box>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      ...FairTiming_fair
      ...FairHeaderImage_fair
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
