import { Box, BoxProps } from "@artsy/palette"
import { BorderBoxBase } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import * as React from "react"
import styled from "styled-components"
import { resizeSquare } from "Assets/Animations"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { Media } from "Utils/Responsive"

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

const BorderBox = styled(BorderBoxBase).attrs({
  borderColor: "black30",
  p: 0,
})<{
  prevSize?: number
  size?: number
}>`
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

  const getSizeWithSticky = (baseSize?: number) =>
    +!!baseSize && (stuck && icon?.sticky ? icon.sticky.size : baseSize!) + 2

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
