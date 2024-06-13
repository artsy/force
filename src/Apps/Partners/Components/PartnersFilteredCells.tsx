import { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import {
  CellPartnerFragmentContainer,
  CellPartnerPlaceholder,
} from "Components/Cells/CellPartner"
import { PartnersFilteredCells_viewer$data } from "__generated__/PartnersFilteredCells_viewer.graphql"
import { PartnersFilteredCellsQuery } from "__generated__/PartnersFilteredCellsQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  Box,
  Button,
  Column,
  GridColumns,
  Skeleton,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"

interface PartnersFilteredCellsProps {
  viewer: PartnersFilteredCells_viewer$data
  relay: RelayPaginationProp
}

const PartnersFilteredCells: FC<PartnersFilteredCellsProps> = ({
  viewer,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const partners = extractNodes(viewer.partnersConnection)
  const total = viewer.partnersConnection?.totalCount ?? 0

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(12, err => {
      setLoading(false)

      if (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      <Text variant="lg-display" mb={4}>
        {total} Result{total === 1 ? "" : "s"}
      </Text>

      {partners.length > 0 && (
        <>
          <GridColumns gridRowGap={4}>
            {partners.map(partner => {
              return (
                <Column
                  key={partner.internalID}
                  span={[6, 4, 3]}
                  display="flex"
                  alignItems="flex-end"
                >
                  <CellPartnerFragmentContainer partner={partner} mode="GRID" />
                </Column>
              )
            })}
          </GridColumns>

          {relay.hasMore() && (
            <Box textAlign="center" mt={4}>
              <Button onClick={handleClick} loading={loading}>
                Show More
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  )
}

const PARTNERS_FILTERED_CELLS_QUERY = graphql`
  query PartnersFilteredCellsQuery(
    $after: String
    $near: String
    $category: [String]
    $type: [PartnerClassification]
  ) {
    viewer {
      ...PartnersFilteredCells_viewer
        @arguments(after: $after, type: $type, near: $near, category: $category)
    }
  }
`

const PartnersFilteredCellsPaginationContainer = createPaginationContainer(
  PartnersFilteredCells,
  {
    viewer: graphql`
      fragment PartnersFilteredCells_viewer on Viewer
        @argumentDefinitions(
          after: { type: "String" }
          category: { type: "[String]" }
          first: { type: "Int", defaultValue: 12 }
          near: { type: "String" }
          type: { type: "[PartnerClassification]" }
        ) {
        partnersConnection(
          after: $after
          defaultProfilePublic: true
          eligibleForListing: true
          first: $first
          near: $near
          partnerCategories: $category
          sort: RANDOM_SCORE_DESC
          type: $type
        ) @connection(key: "PartnersFilteredCells_partnersConnection") {
          totalCount
          edges {
            node {
              internalID
              ...CellPartner_partner
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer.partnersConnection
    },
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { cursor: after }, fragmentVariables) {
      return { ...fragmentVariables, after }
    },
    query: PARTNERS_FILTERED_CELLS_QUERY,
  }
)

const PartnersFilteredCellsPlaceholder: FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg-display" mb={4}>
        0 Results
      </SkeletonText>

      <GridColumns gridRowGap={4}>
        {[...new Array(12)].map((_, i) => {
          return (
            <Column key={i} span={[6, 4, 3]}>
              <CellPartnerPlaceholder mode="GRID" />
            </Column>
          )
        })}
      </GridColumns>
    </Skeleton>
  )
}

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

        return (
          <PartnersFilteredCellsPaginationContainer viewer={props.viewer} />
        )
      }}
    />
  )
}
