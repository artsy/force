import { BoxProps, Flex, Text, Avatar } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { EntityHeaderGene_gene$data } from "__generated__/EntityHeaderGene_gene.graphql"
import { FollowGeneButtonQueryRenderer } from "Components/FollowButton/FollowGeneButton"

export interface EntityHeaderGeneProps extends BoxProps {
  gene: EntityHeaderGene_gene$data
  displayAvatar?: boolean
  displayLink?: boolean
  FollowButton?: JSX.Element
}

const EntityHeaderGene: FC<EntityHeaderGeneProps> = ({
  gene,
  displayAvatar = true,
  displayLink = true,
  FollowButton,
  ...rest
}) => {
  const image = gene.avatar?.cropped
  const initials = gene.name?.[0]
  const total = gene.filterArtworksConnection?.counts?.total ?? 0
  const meta = total > 0 ? `${total.toLocaleString("en-US")} artworks` : null

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Flex
        {...(displayLink
          ? { as: RouterLink, to: gene.href, textDecoration: "none" }
          : {})}
        display="flex"
        alignItems="center"
        minWidth={0}
        flex={1}
      >
        {displayAvatar && (image || initials) && (
          <Avatar size="xs" mr={1} initials={initials} lazyLoad {...image} />
        )}

        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="sm-display" lineClamp={2}>
            {gene.name ?? "Unknown"}
          </Text>

          {meta && (
            <Text variant="xs" color="black60" overflowEllipsis>
              {meta}
            </Text>
          )}
        </Flex>
      </Flex>

      {FollowButton || (
        <FollowGeneButtonQueryRenderer id={gene.internalID} size="small" />
      )}
    </Flex>
  )
}

export const EntityHeaderGeneFragmentContainer = createFragmentContainer(
  EntityHeaderGene,
  {
    gene: graphql`
      fragment EntityHeaderGene_gene on Gene {
        internalID
        href
        name
        avatar: image {
          cropped(width: 45, height: 45, version: ["big_and_tall", "tall"]) {
            src
            srcSet
          }
        }
        filterArtworksConnection(first: 1) {
          counts {
            total
          }
        }
      }
    `,
  }
)
