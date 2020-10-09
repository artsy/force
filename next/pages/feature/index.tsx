import { fetchQuery, graphql } from "react-relay"
import { useQuery } from "relay-hooks"

import { initEnvironment } from "../../lib/createEnvironment"
import FeatureApp from "./FeatureApp"

const query = graphql`
  query featureQuery {
    feature(id: "artsy-vanguard-2020") {
      ...FeatureApp_feature
    }
  }
`

const Index = ({ environment }) => {
  const { error, props } = useQuery(query)

  if (error) {
    return <div>{error.message}</div>
  }
  if (!props) {
    return <div>Loading</div>
  }

  return <FeatureApp feature={(props as any).feature} />
}

export async function getServerSideProps() {
  const { environment, relaySSR } = initEnvironment()

  // @ts-ignore
  await fetchQuery(environment, query)
  const relayData = (await relaySSR.getCache())?.[0]
  const data = !relayData ? null : [[relayData[0], relayData[1].json]]

  return {
    props: {
      relayData: data,
    },
  }
}

// Use this function for static page generation
// export async function getStaticProps() {
//   const { environment, relaySSR } = initEnvironment()

//   // @ts-ignore
//   await fetchQuery(environment, query)
//   const relayData = (await relaySSR.getCache())?.[0]
//   const data = !relayData ? null : [[relayData[0], relayData[1].json]]

//   return {
//     props: {
//       relayData: data,
//     },
//   }
// }

export default Index
