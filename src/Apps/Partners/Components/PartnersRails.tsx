import { Join, Skeleton, Spacer } from "@artsy/palette"
import { CellPartnerPlaceholder } from "Components/Cells/CellPartner"
import { Rail } from "Components/Rail/Rail"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { PartnersRailsQuery } from "__generated__/PartnersRailsQuery.graphql"
import type { PartnersRails_viewer$data } from "__generated__/PartnersRails_viewer.graphql"
import { compact, shuffle } from "lodash"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnersRailQueryRenderer } from "./PartnersRail"

interface PartnersRailsProps {
  viewer: PartnersRails_viewer$data
  type: "INSTITUTION" | "GALLERY"
}

const PartnersRails: FC<React.PropsWithChildren<PartnersRailsProps>> = ({
  viewer,
  type,
}) => {
  const categories = shuffle(compact(viewer.partnerCategories))

  return (
    <Join separator={<Spacer y={4} />}>
      {categories.map(partnerCategory => {
        return (
          <PartnersRailQueryRenderer
            key={partnerCategory.slug}
            type={type}
            id={partnerCategory.slug}
            name={partnerCategory.name!}
          />
        )
      })}
    </Join>
  )
}

const PartnersRailsFragmentContainer = createFragmentContainer(PartnersRails, {
  viewer: graphql`
    fragment PartnersRails_viewer on Viewer
    @argumentDefinitions(categoryType: { type: "PartnerCategoryType" }) {
      partnerCategories(
        categoryType: $categoryType
        size: 50
        internal: false
      ) {
        name
        slug
      }
    }
  `,
})

const PartnersRailsPlaceholder: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Skeleton>
      <Join separator={<Spacer y={4} />}>
        {[...new Array(15)].map((_, i) => {
          return (
            <Rail
              key={i}
              title="Example"
              isLoading
              getItems={() => {
                return [...new Array(9)].map((_, k) => {
                  return <CellPartnerPlaceholder key={k} mode="RAIL" />
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

export const PartnersRailsQueryRenderer: FC<
  React.PropsWithChildren<PartnersRailsQueryRendererProps>
> = ({ type }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PartnersRailsQuery>
      lazyLoad
      environment={relayEnvironment}
      placeholder={<PartnersRailsPlaceholder />}
      variables={{ categoryType: type, type }}
      query={graphql`
        query PartnersRailsQuery($categoryType: PartnerCategoryType) {
          viewer {
            ...PartnersRails_viewer @arguments(categoryType: $categoryType)
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

        return (
          <PartnersRailsFragmentContainer type={type} viewer={props.viewer} />
        )
      }}
    />
  )
}
