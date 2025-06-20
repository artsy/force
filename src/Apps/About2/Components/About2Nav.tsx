import { Pill, Stack, useTheme } from "@artsy/palette"
import { Z } from "Apps/Components/constants"

export const About2Nav = () => {
  const { theme } = useTheme()

  return (
    <Stack
      gap={1}
      p={1}
      borderRadius={999}
      flexDirection="row"
      bg="mono0"
      width="fit-content"
      position="fixed"
      bottom={2}
      left="50%"
      zIndex={Z.globalNav}
      style={{
        transform: "translateX(-50%)",
        boxShadow: theme.effects.dropShadow,
      }}
    >
      <Pill>Mission and vision</Pill>
      <Pill>Our story</Pill>
      <Pill>What we do</Pill>
      <Pill>Our team</Pill>
      <Pill>Press</Pill>
      <Pill>Contact</Pill>
    </Stack>
  )
}
