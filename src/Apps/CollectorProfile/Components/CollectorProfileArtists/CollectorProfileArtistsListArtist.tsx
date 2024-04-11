import { FC, useRef, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileArtistsListArtist_userInterestEdge$key } from "__generated__/CollectorProfileArtistsListArtist_userInterestEdge.graphql"
import {
  Button,
  Checkbox,
  Column,
  Dropdown,
  GridColumns,
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
import MoreIcon from "@artsy/icons/MoreIcon"
import { Z } from "Apps/Components/constants"
import { NavBarMenuItemButton } from "Components/NavBar/Menus/NavBarMenuItem"
import { CollectorProfileArtistsDeleteDialog } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsDeleteDialog"

interface CollectorProfileArtistsListArtistProps {
  userInterestEdge: CollectorProfileArtistsListArtist_userInterestEdge$key
}

export const CollectorProfileArtistsListArtist: FC<CollectorProfileArtistsListArtistProps> = ({
  userInterestEdge,
}) => {
  const [mode, setMode] = useState<"Idle" | "Delete">("Idle")

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

  const onHideRef = useRef<() => void>(() => {})

  const handleClose = () => {
    setMode("Idle")
    onHideRef.current()
  }

  if (!artist || artist.__typename !== "Artist") {
    return null
  }

  const count = artist.counts?.artworks || 0

  return (
    <>
      <CollectorProfileArtistsListArtistRow>
        <Column span={3}>
          <EntityHeaderArtistFragmentContainer
            artist={artist}
            displayFollowButton={false}
          />
        </Column>

        <Column span={2}>
          <Text variant="sm-display" overflowEllipsis>
            {count} artwork{count === 1 ? "" : "s"}
          </Text>
        </Column>

        <Column span={4}>
          <Checkbox selected={!userInterest.private} onClick={handleToggle}>
            Share with galleries
          </Checkbox>
        </Column>

        <Column span={2} overflowX="auto">
          <FollowArtistButtonQueryRenderer
            id={artist.internalID}
            size="small"
          />
        </Column>

        <Column
          span={1}
          display="flex"
          justifyContent={["flex-start", "flex-end"]}
        >
          <Dropdown
            zIndex={Z.dropdown}
            dropdown={
              <Text variant="sm" width={230}>
                <NavBarMenuItemButton
                  onClick={() => {
                    setMode("Delete")
                  }}
                >
                  Remove artist
                </NavBarMenuItemButton>
              </Text>
            }
            placement="bottom-end"
            openDropdownByClick
          >
            {({ anchorRef, anchorProps, onHide }) => {
              onHideRef.current = onHide

              return (
                <Button
                  ref={anchorRef}
                  {...anchorProps}
                  variant="tertiary"
                  size="small"
                >
                  <MoreIcon />
                </Button>
              )
            }}
          </Dropdown>
        </Column>
      </CollectorProfileArtistsListArtistRow>

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

export const CollectorProfileArtistsListArtistSkeleton: FC = () => {
  return (
    <CollectorProfileArtistsListArtistRow>
      <Column span={3}>
        <EntityHeaderPlaceholder />
      </Column>

      <Column span={2}>
        <SkeletonText variant="sm-display" overflowEllipsis>
          00 artworks
        </SkeletonText>
      </Column>

      <Column span={4}>
        <Checkbox disabled>Share with galleries</Checkbox>
      </Column>

      <Column span={2} overflowX="auto">
        <Button variant="secondaryNeutral" size="small" disabled>
          Follow
        </Button>
      </Column>

      <Column
        span={1}
        display="flex"
        justifyContent={["flex-start", "flex-end"]}
      >
        <Button variant="secondaryNeutral" size="small" disabled>
          <MoreIcon />
        </Button>
      </Column>
    </CollectorProfileArtistsListArtistRow>
  )
}

const CollectorProfileArtistsListArtistRow = styled(GridColumns).attrs({
  gridColumnGap: 0.5,
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
