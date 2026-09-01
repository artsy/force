import PhotographIcon from "@artsy/icons/PhotographIcon"
import { Box, Flex, Text } from "@artsy/palette"

interface ImageSearchUploadContentProps {
  description: React.ReactNode
}

export const ImageSearchUploadContent: React.FC<
  React.PropsWithChildren<ImageSearchUploadContentProps>
> = ({ description }) => {
  return (
    <Flex width="100%" flexDirection="column" alignItems="center" mb={1}>
      <Box
        width="100%"
        height={["min(48vh, 430px)", 360]}
        minHeight={[260, 320]}
        bg="mono5"
        position="relative"
      >
        <ViewfinderCorner top={2} left={2} borderTop borderLeft />
        <ViewfinderCorner top={2} right={2} borderTop borderRight />
        <ViewfinderCorner bottom={2} left={2} borderBottom borderLeft />
        <ViewfinderCorner bottom={2} right={2} borderBottom borderRight />

        <Flex
          width="100%"
          height="100%"
          px={3}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <PhotographIcon width={52} height={52} fill="mono30" />

          <Text
            variant="sm"
            color="mono60"
            textAlign="center"
            mt={2}
            data-testid="image-search-upload-description"
          >
            {description}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

interface ViewfinderCornerProps {
  borderBottom?: boolean
  borderLeft?: boolean
  borderRight?: boolean
  borderTop?: boolean
  bottom?: number
  left?: number
  right?: number
  top?: number
}

const ViewfinderCorner: React.FC<
  React.PropsWithChildren<ViewfinderCornerProps>
> = ({
  borderBottom,
  borderLeft,
  borderRight,
  borderTop,
  bottom,
  left,
  right,
  top,
}) => {
  return (
    <Box
      position="absolute"
      width={28}
      height={28}
      borderColor="mono100"
      borderBottom={borderBottom ? "2px solid" : undefined}
      borderLeft={borderLeft ? "2px solid" : undefined}
      borderRight={borderRight ? "2px solid" : undefined}
      borderTop={borderTop ? "2px solid" : undefined}
      bottom={bottom}
      left={left}
      right={right}
      top={top}
    />
  )
}
