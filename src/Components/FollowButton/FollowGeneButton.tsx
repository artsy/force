import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System"
import { FollowButton } from "./Button"
import { FollowGeneButton_gene } from "__generated__/FollowGeneButton_gene.graphql"
import { ButtonProps } from "@artsy/palette"
import { openAuthToSatisfyIntent } from "Utils/openAuthModal"
import { Intent, ContextModule, AuthContextModule } from "@artsy/cohesion"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "./useFollowButtonTracking"

interface FollowGeneButtonProps extends Omit<ButtonProps, "variant"> {
  gene: FollowGeneButton_gene
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
}

const FollowGeneButton: React.FC<FollowGeneButtonProps> = ({
  gene,
  contextModule = ContextModule.geneHeader,
  onFollow,
  ...rest
}) => {
  const { isLoggedIn, mediator } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      openAuthToSatisfyIntent(mediator!, {
        entity: { name: gene.name!, slug: gene.slug },
        contextModule,
        intent: Intent.followGene,
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
      {...rest}
    />
  )
}

export const FollowGeneButtonFragmentContainer = createFragmentContainer(
  FollowGeneButton,
  {
    gene: graphql`
      fragment FollowGeneButton_gene on Gene {
        id
        slug
        name
        internalID
        isFollowed
      }
    `,
  }
)

// TODO: QueryRenderer
