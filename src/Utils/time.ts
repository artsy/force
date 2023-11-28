import { timeQuery } from "__generated__/timeQuery.graphql"
import { Environment, fetchQuery, graphql } from "react-relay"

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
      {
        fetchPolicy: "network-only",
      }
    ).toPromise()
  }

  const getGravityTimestampInMilliSeconds = async () => {
    const startTime = getLocalTimestampInMilliSeconds()
    const data = await fetchSystemTime()

    const possibleNetworkLatencyInMilliSeconds =
      (getLocalTimestampInMilliSeconds() - startTime) / 2
    const serverTimestampInMilliSeconds =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data?.system?.time?.unix! * 1e3 + possibleNetworkLatencyInMilliSeconds

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
