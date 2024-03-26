import { FC, ReactNode } from "react"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { isEmpty } from "lodash"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"

interface ArtworkFilterCreateAlertProps {
  renderButton: (props: { onClick: () => void }) => JSX.Element
  children?: ReactNode
}

export const ArtworkFilterCreateAlert: FC<ArtworkFilterCreateAlertProps> = ({
  renderButton,
  children,
}) => {
  const { entity } = useSavedSearchAlertContext()

  // If there is no entity then we don't want to create an alert
  if (isEmpty(entity)) return null

  return (
    <>
      <CreateAlertButton
        renderButton={({ onClick }) => (
          <ProgressiveOnboardingAlertCreate>
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

      {children}
    </>
  )
}
