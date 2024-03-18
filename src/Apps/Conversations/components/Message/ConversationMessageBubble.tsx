import PersonIcon from "@artsy/icons/PersonIcon"
import { Avatar, Box, Flex, Text, useTheme } from "@artsy/palette"
import { FC, isValidElement } from "react"
import Linkify from "react-linkify"
import { ConversationMessageImage } from "./ConversationMessageImage"
import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"

/**
 * The following props can be used together, details:
 *  - simplified -> cannot accept name and time when it is true
 *  - seenBy -> only when it is fromViewer
 *  - avatarUrl -> only when it is not fromViewer
 * See use cases https://www.figma.com/file/oXwV4SeYmsAuXgP3bFwiH6/Conversations-CMS?node-id=675%3A10844&t=AjHgDGzZ5Tkhi5fr-4
 */
type ConversationMessageBubbleProps = {
  avatarUrl?: string
  fromViewer?: boolean
  isMessageSentOnPlatform?: boolean
  name?: string
  seenBy?: string
  simplified?: boolean
  time?: string
}

export const ConversationMessageBubble: FC<ConversationMessageBubbleProps> = ({
  avatarUrl,
  children,
  fromViewer,
  isMessageSentOnPlatform,
  name,
  seenBy,
  simplified,
  time,
}) => {
  const bubbleDirection = fromViewer ? "flex-end" : "flex-start"

  // react-linkify v1.0.0-alpha with @types v1.0.1 - adding `properties` still doesn't work.
  // This is a workaround to specify target for now.(same as in Force v1.0.0-alpha, in Message.tsx)
  // https://github.com/tasti/react-linkify/issues/78#issuecomment-514754050
  const linkTargetDecorator = (href: string, text: string, key: number) => (
    <a href={href} key={key} target="_blank" rel="noreferrer">
      {text}
    </a>
  )

  const isMessageImage =
    isValidElement(children) && children?.type === ConversationMessageImage

  const { theme } = useTheme()

  return (
    <Flex
      maxWidth={isMessageSentOnPlatform ? 450 : 650}
      minWidth={100}
      alignSelf={bubbleDirection}
    >
      {/* Avatar section */}
      {!simplified && !fromViewer && (
        <Flex
          backgroundColor={simplified ? "white100" : "black10"}
          borderRadius="50%"
          size={30}
          mr={1}
          justifyContent="center"
          alignItems="center"
        >
          {avatarUrl ? (
            <Avatar src={avatarUrl} size="xxs" />
          ) : (
            <PersonIcon size={21} />
          )}
        </Flex>
      )}

      {simplified && !fromViewer && <Flex size={30} mr={1} />}

      {/* Name/Time and bubble section */}
      <Flex flexDirection="column" flex={1} width="100%">
        {!simplified && (
          <Box display="inline-block" mb={0.5}>
            {!!name && (
              <Text fontWeight="bold" display="inline-block">
                {name}
                &nbsp;
              </Text>
            )}
            <Text color="black60" display="inline-block">
              {(name ? "• " : " ") + time}
            </Text>
          </Box>
        )}

        <Box
          backgroundColor={fromViewer ? "white100" : "black10"}
          borderRadius={10}
          border="1px solid"
          borderColor="black10"
          width="100%"
          p={isMessageImage ? 0 : 1}
          style={{
            boxShadow: theme.effects.dropShadow,
            wordBreak: "break-word",
            hyphens: "auto",
            whiteSpace: "pre-line",
          }}
        >
          <Linkify componentDecorator={linkTargetDecorator}>{children}</Linkify>
        </Box>

        {seenBy && (
          <Flex alignSelf="flex-end" alignItems="center" mt={1}>
            <Text variant="xs" color="black60">
              Seen by {` ${seenBy} `}
            </Text>
            <CheckmarkIcon fill="black60" />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
