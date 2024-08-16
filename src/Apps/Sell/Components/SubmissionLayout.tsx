import { Box, Column, Flex, GridColumns } from "@artsy/palette"
import {
  BOTTOM_FORM_NAVIGATION_SAVE_AREA,
  BottomFormNavigation,
} from "Apps/Sell/Components/BottomFormNavigation"
import { StepsNavigation } from "Apps/Sell/Components/StepsNavigation"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"
import { SubmissionProgressBar } from "Apps/Sell/Components/SubmissionProgressBar"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { FadeInBox } from "Components/FadeInBox"

const CONTENT_WIDTH = 640

interface SubmissionLayoutProps {
  hideNavigation?: boolean
  loading?: boolean
}

export const SubmissionLayout: React.FC<SubmissionLayoutProps> = ({
  children,
  hideNavigation = false,
}) => {
  const context = useSellFlowContext()

  return (
    <Flex height="100dvh" flexDirection="column">
      <SubmissionHeader />

      <SubmissionProgressBar />

      <Flex flex={1} overflowY="auto">
        {!!context?.state?.devMode && !hideNavigation ? (
          <FadeInBox p={2} pt={[2, 4]}>
            <GridColumns>
              <Column span={[4]}>
                <StepsNavigation />
              </Column>

              <Column span={[8]}>
                <Box maxWidth="100vw" width={CONTENT_WIDTH} p={2} pt={[2, 4]}>
                  {children}
                </Box>
              </Column>
            </GridColumns>
          </FadeInBox>
        ) : (
          <FadeInBox width={CONTENT_WIDTH} p={2} pt={[2, 4]} mx="auto">
            <Box
              style={{ paddingBottom: `${BOTTOM_FORM_NAVIGATION_SAVE_AREA}px` }}
            >
              {children}
            </Box>
          </FadeInBox>
        )}
        {!hideNavigation && <BottomFormNavigation />}
      </Flex>
    </Flex>
  )
}
