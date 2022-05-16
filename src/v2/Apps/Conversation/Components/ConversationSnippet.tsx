import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import styled from "styled-components"
import { Box, Flex, Link, Text, Separator } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import compact from "lodash/compact"

import {
  ImageWithFallback,
  renderFallbackImage,
} from "v2/Apps/Artist/Routes/AuctionResults/Components/ImageWithFallback"
import { TimeSince } from "./TimeSince"
import { Truncator } from "v2/Components/Truncator"

import { ConversationSnippet_conversation } from "v2/__generated__/ConversationSnippet_conversation.graphql"

const StyledImage = styled(ImageWithFallback)`
  object-fit: cover;
  height: 80px;
  width: 80px;
`
const StyledFlex = styled(Flex)`
  float: left;
`
const TimeSinceFlex = styled(Flex)`
  white-space: nowrap;
  padding-left: 10px;
`

const StyledText = styled(Text)`
  word-break: break-word;
`
const TextContainer = styled(Box)`
  overflow: hidden;
`

const TruncatedTitle = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 130px;

  @media (max-width: 570px) {
    max-width: 270px;
  }
`
const PurpleCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${themeGet("colors.red10")};
  border-radius: 50%;
  margin-left: 5px;
`

interface ConversationSnippetProps {
  conversation: ConversationSnippet_conversation
  hasDivider: boolean
  isSelected: boolean
}

const ConversationSnippet: React.FC<ConversationSnippetProps> = props => {
  const conversation = props.conversation
  const conversationItems = compact(props.conversation.items)
  // If we cannot resolve items in the conversation, such as deleted fair booths
  // prior to snapshotting them at time of inquiry (generally older conversations),
  // just skip over the entire conversation.
  if (conversation?.items?.length === 0) {
    console.warn(
      `Unable to load items for conversation with ID ${conversation.internalID}`
    )
    return null
  }

  const item = conversationItems[0].item

  let imageURL

  if (item?.__typename === "Artwork") {
    imageURL = item?.image && item.image.url
  } else if (item?.__typename === "Show") {
    imageURL = item?.coverImage && item.coverImage.url
  }

  const partnerName = conversation.to.name

  const conversationText =
    conversation.lastMessage && conversation.lastMessage.replace(/\n/g, " ")

  const backgroundColor = props.isSelected ? "black5" : "white"

  return (
    <Box bg={backgroundColor}>
      <Link
        href={`/user/conversations/${conversation.internalID}`}
        underlineBehavior="none"
      >
        <Flex alignItems="center" px={0.5} width="100%" height="120px">
          <Flex alignItems="center" width={20} flexShrink={0} height="100%">
            {conversation.unread && <PurpleCircle />}
          </Flex>
          <StyledFlex alignItems="center" height="80px" width="80px">
            {imageURL ? (
              <StyledImage
                src={imageURL}
                Fallback={() => (
                  <Flex width="80px" height="80px">
                    {renderFallbackImage()}
                  </Flex>
                )}
              />
            ) : (
              <Flex width="80px" height="80px">
                {renderFallbackImage()}
              </Flex>
            )}
          </StyledFlex>
          <Flex pt={2} pl={1} width="100%" height="100%">
            <TextContainer width="100%">
              <Box mb={0.5}>
                <Flex width="100%" justifyContent="space-between">
                  <Flex>
                    <TruncatedTitle
                      variant="sm-display"
                      mr={0.5}
                      color={conversation.unread ? "black" : "black60"}
                    >
                      {partnerName}
                    </TruncatedTitle>
                  </Flex>
                  <TimeSinceFlex>
                    <TimeSince time={conversation.lastMessageAt} mr={0.5} />
                  </TimeSinceFlex>
                </Flex>
              </Box>
              <Box>
                <StyledText
                  variant="xs"
                  color={conversation.unread ? "black" : "black60"}
                  mr={1}
                >
                  <Truncator maxLineCount={3}>{conversationText}</Truncator>
                </StyledText>
              </Box>
            </TextContainer>
          </Flex>
        </Flex>
      </Link>
      {props.hasDivider && <Separator mx={2} width="auto" />}
    </Box>
  )
}

export const ConversationSnippetFragmentContainer = createFragmentContainer(
  ConversationSnippet,
  {
    conversation: graphql`
      fragment ConversationSnippet_conversation on Conversation {
        internalID
        to {
          name
        }
        lastMessage
        lastMessageAt
        unread
        items {
          item {
            __typename
            ... on Artwork {
              date
              title
              artistNames
              image {
                url
              }
            }
            ... on Show {
              fair {
                name
              }
              name
              coverImage {
                url
              }
            }
          }
        }
      }
    `,
  }
)
