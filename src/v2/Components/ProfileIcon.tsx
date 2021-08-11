import { Box, BoxProps } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"

interface Icon {
  src: string
  srcSet: string
}

interface IconSet {
  desktop: Icon | null
  mobile: Icon | null
}

export interface Profile {
  icon?: IconSet | null
  name: string
}

interface ProfileIconProps extends BoxProps {
  profile: Profile
}

const BorderBox = styled(Box).attrs({
  border: "solid #C2C2C2",
  borderWidth: "1px",
})``
BorderBox.displayName = "BorderBox"

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  profile,
  ...rest
}) => {
  if (!profile?.icon) return null

  const { icon, name } = profile

  return (
    <Box {...rest}>
      {icon?.desktop?.src && (
        <Media greaterThanOrEqual="md">
          <BorderBox width={82} height={82}>
            <img
              src={icon.desktop.src}
              srcSet={icon.desktop.srcSet}
              alt={`Logo of ${name}`}
              width={80}
              height={80}
            />
          </BorderBox>
        </Media>
      )}

      {icon?.mobile?.src && (
        <Media lessThan="md">
          <BorderBox width={62} height={62}>
            <img
              src={icon.mobile.src}
              srcSet={icon.mobile.srcSet}
              alt={`Logo of ${name}`}
              width={60}
              height={60}
            />
          </BorderBox>
        </Media>
      )}
    </Box>
  )
}
