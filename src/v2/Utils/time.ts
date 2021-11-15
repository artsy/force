import { timeQuery } from "v2/__generated__/timeQuery.graphql"
import { graphql } from "react-relay"
import { Environment, fetchQuery } from "relay-runtime"

const getLocalTimestampInMilliSeconds = () => {
  return Date.now()
}

export async function getOffsetBetweenGravityClock(
  relayEnvironment: Environment
): Promise<number> {
  const query = graphql`
    query timeQuery {
      system {
        time {
          unix
        }
      }
    }
  `

  const fetchSystemTime = () => {
    return fetchQuery<timeQuery>(
      relayEnvironment,
      query,
      {},
      // FIXME: Update after definitely-typed and relay docs are updated
      // @ts-ignore
      {
        force: true,
      }
    )
  }

  const getGravityTimestampInMilliSeconds = async () => {
    const startTime = getLocalTimestampInMilliSeconds()
    const data = await fetchSystemTime()

    const possibleNetworkLatencyInMilliSeconds =
      (getLocalTimestampInMilliSeconds() - startTime) / 2
    const serverTimestampInMilliSeconds =
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      data.system.time.unix * 1e3 + possibleNetworkLatencyInMilliSeconds

    return serverTimestampInMilliSeconds
  }

  try {
    const gravityClock = await getGravityTimestampInMilliSeconds()
    const localClock = getLocalTimestampInMilliSeconds()

    const offsetInMilliSeconds = localClock - gravityClock

    return offsetInMilliSeconds
  } catch (error) {
    // If something goes wrong (e.g. network error), just fall back to "no offset" since there is nothing we can do.
    return 0
  }
}
