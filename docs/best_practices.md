Since 2014 when Force was first open sourced, Artsy.net's underlying [technology choices have evolved](https://artsy.github.io/blog/2018/10/04/artsy-frontend-history/). As our understanding grows, newer code uses newer techniques. Older code is often left un-updated. It can be difficult to orient oneself around what the current preferred practices are.

This document is a map. Not of Force at a specific time, but a map of how we got here and where we want to go next. This is a living document, expected to be updated regularly, of links to:

- Example code.
- Pull requests with interesting discussions.
- Conversations on Slack.
- Blog posts.

Links should point to specific commits, and not a branch (in case the branch or file is deleted, these links should always work). But it's possible that a file is outdated, that our understanding has moved on since it was linked to; in that case, please update this document.

## Current Preferred Practices

The app is currently written responsively in React, with an ever-increasing amount of legacy code written in Backbone and Coffeescript. As of Nov 2020, most of our main pages have been migrated, and those [that remain become fewer](https://github.com/artsy/force/pull/6682) with time. Server-side code is built on top of Express.js; however, most server-side needs have been abstracted away by our framework (see below).

### When writing UI, use Palette

Our design system [Palette](https://github.com/artsy/palette) is used for most UI needs. Check out [the docs](https://palette.artsy.net/)!

> If interested in some of the lower-level particulars of how Palette was built, see the [styled-system](https://styled-system.com/) docs.

### For routing, use our framework

Individual sub-apps (represented by routes like `/artist/:id` or `/collect`) are built on top of a home-grown SSR (server-side-rendering) framework based around [Found](https://github.com/4Catalyzer/found), a routing library. Sub-apps are mounted within the [global routes file](https://github.com/artsy/force/blob/master/src/v2/routes.tsx).

To learn how to create a new sub-app, see [the docs](https://github.com/artsy/force/blob/1842553ad34475bc3b804f00c6410d7f23d64f65/docs/adding_new_app.md).

### Leverage TypeScript to prevent runtime bugs

We use [TypeScript](https://www.typescriptlang.org/docs) to maximize runtime code safety.

### Use Relay for network requests

Data should be loaded from [Metaphysics](https://github.com/artsy/metaphysics), Artsy's GraphQL server. Requests to Metaphysics should be made through [Relay](https://relay.dev).

- [Why Artsy uses Relay](http://artsy.github.io/blog/2017/02/05/Front-end-JavaScript-at-Artsy-2017/#Relay)
- [Artsy JavaScriptures seminar on Relay](https://github.com/artsy/javascriptures/tree/master/4_intro-to-relay)
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

### Write unit tests for new components

We use [Jest](https://jestjs.io/) for our unit tests, and [Mocha](https://mochajs.org/) for testing legacy code.

Some top-level notes:

- We use [`enzyme`](https://enzymejs.github.io/enzyme/)
- We avoid snapshot tests; they produce too much churn for too little value.
- We use the `relay-test-utils` package for testing Relay code, and [this helper](https://github.com/artsy/force/blob/0b291f005763e7c2600a5077786c9510bf655079/src/v2/DevTools/setupTestWrapper.tsx) for quickly spinning up tests. Note that this helper can't test `QueryRenderer`s; extract the render code into a fragment-like container and test that. (See the [`SoldRecently` component](https://github.com/artsy/force/blob/daad34183723be649e6031859842d65f4d902c21/src/v2/Apps/Consign/Routes/MarketingLanding/Components/__tests__/SoldRecently.jest.tsx) for an example.)

Here are some great examples of what tests and test coverage should look like.

- [ShowApp.jest.tsx](https://github.com/artsy/force/blob/0b291f005763e7c2600a5077786c9510bf655079/src/v2/Apps/Show/__tests__/ShowApp.jest.tsx)
- [ConsignPriceEstimateContext.jest.tsx](https://github.com/artsy/force/blob/0b291f005763e7c2600a5077786c9510bf655079/src/v2/Apps/Consign/Routes/MarketingLanding/Components/GetPriceEstimate/__tests__/ConsignPriceEstimateContext.jest.tsx)

### Add smoke tests for new routes

We use [Cypress.io](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) to ensure that whole sections of the app (e.g., a route like `/artist/:id`) work as expected. If adding a new route or feature that might benefit benefit from a higher level of testing, check out [this folder](https://github.com/artsy/force/tree/master/cypress/integration) for some patterns. We generally add a simple check just to ensure the route doesn't error out.

> Related: For more comprehensive end-to-end testing we use [Integrity](https://github.com/artsy/integrity), also built on Cypress. Check out [the repo](https://github.com/artsy/integrity) for more information.
