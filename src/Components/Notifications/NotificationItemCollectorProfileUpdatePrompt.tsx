import { Box, Clickable, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC, useState } from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationItemCollectorProfileUpdatePrompt_notificationItem$data } from "__generated__/NotificationItemCollectorProfileUpdatePrompt_notificationItem.graphql"
import { CompleteProfileCollectionDialog } from "Components/CompleteProfile/CompleteProfileCollectionDialog"
import { CompleteProfileInformationDialog } from "Components/CompleteProfile/CompleteProfileInformationDialog"
import { NotificationItemUnreadIndicator } from "Components/Notifications/NotificationItemUnreadIndicator"

interface NotificationItemCollectorProfileUpdatePromptProps {
  notificationItem: NotificationItemCollectorProfileUpdatePrompt_notificationItem$data
  isUnread: boolean
}

export const NotificationItemCollectorProfileUpdatePrompt: FC<NotificationItemCollectorProfileUpdatePromptProps> = ({
  notificationItem,
  isUnread,
}) => {
  const [mode, setMode] = useState<"Idle" | "Open">("Idle")

  const handleOpen = () => {
    setMode("Open")
  }

  const handleClose = () => {
    setMode("Idle")
  }

  // Show the artist prompt if the user has no artists in their collection
  if ((notificationItem.me?.userInterestsConnection?.totalCount ?? 0) === 0) {
    return (
      <>
        <Container onClick={handleOpen}>
          <Box>
            <Text variant="sm-display" fontWeight="bold">
              Tell us about the artists in your collection.
            </Text>

            <Text variant="xs">
              Show off your collection and make a great impression.
              <br />
              <strong>Artsy Message</strong> • Today
            </Text>
          </Box>

          {isUnread && <NotificationItemUnreadIndicator />}
        </Container>

        {mode === "Open" && (
          <CompleteProfileCollectionDialog onClose={handleClose} />
        )}
      </>
    )
  }

  // Otherwise show the profile prompt
  return (
    <>
      <Container onClick={handleOpen}>
        <Box>
          <Text variant="sm-display" fontWeight="bold">
            Tell us a little bit more about you.
          </Text>

          <Text variant="xs">
            By completing your profile, you’re more likely to receive quick
            responses from galleries.
            <br />
            <strong>Artsy Message</strong> • Today
          </Text>
        </Box>

        {isUnread && <NotificationItemUnreadIndicator />}
      </Container>

      {mode === "Open" && (
        <CompleteProfileInformationDialog onClose={handleClose} />
      )}
    </>
  )
}

export const NotificationItemCollectorProfileUpdatePromptFragmentContainer = createFragmentContainer(
  NotificationItemCollectorProfileUpdatePrompt,
  {
    notificationItem: graphql`
      fragment NotificationItemCollectorProfileUpdatePrompt_notificationItem on NotificationItem {
        ... on CollectorProfileUpdatePromptNotificationItem {
          me {
            userInterestsConnection(interestType: ARTIST, first: 1) {
              totalCount
            }
          }
        }
      }
    `,
  }
)

const Container = styled(Clickable).attrs({
  p: 2,
  gap: 1,
})`
  display: flex;
  width: 100%;
  align-items: center;

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`
