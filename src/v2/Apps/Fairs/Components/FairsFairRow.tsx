import {
  Box,
  BoxProps,
  ChevronIcon,
  color,
  Flex,
  Image,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { DateTime } from "luxon"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FairsFairRow_fair } from "v2/__generated__/FairsFairRow_fair.graphql"

const Container = styled(Flex)<{ href?: string }>`
  ${({ href }) =>
    href &&
    css`
      transition: background-color 250ms;

      &:hover {
        background-color: ${color("black5")};
      }
    `}
`

interface FairsFairRowProps extends BoxProps {
  fair: FairsFairRow_fair
}

const FairsFairRow: React.FC<FairsFairRowProps> = ({ fair, ...rest }) => {
  const icon = fair.profile?.icon?.resized
  const href =
    // If fair status is upcoming — link to the organizer profile
    // TODO: Extract this logic to Metaphysics `href`
    // @ts-expect-error STRICT_NULL_CHECK
    DateTime.local() < DateTime.fromISO(fair.isoStartAt)
      ? fair?.organizer?.profile?.href // possibly null
      : fair.href

  const LinkOrBox = href ? RouterLink : Box

  return (
    // @ts-expect-error STRICT_NULL_CHECK
    <LinkOrBox to={href} style={{ display: "block", textDecoration: "none" }}>
      <Container
        // @ts-expect-error STRICT_NULL_CHECK
        href={href}
        alignItems="center"
        borderBottom="1px solid"
        borderColor="black10"
        py={2}
        px={[0, 2]}
        {...rest}
      >
        <Flex
          flex="1"
          alignItems={["flex-start", "center"]}
          flexDirection={["column", "row"]}
        >
          <Flex
            display={["none", "flex"]}
            alignItems="center"
            justifyContent="center"
            width={80}
            height={80}
            mr={3}
          >
            {icon ? (
              <Image
                width={icon.width}
                height={icon.height}
                src={icon.src}
                srcSet={icon.srcSet}
                // @ts-expect-error STRICT_NULL_CHECK
                alt={fair.name}
              />
            ) : (
              <Box width={60} height={60} bg="black10" borderRadius="50%" />
            )}
          </Flex>

          <Text
            as="h4"
            variant={["mediumText", "text"]}
            mr={3}
            display="flex"
            flex={1}
          >
            {fair.name}
          </Text>

          <Text as="h4" display="flex" flex={1}>
            {fair.startAt} – {fair.endAt}
          </Text>
        </Flex>

        {href && <ChevronIcon direction="right" fill="black60" />}
      </Container>
    </LinkOrBox>
  )
}

export const FairsFairRowFragmentContainer = createFragmentContainer(
  FairsFairRow,
  {
    fair: graphql`
      fragment FairsFairRow_fair on Fair {
        href
        name
        isoStartAt: startAt
        startAt(format: "MMM Do")
        endAt(format: "MMM Do YYYY")
        profile {
          icon {
            resized(width: 80, height: 80, version: "square140") {
              width
              height
              src
              srcSet
            }
          }
        }
        organizer {
          profile {
            href
          }
        }
      }
    `,
  }
)
