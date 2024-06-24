import { FC, ReactNode } from "react"
import { ProgressiveOnboardingAlertCreate } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreate"
import { isEmpty } from "lodash"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import styled from "styled-components"

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
      <Container>
        <CreateAlertButton
          renderButton={({ onClick }) => (
            <ProgressiveOnboardingAlertCreate>
              {({ onSkip: createSkip }) => {
                return renderButton({
                  onClick: () => {
                    createSkip()
                    onClick()
                  },
                })
              }}
            </ProgressiveOnboardingAlertCreate>
          )}
        />
      </Container>

      {children}
    </>
  )
}

// ProgressiveOnboardingPopover introduces a wrapper div that needs to be flex
// in some cases to avoid extraneous whitespace
const Container = styled.div`
  > div {
    display: flex;
  }
`
