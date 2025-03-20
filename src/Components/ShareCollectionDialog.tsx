import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import ShareIcon from "@artsy/icons/ShareIcon"
import {
  Button,
  Input,
  ModalDialog,
  Text,
  Stack,
  useToasts,
  Flex,
  Toggle,
} from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { getENV } from "Utils/getENV"
import type { ShareCollectionDialogMutation } from "__generated__/ShareCollectionDialogMutation.graphql"
import { useState } from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface ShareCollectionDialogProps {
  onClose: () => void
  collectionId: string
  collectionName: string
}

export const ShareCollectionDialog: React.FC<
  React.PropsWithChildren<ShareCollectionDialogProps>
> = ({ onClose, collectionId, collectionName }) => {
  const { user } = useSystemContext()
  const { trackEvent } = useTracking()
  const [isShared, setIsShared] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const [mode, setMode] = useState<"Idle" | "Copied">("Idle")

  const handleClick = () => {
    navigator?.clipboard.writeText(url)
    setMode("Copied")

    trackEvent(tracks.clickedCopyButton(collectionId))

    setTimeout(() => {
      setMode("Idle")
    }, 2000)
  }

  const handleOpenInNewTab = () => {
    trackEvent(tracks.clickedOpenInNewTab(collectionId))
  }

  const { submitMutation } = useMutation<ShareCollectionDialogMutation>({
    mutation: graphql`
      mutation ShareCollectionDialogMutation($input: updateCollectionInput!) {
        updateCollection(input: $input) {
          clientMutationId
          responseOrError {
            ... on UpdateCollectionFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })

  const { sendToast } = useToasts()

  const handleToggle = async toggleValue => {
    try {
      setIsUpdating(true)
      await submitMutation({
        variables: {
          input: {
            id: collectionId,
            private: !toggleValue, // negate the toggle, because the flag is for 'private', not 'public'
          },
        },
        rejectIf: res => {
          return !!res.updateCollection?.responseOrError?.mutationError
        },
      })
      setIsShared(toggleValue)
      setIsUpdating(false)
    } catch (error) {
      onClose()
      sendToast({
        message: "Failed to enable sharing",
        variant: "error",
      })
    }
  }

  if (!user) return null

  const url = `${getENV("APP_URL")}/user/${user.id}/collection/${collectionId}`

  return (
    <ModalDialog onClose={onClose} title="Share List">
      <Stack gap={1}>
        <Flex flexDirection="row" gap={2} mb={1}>
          <Text>Create a shareable link to allow others to view this list</Text>
          <Toggle
            selected={isShared}
            disabled={isUpdating}
            aria-label={
              isShared ? "Disable shareable link" : "Enable shareable link"
            }
            onSelect={handleToggle}
          />
        </Flex>

        <Input value={url} readOnly disabled={!isShared} />

        <Flex my={1} gap={1}>
          <Button
            width={1}
            variant="secondaryBlack"
            onClick={handleClick}
            disabled={!isShared || mode === "Copied"}
          >
            {mode === "Copied" ? "Copied to clipboard" : "Copy URL"}
          </Button>

          <Button
            width={1}
            variant="secondaryBlack"
            Icon={ShareIcon}
            // @ts-ignore
            as="a"
            href={url}
            target="_blank"
            onClick={handleOpenInNewTab}
            disabled={!isShared}
          >
            Open in new tab
          </Button>
        </Flex>
        <Button onClick={onClose}>Done</Button>
      </Stack>
    </ModalDialog>
  )
}

const tracks = {
  clickedCopyButton: (collectionId: string) => ({
    action: ActionType.share,
    context_module: ContextModule.saves,
    context_owner_type: OwnerType.saves,
    context_owner_id: collectionId,
    service: "copy_link",
  }),
  clickedOpenInNewTab: (collectionId: string) => ({
    action: ActionType.clickedOpenInNewTabButton,
    context_module: ContextModule.saves,
    context_owner_type: OwnerType.saves,
    context_owner_id: collectionId,
  }),
}
