import { Box, Clickable, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC, useState } from "react"
import styled, { css } from "styled-components"
import { graphql, useFragment } from "react-relay"
import { NotificationItemCollectorProfileUpdatePrompt_notificationItem$key } from "__generated__/NotificationItemCollectorProfileUpdatePrompt_notificationItem.graphql"
import { CompleteProfileCollectionDialog } from "Components/CompleteProfile/CompleteProfileCollectionDialog"
import { CompleteProfileInformationDialog } from "Components/CompleteProfile/CompleteProfileInformationDialog"
import { NotificationItemUnreadIndicator } from "Components/Notifications/NotificationItemUnreadIndicator"
import { useTracking } from "react-tracking"
import { ClickedActivityPanelNotificationItem } from "@artsy/cohesion/dist/Schema/Events/ActivityPanel"
import { ActionType } from "@artsy/cohesion"

interface NotificationItemCollectorProfileUpdatePromptProps {
  isActive: boolean
  isUnread: boolean
  notificationItem: NotificationItemCollectorProfileUpdatePrompt_notificationItem$key
  onClick: () => void
}

export const NotificationItemCollectorProfileUpdatePrompt: FC<NotificationItemCollectorProfileUpdatePromptProps> = ({
  isActive,
  isUnread,
  notificationItem: _notificationItem,
  onClick,
}) => {
  const notificationItem = useFragment(FRAGMENT, _notificationItem)

  const { trackEvent } = useTracking()

  const [mode, setMode] = useState<"Idle" | "Open">("Idle")

  const hasArtistsInCollection =
    (notificationItem?.me?.userInterestsConnection?.totalCount ?? 0) > 0

  const handleOpen = () => {
    setMode("Open")

    onClick()

    const payload: ClickedActivityPanelNotificationItem = {
      action: ActionType.clickedActivityPanelNotificationItem,
      notification_type: hasArtistsInCollection
        ? "complete your profile"
        : "add artist to your collection",
    }

    trackEvent(payload)
  }

  const handleClose = () => {
    setMode("Idle")
  }

  // Show the profile prompt if the user already has artists in their collection
  if (hasArtistsInCollection) {
    return (
      <>
        <Container onClick={handleOpen} isActive={isActive}>
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

  // Otherwise show the artist collection prompt
  return (
    <>
      <Container onClick={handleOpen} isActive={isActive}>
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

const FRAGMENT = graphql`
  fragment NotificationItemCollectorProfileUpdatePrompt_notificationItem on NotificationItem {
    ... on CollectorProfileUpdatePromptNotificationItem {
      me {
        userInterestsConnection(interestType: ARTIST, first: 1) {
          totalCount
        }
      }
    }
  }
`

const Container = styled(Clickable).attrs({
  p: 2,
  gap: 1,
})<{ isActive: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }

  ${({ isActive }) => {
    return (
      isActive &&
      css`
        background-color: ${themeGet("colors.black5")};
      `
    )
  }}
`
