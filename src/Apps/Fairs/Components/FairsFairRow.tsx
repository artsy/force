import * as React from "react"
import { Box, BoxProps, Flex, Image, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { DateTime } from "luxon"
import { RouterLink } from "System/Components/RouterLink"
import { FairsFairRow_fair$data } from "__generated__/FairsFairRow_fair.graphql"
import { themeGet } from "@styled-system/theme-get"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"

const Container = styled(Flex)<{ href?: string }>`
  ${({ href }) =>
    href &&
    css`
      transition: background-color 250ms;

      &:hover {
        background-color: ${themeGet("colors.black5")};
      }
    `}
`

interface FairsFairRowProps extends BoxProps {
  fair: FairsFairRow_fair$data
}

const FairsFairRow: React.FC<FairsFairRowProps> = ({ fair, ...rest }) => {
  const icon = fair.profile?.icon?.resized
  const href =
    // If fair status is upcoming — link to the organizer profile
    // TODO: Extract this logic to Metaphysics `href`
    DateTime.local() < DateTime.fromISO(fair.isoStartAt!)
      ? fair?.organizer?.profile?.href // possibly null
      : fair.href

  const LinkOrBox = href ? RouterLink : Box

  return (
    <LinkOrBox to={href!} display="block" textDecoration="none">
      <Container
        href={href!}
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
            mr={2}
          >
            {icon ? (
              <Image
                width={icon.width}
                height={icon.height}
                src={icon.src}
                srcSet={icon.srcSet}
                alt=""
              />
            ) : (
              <Box width={60} height={60} bg="black10" borderRadius="50%" />
            )}
          </Flex>

          <Text as="h4" variant="sm-display" mr={2} display="flex" flex={1}>
            {fair.name}
          </Text>

          <Text as="h4" variant="sm-display" display="flex" flex={1}>
            {fair.exhibitionPeriod}
          </Text>
        </Flex>

        {href && <ChevronRightIcon fill="black60" />}
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
        exhibitionPeriod
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
