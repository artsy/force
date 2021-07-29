import { Box, BoxProps } from "@artsy/palette"
import React from "react"
import { Media } from "v2/Utils/Responsive"

interface Icon {
  src: string
  srcSet: string
}

interface IconSet {
  desktop: Icon | null
  mobile: Icon | null
}

interface Profile {
  icon?: IconSet | null
  name: string
}

interface ProfileIconProps extends BoxProps {
  profile: Profile
}

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
          <img
            src={icon.desktop.src}
            srcSet={icon.desktop.srcSet}
            alt={`Logo of ${name}`}
            width={100}
            height={100}
          />
        </Media>
      )}

      {icon?.mobile?.src && (
        <Media lessThan="md">
          <img
            src={icon.mobile.src}
            srcSet={icon.mobile.srcSet}
            alt={`Logo of ${name}`}
            width={60}
            height={60}
          />
        </Media>
      )}
    </Box>
  )
}
