import {
  RelayEnvironmentProvider,
  graphql,
  useLazyLoadQuery,
} from "react-relay"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"

import { PartnerOfferTimerItemTestQuery } from "__generated__/PartnerOfferTimerItemTestQuery.graphql"
import { PartnerOfferTimerItem } from "Apps/Order/Components/PartnerOfferTimerItem"
import { act, render, screen } from "@testing-library/react"
import { Suspense } from "react"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { DateTime } from "luxon"

jest.unmock("react-relay")

const TestRenderer = () => {
  const data = useLazyLoadQuery<PartnerOfferTimerItemTestQuery>(
    graphql`
      query PartnerOfferTimerItemTestQuery @relay_test_operation {
        order: commerceOrder(id: "123") {
          ...PartnerOfferTimerItem_order
        }
      }
    `,
    {}
  )
  return <PartnerOfferTimerItem order={data.order as any} />
}

const renderTree = async fragmentData => {
  const relayEnv = createMockEnvironment()

  const wrapper = render(
    <RelayEnvironmentProvider environment={relayEnv}>
      <Suspense fallback="Test fragment not loaded...">
        <TestRenderer />
      </Suspense>
    </RelayEnvironmentProvider>
  )

  await act(() => {
    relayEnv.mock.resolveMostRecentOperation(operation => {
      const data = MockPayloadGenerator.generate(operation, {
        CommerceOrder: () => ({
          ...fragmentData,
        }),
      })
      return data
    })
  })

  return { wrapper, relayEnv }
}

describe("PartnerOfferTimerItem", () => {
  it("renders nothing if the state is not pending", async () => {
    const { wrapper } = await renderTree({ displayState: "SUBMITTED" })
    await flushPromiseQueue()

    expect(wrapper.container).toBeEmptyDOMElement()
  })

  it("renders nothing if the timer cannot parse its input as dates", async () => {
    const { wrapper } = await renderTree({
      displayState: "PENDING",
      stateExpiresAt: null,
      stateupdatedAt: "???",
    })
    await flushPromiseQueue()

    expect(wrapper.container).toBeEmptyDOMElement()
  })

  it("renders a timer if the state is pending", async () => {
    const startAt = DateTime.local().plus({ days: 1 }).toString()
    const endAt = DateTime.local().plus({ days: 2 }).toString()

    await renderTree({
      displayState: "PENDING",
      stateExpiresAt: endAt,
      stateupdatedAt: startAt,
    })
    await flushPromiseQueue()

    expect(screen.getByText("1d 23h left")).toBeInTheDocument()
    expect(screen.getByText(/Purchase by.+E[DS]T$/)).toBeInTheDocument()
  })
})
