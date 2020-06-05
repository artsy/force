import {
  EntityHeader,
  Flex,
  FlexProps,
  Image,
  MessageIcon,
  QuestionCircleIcon,
  Sans,
  Separator,
  color,
} from "@artsy/palette"
import React, { FC } from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { Details_conversation } from "v2/__generated__/Details_conversation.graphql"
import { DetailsFragmentContainer as ArtworkDetails } from "v2/Components/Artwork/Details"

const BorderedFlex = styled(Flex)`
  border-left: 1px solid ${color("black10")};
  flex-shrink: 0;
  margin-left: -1px;
`

interface DetailsProps extends FlexProps {
  conversation: Details_conversation
}

export const Details: FC<DetailsProps> = ({ conversation, ...props }) => {
  const item =
    conversation.items?.[0]?.item?.__typename !== "%other" &&
    conversation.items?.[0]?.item
  return (
    <BorderedFlex
      flexDirection="column"
      justifyContent="flex-start"
      flexShrink={0}
      {...props}
    >
      <EntityHeader
        px={2}
        py={1}
        name={conversation.to.name}
        initials={conversation.to.initials}
      />
      {item && (
        <>
          <Separator />
          <Flex flexDirection="column" p={2}>
            <Sans mb={2} size="3" weight="medium">
              {item.__typename}
            </Sans>
            <Flex>
              <Image src={item.image.thumbnailUrl} />
              <Flex flexDirection="column" ml={1}>
                {item.__typename === "Artwork" && (
                  <ArtworkDetails artwork={item} showSaleLine={false} />
                )}
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
      <Separator my={2} />
      <Flex flexDirection="column" px={2}>
        <Sans size="3" weight="medium" mb={2}>
          Support
        </Sans>
        <Flex alignItems="center" mb={1}>
          <QuestionCircleIcon mr={1} />
          <Sans size="3">Inquiries FAQ</Sans>
        </Flex>
        <Flex alignItems="center" mb={1}>
          <MessageIcon mr={1} />
          <Sans size="3">Contact an Artsy Specialist</Sans>
        </Flex>
      </Flex>
    </BorderedFlex>
  )
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  conversation: graphql`
    fragment Details_conversation on Conversation
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 30 }
        after: { type: "String" }
      ) {
      to {
        name
        initials
      }
      items {
        title
        permalink
        item {
          __typename
          ... on Artwork {
            ...Details_artwork
            image {
              thumbnailUrl: url(version: "small")
            }
          }
          ... on Show {
            image: coverImage {
              thumbnailUrl: url(version: "small")
            }
          }
        }
      }
    }
  `,
})
