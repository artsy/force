import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowContextCard_show } from "v2/__generated__/ShowContextCard_show.graphql"
import { FairTimingFragmentContainer as FairTiming } from "v2/Apps/Fair/Components/FairHeader/FairTiming"
import { FairCardFragmentContainer as FairCard } from "v2/Components/FairCard"
import { StyledLink } from "v2/Components/Links/StyledLink"

interface Props {
  show: ShowContextCard_show
}

export const ShowContextCard: React.FC<Props> = ({ show }) => {
  const { isFairBooth, fair } = show

  if (!isFairBooth) return null

  return (
    <GridColumns>
      <Column span={6}>
        <Text variant="subtitle">Part of {fair.name}</Text>
      </Column>
      <Column span={6}>
        <StyledLink noUnderline to={fair.href}>
          <FairCard fair={fair} />

          <Spacer mb={2} />
          <Box>
            <Text variant="largeTitle">{fair.name}</Text>

            <FairTiming fair={fair} />
          </Box>
        </StyledLink>
      </Column>
    </GridColumns>
  )
}

export const ShowContextCardFragmentContainer = createFragmentContainer(
  ShowContextCard,
  {
    show: graphql`
      fragment ShowContextCard_show on Show {
        isFairBooth
        fair {
          href
          name
          ...FairTiming_fair
          ...FairCard_fair
        }
      }
    `,
  }
)
