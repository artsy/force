import React from "react"
import { PaymentSection_me } from "v2/__generated__/PaymentSection_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { PaymentSection } from "v2/Apps/Payment/Components/PaymentSection"

interface SettingsPaymentsRouteProps {
  me: PaymentSection_me
}

const SettingsPaymentsRoute: React.FC<SettingsPaymentsRouteProps> = ({
  me,
}) => {
  return (
    <>
      <PaymentSection me={me} />
    </>
  )
}

export const SettingsPaymentsRouteFragmentContainer = createFragmentContainer(
  SettingsPaymentsRoute,
  {
    me: graphql`
      fragment SettingsPaymentsRoute_me on Me {
        ...PaymentSection_me
      }
    `,
  }
)
