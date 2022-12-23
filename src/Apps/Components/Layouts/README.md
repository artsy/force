# Layouts

## Available Layouts

- `Default`: current layout with fixed nav and footer. Contained by app container.
- `NavOnly`: Same as default but without the footer.
- `ContainerOnly`: Same as default but without the nav and without the footer.
- `Blank`: Completely empty layout
- `LogoOnly`: App container + our logotype. Used in the error pages. Should probably be used by the order app and various pages on the my collection app.

## Adding a Layout

Feel free to add a custom layout for your route(s), but meet the following criteria:

- Must include `AppToasts` component
- Some element must be a `main` tag with an `id="main` (prefer `LayoutMain`)
- A full-width element must have `overflowX="hidden"` to prevent scrollbars when used with `FullBleed`
