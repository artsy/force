import React from "react"
import { Column, GridColumns, HTML, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairInfo_fair } from "v2/__generated__/FairInfo_fair.graphql"
import styled from "styled-components"

interface FairInfoProps {
  fair: FairInfo_fair
}

const TextWithNewlines = styled(Text)`
  white-space: pre-wrap;
`

const FairInfo: React.FC<FairInfoProps> = ({ fair }) => {
  return (
    <>
      <Text variant="md" my={2}>
        About
      </Text>

      <Spacer my={1} />

      <GridColumns>
        <Column span={8}>
          {fair.summary && (
            <>
              <HTML variant="md" html={fair.summary} />
              <Spacer my={2} />
            </>
          )}
          {fair.about && (
            <>
              <HTML variant="md" html={fair.about} />
              <Spacer my={2} />
            </>
          )}

          {fair.tagline && (
            <>
              <TextWithNewlines variant="md">{fair.tagline}</TextWithNewlines>
              <Spacer my={2} />
            </>
          )}

          {fair.location?.summary && (
            <>
              <Text variant="md">Location</Text>
              <TextWithNewlines>{fair.location?.summary}</TextWithNewlines>
              <Spacer my={2} />
            </>
          )}
        </Column>

        <Column span={4}>
          {fair.hours && (
            <>
              <Text variant="md">Hours</Text>
              <HTML html={fair.hours} />
              <Spacer my={2} />
            </>
          )}
          {fair.tickets && (
            <>
              <Text variant="md">Tickets</Text>
              <HTML html={fair.tickets} />
              <Spacer my={2} />
            </>
          )}
          {fair.ticketsLink && (
            <>
              <a href={fair.ticketsLink}>
                <Text>Buy Tickets</Text>
              </a>
              <Spacer my={2} />
            </>
          )}
          {fair.links && (
            <>
              <Text variant="md">Links</Text>
              <HTML html={fair.links} />
              <Spacer my={2} />
            </>
          )}
          {fair.contact && (
            <>
              <Text variant="md">Contact</Text>
              <HTML html={fair.contact} />
              <Spacer my={2} />
            </>
          )}
        </Column>
      </GridColumns>
    </>
  )
}

export const FairInfoFragmentContainer = createFragmentContainer(FairInfo, {
  fair: graphql`
    fragment FairInfo_fair on Fair {
      about(format: HTML)
      name
      slug
      tagline
      location {
        summary
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
