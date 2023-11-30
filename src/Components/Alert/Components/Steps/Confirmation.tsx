import { Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import { FC } from "react"

import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { ConfirmationArtworksGridQueryRenderer } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"

export const Confirmation: FC = () => {
  const { dispatch, state } = useAlertContext()

  return (
    <Flex flexDirection="column" p={2}>
      <Text variant="lg">Your alert has been saved.</Text>
      <Join separator={<Spacer y={2} />}>
        <Flex flexDirection="column">
          <Join separator={<Spacer y={2} />}>
            <Text variant="sm-display" color="black60">
              We’ll let you know when matching works are added to Artsy.
            </Text>

            <Flex flexWrap="wrap" gap={1}>
              <CriteriaPills editable={false} />
            </Flex>
            <Separator />
          </Join>
        </Flex>
        <ConfirmationArtworksGridQueryRenderer
          onClose={() => {
            dispatch({ type: "RESET" })
          }}
          searchCriteriaId={state.searchCriteriaID as string}
          excludeArtworkIDs={
            state.currentArtworkID ? [state.currentArtworkID] : undefined
          }
          {...state.criteria}
        />
      </Join>
    </Flex>
  )
}
