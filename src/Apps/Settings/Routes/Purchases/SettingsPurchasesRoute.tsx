import React from "react"
import { SettingsPurchasesRoute_me } from "__generated__/SettingsPurchasesRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsPurchasesFragmentContainer } from "./Components/SettingsPurchases"

interface SettingsPurchasesRouteProps {
  me: SettingsPurchasesRoute_me
}

const SettingsPurchasesRoute: React.FC<SettingsPurchasesRouteProps> = ({
  me,
}) => {
  return <SettingsPurchasesFragmentContainer me={me} />
}

export const SettingsPurchasesRouteFragmentContainer = createFragmentContainer(
  SettingsPurchasesRoute,
  {
    me: graphql`
      fragment SettingsPurchasesRoute_me on Me {
        ...SettingsPurchases_me
      }
    `,
  }
)
