import { compact, take } from "lodash"
import { useMemo } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  CellPartnerFragmentContainer,
  CellPartnerPlaceholder,
} from "Components/Cells/CellPartner"
import { Rail } from "Components/Rail/Rail"
import { PartnersRail_partnerCategory$data } from "__generated__/PartnersRail_partnerCategory.graphql"
import { PartnersRailQuery } from "__generated__/PartnersRailQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Skeleton } from "@artsy/palette"

interface PartnersRailProps {
  partnerCategory: PartnersRail_partnerCategory$data
}

const PartnersRail: React.FC<PartnersRailProps> = ({ partnerCategory }) => {
  const partners = useMemo(() => {
    return mergeBuckets(
      compact(partnerCategory.primary),
      compact(partnerCategory.secondary)
    )
  }, [partnerCategory.primary, partnerCategory.secondary])

  return (
    <Rail
      title={partnerCategory.name!}
      getItems={() => {
        return partners.map(partner => {
          return (
            <CellPartnerFragmentContainer
              key={partner.internalID}
              partner={partner}
            />
          )
        })
      }}
    />
  )
}

interface PartnersRailPlaceholderProps {
  name: string
}

export const PartnersRailPlaceholder: React.FC<PartnersRailPlaceholderProps> = ({
  name,
}) => {
  return (
    <Skeleton>
      <Rail
        title={name}
        isLoading
        getItems={() => {
          return [...new Array(9)].map((_, k) => {
            return <CellPartnerPlaceholder key={k} mode="RAIL" />
          })
        }}
      />
    </Skeleton>
  )
}

export const PartnersRailFragmentContainer = createFragmentContainer(
  PartnersRail,
  {
    partnerCategory: graphql`
      fragment PartnersRail_partnerCategory on PartnerCategory
        @argumentDefinitions(
          category: { type: "[String]" }
          type: { type: "[PartnerClassification!]!" }
        ) {
        name
        primary: partners(
          defaultProfilePublic: true
          eligibleForListing: true
          eligibleForPrimaryBucket: true
          partnerCategories: $category
          sort: RANDOM_SCORE_DESC
          type: $type
        ) {
          internalID
          ...CellPartner_partner
        }
        secondary: partners(
          eligibleForListing: true
          eligibleForSecondaryBucket: true
          type: $type
          partnerCategories: $category
          sort: RANDOM_SCORE_DESC
          defaultProfilePublic: true
        ) {
          internalID
          ...CellPartner_partner
        }
      }
    `,
  }
)

interface PartnersRailQueryRendererProps {
  id: string
  name: string
  type: "INSTITUTION" | "GALLERY"
}

export const PartnersRailQueryRenderer: React.FC<PartnersRailQueryRendererProps> = ({
  id,
  name,
  type,
}) => {
  return (
    <SystemQueryRenderer<PartnersRailQuery>
      lazyLoad
      placeholder={<PartnersRailPlaceholder name={name} />}
      variables={{ id, category: type, type: type }}
      query={graphql`
        query PartnersRailQuery(
          $id: String!
          $category: [String]
          $type: [PartnerClassification!]!
        ) {
          partnerCategory(id: $id) {
            ...PartnersRail_partnerCategory
              @arguments(category: $category, type: $type)
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.partnerCategory) {
          return <PartnersRailPlaceholder name={name} />
        }

        return (
          <PartnersRailFragmentContainer
            partnerCategory={props.partnerCategory}
          />
        )
      }}
    />
  )
}

const desiredTotal = 9
const desiredPrimary = 6
const desiredSecondary = 3

const mergeBuckets = <T,>(primary: T[], secondary: T[]): T[] => {
  if (primary.length < desiredPrimary) {
    return [...primary, ...take(secondary, desiredTotal - primary.length)]
  }

  if (secondary.length < desiredSecondary) {
    return [...take(primary, desiredTotal - secondary.length), ...secondary]
  }

  return [
    ...take(primary, desiredPrimary),
    ...take(secondary, desiredSecondary),
  ]
}
