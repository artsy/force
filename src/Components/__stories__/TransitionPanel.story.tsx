import { Text, Box, Button, ModalDialog, Stack } from "@artsy/palette"
import {
  TransitionPanelProvider,
  useTransitionPanel,
} from "Components/TransitionPanel"

export default {
  title: "Components/TransitionPanel",
}

export const Default = () => {
  return (
    <ModalDialog onClose={() => {}} dialogProps={{ width: "fit-content" }}>
      <TransitionPanelProvider>
        <PanelOne />
        <PanelTwo />
        <PanelThree />
      </TransitionPanelProvider>
    </ModalDialog>
  )
}

const PanelOne = () => {
  const { navigateTo } = useTransitionPanel()

  return (
    <Box
      border="1px dotted"
      borderColor="black60"
      p={1}
      width={300}
      height={200}
    >
      <Stack gap={1}>
        <Text variant="lg">First panel</Text>

        <Stack gap={0.5} flexDirection="row">
          <Button
            variant="secondaryBlack"
            size="small"
            onClick={() => navigateTo(1)}
          >
            Go to 2
          </Button>

          <Button
            variant="secondaryBlack"
            size="small"
            onClick={() => navigateTo(2)}
          >
            Go to 3
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

const PanelTwo = () => {
  const { navigateTo } = useTransitionPanel()

  return (
    <Box
      border="1px dotted"
      borderColor="black60"
      p={1}
      width={400}
      height={300}
    >
      <Stack gap={1}>
        <Text variant="lg">Second panel</Text>

        <Stack gap={0.5} flexDirection="row">
          <Button
            variant="secondaryBlack"
            size="small"
            onClick={() => navigateTo(0)}
          >
            Go to 1
          </Button>

          <Button
            variant="secondaryBlack"
            size="small"
            onClick={() => navigateTo(2)}
          >
            Go to 3
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

const PanelThree = () => {
  const { navigateTo } = useTransitionPanel()
  return (
    <Box
      border="1px dotted"
      borderColor="black60"
      p={1}
      width={500}
      height={400}
    >
      <Stack gap={1}>
        <Text variant="lg">Third panel</Text>

        <Stack gap={0.5} flexDirection="row">
          <Button
            variant="secondaryBlack"
            size="small"
            onClick={() => navigateTo(0)}
          >
            Go to 1
          </Button>

          <Button
            variant="secondaryBlack"
            size="small"
            onClick={() => navigateTo(1)}
          >
            Go to 2
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
