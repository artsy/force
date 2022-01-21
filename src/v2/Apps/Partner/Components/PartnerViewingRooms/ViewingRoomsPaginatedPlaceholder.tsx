import {
  Box,
  BoxProps,
  Column,
  Flex,
  GridColumns,
  ResponsiveBox,
  SkeletonText,
} from "@artsy/palette"

interface ViewingRoomsPaginatedPlaceholderProps extends BoxProps {
  count: number
}

export const ViewingRoomsPaginatedPlaceholder: React.FC<ViewingRoomsPaginatedPlaceholderProps> = ({
  count,
  ...rest
}) => {
  return (
    <>
      <SkeletonText variant="lg" mb={6}>
        Past Viewing Rooms
      </SkeletonText>
      <GridColumns mb={6} gridRowGap={[2, 4]} {...rest}>
        {[...Array(count)].map((_, i) => (
          <Column key={i} span={[6, 6, 3, 3]}>
            <Box>
              <ResponsiveBox
                aspectWidth={263}
                aspectHeight={222}
                maxWidth="100%"
                bg="black10"
              />
              <Flex mt={1} justifyContent="space-between">
                <Box>
                  <SkeletonText variant="lg">Viewing Room</SkeletonText>
                  <SkeletonText>Viewing Room Title</SkeletonText>
                  <SkeletonText>Exhibition Period</SkeletonText>
                </Box>
              </Flex>
            </Box>
          </Column>
        ))}
      </GridColumns>
    </>
  )
}
