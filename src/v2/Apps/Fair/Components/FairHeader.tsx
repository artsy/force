import React from "react"
import {
  Col,
  Flex,
  Grid,
  ResponsiveBox,
  ResponsiveBoxProps,
  Row,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import styled from "styled-components"
import { ForwardLink } from "v2/Components/Links/ForwardLink"

interface FairHeaderProps {
  fair: FairHeader_fair
}

const ResponsiveImage = styled(ResponsiveBox)<ResponsiveBoxProps>`
  img {
    width: 100%;
    height: 100%;
  }
`

const FairHeader: React.FC<FairHeaderProps> = ({ fair }) => {
  const img = fair?.image?.cropped
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
    <>
      <Spacer mb="2" />
      {img && (
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{ position: "relative" }}
        >
          <ResponsiveImage
            aspectWidth={img.width}
            aspectHeight={img.height}
            maxWidth={375}
            bg="black10"
          >
            <img src={img.src} alt={fair.name} />
          </ResponsiveImage>
        </Flex>
      )}

      <Spacer mb="2" />

      <Grid>
        <Row>
          <Col sm="6">
            <Text as="h1" variant="largeTitle">
              {fair.name}
            </Text>
            <Text variant="text" color="black60">
              {fair.formattedOpeningHours}
            </Text>
          </Col>

          <Col sm="6" mt={[3, 0]}>
            <Text variant="subtitle" lineHeight="body">
              {previewText}
            </Text>

            {canShowMoreInfoLink && (
              <ForwardLink
                linkText="More info"
                path={`/fair2/${fair.slug}/info`}
              />
            )}
          </Col>
        </Row>
      </Grid>
    </>
  )
}

export const FairHeaderFragmentContainer = createFragmentContainer(FairHeader, {
  fair: graphql`
    fragment FairHeader_fair on Fair {
      about
      summary
      formattedOpeningHours
      name
      slug
      image {
        # 3:4 - 375×500 native max dimensions * 2 for retina
        cropped(width: 750, height: 1000, version: "wide") {
          src: url
          width
          height
        }
      }
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
