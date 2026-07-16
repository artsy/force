import { Box, Clickable, Flex, Input, Text } from "@artsy/palette"
import { useCommandBar } from "Components/CommandBar/CommandBarContext"
import { filterCommands, getCommands } from "Components/CommandBar/getCommands"
import { COMMAND_GROUP_ORDER, type Command } from "Components/CommandBar/types"
import { useCommandBarActions } from "Components/CommandBar/useCommandBarActions"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { type FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

/**
 * The ⌘K command palette overlay. Renders a fuzzy-filtered, keyboard-navigable
 * list of navigation destinations and context-aware actions. Rendered once at
 * the app root; returns `null` until opened.
 */
export const CommandBar: FC = () => {
  const { isOpen, close } = useCommandBar()

  if (!isOpen || typeof document === "undefined") {
    return null
  }

  return createPortal(<CommandBarOverlay onClose={close} />, document.body)
}

interface CommandBarOverlayProps {
  onClose: () => void
}

const CommandBarOverlay: FC<CommandBarOverlayProps> = ({ onClose }) => {
  const { isLoggedIn } = useSystemContext()
  const { match } = useRouter()
  const actions = useCommandBarActions()

  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const pathname = match?.location?.pathname ?? ""

  const commands = filterCommands(
    getCommands({ isLoggedIn: !!isLoggedIn, pathname, query, actions }),
    query,
  )

  const orderedCommands = COMMAND_GROUP_ORDER.flatMap(group => {
    return commands.filter(command => {
      return command.group === group
    })
  })

  // Reset the highlight to the top whenever the filtered results change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally keyed on `query`
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const runCommand = (command: Command | undefined) => {
    if (!command) return

    onClose()
    command.run()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex(prev => {
        return Math.min(prev + 1, orderedCommands.length - 1)
      })
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex(prev => {
        return Math.max(prev - 1, 0)
      })
      return
    }

    if (event.key === "Enter") {
      event.preventDefault()
      runCommand(orderedCommands[activeIndex])
    }
  }

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      justifyContent="center"
      alignItems="flex-start"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <Box
        mt={["10vh", "12vh"]}
        width="100%"
        maxWidth={600}
        mx={2}
        bg="mono0"
        borderRadius={4}
        overflow="hidden"
        style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.24)" }}
        onClick={event => {
          event.stopPropagation()
        }}
      >
        <Box p={1} borderBottom="1px solid" borderColor="mono10">
          <Input
            ref={inputRef}
            placeholder="Search destinations and actions…"
            value={query}
            onChange={event => {
              setQuery(event.target.value)
            }}
            onKeyDown={handleKeyDown}
          />
        </Box>

        <Box maxHeight={360} overflowY="auto" py={1}>
          <CommandList
            orderedCommands={orderedCommands}
            activeIndex={activeIndex}
            onHover={setActiveIndex}
            onSelect={runCommand}
          />
        </Box>
      </Box>
    </Flex>
  )
}

interface CommandListProps {
  orderedCommands: Command[]
  activeIndex: number
  onHover: (index: number) => void
  onSelect: (command: Command) => void
}

const CommandList: FC<CommandListProps> = ({
  orderedCommands,
  activeIndex,
  onHover,
  onSelect,
}) => {
  if (orderedCommands.length === 0) {
    return (
      <Box px={2} py={1}>
        <Text variant="sm" color="mono60">
          No results
        </Text>
      </Box>
    )
  }

  let renderIndex = -1

  return (
    <>
      {COMMAND_GROUP_ORDER.map(group => {
        const groupCommands = orderedCommands.filter(command => {
          return command.group === group
        })

        if (groupCommands.length === 0) {
          return null
        }

        return (
          <Box key={group} mb={1}>
            <Box px={2} py={0.5}>
              <Text variant="xs" color="mono60">
                {group}
              </Text>
            </Box>

            {groupCommands.map(command => {
              renderIndex += 1
              const index = renderIndex

              return (
                <Clickable
                  key={command.id}
                  width="100%"
                  px={2}
                  py={1}
                  bg={index === activeIndex ? "mono10" : "mono0"}
                  onMouseEnter={() => {
                    onHover(index)
                  }}
                  onClick={() => {
                    onSelect(command)
                  }}
                >
                  <Text variant="sm" textAlign="left">
                    {command.label}
                  </Text>
                </Clickable>
              )
            })}
          </Box>
        )
      })}
    </>
  )
}
