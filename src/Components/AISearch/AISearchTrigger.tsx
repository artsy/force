import { Clickable, type ClickableProps } from "@artsy/palette"
import { AISparklesIcon } from "Components/AISearch/AISparklesIcon"
import { themeGet } from "@styled-system/theme-get"
import type { FC } from "react"
import styled from "styled-components"

export const AI_SEARCH_TRIGGER_LABEL = "Search with AI"

export type AISearchTriggerProps = Omit<ClickableProps, "children">

export const AISearchTrigger: FC<AISearchTriggerProps> = ({ ...rest }) => {
  return (
    <Trigger
      aria-label={AI_SEARCH_TRIGGER_LABEL}
      title={AI_SEARCH_TRIGGER_LABEL}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="4px"
      {...rest}
    >
      <AISparklesIcon />
    </Trigger>
  )
}

const Trigger = styled(Clickable)`
  color: ${themeGet("colors.mono60")};
  transition: color 150ms;

  &:hover,
  &:focus-visible {
    color: ${themeGet("colors.mono100")};
  }
`
