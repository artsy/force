import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtQuizTrendingCollections_viewer$data } from "__generated__/ArtQuizTrendingCollections_viewer.graphql"
import { ArtQuizTrendingCollectionsQuery } from "__generated__/ArtQuizTrendingCollectionsQuery.graphql"
import { Join, Skeleton, Spacer } from "@artsy/palette"
import {
  ArtQuizTrendingCollectionFragmentContainer,
  ArtQuizTrendingCollectionPlaceholder,
} from "Apps/ArtQuiz/Components/ArtQuizTrendingCollection"

interface ArtQuizTrendingCollectionsProps {
  viewer: ArtQuizTrendingCollections_viewer$data
}

const ArtQuizTrendingCollections: FC<ArtQuizTrendingCollectionsProps> = ({
  viewer,
}) => {
  if (!viewer.marketingCollections) return null

  return (
    <Join separator={<Spacer y={4} />}>
      {viewer.marketingCollections.map(collection => {
        if (!collection) return null

        return (
          <ArtQuizTrendingCollectionFragmentContainer
            key={collection.internalID}
            collection={collection}
          />
        )
      })}
    </Join>
  )
}

export const ArtQuizTrendingCollectionsFragmentContainer = createFragmentContainer(
  ArtQuizTrendingCollections,
  {
    viewer: graphql`
      fragment ArtQuizTrendingCollections_viewer on Viewer {
        marketingCollections(
          slugs: [
            "trending-this-week"
            "iconic-prints"
            "street-art-highlights"
            "artists-on-the-rise"
            "finds-under-1000-dollars"
            "top-auction-lots"
            "curators-picks-emerging"
            "contemporary-now"
          ]
        ) {
          ...ArtQuizTrendingCollection_collection
          internalID
        }
      }
    `,
  }
)

const ArtQuizTrendingCollectionsPlaceholder = () => {
  return (
    <Skeleton>
      <Join separator={<Spacer y={4} />}>
        {[...new Array(3)].map((_, i) => {
          return <ArtQuizTrendingCollectionPlaceholder key={i} />
        })}
      </Join>
    </Skeleton>
  )
}

export const ArtQuizTrendingCollectionsQueryRenderer = () => {
  return (
    <SystemQueryRenderer<ArtQuizTrendingCollectionsQuery>
      placeholder={<ArtQuizTrendingCollectionsPlaceholder />}
      query={graphql`
        query ArtQuizTrendingCollectionsQuery {
          viewer {
            ...ArtQuizTrendingCollections_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.viewer) {
          return <ArtQuizTrendingCollectionsPlaceholder />
        }

        return (
          <ArtQuizTrendingCollectionsFragmentContainer viewer={props.viewer} />
        )
      }}
    />
  )
}
