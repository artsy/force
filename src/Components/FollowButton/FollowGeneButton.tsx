import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FollowButton, FollowButtonRenderProps } from "./Button"
import { FollowGeneButton_gene$data } from "__generated__/FollowGeneButton_gene.graphql"
import { ButtonProps } from "@artsy/palette"
import {
  Intent,
  ContextModule,
  AuthContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "./useFollowButtonTracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FollowGeneButtonQuery } from "__generated__/FollowGeneButtonQuery.graphql"
import { useAuthDialog } from "Components/AuthDialog"
import { useRouter } from "System/Hooks/useRouter"

interface FollowGeneButtonProps extends Omit<ButtonProps, "variant"> {
  children?: FollowButtonRenderProps
  gene:
    | FollowGeneButton_gene$data
    | {
        id: string
        internalID: string
        name: string
        slug: string
        isFollowed: boolean
      }
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
}

const FollowGeneButton: React.FC<FollowGeneButtonProps> = ({
  gene,
  contextModule = ContextModule.geneHeader,
  onFollow,
  ...rest
}) => {
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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

interface FollowGeneButtonQueryRendererProps
  extends Omit<FollowGeneButtonProps, "gene"> {
  id: string
}

export const FollowGeneButtonQueryRenderer: React.FC<FollowGeneButtonQueryRendererProps> = ({
  id,
  ...rest
}) => {
  const { isLoggedIn } = useSystemContext()
  const { match } = useRouter()

  if (!isLoggedIn) {
    if (!match?.location) {
      return <FollowButton {...rest} />
    }

    const slug = match.location.pathname
    const geneName = slug.split("/")[2]
    const name = geneName.charAt(0).toUpperCase() + geneName.slice(1)

    const gene = {
      id,
      name,
      internalID: id,
      isFollowed: false,
      slug: slug,
    }

    return <FollowGeneButton {...rest} gene={gene} />
  }

  return (
    <SystemQueryRenderer<FollowGeneButtonQuery>
      lazyLoad
      query={graphql`
        query FollowGeneButtonQuery($id: String!) {
          gene(id: $id) {
            ...FollowGeneButton_gene
          }
        }
      `}
      placeholder={<FollowButton {...rest} />}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.gene) {
          return <FollowButton {...rest} />
        }

        return <FollowGeneButtonFragmentContainer {...rest} gene={props.gene} />
      }}
    />
  )
}
