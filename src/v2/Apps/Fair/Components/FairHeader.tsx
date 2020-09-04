import React from "react"
import {
  Box,
  BoxProps,
  Col,
  Flex,
  Grid,
  Image,
  Row,
  Spacer,
  Text,
  space,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeader_fair } from "v2/__generated__/FairHeader_fair.graphql"
import { ForwardLink } from "v2/Components/Links/ForwardLink"
import styled from "styled-components"

interface FairHeaderProps extends BoxProps {
  fair: FairHeader_fair
}

const MediumHero = styled(Image).attrs({ lazyLoad: true })`
  display: none;
  @media (min-height: 1000px) {
    display: block;
  }
`

const SmallHero = styled(Image).attrs({ lazyLoad: true })`
  display: none;
  @media (max-height: 1000px) {
    display: block;
  }
`

const FairHeader: React.FC<FairHeaderProps> = ({ fair, ...rest }) => {
  const image = {
    small: fair?.smallHero,
    medium: fair?.mediumHero,
  }

  const icon = fair.profile?.icon

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
      {image && (
        <Flex position="relative" alignItems="center" justifyContent="center">
          <Box
            display="inline-block"
            position="relative"
            mx="auto"
            height="100%"
          >
            <MediumHero
              alt={fair.name}
              src={image.medium._1x.src}
              srcSet={`${image.medium._1x.src} 1x, ${image.medium._2x.src} 2x`}
              width={image.medium._1x.width}
              height={image.medium._1x.height}
            />

            <SmallHero
              alt={fair.name}
              src={image.small._1x.src}
              srcSet={`${image.small._1x.src} 1x, ${image.small._2x.src} 2x`}
              width={image.small._1x.width}
              height={image.small._1x.height}
            />

            {icon && (
              <Box
                bg="white100"
                width={80}
                height={60}
                position="absolute"
                bottom={0}
                left={space(2)}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <img
                  src={icon._1x.src}
                  srcSet={`${icon._1x.src} 1x, ${icon._2x.src} 2x`}
                  alt={`Logo of ${fair.name}`}
                  width={40}
                  height={40}
                />
              </Box>
            )}
          </Box>
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
    </Box>
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
      profile {
        icon {
          _1x: cropped(width: 40, height: 40, version: "square140") {
            src: url
          }
          _2x: cropped(width: 80, height: 80, version: "square140") {
            src: url
          }
        }
      }
      smallHero: image {
        _1x: cropped(width: 375, height: 500, version: "wide") {
          src: url
          width
          height
        }
        _2x: cropped(width: 750, height: 1000, version: "wide") {
          src: url
        }
      }
      mediumHero: image {
        _1x: cropped(width: 600, height: 800, version: "wide") {
          src: url
          width
          height
        }
        _2x: cropped(width: 1200, height: 1600, version: "wide") {
          src: url
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
