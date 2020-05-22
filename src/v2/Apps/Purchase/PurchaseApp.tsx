import { PurchaseApp_me } from "v2/__generated__/PurchaseApp_me.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { SystemContext } from "v2/Artsy"
import { ErrorPage } from "v2/Components/ErrorPage"
import React, { useContext } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { userIsAdmin } from "v2/Utils/user"
import { PurchaseHistoryFragmentContainer as PurchaseHistory } from "./Components/PurchaseHistory"

export interface PurchaseAppProps {
  me: PurchaseApp_me
}

export const PurchaseApp = (props: any) => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isAdmin = userIsAdmin(user)
  if (isAdmin) {
    return (
      <AppContainer>
        <Title>My Orders | Artsy</Title>
        <PurchaseHistory me={me} />
      </AppContainer>
    )
  } else {
    // not an admin
    return <ErrorPage code={404} />
  }
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
