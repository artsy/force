import { BaseTab, BaseTabs, Box, Clickable, useTabs } from "@artsy/palette"
import { Sticky, StickyProvider } from "Components/Sticky"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

const TABS_CONTAINER_HEIGHT = 60

export const NofiticationsTabs: React.FC = ({ children }) => {
  const { tabs, activeTab, activeTabIndex, handleClick, ref } = useTabs({
    children,
  })

  const Tabs = (
    <BaseTabs ref={ref as any} left={0} right={0} px={2} bg="white100">
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
    </BaseTabs>
  )

  return (
    <>
      <Media at="xs">
        <StickyProvider>
          <Sticky>{Tabs}</Sticky>
          {activeTab.current.child}
        </StickyProvider>
      </Media>

      <Media greaterThan="xs">
        {Tabs}
        <Box
          maxHeight={`calc(90vh - ${TABS_CONTAINER_HEIGHT}px)`}
          overflowY="scroll"
        >
          {activeTab.current.child}
        </Box>
      </Media>
    </>
  )
}

const NotificationBaseTab = styled(BaseTab)`
  height: ${TABS_CONTAINER_HEIGHT}px;
  align-items: center;
`
