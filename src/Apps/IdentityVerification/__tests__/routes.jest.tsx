import { IdentityVerificationAppQueryResponseFixture } from "Apps/IdentityVerification/__fixtures__/routes_IdentityVerificationAppQuery"
import { identityVerificationRoutes } from "Apps/IdentityVerification/identityVerificationRoutes"
import { createMockNetworkLayer } from "DevTools/createMockNetworkLayer"
import type { identityVerificationRoutes_IdentityVerificationAppQuery$rawResponse } from "__generated__/identityVerificationRoutes_IdentityVerificationAppQuery.graphql"
import { createRender } from "found"
import {
  type FarceElementResult,
  type FarceRedirectResult,
  getFarceResult,
} from "found/server"
import { Resolver } from "found-relay"
import type { Environment as IEnvironment } from "react-relay"
import { Environment, RecordSource, Store } from "relay-runtime"

describe("IdentityVerification/routes", () => {
  const idvID =
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    IdentityVerificationAppQueryResponseFixture.identityVerification.internalID
  async function render(
    url,
    mockData: identityVerificationRoutes_IdentityVerificationAppQuery$rawResponse
  ) {
    const network = createMockNetworkLayer({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store }) as IEnvironment

    return (await getFarceResult({
      render: createRender({}),
      resolver: new Resolver(environment),
      routeConfig: identityVerificationRoutes,
      url,
    })) as Partial<FarceRedirectResult & FarceElementResult>
  }

  it("renders the Identity Verification landing page", async () => {
    const { status } = await render(
      `/identity-verification/${idvID}`,
      IdentityVerificationAppQueryResponseFixture
    )

    expect(status).toBe(200)
  })

  it("renders the Identity Verification processing page", async () => {
    const { status } = await render(
      "/identity-verification/processing",
      IdentityVerificationAppQueryResponseFixture
    )

    expect(status).toBe(200)
  })

  it("renders the Identity Verification error page", async () => {
    const { status } = await render(
      "/identity-verification/error",
      IdentityVerificationAppQueryResponseFixture
    )

    expect(status).toBe(200)
  })
})
