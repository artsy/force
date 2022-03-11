import * as React from "react"
import { ColorFilter } from "./ColorFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeFilter } from "./SizeFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"
import { AttributionClassFilter } from "./AttributionClassFilter"
import { ArtworkLocationFilter } from "./ArtworkLocationFilter"
import { ArtistNationalityFilter } from "./ArtistNationalityFilter"
import { MaterialsFilter } from "./MaterialsFilter"
import { PartnersFilter } from "./PartnersFilter"
import { ArtistsFilter } from "./ArtistsFilter"
import type RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { useFeatureVariant } from "v2/System/useFeatureFlag"

interface ArtworkFiltersProps {
  user?: User
  relayEnvironment?: RelayModernEnvironment
}

// Some filters will be rendered only if there is the necessary data in aggregations (for example, ArtistsFilter)
export const ArtworkFilters: React.FC<ArtworkFiltersProps> = props => {
  const { user, relayEnvironment } = props
  const variant = useFeatureVariant("filters-expanded-experiment")

  const isExpanded = variant?.name === "experiment" && !!variant?.enabled

  return (
    <>
      <ArtistsFilter relayEnvironment={relayEnvironment} user={user} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter expanded={isExpanded} />
      <ArtistNationalityFilter expanded={isExpanded} />
      <ArtworkLocationFilter expanded={isExpanded} />
      <TimePeriodFilter expanded={isExpanded} />
      <ColorFilter expanded={isExpanded} />
      <PartnersFilter expanded={isExpanded} />
    </>
  )
}
