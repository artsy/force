import {
  Button,
  Flex,
  Text,
  buttonMixin,
  type ButtonProps,
} from "@artsy/palette"
import {
  ART_ASSISTANT_ERRORS,
  type ArtAssistantErrorAction,
  type ArtAssistantErrorKind,
} from "Apps/ArtAssistant/utils/artAssistantErrors"
import { closeArtAssistant } from "Apps/ArtAssistant/utils/closeArtAssistant"
import { RouterLink } from "System/Components/RouterLink"
import type { ReactElement } from "react"
import styled from "styled-components"

interface ArtAssistantErrorActionsProps {
  error: ArtAssistantErrorKind
  onSelect: (action: ArtAssistantErrorAction) => void
}

export const ArtAssistantErrorActions = ({
  error,
  onSelect,
}: ArtAssistantErrorActionsProps): ReactElement | null => {
  const { actions } = ART_ASSISTANT_ERRORS[error]
  if (!actions.length) return null
  return (
    <Flex flexWrap="wrap" gap={1}>
      {actions.map(({ action, label }) => {
        if (action === "close")
          return (
            <CloseLink
              key={action}
              to="/"
              variant="secondaryNeutral"
              size="small"
              onClick={closeArtAssistant}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant="xs">{label}</Text>
            </CloseLink>
          )
        return (
          <Button
            key={action}
            variant="secondaryNeutral"
            size="small"
            onClick={() => onSelect(action)}
          >
            {label}
          </Button>
        )
      })}
    </Flex>
  )
}

const CloseLink = styled(RouterLink)<Pick<ButtonProps, "variant" | "size">>`
  ${buttonMixin}
`
