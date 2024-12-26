import type { SettingsPurchasesRoute_me$data } from "__generated__/SettingsPurchasesRoute_me.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsPurchasesFragmentContainer } from "./Components/SettingsPurchases"

interface SettingsPurchasesRouteProps {
  me: SettingsPurchasesRoute_me$data
}

const SettingsPurchasesRoute: React.FC<
  React.PropsWithChildren<SettingsPurchasesRouteProps>
> = ({ me }) => {
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
  },
)
