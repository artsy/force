import React from "react"
import { SettingsEditProfileRoute_me } from "v2/__generated__/SettingsEditProfileRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { UserInformationRefetchContainer } from "./UserInformation"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  return (
    <>
      <UserInformationRefetchContainer me={me} />
    </>
  )
}

export const SettingsEditProfileRouteFragmentContainer = createFragmentContainer(
  SettingsEditProfileRoute,
  {
    me: graphql`
      fragment SettingsEditProfileRoute_me on Me {
        ...UserInformation_me
        email
        name
        paddleNumber
        phone
        internalID
      }
    `,
  }
)
