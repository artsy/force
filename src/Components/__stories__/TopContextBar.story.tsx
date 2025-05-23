import { Box } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { States } from "storybook-states"
import { TopContextBar, type TopContextBarProps } from "../TopContextBar"

const SRC =
  "https://d32dm0rphc51dk.cloudfront.net/oLqZ0aVqFninjVCnbYmyAA/normalized.jpg"

export default {
  title: "Components/TopContextBar",
}

export const Default = () => (
  <States<TopContextBarProps>
    states={[
      {},
      { displayBackArrow: true },
      { displayBackArrow: true, href: "#example" },
      {
        displayBackArrow: true,
        href: "#example",
        src: SRC,
      },
      {
        href: "#example",
        src: SRC,
      },
      { src: SRC },
    ]}
  >
    <TopContextBar>Hello world</TopContextBar>
  </States>
)

export const InsideAnAppContainer = () => {
  return (
    <AppContainer border="1px dotted" borderColor="mono10">
      <TopContextBar displayBackArrow>
        <Box>
          Foo Bar　
          <Box display="inline-block" color="mono60">
            Bar Baz
          </Box>
        </Box>
      </TopContextBar>
    </AppContainer>
  )
}
