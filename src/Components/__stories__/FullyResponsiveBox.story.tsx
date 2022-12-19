import { Box } from "@artsy/palette"
import { States } from "storybook-states"
import {
  FullyResponsiveBox,
  FullyResponsiveBoxProps,
} from "Components/FullyResponsiveBox"

export default {
  title: "Components/FullyResponsiveBox",
}

export const Default = () => {
  return (
    <States<FullyResponsiveBoxProps>
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
            <FullyResponsiveBox
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
