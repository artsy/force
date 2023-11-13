import { ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import { DEFAULT_METRIC } from "Utils/metrics"
import { FC, ReactNode } from "react"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { ProgressiveOnboardingAlertReady } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertReady"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import { getSearchCriteriaFromFilters } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { isEmpty } from "lodash"
import { useAlert } from "Components/Alert"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { usePrepareFiltersForPills } from "Components/ArtworkFilter/Utils/usePrepareFiltersForPills"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"

interface ArtworkFilterCreateAlertProps {
  renderButton: (props: { onClick: () => void }) => JSX.Element
  children?: ReactNode
}

export const ArtworkFilterCreateAlert: FC<ArtworkFilterCreateAlertProps> = ({
  renderButton,
  children,
}) => {
  const { entity } = useSavedSearchAlertContext()
  const { aggregations, filters: rawFilters } = useArtworkFilterContext()
  const filters = usePrepareFiltersForPills()
  const newAlertModalEnabled = useFeatureFlag("onyx_artwork_alert_modal_v2")

  const criteria = getSearchCriteriaFromFilters(entity, filters)
  const metric = filters?.metric ?? DEFAULT_METRIC

  const initialCriteria: SearchCriteriaAttributes = {}
  if (entity?.owner?.type === OwnerType.artist) {
    initialCriteria.artistIDs = [entity.owner.id]
  }

  const { alertComponent, showAlert } = useAlert({
    authDialogOptions: {
      options: {
        title: "Sign up to create your alert",
        afterAuthAction: {
          action: "createAlert",
          kind: "artworks",
          objectId: entity.owner.slug,
        },
      },
      analytics: {
        contextModule: ContextModule.artworkGrid,
        intent: Intent.createAlert,
      },
    },
    initialCriteria: {
      ...rawFilters,
      ...initialCriteria,
    },
  })

  if (newAlertModalEnabled) {
    return (
      <>
        <ProgressiveOnboardingAlertCreate>
          {({ onSkip: createSkip }) => (
            <ProgressiveOnboardingAlertReady>
              {({ onSkip: readySkip }) =>
                renderButton({
                  onClick: () => {
                    createSkip()
                    readySkip()
                    showAlert()
                  },
                })
              }
            </ProgressiveOnboardingAlertReady>
          )}
        </ProgressiveOnboardingAlertCreate>
        {alertComponent}
      </>
    )
  }

  // If there is no entity then we don't want to create an alert
  if (isEmpty(entity)) return null

  return (
    <>
      <SavedSearchCreateAlertButtonContainer
        entity={entity}
        criteria={criteria}
        metric={metric}
        aggregations={aggregations}
        authDialogOptions={{
          options: {
            title: "Sign up to create your alert",
            afterAuthAction: {
              action: "createAlert",
              kind: "artworks",
              objectId: entity.owner.slug,
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
                {({ onSkip: readySkip }) =>
                  renderButton({
                    onClick: () => {
                      createSkip()
                      readySkip()
                      onClick()
                    },
                  })
                }
              </ProgressiveOnboardingAlertReady>
            )}
          </ProgressiveOnboardingAlertCreate>
        )}
      />

      {children}
    </>
  )
}
