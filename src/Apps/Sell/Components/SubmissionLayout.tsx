import { Flex, GridColumns, Column, Box } from "@artsy/palette"
import { BottomFormNavigation } from "Apps/Sell/Components/BottomFormNavigation"
import { StepsNavigation } from "Apps/Sell/Components/StepsNavigation"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"

export const SubmissionLayout: React.FC = (props) => {
  return (
    <Flex height="100vh" flexDirection="column">
      <SubmissionHeader />

      <Flex flex={1} p={2} overflowY="auto">
        <GridColumns>
          <Column span={[4]}>
            <StepsNavigation />
          </Column>

          <Column span={[8]}>
            <Box width={800}>
              {props.children}
            </Box>
          </Column>
        </GridColumns>
      </Flex>

      <BottomFormNavigation />
    </Flex>
  )
}