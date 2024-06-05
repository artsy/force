import { Flex, GridColumns, Column, Box } from "@artsy/palette"
import { BottomFormNavigation } from "Apps/Sell/Components/BottomFormNavigation"
import { StepsNavigation } from "Apps/Sell/Components/StepsNavigation"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"

interface SubmissionLayoutProps {
  hideNavigation?: boolean
}

export const SubmissionLayout: React.FC<SubmissionLayoutProps> = ({ children, hideNavigation = false }) => {
  return (
    <Flex height="100vh" flexDirection="column">
      <SubmissionHeader />

      <Flex flex={1} p={2} overflowY="auto">
        <GridColumns>
          <Column span={[4]}>
            {!hideNavigation && <StepsNavigation />}
          </Column>

          <Column span={[8]}>
            <Box width={800}>
              {children}
            </Box>
          </Column>
        </GridColumns>
      </Flex>

      {!hideNavigation && <BottomFormNavigation />}
    </Flex>
  )
}