import { injectGlobalStyles, ThemeProviderV3 } from "@artsy/palette"
import { MediaContextProvider } from "v2/Utils/Responsive"

const { GlobalStyles } = injectGlobalStyles()

export const decorators = [
  Story => {
    return (
      <MediaContextProvider>
        <ThemeProviderV3>
          <GlobalStyles />
          <Story />
        </ThemeProviderV3>
      </MediaContextProvider>
    )
  },
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
