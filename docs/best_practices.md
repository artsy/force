Since 2014 when Force was first open sourced, Artsy.net's underlying [technology choices have evolved](https://artsy.github.io/blog/2018/10/04/artsy-frontend-history/). As our understanding grows, newer code uses newer techniques. Older code is often left un-updated. It can be difficult to orient oneself around what the current preferred practices are.

This document is a map. Not of Force at a specific time, but a map of how we got here and where we want to go next. This is a living document, expected to be updated regularly, with links to:

- Example code.
- Pull requests with interesting discussions.
- Conversations on Slack.
- Blog posts.

Links should point to specific commits, and not a branch (in case the branch or file is deleted, these links should always work). But it's possible that a file is outdated, that our understanding has moved on since it was linked to; in that case, please update this document.

# Table of Contents

- [Current Preferred Practices](#current-preferred-practices)
- [When writing UI, use Palette](#when-writing-ui-use-palette)
- [For routing, use our framework](#for-routing-use-our-framework)
- [Leverage TypeScript to prevent runtime bugs](#leverage-typescript-to-prevent-runtime-bugs)
- [Avoid copying and try to fix `// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION` flags](#avoid-copying-and-try-to-fix--ts-expect-error-strict_null_check-flags)
- [Use Relay for network requests](#use-relay-for-network-requests)
- [Prefer Relay containers (higher order components) over relay-hooks](#prefer-relay-containers-higher-order-components-over-relay-hooks)
- [Keep file structure organized](#keep-file-structure-organized)
- [Naming, imports and exports](#naming-imports-and-exports)
- [Avoid implicit returns on React components](#avoid-implicit-returns-on-react-components)
- [Write unit tests for new components](#write-unit-tests-for-new-components)
- [Add smoke tests for new routes](#add-smoke-tests-for-new-routes)
- [Adding global script tags](#adding-global-script-tags)
- [Tracking events](#tracking-events)

## Current Preferred Practices

The app is currently written responsively in React, with an ever-decreasing amount of legacy code written in Backbone and Coffeescript. As of Nov 2020, most of our main pages have been migrated, and those [that remain become fewer](https://github.com/artsy/force/pull/6682) with time. Server-side code is built on top of Express.js; however, most server-side needs have been abstracted away by our framework (see below).

### When writing UI, use Palette

Our design system [Palette](https://github.com/artsy/palette) is used for most UI needs. Check out [the docs](https://palette.artsy.net/)!

> If interested in some of the lower-level particulars of how Palette was built, see the [styled-system](https://styled-system.com/) docs.

### For routing, use our framework

Individual sub-apps (represented by routes like `/artist/:id` or `/collect`) are built on top of a home-grown SSR (server-side-rendering) framework based around [Found](https://github.com/4Catalyzer/found), a routing library. Sub-apps are mounted within the [global routes file](https://github.com/artsy/force/blob/main/src/v2/routes.tsx).

To learn how to create a new sub-app, see [the docs](https://github.com/artsy/force/blob/1842553ad34475bc3b804f00c6410d7f23d64f65/docs/adding_new_app.md).

### Leverage TypeScript to prevent runtime bugs

We use [TypeScript](https://www.typescriptlang.org/docs) to maximize runtime code safety.

### Avoid copying and try to fix `// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION` flags

Around mid-2021 we migrated to strict type checking for **all new code**. What this meant in practice was that all _old code_ that failed strict type checking was silenced via a special flag inserted by a script (`// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION`) with all _new code_ expected to adhere to best practices. Going forward, this flag should never be used, and if encounted while working on old code it should be removed and the type error fixed.

### Use Relay for network requests

Data should be loaded from [Metaphysics](https://github.com/artsy/metaphysics), Artsy's GraphQL server. Requests to Metaphysics should be made through [Relay](https://relay.dev).

- [Why Artsy uses Relay](http://artsy.github.io/blog/2017/02/05/Front-end-JavaScript-at-Artsy-2017/#Relay)
- [Artsy JavaScriptures seminar on Relay](https://github.com/artsy/javascriptures/tree/main/4_intro-to-relay)
- Examples
  - [A top-level route-based Relay request](https://github.com/artsy/force/blob/0b291f005763e7c2600a5077786c9510bf655079/src/v2/Apps/Consign/consignRoutes.tsx#L28-L34)
  - [A fragment container](https://github.com/artsy/force/blob/0b291f005763e7c2600a5077786c9510bf655079/src/v2/Apps/Consign/Routes/Offer/OfferDetailApp.tsx#L47-L57)

### Prefer Relay containers (higher order components) over relay-hooks

We have a preference for Relay containers due to [`relay-hooks`](https://github.com/relay-tools/relay-hooks) hooks not being compatible with Relay containers which represent the majority of our components using Relay. (This could change once Relay releases its official hooks implementation.)

### Keep file structure organized

Generally speaking, all new product-centric code is written [inside the `src/v2`](https://github.com/artsy/force/tree/1842553ad34475bc3b804f00c6410d7f23d64f65/src/v2) folder.

Sub-apps are written [inside of `src/v2/Apps` folder](https://github.com/artsy/force/tree/1842553ad34475bc3b804f00c6410d7f23d64f65/src/v2/Apps).

Within a sub-app, things are typically structured like so:

```
├── routes.tsx
├── Components
│   ├── __tests__
│   │   └── Foo.jest.tsx
│   │   └── Bar.jest.tsx
│   ├── Foo.tsx
│   ├── Bar.tsx
├── Routes
│   ├── Home
│   │   ├── HomeApp.tsx
│   │   ├── Components
│   │   │   ├── Foo.tsx
│   │   │   ├── Bar.tsx
│   │   ├── Utils
│   │   │   └── formatCentsToDollars.ts
│   └── Offer
│       ├── OfferDetailApp.tsx
│       ├── Components
│       │   ├── Foo.tsx
│       │   ├── Bar.tsx
```

If there's a component that might be shared across multiple sub-apps, it should go in the top-level [`/v2/Components`](https://github.com/artsy/force/tree/1842553ad34475bc3b804f00c6410d7f23d64f65/src/v2/Components) folder.

Framework code is located in [`v2/Artsy`](https://github.com/artsy/force/tree/1842553ad34475bc3b804f00c6410d7f23d64f65/src/v2/Artsy).

### Naming, imports and exports

Verbose is better than concise:

```js
// avoid
export const Thing = createFragmentContainer(...)

// good
export const ThingFragmentContainer = createFragmentContainer(...)
```

Avoid default exports:

```js
// avoid
export default function foo() {
  ...
}

// good
export function foo() {
  ...
}

export const bar = 'baz'
```

Avoid aliasing imports:

```js
// avoid
import { FooFragmentContainer as Foo } from "./Foo"

// good
import { FooFragmentContainer } from "./Foo"
```

### Avoid implicit returns on React components

When writing multi-line React components, always use the more explicit `return` form:

Avoid:

```tsx
const Foo = props => (
  <Box>
    <Text variant="sm">Hi</Text>
  </Box>
)
```

Preferred:

```tsx
const Foo = props => {
  return (
    <Box>
      <Text variant='sm'>Hi</Text>
    </Box>
  )
)
```

OK:

```tsx
const Foo = ({ title }) => <Text variant="lg">{title}</Text>
```

The reasoning -- and this should be some kind of "Programmers Law" -- is that code is always returned to, either in the form of additions or for debugging. With implicit returns one can't `console.log` intermediate variables or easily add debugger statements, and if one needed to expand the code with a hook or some other piece of functionality the implicit return would need to be unwound.

### Write unit tests for new components

We use [Jest](https://jestjs.io/) for our unit tests, and [Mocha](https://mochajs.org/) for testing legacy code.

Some top-level notes:

- We use [`enzyme`](https://enzymejs.github.io/enzyme/)
- As of 2021, we've also begun using [@testing-library/react](https://testing-library.com/docs/) for our tests. (See [this doc](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) for some common mistakes and best practices.)
- Enzyme is a unit testing library that matches React's internals 1:1. `@testing-library/react` is fundamentally a light weight html-based integration testing library. Depending on what you want to test one might be better suited than the other. Use what you think works best!
- When testing React Hooks, [`@testing-library/react-hooks`](https://www.npmjs.com/package/@testing-library/react-hooks) is the best way to test that level of the stack.
- We avoid snapshot tests; they produce too much churn for too little value.
- We use the `relay-test-utils` package for testing Relay code, and [this helper](https://github.com/artsy/force/blob/0b291f005763e7c2600a5077786c9510bf655079/src/v2/DevTools/setupTestWrapper.tsx) for quickly spinning up tests. There are two versions, one for Enzyme, and one for RTL. Note that this helper can't test `QueryRenderer`s; extract the render code into a fragment-like container and test that. (See the [`RegisterButton` component](https://github.com/artsy/force/blob/main/src/v2/Apps/Auction2/Components/AuctionDetails/__tests__/RegisterButton.jest.tsx#L1) for an example.)

Here are some great examples of what tests and test coverage should look like.

- [RegisterButton.jest.tsx](https://github.com/artsy/force/blob/main/src/v2/Apps/Auction2/Components/AuctionDetails/__tests__/RegisterButton.jest.tsx#L1)
- [ResetPasswordRoute.jest.tsx](https://github.com/artsy/force/blob/main/src/v2/Apps/Authentication/Routes/__tests__/ResetPasswordRoute.jest.tsx#L8)

### Add smoke tests for new routes

We use [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) to ensure that whole sections of the app (e.g., a route like `/artist/:id`) work as expected. If adding a new route or feature that might benefit from a higher level of testing, check out [this folder](https://github.com/artsy/force/tree/main/cypress/integration) for some patterns. We generally add a simple check just to ensure the route doesn't error out.

> Related: For more comprehensive end-to-end testing we use [Integrity](https://github.com/artsy/integrity), also built on Cypress. Check out [the repo](https://github.com/artsy/integrity) for more information.

### Adding global script tags

When adding global script tags (for, say, marketing-related needs), we need to add it to two places: our old app template and our new. See [this PR](https://github.com/artsy/force/pull/7640) for an implementation example.

### Tracking Events

We use [react-tracking](https://github.com/nytimes/react-tracking) for tracking events defined in [artsy/cohesion](https://github.com/artsy/cohesion). To use, import the hook as well as the associated schema bits:

```tsx
import { useTracking } from "react-tracking"
import { ContextModule } from "@artsy/cohesion"

const MyApp = () => {
  const { trackEvent } = useTracking()

  return (
    <Button onClick={() => {
      trackEvent({
        contextModule: ContextModule.myApp,
      })
    }}>
  )
}
```
