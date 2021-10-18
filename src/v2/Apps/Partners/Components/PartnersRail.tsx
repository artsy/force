import { compact, take } from "lodash"
import React, { useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerCellFragmentContainer } from "v2/Components/Cells/PartnerCell"
import { Rail } from "v2/Components/Rail"
import { PartnersRail_partnerCategory } from "v2/__generated__/PartnersRail_partnerCategory.graphql"

interface PartnersRailProps {
  partnerCategory: PartnersRail_partnerCategory
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
            <PartnerCellFragmentContainer
              key={partner.internalID}
              partner={partner}
            />
          )
        })
      }}
    />
  )
}

export const PartnersRailFragmentContainer = createFragmentContainer(
  PartnersRail,
  {
    partnerCategory: graphql`
      fragment PartnersRail_partnerCategory on PartnerCategory
        @argumentDefinitions(type: { type: "[PartnerClassification!]!" }) {
        name
        primary: partners(
          eligibleForListing: true
          eligibleForPrimaryBucket: true
          type: $type
          sort: RANDOM_SCORE_DESC
          defaultProfilePublic: true
        ) {
          internalID
          ...PartnerCell_partner
        }
        secondary: partners(
          eligibleForListing: true
          eligibleForSecondaryBucket: true
          type: $type
          sort: RANDOM_SCORE_DESC
          defaultProfilePublic: true
        ) {
          internalID
          ...PartnerCell_partner
        }
      }
    `,
  }
)

const desiredTotal = 9
const desiredPrimary = 6
const desiredSecondary = 3

// TODO: In the original implemntation, each section was independently shuffled.
// We need a way to do a SSR-stable shuffle for this to work.
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
