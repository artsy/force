import { ConnectedModalDialog } from "v2/Apps/Order/Dialogs"
import { SystemContext, SystemContextProps } from "v2/System"
import { MockBoot, createMockFetchQuery, renderRelayTree } from "v2/DevTools"
import { merge } from "lodash"
import { ReactElement, useContext } from "react"
import * as React from "react"
import { GraphQLTaggedNode } from "react-relay"
import { Network } from "relay-runtime"
import { Breakpoint } from "v2/Utils/Responsive"
import { RootTestPage } from "./RootTestPage"

class Mutations<MutationNames extends string> {
  constructor(
    /**
     * resolvers is an object which maps mutation names to jest.Mock functions
     * Use this if you want to intercept resolution on the fly.
     *
     * e.g. mutations.resolvers.createCreditCard.mockImplementationOnce(...)
     */
    public resolvers: Record<MutationNames, jest.Mock>
  ) {
    this.resolvers = resolvers
  }
  /**
   * useResultsOnce
   * @param muationResults an object which should look like the json returned by
   * metaphysics after executing a mutation
   */
  useResultsOnce = (mutationResults: Partial<Record<MutationNames, any>>) => {
    Object.entries(mutationResults).forEach(([k, v]) => {
      if (typeof v === "function") {
        this.resolvers[k].mockImplementationOnce(v)
      } else {
        this.resolvers[k].mockReturnValueOnce(v)
      }
    })
  }

  mockNetworkFailureOnce = () => {
    this.mockFetch.mockImplementationOnce(() => ({
      toPromise: () => Promise.reject(new Error("failed to fetch")),
    }))
  }

  get lastFetchVariables() {
    return this.mockFetch.mock.calls[this.mockFetch.mock.calls.length - 1][1]
  }

  readonly mockFetch = jest.fn()
}

class Routes {
  mockPushRoute = jest.fn()
  mockOnTransition = jest.fn()
}

class TestEnv<MutationNames extends string, TestPage extends RootTestPage> {
  constructor(
    private opts: {
      Component: React.ComponentType<any>
      query: GraphQLTaggedNode
      defaultData: object
      defaultMutationResults?: Record<MutationNames, any>
      defaultBreakpoint?: Breakpoint
      systemContextProps?: SystemContextProps
      TestPage: { new (): TestPage }
    }
  ) {
    this.opts = opts

    const mutationResolvers: Record<MutationNames, jest.Mock> = Object.entries(
      opts.defaultMutationResults || {}
    ).reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: jest.fn((...args) => (typeof v === "function" ? v(...args) : v)),
      }),
      {} as any
    )

    this.mockQuery = jest.fn()
    this.mutations = new Mutations(mutationResolvers)
  }

  mockQuery: jest.Mock
  mutations: Mutations<MutationNames>
  routes = new Routes()
  readonly headTags: Array<ReactElement<any>> = []

  private errors: any[] = []

  clearErrors = () => {
    this.errors = []
  }

  clearMocksAndErrors = () => {
    const _errors = this.errors
    this.errors = []
    // @ts-ignore
    this.headTags = []
    this.mutations.mockFetch.mockClear()
    this.routes.mockOnTransition.mockClear()
    this.routes.mockPushRoute.mockClear()
    Object.keys(this.mutations.resolvers).forEach(key =>
      this.mutations.resolvers[key].mockClear()
    )
    if (_errors.length !== 0) {
      throw new Error(_errors as any)
    }
  }

  /**
   * buildPage
   * @param opts.mockData supplementary mock data to supply to the page
   * @param opts.mockMutationResults supplementary mutation results to use
   * @param opts.breakpoint set the breakpoint for the page
   */
  buildPage = async ({
    mockData,
    mockMutationResults,
    breakpoint,
  }: {
    mockData?: object
    mockMutationResults?: Record<MutationNames, any>
    breakpoint?: Breakpoint
  } = {}): Promise<TestPage> => {
    const {
      Component,
      // tslint:disable-next-line:no-shadowed-variable
      TestPage,
      query,
      defaultData,
      defaultBreakpoint,
      systemContextProps,
    } = this.opts
    const page = new TestPage() as TestPage

    if (mockMutationResults) {
      this.mutations.useResultsOnce(mockMutationResults)
    }

    const fetchQuery = createMockFetchQuery({
      mockData: { ...defaultData, ...mockData },
      mockMutationResults: this.mutations.resolvers,
    })

    // surface resolver errors from fetchQuery that otherwise get swallowed by
    // error handling in the pages themselves
    const wrappedFetchQuery = (operation, variables) =>
      fetchQuery(operation, variables).catch(e => {
        this.errors.push(e)
        throw e
      })

    this.mutations.mockFetch.mockImplementation(wrappedFetchQuery)
    this.mockQuery.mockImplementation(wrappedFetchQuery)

    // Switch on mutation/query when making requests to help make assertions
    // Seems we only make assertions about mutations right now
    const mockNetwork = Network.create((operation, variableValues) => {
      return operation.operationKind === "mutation"
        ? this.mutations.mockFetch(operation, variableValues)
        : this.mockQuery(operation, variableValues)
    })

    // @ts-ignore
    page.root = await renderRelayTree({
      Component: (props: any) => {
        // MockBoot overwrites system context, but we want to preserve the
        // context set higher in the tree by MockQueryRenderer
        let contextBypass = useContext(SystemContext)

        if (systemContextProps) {
          contextBypass = merge(contextBypass, systemContextProps)
        }

        return (
          <MockBoot
            breakpoint={breakpoint || defaultBreakpoint}
            headTags={this.headTags}
          >
            <SystemContext.Provider value={contextBypass}>
              <Component
                {...props}
                router={{ push: this.routes.mockPushRoute }}
                route={{ onTransition: this.routes.mockOnTransition }}
              />
              <ConnectedModalDialog />
            </SystemContext.Provider>
          </MockBoot>
        )
      },

      query,
      mockNetwork,
    })

    return page as any
  }
}

/**
 * createTestEnv
 *
 * Creates a testing environment for a relay-powered component. The environment
 * has useful tooling for dealing with relay data. Especially for mocking mutation
 * results and for abstracting away boilerplate.
 *

 * @param opts.Component the component to render. Will be passed props
  `relay: RelayProp`, a mock for `route: { onTransition(cb): void {} }` and a
  mock for `router: { push(route: string) }, along with any query-derived props`
 * @param opts.query The graphql query for the component
 * @param opts.defaultData The default mock data which metaphysics would return
 * for the given query
 * @param opts.defaultMutationResults The default results which metaphysics would
 * return for any mutations executed on the page. If the component executes mutations
 * and you want to test them, they must be declared here.
 * @param opts.defaultBreakpoint The default breakpoint to render the page at
 * @param opts.TestPage The page wrapper class to use. Must extend RootTestPage
 * TODO: add support for query variables
 */
export function createTestEnv<
  MutationNames extends string,
  TestPage extends RootTestPage
>(opts: TestEnv<MutationNames, TestPage>["opts"]) {
  return new TestEnv(opts)
}
