import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { isEmpty } from "lodash"
import type { FC, ReactNode } from "react"
import { useVariant } from "@unleash/proxy-client-react"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"

interface ArtworkFilterCreateAlertProps {
  renderButton: (props: { onClick: () => void }) => JSX.Element
  children?: ReactNode
}

export const ArtworkFilterCreateAlert: FC<
  React.PropsWithChildren<ArtworkFilterCreateAlertProps>
> = ({ renderButton, children }) => {
  const { entity } = useSavedSearchAlertContext()
  const variant = useVariant("diamond_remove_tooltip_experiment")

  useTrackFeatureVariantOnMount({
    experimentName: "diamond_remove_tooltip_experiment",
    variantName: variant?.name,
  })

  const showTooltip = variant.name !== "experiment"

  // If there is no entity then we don't want to create an alert
  if (isEmpty(entity)) return null

  return (
    <>
      {showTooltip ? (
        <CreateAlertButton
          renderButton={({ onClick }) => (
            <ProgressiveOnboardingAlertCreate>
              {/*
              FIXME: REACT_18_UPGRADE
              @ts-ignore */}
              {({ onSkip: createSkip }) =>
                renderButton({
                  onClick: () => {
                    createSkip()
                    onClick()
                  },
                })
              }
            </ProgressiveOnboardingAlertCreate>
          )}
        />
      ) : (
        <CreateAlertButton
          renderButton={({ onClick }) =>
            renderButton({
              onClick: () => {
                onClick()
              },
            })
          }
        />
      )}

      {children}
    </>
  )
}
