import {
  Box,
  Checkbox,
  Clickable,
  ModalDialog,
  Stack,
  Text,
  useToasts,
} from "@artsy/palette"
import { FC, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileArtistsListArtistDialog_userInterestEdge$key } from "__generated__/CollectorProfileArtistsListArtistDialog_userInterestEdge.graphql"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { CollectorProfileArtistsDeleteDialog } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsDeleteDialog"
import { useMutation } from "Utils/Hooks/useMutation"
import { CollectorProfileArtistsListArtistDialogUpdateMutation } from "__generated__/CollectorProfileArtistsListArtistDialogUpdateMutation.graphql"

interface CollectorProfileArtistsListArtistDialogProps {
  userInterestEdge: CollectorProfileArtistsListArtistDialog_userInterestEdge$key
  onClose: () => void
}

export const CollectorProfileArtistsListArtistDialog: FC<CollectorProfileArtistsListArtistDialogProps> = ({
  userInterestEdge,
  onClose,
}) => {
  const [mode, setMode] = useState<"Idle" | "Delete">("Idle")

  const userInterest = useFragment(FRAGMENT, userInterestEdge)

  const { node: artist } = userInterest

  const handleClose = () => {
    setMode("Idle")
  }

  const handleDelete = () => {
    setMode("Delete")
  }

  const { sendToast } = useToasts()

  const { submitMutation } = useMutation<
    CollectorProfileArtistsListArtistDialogUpdateMutation
  >({
    mutation: MUTATION,
    optimisticResponse: {
      updateUserInterest: {
        userInterestEdge: {
          id: userInterest.id,
          private: !userInterest.private,
        } as any,
      } as any,
    },
  })

  const handleToggle = async () => {
    try {
      await submitMutation({
        variables: {
          input: {
            id: userInterest.internalID,
            private: !userInterest.private,
          },
        },
        rejectIf: res => {
          return res.updateUserInterest?.userInterestOrError?.mutationError
            ?.message
        },
      })

      sendToast({ message: "Updated artist", variant: "success" })
    } catch (err) {
      console.error(err)

      sendToast({ message: err.message, variant: "error" })
    }
  }

  if (!artist || artist.__typename !== "Artist") {
    return null
  }

  const count = artist.counts?.myCollectedArtworks || 0

  return (
    <>
      <ModalDialog
        margin={0}
        dialogProps={{ width: "100%", margin: 0 }}
        onClose={onClose}
      >
        <Stack gap={4}>
          <EntityHeaderArtistFragmentContainer
            artist={artist}
            displayFollowButton={!artist.isPersonalArtist}
          >
            <Text variant="xs" overflowEllipsis>
              {count} artwork{count === 1 ? "" : "s"}
            </Text>
          </EntityHeaderArtistFragmentContainer>

          <Checkbox selected={!userInterest.private} onClick={handleToggle}>
            <Box>
              <Text variant="xs" color="black100">
                Share this artist with galleries during inquiries.
              </Text>
              <Text variant="xs" color="black60">
                Galleries are more likely to respond if they can see the artists
                you collect.
              </Text>
            </Box>
          </Checkbox>

          <Clickable
            color="red100"
            textDecoration="underline"
            onClick={handleDelete}
          >
            <Text variant="xs">Remove artist</Text>
          </Clickable>
        </Stack>
      </ModalDialog>

      {mode === "Delete" && (
        <CollectorProfileArtistsDeleteDialog
          id={artist.internalID}
          name={artist.name}
          onClose={handleClose}
        />
      )}
    </>
  )
}

const FRAGMENT = graphql`
  fragment CollectorProfileArtistsListArtistDialog_userInterestEdge on UserInterestEdge {
    id
    internalID
    private
    node {
      __typename
      ... on Artist {
        ...EntityHeaderArtist_artist
        internalID
        name
        isPersonalArtist
        counts {
          myCollectedArtworks
        }
      }
    }
  }
`

const MUTATION = graphql`
  mutation CollectorProfileArtistsListArtistDialogUpdateMutation(
    $input: UpdateUserInterestMutationInput!
  ) {
    updateUserInterest(input: $input) {
      userInterestEdge {
        ...CollectorProfileArtistsListArtist_userInterestEdge
        id
        private
      }
      userInterestOrError {
        ... on UpdateUserInterestFailure {
          mutationError {
            message
          }
        }
      }
    }
  }
`
