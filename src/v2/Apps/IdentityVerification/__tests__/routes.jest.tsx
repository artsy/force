import { IdentityVerificationAppQueryResponseFixture } from "v2/Apps/IdentityVerification/__fixtures__/routes_IdentityVerificationAppQuery"
import { createMockNetworkLayer2 } from "v2/DevTools"
import { Resolver } from "found-relay"
import {
  FarceElementResult,
  FarceRedirectResult,
  getFarceResult,
} from "found/server"
import { Environment, RecordSource, Store } from "relay-runtime"

import { identityVerificationRoutes } from "v2/Apps/IdentityVerification/identityVerificationRoutes"

import { identityVerificationRoutes_IdentityVerificationAppQueryRawResponse } from "v2/__generated__/identityVerificationRoutes_IdentityVerificationAppQuery.graphql"
import { createRender } from "found"

describe("IdentityVerification/routes", () => {
  const idvID =
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    IdentityVerificationAppQueryResponseFixture.identityVerification.internalID
  async function render(
    url,
    mockData: identityVerificationRoutes_IdentityVerificationAppQueryRawResponse
  ) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

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
