import { Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import { FC } from "react"

import { CriteriaPillsQueryRenderer } from "Components/ArtworkAlert/Components/CriteriaPills"
import { useArtworkAlertContext } from "Components/ArtworkAlert/Hooks/useArtworkAlertContext"
import { ConfirmationArtworksGridQueryRenderer } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"

export const Confirmation: FC = () => {
  const { state } = useArtworkAlertContext()

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
              <CriteriaPillsQueryRenderer editable={false} />
            </Flex>
            <Separator />
          </Join>
        </Flex>
        <ConfirmationArtworksGridQueryRenderer
          onClose={() => false}
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
