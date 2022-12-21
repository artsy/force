import { Box, Text } from "@artsy/palette"
import { Layout } from "Apps/Components/Layouts"

export default {
  title: "Components/Layouts",
  parameters: {
    layout: "fullscreen",
  },
}

const EXAMPLE_CONTENT = (
  <Box bg="black10" px={2} py={1} flexGrow={1}>
    <Text variant="xs">Example content</Text>
  </Box>
)

export const Default = () => {
  return <Layout variant="Default">{EXAMPLE_CONTENT}</Layout>
}

export const Blank = () => {
  return <Layout variant="Blank">{EXAMPLE_CONTENT}</Layout>
}

export const LogoOnly = () => {
  return <Layout variant="LogoOnly">{EXAMPLE_CONTENT}</Layout>
}

export const NavOnly = () => {
  return <Layout variant="NavOnly">{EXAMPLE_CONTENT}</Layout>
}

export const ContainerOnly = () => {
  return <Layout variant="ContainerOnly">{EXAMPLE_CONTENT}</Layout>
}
