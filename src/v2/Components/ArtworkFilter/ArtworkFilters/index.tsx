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
import {
  useFeatureVariant,
  useTrackVariantView,
} from "v2/System/useFeatureFlag"
import { useEffect } from "react"
import { useRouter } from "v2/System/Router/useRouter"

interface ArtworkFiltersProps {
  user?: User
  relayEnvironment?: RelayModernEnvironment
}

// Some filters will be rendered only if there is the necessary data in aggregations (for example, ArtistsFilter)
export const ArtworkFilters: React.FC<ArtworkFiltersProps> = props => {
  const { user, relayEnvironment } = props
  const { match } = useRouter()

  const isArtistPage = match.location.pathname.includes("/artist/")

  const variant = useFeatureVariant("filters-expanded-experiment")

  const { trackVariantView } = useTrackVariantView({
    experimentName: "filters-expanded-experiment",
    variantName: variant?.name!,
  })

  useEffect(() => {
    if (isArtistPage) {
      trackVariantView()
    }
  }, [isArtistPage, trackVariantView])

  const isExpanded =
    isArtistPage && variant?.name === "experiment" && !!variant?.enabled
  const expandedProp = { ...(isExpanded && { expanded: isExpanded }) }

  return (
    <>
      <ArtistsFilter relayEnvironment={relayEnvironment} user={user} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter {...expandedProp} />
      <ArtistNationalityFilter {...expandedProp} />
      <ArtworkLocationFilter {...expandedProp} />
      <TimePeriodFilter {...expandedProp} />
      <ColorFilter {...expandedProp} />
      <PartnersFilter {...expandedProp} />
    </>
  )
}
