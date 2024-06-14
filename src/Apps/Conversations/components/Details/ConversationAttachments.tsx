import { extractNodes } from "Utils/extractNodes"
import { graphql, useFragment } from "react-relay"
import { ConversationAttachments_conversation$key } from "__generated__/ConversationAttachments_conversation.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { Flex, Separator, Text } from "@artsy/palette"
import DocumentIcon from "@artsy/icons/DocumentIcon"

interface ConversationAttachmentsProps {
  conversation: ConversationAttachments_conversation$key
}

export const ConversationAttachments: React.FC<ConversationAttachmentsProps> = ({
  conversation,
}) => {
  const data = useFragment(
    graphql`
      fragment ConversationAttachments_conversation on Conversation {
        attachmentsConnection: messagesConnection(first: 30, sort: DESC) {
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
      }
    `,
    conversation
  )

  const attachments = extractNodes(data.attachmentsConnection)
    .map(attachment => attachment.attachments)
    .filter(attachment => attachment?.length)
    .flat()
    .filter(attachment => attachment?.id && attachment?.downloadURL)

  if (!attachments.length) {
    return null
  }

  return (
    <>
      <Text variant="lg" mb={2}>
        Attachments
      </Text>

      {attachments.map(attachment => {
        if (!attachment) {
          return null
        }

        return (
          <RouterLink
            key={attachment.id}
            to={attachment.downloadURL}
            target="_blank"
            textDecoration="none"
          >
            <Flex alignItems="center">
              <DocumentIcon mr={0.5} />

              <Text
                overflow="hidden"
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {attachment?.fileName}
              </Text>
            </Flex>
          </RouterLink>
        )
      })}

      <Separator borderWidth={1} my={4} />
    </>
  )
}
