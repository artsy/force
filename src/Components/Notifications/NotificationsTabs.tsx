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
import { DESKTOP_NAV_BAR_TOP_TIER_HEIGHT } from "Components/NavBar"
import { Sticky } from "Components/Sticky"
import styled from "styled-components"
import {
  MarkAllAsReadPanel,
  MarkAllAsReadPanelProps,
  MARK_ALL_AS_READ_PANEL_HEIGHT,
} from "./MarkAllAsReadPanel"
import { ActionType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"

const TABS_CONTAINER_HEIGHT = 60
const DROPDOWN_HEADER_HEIGHT =
  TABS_CONTAINER_HEIGHT + MARK_ALL_AS_READ_PANEL_HEIGHT
const VERTICAL_OFFSET = 10
const DROPDOWN_CONTENT_HEIGHT =
  DROPDOWN_HEADER_HEIGHT + DESKTOP_NAV_BAR_TOP_TIER_HEIGHT + VERTICAL_OFFSET

export interface NofiticationsTabsProps extends MarkAllAsReadPanelProps {
  mode: "dropdown" | "page"
}

export const NofiticationsTabs: React.FC<NofiticationsTabsProps> = ({
  mode,
  unreadCounts,
  children,
}) => {
  const { trackEvent } = useTracking()
  const { tabs, activeTab, activeTabIndex, handleClick, ref } = useTabs({
    children,
  })

  const sendAnalytics = tab => {
    trackEvent({
      action: ActionType.clickedActivityPanelTab,
      tab_name: tab.child.props.name,
    })
  }

  const Tabs = (
    <InnerTabs ref={ref as any} borderBottomColor="transparent" width="100%">
      {tabs.map((tab, i) => {
        return (
          <Clickable
            key={i}
            ref={tab.ref as any}
            aria-selected={i === activeTabIndex}
            flex={1}
            onClick={() => {
              sendAnalytics(tab)
              handleClick(i)()
            }}
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
        <MarkAllAsReadPanel unreadCounts={unreadCounts} />

        <Box
          maxHeight={`calc(100vh - ${DROPDOWN_CONTENT_HEIGHT}px)`}
          overflowY="scroll"
        >
          {activeTab.current.child}
        </Box>
      </>
    )
  }

  return (
    <>
      <Sticky>
        <HeaderContainer>{Tabs}</HeaderContainer>

        <MarkAllAsReadPanel unreadCounts={unreadCounts} />
      </Sticky>

      {activeTab.current.child}
    </>
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
