import React from "react"
import { Col, HTML, Row, Spacer, Text } from "@artsy/palette"
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
      <Text variant="largeTitle">About</Text>

      <Spacer my={1} />

      <Row>
        <Col sm="9" pr={2}>
          {fair.summary && (
            <>
              <HTML variant="text" html={fair.summary} />
              <Spacer my={3} />
            </>
          )}
          {fair.about && (
            <>
              <HTML variant="text" html={fair.about} />
              <Spacer my={3} />
            </>
          )}

          {fair.tagline && (
            <>
              <TextWithNewlines variant="text">{fair.tagline}</TextWithNewlines>
              <Spacer my={3} />
            </>
          )}

          {fair.location?.summary && (
            <>
              <Text variant="mediumText">Location</Text>
              <TextWithNewlines variant="text">
                {fair.location?.summary}
              </TextWithNewlines>
              <Spacer my={3} />
            </>
          )}
        </Col>

        <Col sm="3">
          {fair.hours && (
            <>
              <Text variant="mediumText">Hours</Text>
              <HTML variant="text" html={fair.hours} />
              <Spacer my={3} />
            </>
          )}
          {fair.tickets && (
            <>
              <Text variant="mediumText">Tickets</Text>
              <HTML variant="text" html={fair.tickets} />
              <Spacer my={3} />
            </>
          )}
          {fair.ticketsLink && (
            <>
              <a href={fair.ticketsLink}>
                <Text variant="text">Buy Tickets</Text>
              </a>
              <Spacer my={3} />
            </>
          )}
          {fair.links && (
            <>
              <Text variant="mediumText">Links</Text>
              <HTML variant="text" html={fair.links} />
              <Spacer my={3} />
            </>
          )}
          {fair.contact && (
            <>
              <Text variant="mediumText">Contact</Text>
              <HTML variant="text" html={fair.contact} />
              <Spacer my={3} />
            </>
          )}
        </Col>
      </Row>
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

// Top-level route needs to be exported for bundle splitting in the router
export default FairInfoFragmentContainer
