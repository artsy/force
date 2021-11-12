import * as React from "react"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { FollowButton } from "./Button"
import { FollowGeneButton_gene } from "v2/__generated__/FollowGeneButton_gene.graphql"
import { FollowGeneButtonMutation } from "v2/__generated__/FollowGeneButtonMutation.graphql"
import { ButtonProps } from "@artsy/palette"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { Intent, ContextModule } from "@artsy/cohesion"

interface FollowGeneButtonProps extends ButtonProps {
  gene: FollowGeneButton_gene
}

const FollowGeneButton: React.FC<FollowGeneButtonProps> = ({
  gene,
  ...rest
}) => {
  const { relayEnvironment, user, mediator } = useSystemContext()

  const handleClick = () => {
    if (!user) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      openAuthToFollowSave(mediator, {
        entity: gene,
        contextModule: ContextModule.geneHeader,
        intent: Intent.followGene,
      })

      return
    }

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    commitMutation<FollowGeneButtonMutation>(relayEnvironment, {
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
      variables: {
        input: {
          geneID: gene.internalID,
          unfollow: gene.isFollowed,
        },
      },
    })
  }

  return (
    <FollowButton
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      isFollowed={gene.isFollowed}
      handleFollow={handleClick}
      buttonProps={rest}
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
