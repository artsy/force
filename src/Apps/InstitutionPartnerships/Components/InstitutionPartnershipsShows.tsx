import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { InstitutionPartnershipsShows_orderedSet$data } from "__generated__/InstitutionPartnershipsShows_orderedSet.graphql"
import { InstitutionPartnershipsShowsQuery } from "__generated__/InstitutionPartnershipsShowsQuery.graphql"
import {
  CellShowFragmentContainer,
  CellShowPlaceholder,
} from "Components/Cells/CellShow"
import { Column, GridColumns } from "@artsy/palette"

interface InstitutionPartnershipsShowsProps {
  orderedSet: InstitutionPartnershipsShows_orderedSet$data
}

const InstitutionPartnershipsShows: FC<InstitutionPartnershipsShowsProps> = ({
  orderedSet,
}) => {
  const shows = orderedSet.items

  if (!shows || shows.length === 0) return null

  return (
    <GridColumns>
      {shows.map(show => {
        if (!show) return null

        return (
          <Column key={show.internalID} span={6}>
            <CellShowFragmentContainer mode="GRID" show={show} />
          </Column>
        )
      })}
    </GridColumns>
  )
}

const InstitutionPartnershipsShowsFragmentContainer = createFragmentContainer(
  InstitutionPartnershipsShows,
  {
    orderedSet: graphql`
      fragment InstitutionPartnershipsShows_orderedSet on OrderedSet {
        items {
          ... on Show {
            internalID
            ...CellShow_show
          }
        }
      }
    `,
  }
)

const InstitutionPartnershipsShowsPlaceholder: FC = () => {
  return (
    <GridColumns>
      <Column span={6}>
        <CellShowPlaceholder mode="GRID" />
      </Column>

      <Column span={6}>
        <CellShowPlaceholder mode="GRID" />
      </Column>
    </GridColumns>
  )
}

export const InstitutionPartnershipsShowsQueryRenderer: FC = () => {
  return (
    <SystemQueryRenderer<InstitutionPartnershipsShowsQuery>
      lazyLoad
      query={graphql`
        query InstitutionPartnershipsShowsQuery {
          orderedSet(id: "62acd180259556000cd9991f") {
            ...InstitutionPartnershipsShows_orderedSet
          }
        }
      `}
      placeholder={<InstitutionPartnershipsShowsPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.orderedSet) {
          return <InstitutionPartnershipsShowsPlaceholder />
        }

        return (
          <InstitutionPartnershipsShowsFragmentContainer
            orderedSet={props.orderedSet}
          />
        )
      }}
    />
  )
}
