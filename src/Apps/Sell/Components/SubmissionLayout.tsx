import { Box, Column, Flex, GridColumns } from "@artsy/palette"
import { BottomFormNavigation } from "Apps/Sell/Components/BottomFormNavigation"
import { StepsNavigation } from "Apps/Sell/Components/StepsNavigation"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"

const CONTENT_WIDTH = 600

interface SubmissionLayoutProps {
  hideNavigation?: boolean
}

export const SubmissionLayout: React.FC<SubmissionLayoutProps> = ({
  children,
  hideNavigation = false,
}) => {
  const context = useSellFlowContext()

  return (
    <Flex height="100vh" flexDirection="column">
      <SubmissionHeader />

      <Flex flex={1} p={2} overflowY="auto" mx="auto">
        {!!context?.state?.devMode && !hideNavigation ? (
          <GridColumns>
            <Column span={[4]}>
              <StepsNavigation />
            </Column>

            <Column span={[8]}>
              <Box width="60vw" maxWidth={CONTENT_WIDTH} mt={4}>
                {children}
              </Box>
            </Column>
          </GridColumns>
        ) : (
          <Box width="80vw" maxWidth={CONTENT_WIDTH} mt={4}>
            {children}
          </Box>
        )}
      </Flex>

      {!hideNavigation && <BottomFormNavigation />}
    </Flex>
  )
}
