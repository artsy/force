import { PurchaseApp_me } from "v2/__generated__/PurchaseApp_me.graphql"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { PurchaseHistoryFragmentContainer as PurchaseHistory } from "./Components/PurchaseHistory"
import { Spacer } from "@artsy/palette"

export interface PurchaseAppProps {
  me: PurchaseApp_me
}

export const PurchaseApp = (props: any) => {
  const { me } = props
  return (
    <>
      <Title>My Orders | Artsy</Title>
      <Spacer mt={2} />
      <PurchaseHistory me={me} />
    </>
  )
}

export const PurchaseAppFragmentContainer = createFragmentContainer(
  PurchaseApp,
  {
    me: graphql`
      fragment PurchaseApp_me on Me {
        ...PurchaseHistory_me
      }
    `,
  }
)
