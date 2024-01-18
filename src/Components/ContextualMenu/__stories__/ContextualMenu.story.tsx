import {
  Avatar,
  Box,
  Flex,
  Text,
  Toasts,
  ToastsProvider,
  useToasts,
} from "@artsy/palette"
import { ComponentStory } from "@storybook/react"

import {
  ContextualMenu,
  ContextualMenuItem,
  ContextualMenuDivider,
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

export const Basic: ComponentStory<typeof ContextualMenu> = () => {
  const { confirmIt } = useConfirmation()

  return (
    <ContextualMenu>
      <ContextualMenuItem onClick={confirmIt}>
        Lorem ipsum dolor
      </ContextualMenuItem>

      <ContextualMenuItem onClick={confirmIt}>
        Dolor sit amet
      </ContextualMenuItem>

      <ContextualMenuItem onClick={confirmIt}>
        Consectetur adipisicing
      </ContextualMenuItem>

      <ContextualMenuItem onClick={confirmIt}>
        Quisquam et quod
      </ContextualMenuItem>
    </ContextualMenu>
  )
}

export const WithDividers: ComponentStory<typeof ContextualMenu> = () => {
  const { confirmIt } = useConfirmation()

  return (
    <ContextualMenu>
      <ContextualMenuItem onClick={confirmIt}>
        Lorem ipsum dolor
      </ContextualMenuItem>

      <ContextualMenuDivider />

      <ContextualMenuItem onClick={confirmIt}>
        Dolor sit amet
      </ContextualMenuItem>

      <ContextualMenuDivider />

      <ContextualMenuItem onClick={confirmIt}>
        Consectetur adipisicing
      </ContextualMenuItem>

      <ContextualMenuDivider />

      <ContextualMenuItem onClick={confirmIt}>
        Quisquam et quod
      </ContextualMenuItem>
    </ContextualMenu>
  )
}

export const RichContent: ComponentStory<typeof ContextualMenu> = () => {
  const { confirmIt } = useConfirmation()

  return (
    <ContextualMenu>
      <ContextualMenuItem onClick={confirmIt}>
        <Text color="blue100">Styled</Text> <em>Lorem</em> <code>ipsum</code>{" "}
        <strong>dolor</strong>
      </ContextualMenuItem>

      <ContextualMenuDivider />

      <ContextualMenuItem onClick={confirmIt}>
        <>
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
        </>
      </ContextualMenuItem>

      <ContextualMenuDivider />

      <ContextualMenuItem onClick={confirmIt} padding={0}>
        <Box
          backgroundImage={'url("https://picsum.photos/seed/example19/250/75")'}
          backgroundColor="#00000000"
          backgroundSize="cover"
          padding={2}
        >
          <Text color="white100" fontWeight="bold">
            Illustrated
          </Text>
          <Text color="white100">Consectetur adipisicing</Text>
        </Box>
      </ContextualMenuItem>

      <ContextualMenuDivider />

      <ContextualMenuItem onClick={confirmIt}>
        <Text color="blue100">Basic</Text>
        <Text>Quisquam et quod</Text>
      </ContextualMenuItem>
    </ContextualMenu>
  )
}
