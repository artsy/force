import {
  type AuthContextModule,
  ContextModule,
  Intent,
  OwnerType,
} from "@artsy/cohesion"
import type { ButtonProps } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useMutation } from "Utils/Hooks/useMutation"
import type { FollowGeneButtonQuery } from "__generated__/FollowGeneButtonQuery.graphql"
import type { FollowGeneButton_gene$data } from "__generated__/FollowGeneButton_gene.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowButton } from "./Button"
import { useFollowButtonTracking } from "./useFollowButtonTracking"

interface FollowGeneButtonProps extends Omit<ButtonProps, "variant"> {
  children?: React.ReactNode
  // FIXME: REACT_18_UPGRADE
  // children?: FollowButtonRenderProps
  gene: FollowGeneButton_gene$data
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
}

const FollowGeneButton: React.FC<
  React.PropsWithChildren<FollowGeneButtonProps>
> = ({ gene, contextModule = ContextModule.geneHeader, onFollow, ...rest }) => {
  const { isLoggedIn } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
    ownerType: OwnerType.gene,
    ownerId: gene.internalID,
    ownerSlug: gene.slug,
    contextModule,
  })

  const { submitMutation } = useMutation({
    mutation: graphql`
      mutation FollowGeneButtonMutation($input: FollowGeneInput!) {
        followGene(input: $input) {
          gene {
            id
            isFollowed
          }
        }
      }
    `,
    optimisticResponse: {
      followGene: {
        gene: {
          id: gene.id,
          isFollowed: !gene.isFollowed,
        },
      },
    },
  })

  const { showAuthDialog } = useAuthDialog()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      showAuthDialog({
        options: {
          title: `Sign up or log in to follow ${gene.name}`,
          afterAuthAction: {
            action: "follow",
            kind: "gene",
            objectId: gene.slug,
          },
          nodeId: gene.id,
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
          geneID: gene.internalID,
          unfollow: gene.isFollowed,
        },
      },
    })

    onFollow?.(!gene.isFollowed)
    trackFollow(!!gene.isFollowed)
  }

  return (
    <FollowButton
      isFollowed={!!gene.isFollowed}
      handleFollow={handleClick}
      aria-label={
        gene.isFollowed ? `Unfollow ${gene.name}` : `Follow ${gene.name}`
      }
      {...rest}
    />
  )
}

export const FollowGeneButtonFragmentContainer = createFragmentContainer(
  FollowGeneButton,
  {
    gene: graphql`
      fragment FollowGeneButton_gene on Gene
      @argumentDefinitions(
        isLoggedIn: { type: "Boolean", defaultValue: false }
      ) {
        id
        slug
        name
        internalID
        isFollowed @include(if: $isLoggedIn)
      }
    `,
  },
)

interface FollowGeneButtonQueryRendererProps
  extends Omit<FollowGeneButtonProps, "gene"> {
  id: string
}

export const FollowGeneButtonQueryRenderer: React.FC<
  React.PropsWithChildren<FollowGeneButtonQueryRendererProps>
> = ({ id, ...rest }) => {
  const { isLoggedIn } = useSystemContext()
  return (
    <SystemQueryRenderer<FollowGeneButtonQuery>
      lazyLoad
      query={graphql`
        query FollowGeneButtonQuery($id: String!, $isLoggedIn: Boolean!) {
          gene(id: $id) {
            ...FollowGeneButton_gene @arguments(isLoggedIn: $isLoggedIn)
          }
        }
      `}
      placeholder={<FollowButton {...rest} />}
      variables={{ id, isLoggedIn }}
      render={({ error, props }) => {
        if (error || !props?.gene) {
          return <FollowButton {...rest} />
        }

        return <FollowGeneButtonFragmentContainer {...rest} gene={props.gene} />
      }}
    />
  )
}
