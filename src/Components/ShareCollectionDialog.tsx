import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import ShareIcon from "@artsy/icons/ShareIcon"
import {
  Button,
  Input,
  ModalDialog,
  Skeleton,
  Stack,
  useToasts,
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

  if (!user) return null

  const url = `${getENV("APP_URL")}/user/${user.id}/collection/${collectionId}`

  return (
    <ModalDialog onClose={onClose} title="Share List">
      {mode === "Updating" ? (
        <Skeleton>
          <Stack gap={1}>
            <Input value={url} readOnly disabled />

            <Button variant="secondaryBlack" disabled>
              Copy URL
            </Button>

            <Button variant="primaryBlack" disabled>
              Open in new tab
            </Button>
          </Stack>
        </Skeleton>
      ) : (
        <Stack gap={1}>
          <Input value={url} readOnly />

          <Button
            variant="secondaryBlack"
            onClick={handleClick}
            disabled={mode === "Copied"}
          >
            {mode === "Copied" ? "Copied to clipboard" : "Copy URL"}
          </Button>

          <Button
            variant="primaryBlack"
            Icon={ShareIcon}
            // @ts-ignore
            as="a"
            href={url}
            target="_blank"
            onClick={handleOpenInNewTab}
          >
            Open in new tab
          </Button>
        </Stack>
      )}
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
