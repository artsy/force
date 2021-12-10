# Migrating or Working with Palette v3

#### Related Links:

- [Palette v3 Theme Tokens](https://github.com/artsy/palette/blob/master/packages/palette/src/themes/v3.tsx)
- [Palette Storybook](https://palette-storybook.artsy.net/?path=/story/theme--theme)
- [Force Storybook](https://force-storybook.artsy.net/?path=/story/molecules-kitchen-sink--headers)

We've recently starting migrating our Artsy.net routes over to the [latest version of Palette (v3)](https://github.com/artsy/palette/blob/master/packages/palette/src/themes/v3.tsx), our design system. Since there are a few differences between v2 and v3, we wanted to be sure to provide a migration path so that v2 and v3 apps can co-exist without problems.

There are a few different ways one can start to work with Palette v3:

1. **Preferred**: Add a `theme: "v3"` setting to your route config
1. Wrap the root of your React tree in a `<ThemeProviderV3>` context provider
1. Use the `useThemeConfig` hook

> Note: Because we can't statefully determine at runtime which theme is being used, _all_ `space` token values for v2 and v3 are returned via typescript intellisense. This means, when using the `v3` theme, that `mt={3}` is an option but in the `v3` theme that value doesn't exist. If a value collapses to 0 when viewing the UI then it means that it's not in the theme. We plan to clean this up in the future. And if in doubt, [check out the theme values directly](https://github.com/artsy/palette/blob/master/packages/palette/src/themes/v3.tsx).

### Example 1: Updating Route Config

> See [here](https://github.com/artsy/force/blob/main/src/v2/Apps/ArtistSeries/artistSeriesRoutes.tsx#L14) for a real-world example.

```jsx
export const appRoutes = [
  {
    theme: "v3",
    path: "/foo",
    Component: () => {
      return (
        <Box>
          <Text variant="xl">Hi, i'm a v3 component</Text>
        </Box>
      )
    },
  },
  {
    path: "/bar",
    Component: () => {
      return (
        <Box>
          <Text variant="title">
            Hi, i'm a v2 component (which is set by default)
          </Text>
        </Box>
      )
    },
  },
]
```

### Example 2: Use the `<ThemeProviderV3>` Context Provider

> See [here](https://github.com/artsy/force/blob/96d47ae5efdd63741a44ae837ebddf162eea9698/src/v2/Apps/Example/ExampleApp.tsx#L29) for a real-world example.

```jsx
import { Box, Text, ThemeProviderV3 } from "@artsy/palette"

export const MyApp = props => {
  return (
    <ThemeProviderV3>
      <Box>
        <Text variant="xl">Hi, I'm a V3 component</Text>
      </Box>
    </ThemeProviderV3>
  )
}
```

## Example 3: Use the `useThemeConfig` hook

> See [here](https://github.com/artsy/force/blob/main/src/v2/Components/Footer/Footer.tsx#L219-L226) for a real-world example.

The `useThemeConfig` hook can be used within components that are _shared_ between v2 and v3 apps, and thus can't be converted wholesale to v3. (A good example of this is the Artwork Filter, which is a complex component used in a couple different apps.)

```jsx
import { useThemeConfig, Box, Text, TextVariant } from "@artsy/palette"

const MyComponent = props => {
  const tokens = useThemeConfig({
    v2: {
      px: 5,
      variant: "title" as TextVariant,
    },
    v3: {
      px: 2,
      variant: "lg" as TextVariant,
    },
  })

  return (
    <Box px={tokens.px}>
      <Text variant={tokens.variant}>Hi</Text>
    </Box>
  )
}
```
