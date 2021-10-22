import { injectGlobalStyles, ThemeProviderV3 } from "@artsy/palette"

const { GlobalStyles } = injectGlobalStyles()

export const decorators = [
  Story => {
    return (
      <ThemeProviderV3>
        <>
          <GlobalStyles />
          <Story />
        </>
      </ThemeProviderV3>
    )
  },
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
