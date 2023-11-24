import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import {
  Box,
  Button,
  Clickable,
  Flex,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { Rarity } from "Components/Alert/Components/Filters/Rarity"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { PriceQueryRenderer } from "Components/Alert/Components/Filters/Price"
import { WaysToBuy } from "Components/Alert/Components/Filters/WaysToBuy"
import { Color } from "Components/Alert/Components/Filters/Color"
import { useDidMount } from "Utils/Hooks/useDidMount"

export const Filters: FC = () => {
  const { goToDetails, state } = useAlertContext()
  const isMounted = useDidMount()

  return (
    <Box
      minWidth={[null, state.isEditMode ? null : 700]}
      maxHeight={["auto", state.isEditMode ? null : 750]}
      overflowY="auto"
      style={{
        ...(isMounted
          ? {
              opacity: 1,
              transform: "translateX(0)",
              transition: "opacity 300ms, transform 300ms",
            }
          : {
              opacity: 0,
              transform: "translateX(20px)",
            }),
      }}
    >
      <Flex flexDirection="column" width="auto">
        <Clickable
          onClick={() => {
            goToDetails()
          }}
          position="sticky"
          top="0"
          bg="white100"
          zIndex={2}
        >
          <Flex justifyContent="flex-start" alignItems="center" p={2}>
            <ChevronLeftIcon />
            <Text variant="sm">
              {state.isEditMode ? "Create Alert" : "Create Alert"}
            </Text>
          </Flex>
          {state.isEditMode ? null : <Separator />}
        </Clickable>

        <Box p={2}>
          <Text variant="lg">Filters</Text>
          <Separator my={2} />
          <Join separator={<Separator my={2} />}>
            <Medium />
            <Rarity />
            <PriceQueryRenderer />
            <WaysToBuy />
            <Color />
          </Join>
          <Spacer y={6} />
          <Button
            data-testid="setFilters"
            onClick={() => {
              goToDetails()
            }}
            width="100%"
          >
            Set Filters
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}
