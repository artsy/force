import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  PartnerCellFragmentContainer,
  PartnerCellPlaceholder,
} from "v2/Components/Cells/PartnerCell"
import { PartnersFilteredCells_viewer } from "v2/__generated__/PartnersFilteredCells_viewer.graphql"
import { PartnersFilteredCellsQuery } from "v2/__generated__/PartnersFilteredCellsQuery.graphql"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  Box,
  Button,
  Column,
  GridColumns,
  Skeleton,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { compact } from "lodash"

interface PartnersFilteredCellsProps {
  viewer: PartnersFilteredCells_viewer
}

const PartnersFilteredCells: FC<PartnersFilteredCellsProps> = ({ viewer }) => {
  const response = viewer.filterPartners

  const handleClick = () => {
    // TODO
  }

  if (!response) return null

  const partners = compact(response.hits)

  return (
    <>
      <Text variant="lg" mb={4}>
        {response.total ?? 0} Result{response.total === 1 ? "" : "s"}
      </Text>

      <GridColumns gridRowGap={4}>
        {partners.map(partner => {
          return (
            <Column
              key={partner.internalID}
              span={[6, 4, 3]}
              display="flex"
              alignItems="flex-end"
            >
              <PartnerCellFragmentContainer partner={partner} mode="GRID" />
            </Column>
          )
        })}
      </GridColumns>

      <Box textAlign="center" mt={4}>
        <Button onClick={handleClick}>Show More</Button>
      </Box>
    </>
  )
}

const PartnersFilteredCellsFragmentContainer = createFragmentContainer(
  PartnersFilteredCells,
  {
    viewer: graphql`
      fragment PartnersFilteredCells_viewer on Viewer
        @argumentDefinitions(
          category: { type: "[String]" }
          near: { type: "String" }
          page: { type: "Int", defaultValue: 1 }
          type: { type: "[PartnerClassification]" }
        ) {
        filterPartners(
          aggregations: [TOTAL]
          defaultProfilePublic: true
          eligibleForListing: true
          near: $near
          page: $page
          partnerCategories: $category
          size: 12
          sort: RANDOM_SCORE_DESC
          type: $type
        ) {
          total
          aggregations {
            counts {
              name
              value
              count
            }
          }
          hits {
            internalID
            ...PartnerCell_partner
          }
        }
      }
    `,
  }
)

const PartnersFilteredCellsPlaceholder: FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg" mb={4}>
        0 Results
      </SkeletonText>

      <GridColumns gridRowGap={4}>
        {[...new Array(12)].map((_, i) => {
          return (
            <Column key={i} span={[6, 4, 3]}>
              <PartnerCellPlaceholder mode="GRID" />
            </Column>
          )
        })}
      </GridColumns>
    </Skeleton>
  )
}

const PARTNERS_FILTERED_CELLS_QUERY = graphql`
  query PartnersFilteredCellsQuery(
    $near: String
    $category: [String]
    $type: [PartnerClassification]
  ) {
    viewer {
      ...PartnersFilteredCells_viewer
        @arguments(type: $type, near: $near, category: $category)
    }
  }
`

interface PartnersFilteredCellsQueryRendererProps {
  near?: string
  category?: string
  type: "INSTITUTION" | "GALLERY"
}

export const PartnersFilteredCellsQueryRenderer: FC<PartnersFilteredCellsQueryRendererProps> = ({
  near,
  category,
  type,
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PartnersFilteredCellsQuery>
      lazyLoad
      environment={relayEnvironment}
      placeholder={<PartnersFilteredCellsPlaceholder />}
      variables={{ near, category, type }}
      query={PARTNERS_FILTERED_CELLS_QUERY}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer) {
          return <PartnersFilteredCellsPlaceholder />
        }

        return <PartnersFilteredCellsFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}
