import { Flex, Join, Separator, Spacer } from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { ConfirmationArtworksGridQueryRenderer } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"

export const Confirmation: FC = () => {
  const { dispatch, state } = useAlertContext()

  return (
    <Flex flexDirection="column" maxWidth={[null, 700]} p={2}>
      <Join separator={<Spacer y={2} />}>
        <Flex flexWrap="wrap" gap={1}>
          <CriteriaPills editable={false} />
        </Flex>
        <Separator />
        <ConfirmationArtworksGridQueryRenderer
          onClose={() => {
            dispatch({ type: "RESET" })
          }}
          alertID={state.alertID as string}
          excludeArtworkIDs={
            state.currentArtworkID ? [state.currentArtworkID] : undefined
          }
          {...state.criteria}
        />
      </Join>
    </Flex>
  )
}
