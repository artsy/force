import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import { Flex, ProgressBar } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { STEPS, useSellFlowContext } from "Apps/Sell/SellFlowContext"

const PROGRESS_BAR_CONTAINER_HEIGHT = 22
const PROGRESS_BAR_HEIGHT = 4
const ICON_SIZE = 22

export const SubmissionProgressBar: React.FC = ({}) => {
  const { state } = useSellFlowContext()

  if (!state?.step) {
    // Render an empty progress bar if we don't have a step
    return <Flex height={PROGRESS_BAR_CONTAINER_HEIGHT} />
  }

  const { step, isLastStep } = state

  const percentComplete = ((STEPS.indexOf(step) + 1) / STEPS.length) * 100
  const highlight = isLastStep ? "green100" : "blue100"

  return (
    <AppContainer>
      <HorizontalPadding>
        <Flex height={PROGRESS_BAR_CONTAINER_HEIGHT}>
          <Flex flex={1} justifyContent="center" m="auto">
            <ProgressBar
              highlight={highlight}
              percentComplete={percentComplete}
              backgroundColor="black5"
              width="100%"
              height={PROGRESS_BAR_HEIGHT}
              borderRadius={PROGRESS_BAR_HEIGHT / 2}
              my={0}
            />
          </Flex>

          {!!isLastStep && (
            <CheckmarkFillIcon
              height={ICON_SIZE}
              width={ICON_SIZE}
              fill="green100"
              ml={1}
            />
          )}
        </Flex>
      </HorizontalPadding>
    </AppContainer>
  )
}
