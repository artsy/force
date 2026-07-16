/**
 * A single entry in the ⌘K command bar — either a navigation destination or a
 * context-aware action on the current page.
 */
export interface Command {
  /** Stable identifier, also used as the React key. */
  id: string
  /** User-facing label shown in the list. */
  label: string
  /** Grouping heading the command is listed under. */
  group: CommandGroup
  /** Extra terms (not shown) that the fuzzy filter also matches against. */
  keywords?: string[]
  /** Invoked when the command is selected. */
  run: () => void
}

export type CommandGroup = "On this page" | "Go to" | "Search"

/**
 * The order groups are rendered in the palette.
 */
export const COMMAND_GROUP_ORDER: CommandGroup[] = [
  "On this page",
  "Go to",
  "Search",
]
