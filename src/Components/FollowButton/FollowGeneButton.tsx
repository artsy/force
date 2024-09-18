import * as React from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FollowButton, FollowButtonRenderProps } from "./Button"
import { ButtonProps } from "@artsy/palette"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { FollowGeneButtonQuery } from "__generated__/FollowGeneButtonQuery.graphql"

import {
  Intent,
  ContextModule,
  AuthContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "./useFollowButtonTracking"
import { useAuthDialog } from "Components/AuthDialog"

interface FollowGeneButtonProps extends Omit<ButtonProps, "variant"> {
  children?: FollowButtonRenderProps
  id: string
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
}

export const FollowGeneButton: React.FC<FollowGeneButtonProps> = ({
  id,
  contextModule = ContextModule.geneHeader,
  onFollow,
  ...rest
}) => {
  const { isLoggedIn } = useSystemContext()

  const { data } = useClientQuery<FollowGeneButtonQuery>({
    query: QUERY,
    variables: { id },
    skip: !isLoggedIn,
  })

  const gene = data?.gene

  const { trackFollow } = useFollowButtonTracking({
    ownerType: OwnerType.gene,
    ownerId: gene?.internalID || "",
    ownerSlug: gene?.slug || "",
    contextModule,
  })

  const { submitMutation } = useMutation({
    mutation: graphql`
      mutation FollowGeneButtonMutation($input: FollowGeneInput!) {
        followGene(input: $input) {
          gene {
            internalID
            id
            isFollowed
          }
        }
      }
    `,
    optimisticResponse: {
      followGene: {
        gene: {
          id: gene?.id,
          isFollowed: !!gene?.isFollowed,
          internalID: gene?.internalID,
        },
      },
    },
  })

  const { showAuthDialog } = useAuthDialog()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      showAuthDialog({
        options: {
          title: `Sign up or log in to follow ${gene?.name}`,
          afterAuthAction: {
            action: "follow",
            kind: "gene",
            objectId: gene?.slug || "",
          },
        },
        analytics: {
          intent: Intent.followGene,
          contextModule,
        },
      })

      return
    }

    submitMutation({
      variables: {
        input: {
          geneID: gene?.internalID,
          unfollow: gene?.isFollowed,
        },
      },
    })

    onFollow?.(!gene?.isFollowed)
    trackFollow(!!gene?.isFollowed)
  }

  return (
    <FollowButton
      isFollowed={!!gene?.isFollowed}
      handleFollow={handleClick}
      aria-label={
        gene?.isFollowed ? `Unfollow ${gene?.name}` : `Follow ${gene?.name}`
      }
      {...rest}
    />
  )
}

const QUERY = graphql`
  query FollowGeneButtonQuery($id: String!) {
    gene(id: $id) {
      id
      slug
      name
      internalID
      isFollowed
    }
  }
`
