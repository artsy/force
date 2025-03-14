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
import { useOnce } from "Utils/Hooks/useOnce"
import { getENV } from "Utils/getENV"
import type { ShareCollectionDialogMutation } from "__generated__/ShareCollectionDialogMutation.graphql"
import { useState } from "react"
import { graphql } from "react-relay"

export interface ShareCollectionDialogProps {
  onClose: () => void
  collectionId: string
  collectionName: string
}

export const ShareCollectionDialog: React.FC<
  React.PropsWithChildren<ShareCollectionDialogProps>
> = ({ onClose, collectionId, collectionName }) => {
  const { user } = useSystemContext()

  const [mode, setMode] = useState<"Idle" | "Updating" | "Ready" | "Copied">(
    "Idle",
  )

  const handleClick = () => {
    navigator?.clipboard.writeText(url)
    setMode("Copied")

    setTimeout(() => {
      setMode("Idle")
    }, 2000)
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

  useOnce(async () => {
    setMode("Updating")

    try {
      await submitMutation({
        variables: {
          input: {
            id: collectionId,
            name: collectionName, // TODO: Shouldn't be required
            private: false,
          },
        },
        rejectIf: res => {
          return !!res.updateCollection?.responseOrError?.mutationError
        },
      })

      setMode("Ready")
    } catch (error) {
      onClose()
      sendToast({
        message: "Failed to share collection",
        variant: "error",
      })
    }
  })

  if (!user) return null

  const url = `${getENV("APP_URL")}/user/${user.id}/collection/${collectionId}`

  return (
    <ModalDialog onClose={onClose} title="Share Collection">
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
          >
            Open in new tab
          </Button>
        </Stack>
      )}
    </ModalDialog>
  )
}
