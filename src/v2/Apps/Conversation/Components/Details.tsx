import {
  Box,
  DocumentIcon,
  EntityHeader,
  Flex,
  FlexProps,
  Join,
  Link,
  QuestionCircleIcon,
  ResponsiveImage,
  Sans,
  Separator,
  Spacer,
  breakpoints,
  color,
  media,
} from "@artsy/palette"
import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { useWindowSize } from "v2/Utils/Hooks/useWindowSize"
import { Details_conversation } from "v2/__generated__/Details_conversation.graphql"
import ArtworkDetails from "v2/Components/Artwork/Metadata"
import { zIndex } from "styled-system"
import { debounce } from "lodash"
import { getViewportDimensions } from "v2/Utils/viewport"

export const DETAIL_BOX_ANIMATION = `transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
const DETAIL_BOX_XS_ANIMATION = `transition: opacity 0.3s, z-index 0.3s;`
const DETAIL_BOX_MD_ANIMATION = `transition: transform 0.3s;`

// in XS/S/M screens transition is animated with `opacity`. z-index: -1 is also needed when showDetail is false
// in XL screen it is animated with `width` because animation needs to push the mid column content
// in L screens it is animated with `translate` for better performance (than `width`)
const DetailsContainer = styled(Flex)<{ opacity?: 0 | 1; transform?: string }>`
  border-left: 1px solid ${color("black10")};
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${color("white100")};
  transform: none;
  ${DETAIL_BOX_ANIMATION}
  ${media.xl`
    transform: ${({ transform }: { transform?: string }) => transform};
    ${DETAIL_BOX_MD_ANIMATION}
    z-index: 0;
  `}
  ${media.md`
    ${DETAIL_BOX_XS_ANIMATION}
    transform: none;
    opacity: ${({ opacity }: { opacity?: 0 | 1 }) => opacity};
    top: 114px;
    position: fixed;
    ${zIndex}
  `}
`

interface DetailsProps extends FlexProps {
  conversation: Details_conversation
  showDetails: boolean
  setShowDetails: (showDetails: boolean) => void
}

export const Details: FC<DetailsProps> = ({
  conversation,
  setShowDetails,
  showDetails,
  ...props
}) => {
  const { width } = useWindowSize()

  useEffect(() => {
    const initialWidth = width
    const listenForResize = debounce(() => {
      const screenWidth = getViewportDimensions().width
      // Check if the screen width got smaller while the details panel was open
      if (
        screenWidth <= parseInt(breakpoints.xs, 10) &&
        initialWidth > parseInt(breakpoints.xs, 10) &&
        showDetails
      ) {
        setShowDetails(false)
      }
    })
    window.addEventListener("resize", listenForResize)
    return () => window.removeEventListener("resize", listenForResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDetails])

  const item =
    conversation.items?.[0]?.item?.__typename !== "%other" &&
    conversation.items?.[0]?.item

  const attachments = conversation.messagesConnection.edges
    .map(({ node }) => node.attachments)
    .filter(attachments => attachments.length > 0)
    .reduce((previous, current) => previous.concat(current), [])
    .filter(attachment => !attachment.contentType.includes("image"))

  const attachmentItems = attachments?.map(attachment => {
    return (
      <Link
        key={attachment.id}
        href={attachment.downloadURL}
        target="_blank"
        noUnderline
      >
        <Flex alignItems="center">
          <DocumentIcon mr={0.5} />
          <Sans size="3">{attachment.fileName}</Sans>
        </Flex>
      </Link>
    )
  })

  const getDetailsContainerWidth = () => {
    // For big screens
    if (width > parseInt(breakpoints.xs, 10)) {
      if (showDetails) {
        return "376px"
      }
      return ["376px", "376px", "376px", "376px", "0"]
    }

    // For small screens
    return "100%"
  }

  return (
    <DetailsContainer
      flexDirection="column"
      justifyContent="flex-start"
      height={[
        "calc(100% - 115px)",
        "calc(100% - 115px)",
        null,
        "calc(100% - 145px)",
        "100%",
      ]}
      flexShrink={0}
      position={["absolute", "absolute", "absolute", "absolute", "static"]}
      right={[0, 0, 0, 0, "auto"]}
      width={getDetailsContainerWidth()}
      opacity={showDetails ? 1 : (0 as any)}
      transform={showDetails ? "translateX(0)" : "translateX(376px)"}
      zIndex={showDetails ? 1 : -1}
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
              <a href={item.href}>
                <Box height="80px" width="80px">
                  <ResponsiveImage src={item.image.thumbnailUrl} />
                </Box>
              </a>
              <Flex flexDirection="column" ml={1}>
                {item.__typename === "Artwork" && (
                  <ArtworkDetails mt="-4px" artwork={item} />
                )}
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
      {attachments?.length > 0 && (
        <>
          <Separator my={2} />
          <Box px={2}>
            <Sans size="3" weight="medium" mb={2}>
              Attachments
            </Sans>
            <Join separator={<Spacer mb={1} />}>{attachmentItems}</Join>
          </Box>
        </>
      )}
      <Separator my={2} />
      <Flex flexDirection="column" px={2}>
        <Sans size="3" weight="medium" mb={2}>
          Support
        </Sans>
        <Link
          href="https://support.artsy.net/hc/en-us/sections/360008203054-Contact-a-gallery"
          target="_blank"
          noUnderline
        >
          <Flex alignItems="center" mb={1}>
            <QuestionCircleIcon mr={1} />
            <Sans size="3">Inquiries FAQ</Sans>
          </Flex>
        </Link>
      </Flex>
    </DetailsContainer>
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
      messagesConnection(first: $count, after: $after, sort: DESC)
        @connection(key: "Messages_messagesConnection", filters: []) {
        edges {
          node {
            attachments {
              id
              contentType
              fileName
              downloadURL
            }
          }
        }
      }
      items {
        item {
          __typename
          ... on Artwork {
            href
            ...Metadata_artwork
            image {
              thumbnailUrl: url(version: "small")
            }
          }
          ... on Show {
            href
            image: coverImage {
              thumbnailUrl: url(version: "small")
            }
          }
        }
      }
    }
  `,
})
