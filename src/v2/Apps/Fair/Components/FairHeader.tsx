import React from "react"
import { Placeholder } from "v2/Utils"
import { Col, Flex, Row, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"

interface FairHeaderProps {
  fair: FairHeader_fair
}

const FairHeader: React.FC<FairHeaderProps> = ({ fair }) => {
  return (
    <>
      <Spacer mb="2" />
      <Flex
        alignItems="center"
        justifyContent="center"
        style={{ position: "relative" }}
      >
        <Placeholder height="500px" width="375px" name="header image" />
      </Flex>
      <Spacer mb="2" />
      <Row>
        <Col sm="6">
          <Text variant="largeTitle">{fair.name}</Text>
          <Text variant="caption">{fair.formattedOpeningHours}</Text>
        </Col>
        <Col sm="6" mt={[3, 0]}>
          <Text variant="text">{fair.about}</Text>
        </Col>
      </Row>
    </>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      about
      formattedOpeningHours
      name
    }
  `,
})
