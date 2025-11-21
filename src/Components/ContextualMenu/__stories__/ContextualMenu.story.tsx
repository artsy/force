import {
  Avatar,
  Box,
  Flex,
  Text,
  Toasts,
  ToastsProvider,
  useToasts,
} from "@artsy/palette"

import {
  ContextualMenu,
  ContextualMenuDivider,
  ContextualMenuItemButton,
} from "Components/ContextualMenu"

export default {
  title: "Components/ContextualMenu",
  decorators: [
    Story => {
      return (
        <ToastsProvider>
          <Flex>
            <Flex flex={2} justifyContent="center" alignItems="flex-start">
              <Story />
            </Flex>
            <Box flex={1}>
              <Toasts />
            </Box>
          </Flex>
        </ToastsProvider>
      )
    },
  ],
}

const useConfirmation = () => {
  const { sendToast } = useToasts()

  const confirmIt = () => {
    sendToast({
      variant: "success",
      message: "You selected a contextual menu item",
      ttl: 5000,
    })
  }

  return { confirmIt }
}

export const Basic = () => {
  const { confirmIt } = useConfirmation()

  return (
    <ContextualMenu>
      <ContextualMenuItemButton onClick={confirmIt}>
        Lorem ipsum dolor
      </ContextualMenuItemButton>

      <ContextualMenuItemButton onClick={confirmIt}>
        Dolor sit amet
      </ContextualMenuItemButton>

      <ContextualMenuItemButton onClick={confirmIt}>
        Consectetur adipisicing
      </ContextualMenuItemButton>

      <ContextualMenuItemButton onClick={confirmIt}>
        Quisquam et quod
      </ContextualMenuItemButton>
    </ContextualMenu>
  )
}

export const WithDividers = () => {
  const { confirmIt } = useConfirmation()

  return (
    <ContextualMenu>
      <ContextualMenuItemButton onClick={confirmIt}>
        Lorem ipsum dolor
      </ContextualMenuItemButton>

      <ContextualMenuDivider />

      <ContextualMenuItemButton onClick={confirmIt}>
        Dolor sit amet
      </ContextualMenuItemButton>

      <ContextualMenuDivider />

      <ContextualMenuItemButton onClick={confirmIt}>
        Consectetur adipisicing
      </ContextualMenuItemButton>

      <ContextualMenuDivider />

      <ContextualMenuItemButton onClick={confirmIt}>
        Quisquam et quod
      </ContextualMenuItemButton>
    </ContextualMenu>
  )
}

export const RichContent = () => {
  const { confirmIt } = useConfirmation()

  return (
    <ContextualMenu>
      <ContextualMenuItemButton onClick={confirmIt}>
        <Box>
          <Text color="blue100">Styled</Text> <em>Lorem</em> <code>ipsum</code>{" "}
          <strong>dolor</strong>
        </Box>
      </ContextualMenuItemButton>

      <ContextualMenuDivider />

      <ContextualMenuItemButton onClick={confirmIt}>
        <Box>
          <Text color="blue100">Nested</Text>
          <Flex alignItems="center" mt={1}>
            <Box mr={1}>
              <Avatar
                size="sm"
                src="https://picsum.photos/seed/example/110/110"
                initials="TK"
              />
            </Box>
            <Text>Dolor sit amet</Text>
          </Flex>
        </Box>
      </ContextualMenuItemButton>

      <ContextualMenuDivider />

      <ContextualMenuItemButton onClick={confirmIt} px={0} py={0}>
        <Box
          width="100%"
          backgroundImage="url('https://picsum.photos/seed/example19/250/75')"
          backgroundColor="black"
          backgroundSize="cover"
          padding={2}
        >
          <Text color="mono0" fontWeight="bold">
            Illustrated
          </Text>
          <Text color="mono0">Consectetur adipisicing</Text>
        </Box>
      </ContextualMenuItemButton>

      <ContextualMenuDivider />

      <ContextualMenuItemButton onClick={confirmIt}>
        <Box>
          <Text color="blue100">Basic</Text>
          <Text>Quisquam et quod</Text>
        </Box>
      </ContextualMenuItemButton>
    </ContextualMenu>
  )
}
