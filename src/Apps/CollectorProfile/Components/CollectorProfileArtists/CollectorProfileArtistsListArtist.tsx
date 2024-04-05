import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileArtistsListArtist_userInterestEdge$key } from "__generated__/CollectorProfileArtistsListArtist_userInterestEdge.graphql"
import {
  Box,
  Button,
  Checkbox,
  SkeletonText,
  Text,
  useToasts,
} from "@artsy/palette"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import styled from "styled-components"
import { useMutation } from "Utils/Hooks/useMutation"
import { CollectorProfileArtistsListArtistUpdateMutation } from "__generated__/CollectorProfileArtistsListArtistUpdateMutation.graphql"

interface CollectorProfileArtistsListArtistProps {
  userInterestEdge: CollectorProfileArtistsListArtist_userInterestEdge$key
}

export const CollectorProfileArtistsListArtist: FC<CollectorProfileArtistsListArtistProps> = ({
  userInterestEdge,
}) => {
  const { sendToast } = useToasts()

  const userInterest = useFragment(FRAGMENT, userInterestEdge)

  const { node: artist } = userInterest

  const { submitMutation } = useMutation<
    CollectorProfileArtistsListArtistUpdateMutation
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

  const count = artist.counts?.artworks || 0

  return (
    <CollectorProfileArtistsListArtistRow>
      <EntityHeaderArtistFragmentContainer
        artist={artist}
        displayFollowButton={false}
        flex={1}
      />

      <Text variant="sm-display" flex={1} overflowEllipsis>
        {count} artwork{count === 1 ? "" : "s"}
      </Text>

      <Checkbox
        selected={!userInterest.private}
        flex={1}
        onClick={handleToggle}
      >
        Share with galleries
      </Checkbox>

      <Box flex={1} display="flex" justifyContent="flex-end">
        <FollowArtistButtonQueryRenderer id={artist.internalID} size="small" />
      </Box>
    </CollectorProfileArtistsListArtistRow>
  )
}

export const CollectorProfileArtistsListArtistSkeleton: FC = () => {
  return (
    <CollectorProfileArtistsListArtistRow>
      <EntityHeaderPlaceholder flex={1} />

      <SkeletonText variant="sm-display" flex={1} overflowEllipsis>
        00 artworks
      </SkeletonText>

      <Checkbox disabled flex={1}>
        Share with galleries
      </Checkbox>

      <Box flex={1} display="flex" justifyContent="flex-end">
        <Button variant="secondaryNeutral" size="small" disabled>
          Follow
        </Button>
      </Box>
    </CollectorProfileArtistsListArtistRow>
  )
}

const CollectorProfileArtistsListArtistRow = styled(Box).attrs({
  display: "flex",
  gap: 2,
  flexDirection: "row",
  alignItems: "center",
  borderBottom: "1px solid",
  borderColor: "black10",
  py: 4,
})``

const FRAGMENT = graphql`
  fragment CollectorProfileArtistsListArtist_userInterestEdge on UserInterestEdge {
    id
    internalID
    private
    node {
      __typename
      ... on Artist {
        ...EntityHeaderArtist_artist
        internalID
        name
        counts {
          artworks
        }
      }
    }
  }
`

const MUTATION = graphql`
  mutation CollectorProfileArtistsListArtistUpdateMutation(
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
