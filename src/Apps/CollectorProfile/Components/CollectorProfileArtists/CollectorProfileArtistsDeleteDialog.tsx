import { Button, ModalDialog, Stack, Text, useToasts } from "@artsy/palette"
import { FC, useState } from "react"
import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { CollectorProfileArtistsDeleteDialogMutation } from "__generated__/CollectorProfileArtistsDeleteDialogMutation.graphql"
import { useRouter } from "System/Hooks/useRouter"

interface CollectorProfileArtistsDeleteDialogProps {
  id: string
  name?: string | null
  onClose: () => void
}

export const CollectorProfileArtistsDeleteDialog: FC<CollectorProfileArtistsDeleteDialogProps> = ({
  id,
  name,
  onClose,
}) => {
  const { router } = useRouter()

  const { submitMutation } = useMutation<
    CollectorProfileArtistsDeleteDialogMutation
  >({
    mutation: MUTATION,
  })

  const { sendToast } = useToasts()

  const [mode, setMode] = useState<"Idle" | "Deleting">("Idle")

  const handleRemove = async () => {
    setMode("Deleting")

    try {
      await submitMutation({ variables: { input: { id } } })

      router.push({
        pathname: "/collector-profile/artists",
        query: { page: 1 },
      })

      onClose()
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: err.message,
      })
    }

    setMode("Idle")
  }

  return (
    <ModalDialog
      title="Remove artist"
      onClose={onClose}
      footer={
        <Stack gap={1}>
          <Button
            variant="primaryBlack"
            onClick={handleRemove}
            loading={mode === "Deleting"}
          >
            Remove artist
          </Button>

          <Button variant="secondaryBlack" onClick={onClose}>
            Keep artist
          </Button>
        </Stack>
      }
    >
      <Text variant="sm">
        {name || "This artist"} will be removed from My Collection.
      </Text>
    </ModalDialog>
  )
}

const MUTATION = graphql`
  mutation CollectorProfileArtistsDeleteDialogMutation(
    $input: DeleteUserInterestMutationInput!
  ) {
    deleteUserInterest(input: $input) {
      me {
        ...CollectorProfileArtistsList_me @arguments(page: 1, size: 10)
      }
    }
  }
`
