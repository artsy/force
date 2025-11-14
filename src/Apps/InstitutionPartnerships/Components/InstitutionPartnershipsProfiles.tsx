import { Column, GridColumns } from "@artsy/palette"
import {
  CellPartnerFragmentContainer,
  CellPartnerPlaceholder,
} from "Components/Cells/CellPartner"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { InstitutionPartnershipsProfilesQuery } from "__generated__/InstitutionPartnershipsProfilesQuery.graphql"
import type { InstitutionPartnershipsProfiles_orderedSet$data } from "__generated__/InstitutionPartnershipsProfiles_orderedSet.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface InstitutionPartnershipsProfilesProps {
  orderedSet: InstitutionPartnershipsProfiles_orderedSet$data
}

const InstitutionPartnershipsProfiles: FC<
  React.PropsWithChildren<InstitutionPartnershipsProfilesProps>
> = ({ orderedSet }) => {
  const profiles = orderedSet.items

  if (!profiles || profiles.length === 0) return null

  return (
    <GridColumns gridRowGap={4}>
      {profiles.map(profile => {
        if (!profile || !profile.owner) return null

        return (
          <Column
            key={profile.internalID}
            span={[12, 6, 3]}
            display="flex"
            alignItems="flex-end"
          >
            <CellPartnerFragmentContainer partner={profile.owner} mode="GRID" />
          </Column>
        )
      })}
    </GridColumns>
  )
}

const InstitutionPartnershipsProfilesFragmentContainer =
  createFragmentContainer(InstitutionPartnershipsProfiles, {
    orderedSet: graphql`
      fragment InstitutionPartnershipsProfiles_orderedSet on OrderedSet {
        items {
          ... on Profile {
            internalID
            owner {
              ... on Partner {
                ...CellPartner_partner
              }
            }
          }
        }
      }
    `,
  })

const InstitutionPartnershipsProfilesPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <GridColumns gridRowGap={4}>
      {[...new Array(8)].map((_, i) => {
        return (
          <Column key={i} span={[12, 6, 3]}>
            <CellPartnerPlaceholder mode="GRID" />
          </Column>
        )
      })}
    </GridColumns>
  )
}

export const InstitutionPartnershipsProfilesQueryRenderer: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <SystemQueryRenderer<InstitutionPartnershipsProfilesQuery>
      lazyLoad
      query={graphql`
        query InstitutionPartnershipsProfilesQuery {
          orderedSet(id: "62ace82dd1b5bd000b4e674e") {
            ...InstitutionPartnershipsProfiles_orderedSet
          }
        }
      `}
      placeholder={<InstitutionPartnershipsProfilesPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.orderedSet) {
          return <InstitutionPartnershipsProfilesPlaceholder />
        }

        return (
          <InstitutionPartnershipsProfilesFragmentContainer
            orderedSet={props.orderedSet}
          />
        )
      }}
    />
  )
}
