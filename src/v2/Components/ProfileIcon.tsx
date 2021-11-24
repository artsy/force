import { Box, BoxProps } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { resizeSquare } from "v2/Assets/Animations"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import { Media } from "v2/Utils/Responsive"

interface Icon {
  src: string
  srcSet: string
  size: number
}

interface IconSet {
  desktop: Icon | null
  mobile: Icon | null
  sticky?: Icon | null
}

export interface Profile {
  icon?: IconSet | null
  name: string
}

interface ProfileIconProps extends BoxProps {
  stuck?: boolean
  profile: Profile
}

const BorderBox = styled(Box)<{ prevSize?: number; size?: number }>`
  border: 1px solid #c2c2c2;
  animation: ${p => resizeSquare(`${p.prevSize}px`, `${p.size}px`)} 0.2s linear;
`
BorderBox.displayName = "BorderBox"

const Image: React.FC<{ icon?: Icon | null; alt?: string }> = ({
  icon,
  alt,
}) => {
  if (!icon) return null

  return (
    <img
      src={icon.src}
      srcSet={icon.srcSet}
      alt={alt}
      width="100%"
      height="100%"
    />
  )
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  profile,
  stuck,
  ...rest
}) => {
  const { icon, name } = profile

  const getSizeWithSticky = (standartSize?: number) =>
    +!!standartSize &&
    (stuck && icon?.sticky ? icon.sticky.size : standartSize!) + 2

  const desktopSize = getSizeWithSticky(icon?.desktop?.size)
  const mobileSize = getSizeWithSticky(icon?.mobile?.size)

  const previousDesktopSize = usePrevious(desktopSize)
  const previousMobileSize = usePrevious(mobileSize)

  if (!profile?.icon) return null

  return (
    <Box height="fit-content" {...rest}>
      {icon?.desktop?.src && (
        <Media greaterThanOrEqual="md">
          <BorderBox size={desktopSize} prevSize={previousDesktopSize}>
            <Image
              icon={stuck && icon.sticky ? icon.sticky : icon.desktop}
              alt={`Logo of ${name}`}
            />
          </BorderBox>
        </Media>
      )}

      {icon?.mobile?.src && (
        <Media lessThan="md">
          <BorderBox size={mobileSize} prevSize={previousMobileSize}>
            <Image
              icon={stuck && icon.sticky ? icon.sticky : icon.mobile}
              alt={`Logo of ${name}`}
            />
          </BorderBox>
        </Media>
      )}
    </Box>
  )
}
