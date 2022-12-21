import { Box } from "@artsy/palette"
import { States } from "storybook-states"
import { FullscreenBox, FullscreenBoxProps } from "Components/FullscreenBox"

export default {
  title: "Components/FullscreenBox",
}

export const Default = () => {
  return (
    <States<FullscreenBoxProps>
      states={[
        { aspectWidth: 4, aspectHeight: 3 },
        { aspectWidth: 3, aspectHeight: 4 },
        { aspectWidth: 1, aspectHeight: 1 },
      ]}
    >
      {({ aspectWidth, aspectHeight }) => {
        return (
          <Box
            width="100%"
            height={400}
            border="1px dotted"
            borderColor="black60"
          >
            <FullscreenBox
              bg="black10"
              aspectWidth={aspectWidth}
              aspectHeight={aspectHeight}
            />
          </Box>
        )
      }}
    </States>
  )
}
