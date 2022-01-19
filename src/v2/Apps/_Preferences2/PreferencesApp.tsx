import { Box, Column, Flex, Separator, Text } from "@artsy/palette"

export const PreferencesApp: React.FC = () => {
  return (
    <>
      <Text variant="xl" mt={4}>Preferences Center</Text>
      <Column
        span={12}
        pb={2}
        display="flex"
        justifyContent="space-between"
      >
        <Flex 
          p={2}
          flexDirection="column"
        >
          <Box
            mt={12}
            flexBasis={"50%"}
          >
            <Text>Subscribe to all</Text>
          </Box>
        </Flex>
        <Flex 
          p={2}
          flexDirection={"column"}
        >
          <Box
            mt={12}
            flexBasis={"50%"}
          >
            <Text>Checkbox</Text>
          </Box>
        </Flex>
      </Column>
      
      <Separator mt={4} />
    </>
  ) 
}