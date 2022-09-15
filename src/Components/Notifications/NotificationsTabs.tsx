import {
  BaseTab,
  BaseTabs,
  Box,
  Clickable,
  CloseIcon,
  Flex,
  useTabs,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { Sticky, StickyProvider } from "Components/Sticky"
import styled from "styled-components"

const TABS_CONTAINER_HEIGHT = 60

export interface NofiticationsTabsProps {
  mode: "dropdown" | "page"
  maxDropdownHeight?: string
}

export const NofiticationsTabs: React.FC<NofiticationsTabsProps> = ({
  mode,
  maxDropdownHeight,
  children,
}) => {
  const { tabs, activeTab, activeTabIndex, handleClick, ref } = useTabs({
    children,
  })

  const Tabs = (
    <InnerTabs ref={ref as any} borderBottomColor="transparent" width="100%">
      {tabs.map((tab, i) => {
        return (
          <Clickable
            key={i}
            ref={tab.ref as any}
            aria-selected={i === activeTabIndex}
            onClick={handleClick(i)}
            flex={1}
          >
            <NotificationBaseTab active={i === activeTabIndex} variant="sm">
              <span>{tab.child.props.name}</span>
            </NotificationBaseTab>
          </Clickable>
        )
      })}
    </InnerTabs>
  )

  if (mode === "dropdown") {
    return (
      <>
        <HeaderContainer display="flex" flexDirection="row" alignItems="center">
          <Flex flex={1} overflow="hidden">
            {Tabs}
          </Flex>

          <Clickable as="a" ml={1}>
            <CloseIcon display="block" />
          </Clickable>
        </HeaderContainer>

        <Box
          maxHeight={`calc(${maxDropdownHeight} - ${TABS_CONTAINER_HEIGHT}px)`}
          overflowY="scroll"
        >
          {activeTab.current.child}
        </Box>
      </>
    )
  }

  return (
    <StickyProvider>
      <Sticky>
        <HeaderContainer>{Tabs}</HeaderContainer>
      </Sticky>
      {activeTab.current.child}
    </StickyProvider>
  )
}

const NotificationBaseTab = styled(BaseTab)`
  height: ${TABS_CONTAINER_HEIGHT}px;
  align-items: center;
`

/**
 * NOTE: Small offset from the bottom is used here
 * so that the fade-out gradient from the HorizontalOverflow component (used in BaseTabs) does not overlap the bottom line
 */
const InnerTabs = styled(BaseTabs)`
  &::after {
    bottom: 1px;
  }
`

const HeaderContainer = styled(Box)`
  background: ${themeGet("colors.white100")};
  padding: 0 ${themeGet("space.2")};
  box-shadow: inset 0 -1px ${themeGet("colors.black10")};
`
