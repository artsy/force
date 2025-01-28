import { type AuthContextModule, ContextModule, Intent } from "@artsy/cohesion"
import type { ButtonProps } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useMutation } from "Utils/Hooks/useMutation"
import type { FollowMarketingCollectionButtonQuery } from "__generated__/FollowMarketingCollectionButtonQuery.graphql"
import type { FollowMarketingCollectionButton_marketingCollection$data } from "__generated__/FollowMarketingCollectionButton_marketingCollection.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowButton } from "./Button"

interface FollowMarketingCollectionButtonProps
  extends Omit<ButtonProps, "variant"> {
  children?: React.ReactNode
  // FIXME: REACT_18_UPGRADE
  // children?: FollowButtonRenderProps
  marketingCollection: FollowMarketingCollectionButton_marketingCollection$data
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
}

const FollowMarketingCollectionButton: React.FC<
  React.PropsWithChildren<FollowMarketingCollectionButtonProps>
> = ({
  marketingCollection,
  contextModule = ContextModule.geneHeader, // TODO: Change to collection header
  onFollow,
  ...rest
}) => {
  const { isLoggedIn } = useSystemContext()

  const { submitMutation } = useMutation({
    mutation: graphql`
      mutation FollowMarketingCollectionButtonMutation(
        $input: FollowMarketingCollectionInput!
      ) {
        followMarketingCollection(input: $input) {
          marketingCollection {
            id
            isFollowed
          }
        }
      }
    `,
    optimisticResponse: {
      followMarketingCollection: {
        marketingCollection: {
          id: marketingCollection.id,
          isFollowed: !marketingCollection.isFollowed,
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
          title: `Sign up or log in to follow ${marketingCollection.title}`,
          afterAuthAction: {
            action: "follow",
            kind: "marketingCollection",
            objectId: marketingCollection.slug,
          },
        },
        analytics: {
          intent: Intent.followGene, // TODO: add marketing collection intent
          contextModule,
        },
      })

      return
    }

    submitMutation({
      variables: {
        input: {
          marketingCollectionID: marketingCollection.internalID,
          unfollow: marketingCollection.isFollowed,
        },
      },
    })

    onFollow?.(!marketingCollection.isFollowed)
  }

  return (
    <FollowButton
      isFollowed={!!marketingCollection.isFollowed}
      handleFollow={handleClick}
      aria-label={
        marketingCollection.isFollowed
          ? `Unfollow ${marketingCollection.title}`
          : `Follow ${marketingCollection.title}`
      }
      {...rest}
    />
  )
}

export const FollowMarketingCollectionButtonFragmentContainer =
  createFragmentContainer(FollowMarketingCollectionButton, {
    marketingCollection: graphql`
      fragment FollowMarketingCollectionButton_marketingCollection on MarketingCollection
      @argumentDefinitions(
        isLoggedIn: { type: "Boolean", defaultValue: false }
      ) {
        id
        slug
        title
        internalID
        isFollowed @include(if: $isLoggedIn)
      }
    `,
  })

interface FollowMarketingCollectionButtonQueryRendererProps
  extends Omit<FollowMarketingCollectionButtonProps, "marketingCollection"> {
  id: string
}

export const FollowMarketingCollectionButtonQueryRenderer: React.FC<
  React.PropsWithChildren<FollowMarketingCollectionButtonQueryRendererProps>
> = ({ id, ...rest }) => {
  const { isLoggedIn } = useSystemContext()
  return (
    <SystemQueryRenderer<FollowMarketingCollectionButtonQuery>
      lazyLoad
      query={graphql`
        query FollowMarketingCollectionButtonQuery(
          $id: String!
          $isLoggedIn: Boolean!
        ) {
          marketingCollection(slug: $id) {
            ...FollowMarketingCollectionButton_marketingCollection
              @arguments(isLoggedIn: $isLoggedIn)
          }
        }
      `}
      placeholder={<FollowButton {...rest} />}
      variables={{ id, isLoggedIn }}
      render={({ error, props }) => {
        if (error || !props?.marketingCollection) {
          return <FollowButton {...rest} />
        }

        return (
          <FollowMarketingCollectionButtonFragmentContainer
            {...rest}
            marketingCollection={props.marketingCollection}
          />
        )
      }}
    />
  )
}
