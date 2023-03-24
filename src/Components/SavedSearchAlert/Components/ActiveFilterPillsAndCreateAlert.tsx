import React from "react"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import {
  FilterPill,
  SavedSearchEntity,
} from "Components/SavedSearchAlert/types"
import { useActiveFilterPills } from "Components/SavedSearchAlert/useActiveFilterPills"
import { BellIcon, Button, Flex, Spacer } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { usePrepareFiltersForPills } from "Components/ArtworkFilter/Utils/usePrepareFiltersForPills"
import { getSearchCriteriaFromFilters } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { DEFAULT_METRIC } from "Utils/metrics"
import { ContextModule, Intent } from "@artsy/cohesion"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import { ProgressiveOnboardingAlertReady } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertReady"

export interface ActiveFilterPillsAndCreateAlertProps {
  savedSearchEntity: SavedSearchEntity
  defaultPills?: FilterPill[]
}

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

export const ActiveFilterPillsAndCreateAlert: React.FC<ActiveFilterPillsAndCreateAlertProps> = props => {
  const { defaultPills = [], savedSearchEntity } = props
  const { pills, removePill } = useActiveFilterPills(defaultPills)
  const { aggregations } = useArtworkFilterContext()
  const filters = usePrepareFiltersForPills()
  const criteria = getSearchCriteriaFromFilters(savedSearchEntity, filters)
  const metric = filters?.metric ?? DEFAULT_METRIC

  return (
    <Flex
      flexWrap="wrap"
      mx={-PILL_HORIZONTAL_MARGIN_SIZE}
      // FIXME: Remove
      mb={4}
      data-testid="artworkGridFilterPills"
    >
      <SavedSearchAlertPills items={pills} onDeletePress={removePill} />

      <Spacer x={PILL_HORIZONTAL_MARGIN_SIZE} />

      <SavedSearchCreateAlertButtonContainer
        entity={savedSearchEntity}
        criteria={criteria}
        metric={metric}
        aggregations={aggregations}
        authDialogOptions={{
          options: {
            title: "Sign up to create your alert",
            afterAuthAction: {
              action: "createAlert",
              kind: "artworks",
              objectId: savedSearchEntity.owner.slug,
            },
          },
          analytics: {
            contextModule: ContextModule.artworkGrid,
            intent: Intent.createAlert,
          },
        }}
        renderButton={({ onClick }) => (
          <ProgressiveOnboardingAlertCreate>
            {({ onSkip: createSkip }) => (
              <ProgressiveOnboardingAlertReady>
                {({ onSkip: readySkip }) => (
                  <Button
                    variant="secondaryBlack"
                    size="small"
                    Icon={BellIcon}
                    onClick={() => {
                      createSkip()
                      readySkip()
                      onClick()
                    }}
                  >
                    Create Alert
                  </Button>
                )}
              </ProgressiveOnboardingAlertReady>
            )}
          </ProgressiveOnboardingAlertCreate>
        )}
      />
    </Flex>
  )
}
