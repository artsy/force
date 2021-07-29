import React from "react"
import { ProfileIcon } from "v2/Components/ProfileIcon"

export const FairOrganizerHeaderIcon: React.FC<any> = ({
  fairOrganizer,
  ...rest
}) => {
  return <ProfileIcon profile={fairOrganizer} {...rest} />
}
