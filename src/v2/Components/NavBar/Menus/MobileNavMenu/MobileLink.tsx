import { AnalyticsSchema } from "v2/System"
import { useTracking } from "v2/System/Analytics"
import React, { useState } from "react"
import styled from "styled-components"
import { MobileMenuText } from "./MobileNavMenu"
import { Box, BoxProps, Link, color, Color } from "@artsy/palette"

interface MobileLinkProps extends BoxProps {
  contextModule?: any
  children: React.ReactNode
  href?: string
  color?: Color
  onClick?: (event?) => void
}

export const MobileLink: React.FC<MobileLinkProps> = ({
  href,
  children,
  contextModule = AnalyticsSchema.ContextModule.Header,
  onClick,
  color: linkColor = "black60",
  ...props
}) => {
  const [isPressed, setPressed] = useState(false)
  const bg = isPressed ? "black5" : "white100"
  const { trackEvent } = useTracking()
  // @ts-expect-error STRICT_NULL_CHECK
  const text = children.toString()

  const handleClickTracking = (linkHref: string) => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: contextModule,
      flow: "Header",
      subject: text,
      destination_path: linkHref,
    })
  }

  return (
    <MobileLinkContainer
      style={{ cursor: "pointer" }}
      bg={bg}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      py={1}
      {...props}
    >
      <Box>
        {href ? (
          <Link
            href={href}
            underlineBehavior="none"
            onClick={event => {
              onClick && onClick(event)
              handleClickTracking(href)
            }}
          >
            <MobileMenuText color={linkColor}>{children}</MobileMenuText>
          </Link>
        ) : (
          <MobileMenuText color={linkColor}>{children}</MobileMenuText>
        )}
      </Box>
    </MobileLinkContainer>
  )
}

const MobileLinkContainer = styled(Box)<{ disableHover?: boolean }>`
  background-color: white;
  transition: 0.3s linear;
  cursor: pointer;

  &:hover {
    background-color: ${p =>
      p.disableHover ? "transparent" : color("black5")};
  }
`
