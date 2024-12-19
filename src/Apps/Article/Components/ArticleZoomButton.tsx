import ExpandIcon from "@artsy/icons/ExpandIcon"
import { Box, Clickable, type ClickableProps } from "@artsy/palette"
import type { FC } from "react"
import styled from "styled-components"

export const ArticleZoomButton: FC<React.PropsWithChildren<ClickableProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Button position="relative" {...rest}>
      {children}

      <Indicator
        bg="black100"
        color="white100"
        borderRadius="50%"
        width={30}
        height={30}
        display="flex"
        position="absolute"
        bottom={2}
        right={2}
      >
        <ExpandIcon fill="currentColor" m="auto" />
      </Indicator>
    </Button>
  )
}

const Indicator = styled(Box)`
  transition: opacity 250ms;
`

const Button = styled(Clickable)`
  ${Indicator} {
    opacity: 0;
  }

  &:hover {
    ${Indicator} {
      opacity: 0.75;
    }
  }
`
