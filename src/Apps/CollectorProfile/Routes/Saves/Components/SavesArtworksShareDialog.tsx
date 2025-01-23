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
import type { SavesArtworksShareDialogMutation } from "__generated__/SavesArtworksShareDialogMutation.graphql"
import { useState } from "react"
import { graphql } from "react-relay"

export interface SavesArtworksShareDialogProps {
  onClose: () => void
  collectionId: string
  collectionName: string
  isPublic: boolean
}

export const SavesArtworksShareDialog: React.FC<
  React.PropsWithChildren<SavesArtworksShareDialogProps>
> = ({ onClose, collectionId, collectionName, isPublic }) => {
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

  const { submitMutation } = useMutation<SavesArtworksShareDialogMutation>({
    mutation: graphql`
      mutation SavesArtworksShareDialogMutation(
        $input: updateCollectionInput!
      ) {
        updateCollection(input: $input) {
          clientMutationId
        }
      }
    `,
  })

  const { sendToast } = useToasts()

  useOnce(async () => {
    if (isPublic) {
      setMode("Ready")
      return
    }

    setMode("Updating")

    try {
      await submitMutation({
        variables: {
          input: {
            id: collectionId,
            name: collectionName, // TODO: Shouldn't be required
            private: false,
            shareableWithPartners: true,
          },
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
