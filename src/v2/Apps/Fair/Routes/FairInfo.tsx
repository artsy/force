import React from "react"
import { Col, HTML, Row, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairInfo_fair } from "v2/__generated__/FairInfo_fair.graphql"
import { BackLink } from "v2/Components/Links/BackLink"
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
      <BackLink
        linkText={`Back to ${fair.name}`}
        path={`/fair2/${fair.slug}`}
      />

      <Spacer my={3} />

      <Text variant="largeTitle">About</Text>

      <Spacer my={1} />

      <Row>
        <Col sm="9" pr={2}>
          {/** TODO: Add summary here when it exists **/}
          {fair.about && (
            <>
              <TextWithNewlines variant="text">{fair.about}</TextWithNewlines>
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
            </>
          )}
        </Col>
        <Col sm="3">
          {/** TODO: Hours should be able to be formatted into HTML **/}
          {fair.hours && (
            <>
              <Text variant="mediumText">Hours</Text>
              <HTML variant="text" html={fair.hours} />
              <Spacer my={3} />
            </>
          )}
          {/** TODO: Add tickets here when it exists **/}
          {fair.ticketsLink && (
            <>
              <a href={fair.ticketsLink}>
                <Text variant="text">Buy Tickets</Text>
              </a>
              <Spacer my={3} />
            </>
          )}
          {/** TODO: Links should be able to be formatted into HTML **/}
          {fair.links && (
            <>
              <Text variant="mediumText">Links</Text>
              <HTML variant="text" html={fair.links} />
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
      about
      name
      slug
      tagline
      location {
        summary
      }
      ticketsLink
      hours
      links
    }
  `,
})

// Top-level route needs to be exported for bundle splitting in the router
export default FairInfoFragmentContainer
