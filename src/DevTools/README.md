# Guide to mocking relay data using `renderRelayTree`, `mockData`, and `mockMutationResults`

> [!WARNING]
> These docs refer to deprecated utility functions backed by enzyme. For all new
> tests, use `@testing-library/react` and the `setupTestWrapperTL` helper. See
> our [best practices][] doc for more guidelines.

[best practices]: https://github.com/artsy/force/blob/main/docs/best_practices.md#testing

## The basics

If your are testing a component that makes a query to metaphysics, you can use the `renderRelayTree` helper to mock out the data that would be returned by metaphysics. Previously this was done with the `mockResolvers` prop, but now we have an easier and less confusing way: `mockData` and `mockMutationResults`. The idea is that these properties should match the exact data shape that metaphysics would return.

e.g. if you have a component with a query fragment like so:

```graphql
fragment ArtistDetails_artist on Artist {
  name
  birthday
  deathday
}
```

You would do this:

```ts
await renderRelayTree({
  Component: ArtistDetailsFragmentContainer,
  query: graphql`
    query ArtistDetailsTestQuery {
      artist(id: "unused") {
        ...ArtistDetails_artist
      }
    }
  `,
  mockData: {
    artist: {
      name: "Banksy",
      birthday: "unknown",
      deathday: null,
    },
  },
})
```

It handles field aliases just like you'd expect. So if you have

```graphql
fragment ArtistDetails_artist on Artist {
  birthYear: birthday(format: "YYYY")
  birthdayFull: birthday(format: "Do MM YYYY")
}
```

Then your `mockData` can be like

```ts
mockData = {
  artist: {
    birthYear: "1987",
    birthdayFull: "12th April 1987",
  },
}
```

Similarly, if you have a component that does mutations and you want to mock the return result of that mutation, you can do it in the same way but using the `mockMutationResults` prop.

```ts
await renderRelayTree({
  Component: ArtistDetailsFragmentContainer,
  query: graphql`
    query ArtistDetailsTestQuery {
      artist(id: "unused") {
        ...ArtistDetails_artist
      }
    }
  `,
  mockData: {
    artist: {
      name: "Banksy",
      birthday: "unknown",
      deathday: null,
    },
  },
  mockMutationResults: {
    // this mutation doesn't actually exist, it's just an illustration
    setArtistBirthday: {
      // remember this represents the output that is returned from the mutation request
      artist: {
        name: "Banksy",
        birthday: "2019-01-14T12:38:42.931Z",
      },
    },
  },
})
```

## Dealing with union types

Union types should be disambiguated using the `__typename` property. e.g. for a response from an `/order` app mutation, do something like this:

```ts
mockMutationResults = {
  commerceSetShipping: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationSuccess",
      order: {
        ...BuyOrderWithShippingDetails,
      },
    },
  },
}
```

or this:

```ts
mockMutationResults = {
  commerceSetShipping: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "validation",
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
      },
    },
  },
}
```

## Using functions to return different results

Both `mockData` and `mockMutationResults` can take functions as top-level values, to return different data based on query variables.

```ts
mockMutationResults = {
  commerceSetShipping: (_, { input }) => {
    if (input.shipping.country === "US") {
      return {
        orderOrError: {
          __typename: "CommerceOrderWithMutationSuccess",
          order: {
            ...BuyOrderWithShippingDetails,
          },
        },
      }
    } else {
      return {
        orderOrError: {
          __typename: "CommerceOrderWithMutationFailure",
          error: {
            type: "validation",
            code: "address_outside_usa",
            data: null,
          },
        },
      }
    }
  },
}
```

## Guide to `createTestEnv`

`createTestEnv` creates a higher level interface to `renderRelayTree` which takes care of some basic plumbing that can be useful in tests that deal with page-level components:

- Mocking network failures
- Surfacing resolver errors that would otherwise be swallowed by user-facing error handling.
- Modifying mocked mutation results on the fly
- Managing mock resets
- Testing route transitions
- Using query/mutation variables in assertions

It also aims to act as a platform on which to add more useful plumbing as use-cases emerge.

Because `createTestEnv` is mostly concerned with page-level components it asks you to first create a 'test page' class by extending `RootTestPage`.

### Test pages

A test page is a class which implicitly wraps an enzyme `ReactWrapper`. It is supposed to clean up your test logic by hiding common operations and element selections. Here's an example

```ts
class CounterTestPage extends RootTestPage {
  get incrementButton() {
    return this.find("button").filterWhere(btn => btn.text().match(/increment/))
  }
  get decrementButton() {
    return this.find("button").filterWhere(btn => btn.text().match(/decrement/))
  }
  async clickIncrement() {
    this.incrementButton.simulate("click")
    await this.update()
  }
  async clickDecrement() {
    this.decrementbutton.simulate("click")
    await this.update()
  }
  get currentCount() {
    return Number(this.text().match(/The current count is (\d+)\./)[1])
  }
}
```

You use a test page class to construct a test env.

```ts
const env = createTestEnv({
  // `TestPage` is the interface to the ReactWrapper that you use during tests
  TestPage: CounterTestPage,
  // `Component` is the page itself. Assumed to be a fragment container
  Component: CounterPage,
  // `query` is the page's query. Normally this will be a simple query with a
  // single fragment spread.
  query: graphql`
    query {
      counter(id: "1234") {
        count
      }
    }
  `,
  // `defaultData` is the default data to resolve for the query when rendering
  // the Component
  defaultData: {
    /* mock fixtures */
    counter: {
      count: 0,
    },
  },
  // `defaultMutationResults` (optional) is the default data to resolve for mutations executed
  // with `commitMutation`
  defaultMutationResults: {
    /* mock fixtures */
  },
})
```

You can then use the test env to construct pages to use in tests

```ts
const page = await env.buildPage()
expect(page.currentCount).toBe(0)
await page.clickIncrement()
expect(page.currentCount).toBe(1)
```

If you need to modify the data used to construct a page, you can pass it into
`buildPage`.

```ts
const page = await env.buildPage({
  mockData: { /* different mock fixtures */ }
  mockMutationResult: { /* different mutation mocks */ }
})
```

### Dynamic things

If you need to modify the mutation results on-the-fly, you can use `env.mutations`

```ts
const page = await env.buildPage()
env.mutations.useResultsOnce({
  incrementCounter: {
    ...
  }
})
```

If you need to check the contents of the last mutation variables you can do this

```ts
expect(env.mutations.lastFetchVariables).toMathObject({
  input: {
    nextCount: 1,
  },
})
```

You can also get at the underlying mock fetch function if you need it

```ts
expect(env.mutations.mockFetch).toHaveBeenCalledTimes(0)
await page.clickIncrement()
expect(env.mutations.mockFetch).toHaveBeenCalledTimes(1)
```

You can mock network failures

```ts
env.mutations.mockNetworkFailureOnce()
await page.clickIncrement()
expect(page.text()).toMatch("Netork error. Try again later.")
await page.clickIncrement()
expect(page.text()).not.toMatch("Network error. Try again later.")
```

You can check whether a route change was requested

```ts
expect(env.routes.mockPushRoute).toHaveBeenCalledWith("/home")
```

### Going forward

If you discover usage patterns that would be well-suited to hoisting into `createTestEnv`, do so!
The end goal is to make it faster and then release it as a standalone library for the relay community.
