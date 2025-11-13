import {
  Breadcrumbs,
  Column,
  GridColumns,
  HTML,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"
import type { Header_collection$data } from "__generated__/Header_collection.graphql"
import { Link } from "found"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { slugify } from "underscore.string"

export interface CollectionHeaderProps {
  collection: Header_collection$data
}

export const CollectionHeader: React.FC<
  React.PropsWithChildren<CollectionHeaderProps>
> = ({ collection }) => {
  return (
    <>
      <GridColumns mt={4} as="header" gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text variant="xl" as="h1" mb={1}>
            {collection.title}
          </Text>

          <Breadcrumbs>
            <Link to="/collect">All works</Link>
            <Link
              // TODO: Metaphysics should expose a slug
              to={`/collections#${slugify(collection.category)}`}
            >
              {collection.category}
            </Link>
          </Breadcrumbs>
        </Column>

        {collection.description && (
          <Column span={6}>
            <HTML variant="sm">
              <ReadMore maxLines={9} content={collection.description} />
            </HTML>
          </Column>
        )}
      </GridColumns>

      <Spacer y={6} />
    </>
  )
}

export const CollectionHeaderFragmentContainer = createFragmentContainer(
  CollectionHeader,
  {
    collection: graphql`
      fragment Header_collection on MarketingCollection {
        category
        description: markdownDescription(format: HTML)
        id
        slug
        title
      }
    `,
  }
)
