import * as React from "react"
import styled, { css } from "styled-components"
import { Box, Clickable, Flex, Link, Text, TextProps } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { getENV } from "Utils/getENV"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import DownloadIcon from "@artsy/icons/DownloadIcon"
import EditIcon from "@artsy/icons/EditIcon"
import GenomeIcon from "@artsy/icons/GenomeIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import MoreIcon from "@artsy/icons/MoreIcon"
import ShareIcon from "@artsy/icons/ShareIcon"
import ShowIcon from "@artsy/icons/ShowIcon"

const isTest = getENV("NODE_ENV") === "test"

interface UtilButtonProps {
  name:
    | "bell"
    | "edit"
    | "download"
    | "genome"
    | "heart"
    | "more"
    | "share"
    | "viewInRoom"
  href?: string
  download?: string
  selected?: boolean
  label?: string
  longestLabel?: string
  Icon?: React.ReactNode
  Component?: typeof UtilButtonButton | typeof UtilButtonLink
  onClick?: () => void
}

type UtilButtonInnerTextProps = Pick<
  UtilButtonProps,
  "label" | "longestLabel"
> &
  TextProps

export const UtilButton: React.ForwardRefExoticComponent<
  UtilButtonProps & {
    ref?: React.Ref<HTMLElement>
  }
> = React.forwardRef(
  (
    {
      href,
      label,
      longestLabel,
      name,
      onClick,
      Icon,
      Component = UtilButtonButton,
      download,
      ...rest
    },
    forwardedRef
  ) => {
    const getIcon = () => {
      switch (name) {
        case "bell":
          return BellStrokeIcon
        case "download":
          return DownloadIcon
        case "edit":
          return EditIcon
        case "genome":
          return GenomeIcon
        case "heart":
          return HeartStrokeIcon
        case "more":
          return MoreIcon
        case "share":
          return ShareIcon
        case "viewInRoom":
          return ShowIcon
      }
    }

    // If we're passing in an `Icon`, override
    const ActionIcon = Icon ? Icon : getIcon()

    return (
      <Component
        ref={forwardedRef as any}
        p={1}
        onClick={onClick}
        {...(href ? { href, target: "_blank", download } : {})}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          width={20}
          height={20}
          mr={0.5}
        >
          {/* TODO: Fix types */}
          {/* @ts-ignore */}
          <ActionIcon {...rest} fill="currentColor" />
        </Flex>

        <UtilButtonInnerText
          label={label}
          longestLabel={longestLabel}
          variant="xs"
          lineHeight={1}
        />
      </Component>
    )
  }
)

const UtilButtonInnerText: React.FC<UtilButtonInnerTextProps> = ({
  label,
  longestLabel,
  ...rest
}) => {
  if (!label) {
    return null
  }

  /**
   * We ignore this, since this functionality is not needed for tests and will add some problems
   * e.g. `screen.getByText("Label")` will return error,
   * since there will be 2 elements with "Label" text on the page.
   */
  if (longestLabel && !isTest) {
    return (
      <Box position="relative">
        <VisibleText {...rest}>{label}</VisibleText>
        <HiddenText aria-hidden="true" {...rest}>
          {longestLabel}
        </HiddenText>
      </Box>
    )
  }

  return <Text {...rest}>{label}</Text>
}

const VisibleText = styled(Text)`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const HiddenText = styled(Text)`
  opacity: 0;
  pointer-events: none;
`

const utilButtonMixin = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeGet("colors.black100")};

  &:hover,
  &:hover ${VisibleText} {
    color: ${themeGet("colors.blue100")};
    text-decoration: underline;
  }
`

export const UtilButtonLink = styled(Link)`
  ${utilButtonMixin}
  text-decoration: none;
`

const UtilButtonButton = styled(Clickable)`
  ${utilButtonMixin}
`
