import {
  FullscreenBox,
  type FullscreenBoxProps,
} from "Components/FullscreenBox"
import { Box } from "@artsy/palette"
import { States } from "storybook-states"

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
            borderColor="mono60"
          >
            <FullscreenBox
              bg="mono10"
              aspectWidth={aspectWidth}
              aspectHeight={aspectHeight}
            />
          </Box>
        )
      }}
    </States>
  )
}
