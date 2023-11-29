import { Media } from "Utils/Responsive"
import { Box, Flex } from "@artsy/palette"
import { Resizer } from "Apps/Conversations/components/Resizer"
import { useMobileLayoutActions } from "Apps/Conversations/hooks/useMobileLayoutActions"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"

const DESKTOP_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`
const MOBILE_HEIGHT = `calc(100dvh - 60px)` // 60 is the height of the reply box

export interface ConversationsLayoutProps {
  renderSidebar: () => JSX.Element | null
  renderMessages: () => JSX.Element | null
  renderDetails: () => JSX.Element | null
}

export const ConversationsLayout: React.FC<ConversationsLayoutProps> = props => {
  return (
    <>
      <Media greaterThan="xs">
        <DesktopLayout {...props} />
      </Media>
      <Media lessThan="sm">
        <MobileLayout {...props} />
      </Media>
    </>
  )
}

export const DesktopLayout: React.FC<ConversationsLayoutProps> = ({
  renderSidebar,
  renderMessages,
  renderDetails,
}) => {
  return (
    <>
      <Flex display={["none", "flex"]}>
        <Resizer split="vertical" minSize={200} defaultSizes={[1, 2, 1]}>
          <Flex
            flexGrow={[0, 1]}
            position="sticky"
            top={0}
            overflowY="auto"
            height={DESKTOP_HEIGHT}
            display={["none", "block"]}
            borderRight="1px solid"
            borderRightColor="black15"
          >
            {renderSidebar()}
          </Flex>

          <Flex
            flexGrow={1}
            position="sticky"
            top={0}
            overflowY="auto"
            height={DESKTOP_HEIGHT}
          >
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
              flexGrow={1}
              width="100%"
            >
              {renderMessages()}
            </Flex>
          </Flex>

          <Flex
            flexGrow={1}
            position="sticky"
            top={0}
            overflowY="auto"
            height={DESKTOP_HEIGHT}
            display={["none", "block"]}
            borderLeft="1px solid"
            borderLeftColor="black15"
            p={2}
            pb={6}
          >
            {renderDetails()}
          </Flex>
        </Resizer>
      </Flex>
    </>
  )
}

export const MobileLayout: React.FC<ConversationsLayoutProps> = ({
  renderSidebar,
  renderMessages,
  renderDetails,
}) => {
  const { currentColumn } = useMobileLayoutActions()

  return (
    <Box ml={0} mr={0}>
      <Box
        overflowX="hidden"
        display={currentColumn === "sidebar" ? "block" : "none"}
        height={MOBILE_HEIGHT}
        position="relative"
      >
        <Flex flexDirection="column" position="relative">
          {renderSidebar()}
        </Flex>
      </Box>

      {currentColumn === "conversation" && (
        <Flex
          display={currentColumn === "conversation" ? "flex" : "none"}
          height={MOBILE_HEIGHT}
          flexGrow={1}
          position="sticky"
          justifyContent="space-between"
          flexDirection="column"
          top={0}
          overflowY="auto"
        >
          {renderMessages()}
        </Flex>
      )}

      <Flex
        display={currentColumn === "detail" ? "flex" : "none"}
        height={MOBILE_HEIGHT}
        flexGrow={1}
        position="sticky"
        top={0}
        overflowY="auto"
        p={2}
        pb={6}
      >
        {renderDetails()}
      </Flex>
    </Box>
  )
}
