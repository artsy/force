import { getOffsetBetweenGravityClock } from "Utils/time"

jest.mock("relay-runtime", () => ({ fetchQuery: jest.fn() }))
import { fetchQuery } from "react-relay"
const mockFetchQuery = fetchQuery as jest.Mock<any>

const SECONDS = 1000
const MINUTES = 60 * SECONDS

const dateNow = 1525983752000 // Thursday, May 10, 2018 8:22:32.000 PM UTC in milliseconds

it("returns an offset between current time and system time", async () => {
  jest.useFakeTimers()
  Date.now = () => dateNow

  // Set up a situation where the client's clock is ahead of Gravity's clock by 10 minutes.
  mockFetchQuery.mockImplementation(() => ({
    toPromise: jest.fn().mockResolvedValue({
      system: {
        time: {
          unix: (dateNow - 10 * MINUTES) * 1e-3,
        },
      },
    }),
  }))

  jest.runAllTicks()

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  expect(await getOffsetBetweenGravityClock(null)).toEqual(10 * MINUTES)
})
