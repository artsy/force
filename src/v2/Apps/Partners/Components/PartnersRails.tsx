import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnersRailFragmentContainer } from "./PartnersRail"
import { PartnersRails_viewer } from "v2/__generated__/PartnersRails_viewer.graphql"
import { PartnersRailsQuery } from "v2/__generated__/PartnersRailsQuery.graphql"
import { compact, shuffle } from "lodash"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { Join, Skeleton, Spacer } from "@artsy/palette"
import { Rail } from "v2/Components/Rail"
import { PartnerCellPlaceholder } from "v2/Components/Cells/PartnerCell"

interface PartnersRailsProps {
  viewer: PartnersRails_viewer
}

const PartnersRails: FC<PartnersRailsProps> = ({ viewer }) => {
  const categories = shuffle(compact(viewer.partnerCategories))

  return (
    <Join separator={<Spacer mt={4} />}>
      {categories.map((partnerCategory, i) => {
        return (
          <PartnersRailFragmentContainer
            key={i}
            partnerCategory={partnerCategory}
          />
        )
      })}
    </Join>
  )
}

const PartnersRailsFragmentContainer = createFragmentContainer(PartnersRails, {
  viewer: graphql`
    fragment PartnersRails_viewer on Viewer
      @argumentDefinitions(
        categoryType: { type: "PartnerCategoryType" }
        type: { type: "[PartnerClassification]" }
      ) {
      partnerCategories(
        categoryType: $categoryType
        size: 50
        internal: false
      ) {
        name
        slug
        ...PartnersRail_partnerCategory @arguments(type: $type)
      }
    }
  `,
})

const PartnersRailsPlaceholder: FC = () => {
  return (
    <Skeleton>
      <Join separator={<Spacer mt={4} />}>
        {[...new Array(4)].map((_, i) => {
          return (
            <Rail
              key={i}
              title="Example"
              isLoading
              getItems={() => {
                return [...new Array(9)].map((_, k) => {
                  return <PartnerCellPlaceholder key={k} mode="RAIL" />
                })
              }}
            />
          )
        })}
      </Join>
    </Skeleton>
  )
}

interface PartnersRailsQueryRendererProps {
  type: "INSTITUTION" | "GALLERY"
}

export const PartnersRailsQueryRenderer: FC<PartnersRailsQueryRendererProps> = ({
  type,
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PartnersRailsQuery>
      lazyLoad
      environment={relayEnvironment}
      placeholder={<PartnersRailsPlaceholder />}
      variables={{ categoryType: type, type }}
      query={graphql`
        query PartnersRailsQuery(
          $categoryType: PartnerCategoryType
          $type: [PartnerClassification]
        ) {
          viewer {
            ...PartnersRails_viewer
              @arguments(categoryType: $categoryType, type: $type)
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer) {
          return <PartnersRailsPlaceholder />
        }

        return <PartnersRailsFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}
