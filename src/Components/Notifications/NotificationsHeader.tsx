import type { MarkAllAsReadPanelProps } from "Components/Notifications/MarkAllAsReadPanel"
import { NotificationsContextualMenu } from "Components/Notifications/NotificationsContextualMenu"
import {
  NotificationsPills,
  NotificationsPillsPlaceholder,
} from "Components/Notifications/NotificationsPills"
import type { NotificationListMode } from "Components/Notifications/NotificationsWrapper"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, Clickable, Flex, Stack, Text } from "@artsy/palette"
import type { FC } from "react"
import styled from "styled-components"

export interface NotificationsHeaderProps extends MarkAllAsReadPanelProps {
  mode: NotificationListMode
  onHide?: () => void
}

export const NotificationsHeader: FC<
  React.PropsWithChildren<NotificationsHeaderProps>
> = ({ mode, onHide, unreadCounts }) => {
  return (
    <NotificationsHeaderContainer>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex justifyContent="flex-start">
          <Text variant="lg-display">Activity</Text>
        </Flex>

        <Flex justifyContent="flex-end" gap={1} alignItems="center">
          <NotificationsContextualMenu
            unreadCounts={unreadCounts}
            onHide={onHide}
          />

          {mode === "dropdown" && (
            <Clickable onClick={onHide} p={1}>
              <CloseIcon />
            </Clickable>
          )}
        </Flex>
      </Flex>

      <Flex flexDirection="row">
        <NotificationsPills />
      </Flex>
    </NotificationsHeaderContainer>
  )
}

const NotificationsHeaderContainer = styled(Box).attrs({
  bg: "mono0",
  width: "100%",
  pt: 2,
  pr: 1,
  pb: 1,
  pl: 2,
  gap: 2,
})`
  display: flex;
  flex-direction: column;
`

interface NotificationsHeaderPlaceholderProps {
  onHide(): void
}

export const NotificationsHeaderPlaceholder: FC<
  React.PropsWithChildren<NotificationsHeaderPlaceholderProps>
> = ({ onHide }) => {
  return (
    <NotificationsHeaderContainer>
      <Stack
        gap={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="lg-display">Activity</Text>

        <Clickable onClick={onHide} p={1}>
          <CloseIcon />
        </Clickable>
      </Stack>

      <NotificationsPillsPlaceholder />
    </NotificationsHeaderContainer>
  )
}
