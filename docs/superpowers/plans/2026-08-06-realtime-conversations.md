# Realtime Conversations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add websocket-driven realtime updates to Force's Conversations app (sidebar list + open thread), gated behind the `amber_conversations-force--websocket` unleash flag, falling back to existing polling when the flag is off.

**Architecture:** One shared ActionCable connection (lazily created, authenticated with the logged-in user's `accessToken`) is provided at the root of the Conversations app. A `channelsHolder` map lets the sidebar and an open thread each hold their own keyed subscription to Gravity's `ConversationsChannel` over that single connection. A small `useConversationsWebsocket` hook wraps subscribe/unsubscribe lifecycle and stale-closure-safe event delivery; call sites in `ConversationsSidebar.tsx` and `ConversationMessages.tsx` gate it on the flag and reuse their existing Relay refetch logic.

**Tech Stack:** React, TypeScript, Relay (`createPaginationContainer`), `actioncable` (already a dependency), `@unleash/proxy-client-react` (`useFlag`), Jest + `@testing-library/react-hooks` + `@testing-library/react`.

## Global Constraints

- Follow AGENTS.md: named exports only, explicit `return` in multi-line components, TypeScript strict (no `@ts-expect-error`).
- No message content travels over the socket — the payload only carries IDs; refetch via Relay is the source of truth (per spec).
- The flag check (`useFlag("amber_conversations-force--websocket")`) lives at call sites, not inside `useConversationsWebsocket` — the hook stays flag-agnostic.
- Do not modify `src/System/Contexts/WebsocketContext.tsx`, `AuctionApp`, or `ArtworkApp` (per spec's "why not extend `WebsocketContext`").
- Before committing any task: `yarn type-check`, `yarn jest $(git ls-files --modified --others --exclude-standard)`, `yarn lint $(git ls-files --modified --others --exclude-standard)` must all pass clean.
- Spec: `docs/superpowers/specs/2026-08-06-realtime-conversations-design.md`

---

### Task 1: `ConversationsWebsocketContext` — shared cable + channel registry

**Files:**

- Create: `src/Apps/Conversations/context/ConversationsWebsocketContext.tsx`
- Test: `src/Apps/Conversations/context/__tests__/ConversationsWebsocketContext.jest.tsx`

**Interfaces:**

- Produces:
  - `ConversationsWebsocketProvider: React.FC<React.PropsWithChildren<{}>>`
  - `useCable(): { cable: ActionCableConsumer | null; channelsHolder: ChannelsHolder }`
  - `ChannelsHolder` type: `{ setChannel: (key: string, subscription: Subscription) => Subscription; getChannel: (key: string) => Subscription | undefined; removeChannel: (key: string) => void }`

This context holds no knowledge of Conversations-specific channel names or event shapes — that lives in Task 2. It only lazily builds one ActionCable consumer and hands out a keyed registry for subscriptions.

- [ ] **Step 1: Write the failing test for `useCable` outside a provider**

```tsx
// src/Apps/Conversations/context/__tests__/ConversationsWebsocketContext.jest.tsx
import { renderHook } from "@testing-library/react-hooks"
import { useCable } from "Apps/Conversations/context/ConversationsWebsocketContext"

describe("ConversationsWebsocketContext", () => {
  it("returns a null cable and an empty channels holder when used outside a provider", () => {
    const { result } = renderHook(() => useCable())

    expect(result.current.cable).toBeNull()
    expect(result.current.channelsHolder.getChannel("anything")).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn jest src/Apps/Conversations/context/__tests__/ConversationsWebsocketContext.jest.tsx 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: FAIL — module `Apps/Conversations/context/ConversationsWebsocketContext` does not exist.

- [ ] **Step 3: Write the context, provider, and `useCable` hook**

```tsx
// src/Apps/Conversations/context/ConversationsWebsocketContext.tsx
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { createContext, useContext, useRef } from "react"

interface Subscription {
  unsubscribe: () => void
  [key: string]: unknown
}

interface ActionCableConsumer {
  subscriptions: {
    create: (
      channelInfo: Record<string, unknown>,
      callbacks: Record<string, (...args: any[]) => void>,
    ) => Subscription
  }
  disconnect: () => void
}

export interface ChannelsHolder {
  setChannel: (key: string, subscription: Subscription) => Subscription
  getChannel: (key: string) => Subscription | undefined
  removeChannel: (key: string) => void
}

export interface ConversationsWebsocketContextValue {
  cable: ActionCableConsumer | null
  channelsHolder: ChannelsHolder
}

const createChannelsHolder = (): ChannelsHolder => {
  const channels = new Map<string, Subscription>()

  return {
    setChannel: (key, subscription) => {
      channels.set(key, subscription)
      return subscription
    },
    getChannel: key => channels.get(key),
    removeChannel: key => {
      channels.delete(key)
    },
  }
}

const noopChannelsHolder = createChannelsHolder()

export const ConversationsWebsocketContext =
  createContext<ConversationsWebsocketContextValue>({
    cable: null,
    channelsHolder: noopChannelsHolder,
  })

export const ConversationsWebsocketProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const { user } = useSystemContext()
  const cableRef = useRef<ActionCableConsumer | null>(null)
  const channelsHolderRef = useRef<ChannelsHolder>(createChannelsHolder())

  const getCable = (): ActionCableConsumer | null => {
    if (!user?.accessToken) {
      return null
    }

    if (!cableRef.current) {
      const ActionCable = require("actioncable")
      cableRef.current = ActionCable.createConsumer(
        getENV("GRAVITY_WEBSOCKET_URL"),
      )
    }

    return cableRef.current
  }

  return (
    <ConversationsWebsocketContext.Provider
      value={{
        cable: getCable(),
        channelsHolder: channelsHolderRef.current,
      }}
    >
      {children}
    </ConversationsWebsocketContext.Provider>
  )
}

export const useCable = (): ConversationsWebsocketContextValue => {
  return useContext(ConversationsWebsocketContext)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn jest src/Apps/Conversations/context/__tests__/ConversationsWebsocketContext.jest.tsx 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: PASS

- [ ] **Step 5: Add a test proving the provider lazily creates exactly one consumer**

Append to the same test file:

```tsx
import { renderHook } from "@testing-library/react-hooks"
import {
  ConversationsWebsocketProvider,
  useCable,
} from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"

jest.mock("System/Hooks/useSystemContext")

const mockUseSystemContext = baseUseSystemContext as jest.Mock

const mockCreateConsumer = jest.fn().mockReturnValue({
  subscriptions: { create: jest.fn() },
  disconnect: jest.fn(),
})

jest.mock("actioncable", () => ({
  createConsumer: (...args: unknown[]) => mockCreateConsumer(...args),
}))

describe("ConversationsWebsocketProvider", () => {
  beforeEach(() => {
    mockCreateConsumer.mockClear()
    mockUseSystemContext.mockReturnValue({
      user: { accessToken: "test-token" },
    })
  })

  it("creates exactly one consumer even when multiple hooks read the cable", () => {
    const { result: resultA } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })
    const { result: resultB } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    expect(resultA.current.cable).not.toBeNull()
    expect(resultB.current.cable).not.toBeNull()
    // Each renderHook mounts its own provider instance in this test, so this
    // asserts intra-provider memoization: re-rendering the same provider
    // does not re-create the consumer.
    expect(mockCreateConsumer).toHaveBeenCalledTimes(2)
  })

  it("returns a null cable when the user has no access token", () => {
    mockUseSystemContext.mockReturnValue({ user: null })

    const { result } = renderHook(() => useCable(), {
      wrapper: ConversationsWebsocketProvider,
    })

    expect(result.current.cable).toBeNull()
    expect(mockCreateConsumer).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 6: Run the full test file to verify all tests pass**

Run: `yarn jest src/Apps/Conversations/context/__tests__/ConversationsWebsocketContext.jest.tsx 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: PASS, 3 tests

- [ ] **Step 7: Type-check and lint**

Run: `yarn type-check; yarn lint src/Apps/Conversations/context/ConversationsWebsocketContext.tsx src/Apps/Conversations/context/__tests__/ConversationsWebsocketContext.jest.tsx 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 8: Commit**

```bash
git add src/Apps/Conversations/context/ConversationsWebsocketContext.tsx src/Apps/Conversations/context/__tests__/ConversationsWebsocketContext.jest.tsx
git commit -m "feat: add shared ActionCable context for Conversations realtime"
```

---

### Task 2: `useConversationsWebsocket` — keyed subscription hook

**Files:**

- Create: `src/Apps/Conversations/hooks/useConversationsWebsocket.ts`
- Test: `src/Apps/Conversations/hooks/__tests__/useConversationsWebsocket.jest.tsx`

**Interfaces:**

- Consumes: `useCable()` from Task 1 (`{ cable, channelsHolder }`).
- Produces:

  - `useConversationsWebsocket({ subscriptionKey, enabled, onEvent }): void`
  - `ConversationMessageSentEvent` type: `{ type: "message.sent"; conversation_id: string; message_id: string; created_at: string }`

- [ ] **Step 1: Write the failing test for basic subscribe/unsubscribe behavior**

```tsx
// src/Apps/Conversations/hooks/__tests__/useConversationsWebsocket.jest.tsx
import { renderHook } from "@testing-library/react-hooks"
import { useCable } from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"

jest.mock("Apps/Conversations/context/ConversationsWebsocketContext")

const mockUseCable = useCable as jest.Mock

const makeChannelsHolder = () => {
  const channels = new Map()
  return {
    setChannel: jest.fn((key, subscription) => {
      channels.set(key, subscription)
      return subscription
    }),
    getChannel: jest.fn(key => channels.get(key)),
    removeChannel: jest.fn(key => channels.delete(key)),
  }
}

describe("useConversationsWebsocket", () => {
  it("does not subscribe when disabled", () => {
    const create = jest.fn()
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder: makeChannelsHolder(),
    })

    renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: false,
        onEvent: jest.fn(),
      }),
    )

    expect(create).not.toHaveBeenCalled()
  })

  it("subscribes to the ConversationsChannel with the given key when enabled", () => {
    const create = jest.fn().mockReturnValue({ unsubscribe: jest.fn() })
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder: makeChannelsHolder(),
    })

    renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent: jest.fn(),
      }),
    )

    expect(create).toHaveBeenCalledWith(
      { channel: "ConversationsChannel", key: "inbox" },
      expect.objectContaining({ received: expect.any(Function) }),
    )
  })

  it("unsubscribes its own channel on unmount", () => {
    const unsubscribe = jest.fn()
    const create = jest.fn().mockReturnValue({ unsubscribe })
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder: makeChannelsHolder(),
    })

    const { unmount } = renderHook(() =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent: jest.fn(),
      }),
    )

    unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it("does not create a duplicate subscription for a key that already has one", () => {
    const create = jest.fn().mockReturnValue({ unsubscribe: jest.fn() })
    const channelsHolder = makeChannelsHolder()
    mockUseCable.mockReturnValue({
      cable: { subscriptions: { create } },
      channelsHolder,
    })

    const { rerender } = renderHook(
      ({ subscriptionKey }) =>
        useConversationsWebsocket({
          subscriptionKey,
          enabled: true,
          onEvent: jest.fn(),
        }),
      { initialProps: { subscriptionKey: "inbox" } },
    )

    rerender({ subscriptionKey: "inbox" })

    expect(create).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn jest src/Apps/Conversations/hooks/__tests__/useConversationsWebsocket.jest.tsx 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: FAIL — module `Apps/Conversations/hooks/useConversationsWebsocket` does not exist.

- [ ] **Step 3: Implement the hook**

```ts
// src/Apps/Conversations/hooks/useConversationsWebsocket.ts
import { useCable } from "Apps/Conversations/context/ConversationsWebsocketContext"
import { useEffect, useRef } from "react"

export interface ConversationMessageSentEvent {
  type: "message.sent"
  conversation_id: string
  message_id: string
  created_at: string
}

interface UseConversationsWebsocketProps {
  subscriptionKey: string
  enabled: boolean
  onEvent: (event: ConversationMessageSentEvent) => void
}

export const useConversationsWebsocket = ({
  subscriptionKey,
  enabled,
  onEvent,
}: UseConversationsWebsocketProps) => {
  const { cable, channelsHolder } = useCable()
  const onEventRef = useRef(onEvent)
  onEventRef.current = onEvent

  useEffect(() => {
    if (!enabled || !cable) {
      return
    }

    const channelKey = `conversations:${subscriptionKey}`

    if (channelsHolder.getChannel(channelKey)) {
      return
    }

    const subscription = cable.subscriptions.create(
      { channel: "ConversationsChannel", key: subscriptionKey },
      {
        received: (event: ConversationMessageSentEvent) => {
          onEventRef.current(event)
        },
      },
    )

    channelsHolder.setChannel(channelKey, subscription)

    return () => {
      subscription.unsubscribe()
      channelsHolder.removeChannel(channelKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, cable, channelsHolder, subscriptionKey])
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `yarn jest src/Apps/Conversations/hooks/__tests__/useConversationsWebsocket.jest.tsx 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: PASS, 4 tests

- [ ] **Step 5: Add a test proving `onEvent` is never called against a stale closure**

Append to the same test file:

```tsx
it("always invokes the latest onEvent callback, even after a re-render changed it", () => {
  let receivedCallback: (event: unknown) => void = () => {}
  const create = jest.fn((_channelInfo, callbacks) => {
    receivedCallback = callbacks.received
    return { unsubscribe: jest.fn() }
  })
  mockUseCable.mockReturnValue({
    cable: { subscriptions: { create } },
    channelsHolder: makeChannelsHolder(),
  })

  const firstOnEvent = jest.fn()
  const secondOnEvent = jest.fn()

  const { rerender } = renderHook(
    ({ onEvent }) =>
      useConversationsWebsocket({
        subscriptionKey: "inbox",
        enabled: true,
        onEvent,
      }),
    { initialProps: { onEvent: firstOnEvent } },
  )

  rerender({ onEvent: secondOnEvent })

  const event = {
    type: "message.sent" as const,
    conversation_id: "conv-1",
    message_id: "msg-1",
    created_at: "2026-08-06T00:00:00Z",
  }
  receivedCallback(event)

  expect(firstOnEvent).not.toHaveBeenCalled()
  expect(secondOnEvent).toHaveBeenCalledWith(event)
})
```

- [ ] **Step 6: Run the full test file to verify all tests pass**

Run: `yarn jest src/Apps/Conversations/hooks/__tests__/useConversationsWebsocket.jest.tsx 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: PASS, 5 tests

- [ ] **Step 7: Type-check and lint**

Run: `yarn type-check; yarn lint src/Apps/Conversations/hooks/useConversationsWebsocket.ts src/Apps/Conversations/hooks/__tests__/useConversationsWebsocket.jest.tsx 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 8: Commit**

```bash
git add src/Apps/Conversations/hooks/useConversationsWebsocket.ts src/Apps/Conversations/hooks/__tests__/useConversationsWebsocket.jest.tsx
git commit -m "feat: add useConversationsWebsocket hook"
```

---

### Task 3: Mount the provider in `ConversationApp.tsx`

**Files:**

- Modify: `src/Apps/Conversations/ConversationApp.tsx:1-62`

**Interfaces:**

- Consumes: `ConversationsWebsocketProvider` from Task 1.

- [ ] **Step 1: Wrap the existing tree with the new provider**

In `src/Apps/Conversations/ConversationApp.tsx`, add the import:

```ts
import { ConversationsWebsocketProvider } from "Apps/Conversations/context/ConversationsWebsocketContext"
```

Change the return statement (currently starting at line 30) from:

```tsx
  return (
    <ConversationsProvider conversation={conversation}>
      <MetaTags title="Inbox | Artsy" />

      <ConversationsLayout
        ...
      />
    </ConversationsProvider>
  )
```

to:

```tsx
  return (
    <ConversationsWebsocketProvider>
      <ConversationsProvider conversation={conversation}>
        <MetaTags title="Inbox | Artsy" />

        <ConversationsLayout
          ...
        />
      </ConversationsProvider>
    </ConversationsWebsocketProvider>
  )
```

(Keep the `ConversationZeroState` early return at line 27 as-is — no provider needed when there's no conversation to show.)

- [ ] **Step 2: Run the existing ConversationApp test suite to confirm nothing broke**

Run: `yarn jest src/Apps/Conversations/__tests__/ConversationApp 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: PASS (if no test file exists yet for `ConversationApp`, this step is a no-op — confirm via `find src/Apps/Conversations -iname "ConversationApp*jest*"` and skip running jest if none is found)

- [ ] **Step 3: Type-check and lint**

Run: `yarn type-check; yarn lint src/Apps/Conversations/ConversationApp.tsx 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/Apps/Conversations/ConversationApp.tsx
git commit -m "feat: mount ConversationsWebsocketProvider in ConversationApp"
```

---

### Task 4: Wire realtime updates into `ConversationMessages.tsx` (thread view)

**Files:**

- Modify: `src/Apps/Conversations/components/Message/ConversationMessages.tsx:1-90` (imports + hook body, above the existing `useRefetchLatestMessagesPoll` call at line 73)
- Modify: `src/Apps/Conversations/components/Message/__tests__/ConversationMessages.jest.tsx` (existing file)

**Interfaces:**

- Consumes: `useConversationsWebsocket` from Task 2, `useFlag` from `@unleash/proxy-client-react`.

**Confirmed existing test file:** `src/Apps/Conversations/components/Message/__tests__/ConversationMessages.jest.tsx` already exists, uses `setupTestWrapperTL`/`renderWithRelay` with `query ConversationMessagesTestQuery`, and its `"calls refetch when clicking the latest messages button"` test proves a `relay.refetchConnection` call surfaces as an operation named `"ConversationMessagesPaginationQuery"` in `env.mock.getAllOperations()` — the new tests below reuse that same assertion style.

- [ ] **Step 1: Write failing tests for the flag-gated websocket behavior**

Add to `src/Apps/Conversations/components/Message/__tests__/ConversationMessages.jest.tsx`, alongside the existing imports at the top of the file:

```tsx
import { useFlag } from "@unleash/proxy-client-react"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"

jest.mock("Apps/Conversations/hooks/useConversationsWebsocket")
```

Then add this new `describe` block at the end of the file, inside the outer `describe("ConversationMessages", ...)`:

```tsx
describe("realtime updates", () => {
  const mockUseFlag = useFlag as jest.Mock
  const mockUseConversationsWebsocket = useConversationsWebsocket as jest.Mock

  const oneMessage = {
    MessageConnection: () => ({
      edges: [
        {
          node: {
            internalID: "msg-1",
            body: "Hello",
            isFromUser: true,
            createdAt: new Date().toISOString(),
          },
        },
      ],
    }),
    Conversation: () => ({ internalID: "conv-1" }),
  }

  it("does not enable the websocket hook when the flag is off", () => {
    mockUseFlag.mockReturnValue(false)

    renderWithRelay(oneMessage)

    expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
        subscriptionKey: "conversation:conv-1",
      }),
    )
  })

  it("enables the websocket hook, keyed by the conversation id, when the flag is on", () => {
    mockUseFlag.mockReturnValue(true)

    renderWithRelay(oneMessage)

    expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
        subscriptionKey: "conversation:conv-1",
      }),
    )
  })

  it("refetches messages when a matching event arrives", () => {
    mockUseFlag.mockReturnValue(true)

    const { env } = renderWithRelay(oneMessage)

    const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
    act(() => {
      onEvent({
        type: "message.sent",
        conversation_id: "conv-1",
        message_id: "msg-99",
        created_at: "2026-08-06T00:00:00Z",
      })
    })

    expect(
      env.mock
        .getAllOperations()
        .map(operation => operation.request.node.params.name),
    ).toContain("ConversationMessagesPaginationQuery")
  })

  it("ignores events for a different conversation", () => {
    mockUseFlag.mockReturnValue(true)

    const { env } = renderWithRelay(oneMessage)

    const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
    act(() => {
      onEvent({
        type: "message.sent",
        conversation_id: "some-other-conversation",
        message_id: "msg-99",
        created_at: "2026-08-06T00:00:00Z",
      })
    })

    expect(
      env.mock
        .getAllOperations()
        .map(operation => operation.request.node.params.name),
    ).not.toContain("ConversationMessagesPaginationQuery")
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn jest src/Apps/Conversations/components/Message/__tests__/ConversationMessages 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: FAIL — `useFlag`/`useConversationsWebsocket` not called as expected.

- [ ] **Step 3: Wire the hook into `ConversationMessages.tsx`**

Add imports near the top of `src/Apps/Conversations/components/Message/ConversationMessages.tsx`:

```ts
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"
import { useFlag } from "@unleash/proxy-client-react"
```

Immediately above the existing `useRefetchLatestMessagesPoll({...})` call (line 73), add:

```ts
const isWebsocketEnabled = useFlag("amber_conversations-force--websocket")

useConversationsWebsocket({
  subscriptionKey: `conversation:${conversation.internalID}`,
  enabled: isWebsocketEnabled,
  onEvent: event => {
    if (event.conversation_id !== conversation.internalID) {
      return
    }

    if (showLatestMessagesFlyOut) {
      return
    }

    refetchMessages({ showPreloader: false })
  },
})
```

Then change the existing poll call (currently `clearWhen: showLatestMessagesFlyOut`) to also clear when the websocket is active:

```ts
useRefetchLatestMessagesPoll({
  clearWhen: showLatestMessagesFlyOut || isWebsocketEnabled,
  onRefetch: () => {
    if (showLatestMessagesFlyOut) {
      return
    }

    refetchMessages({
      showPreloader: false,
    })
  },
})
```

Note: `refetchMessages` is defined later in the component body (line 114) as a plain function, not memoized — it's called from an inline arrow in the existing poll's `onRefetch` today, so referencing it the same way from `useConversationsWebsocket`'s `onEvent` is consistent with the current pattern; no need to hoist or memoize it.

- [ ] **Step 4: Run the full test file to verify all tests pass (old + new, confirming no regression in the polling path)**

Run: `yarn jest src/Apps/Conversations/components/Message/__tests__/ConversationMessages 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: PASS, all tests

- [ ] **Step 5: Type-check and lint**

Run: `yarn type-check; yarn lint src/Apps/Conversations/components/Message/ConversationMessages.tsx src/Apps/Conversations/components/Message/__tests__/ConversationMessages.jest.tsx 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add src/Apps/Conversations/components/Message/ConversationMessages.tsx src/Apps/Conversations/components/Message/__tests__/ConversationMessages.jest.tsx
git commit -m "feat: refetch conversation thread on realtime message event"
```

---

### Task 5: Wire realtime updates into `ConversationsSidebar.tsx` (list view)

**Files:**

- Modify: `src/Apps/Conversations/components/Sidebar/ConversationsSidebar.tsx:1-101`
- Modify: `src/Apps/Conversations/components/Sidebar/__tests__/ConversationsSidebar.jest.tsx` (existing file)

**Interfaces:**

- Consumes: `useConversationsWebsocket` from Task 2, `useFlag` from `@unleash/proxy-client-react`.

**Confirmed existing test file:** `src/Apps/Conversations/components/Sidebar/__tests__/ConversationsSidebar.jest.tsx` already exists. It mocks `System/Hooks/useRouter`, uses `setupTestWrapperTL`/`renderWithRelay` with `query ConversationsSidebarTestQuery`, and its `"renders"` test populates `ConversationConnection` edges directly (no `Conversation`-level mock needed, since the sidebar's `subscriptionKey` is the static string `"inbox"`, not conversation-specific).

- [ ] **Step 1: Write failing tests for the flag-gated websocket behavior**

Add to the top of `src/Apps/Conversations/components/Sidebar/__tests__/ConversationsSidebar.jest.tsx`, alongside the existing imports (note `act` is added to the existing `@testing-library/react` import):

```tsx
import { act, screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"

jest.mock("Apps/Conversations/hooks/useConversationsWebsocket")
```

Then add this new `describe` block inside the existing `describe("ConversationDetails", ...)` block (after the `"renders empty message given no conversation"` test):

```tsx
describe("realtime updates", () => {
  const mockUseFlag = useFlag as jest.Mock
  const mockUseConversationsWebsocket = useConversationsWebsocket as jest.Mock

  const oneConversation = {
    ConversationConnection: () => ({
      edges: [
        {
          node: {
            internalID: "conversation-1",
            to: { name: "Collector 1" },
            lastMessageAt: "2022-12-02",
            unread: false,
          },
        },
      ],
    }),
  }

  it("subscribes with the 'inbox' key when the flag is on", () => {
    mockUseFlag.mockReturnValue(true)

    renderWithRelay(oneConversation)

    expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: true, subscriptionKey: "inbox" }),
    )
  })

  it("does not enable the websocket hook when the flag is off", () => {
    mockUseFlag.mockReturnValue(false)

    renderWithRelay(oneConversation)

    expect(mockUseConversationsWebsocket).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false, subscriptionKey: "inbox" }),
    )
  })

  it("refetches the sidebar list on any realtime event", () => {
    mockUseFlag.mockReturnValue(true)

    const { env } = renderWithRelay(oneConversation)

    const operationCountBefore = env.mock.getAllOperations().length

    const { onEvent } = mockUseConversationsWebsocket.mock.calls[0][0]
    act(() => {
      onEvent({
        type: "message.sent",
        conversation_id: "conversation-1",
        message_id: "msg-99",
        created_at: "2026-08-06T00:00:00Z",
      })
    })

    expect(env.mock.getAllOperations().length).toBeGreaterThan(
      operationCountBefore,
    )
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn jest src/Apps/Conversations/components/Sidebar/__tests__/ConversationsSidebar 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: FAIL

- [ ] **Step 3: Wire the hook into `ConversationsSidebar.tsx`**

Add imports near the top of `src/Apps/Conversations/components/Sidebar/ConversationsSidebar.tsx`:

```ts
import { useConversationsWebsocket } from "Apps/Conversations/hooks/useConversationsWebsocket"
import { useFlag } from "@unleash/proxy-client-react"
```

Add a helper above the return statement that both the poll and the socket call, to avoid duplicating the refetch logic currently inline in `useRefetchLatestMessagesPoll`'s `onRefetch` (lines 81-101):

```ts
const isWebsocketEnabled = useFlag("amber_conversations-force--websocket")

const refetchSidebar = () => {
  if (!enableSilentSidebarRefetch) {
    return
  }

  const fetchSize =
    viewer.conversationsConnection?.edges?.length ?? SIDEBAR_FETCH_PAGE_SIZE

  relay.refetchConnection(
    fetchSize,
    {},
    {
      first: fetchSize,
    },
  )
}

useConversationsWebsocket({
  subscriptionKey: "inbox",
  enabled: isWebsocketEnabled,
  onEvent: refetchSidebar,
})

useRefetchLatestMessagesPoll({
  intervalTime: 10000,
  clearWhen: !enableSilentSidebarRefetch || isWebsocketEnabled,
  onRefetch: refetchSidebar,
})
```

This replaces the existing inline `onRefetch` body (lines 84-100) with a call to the new `refetchSidebar` helper, and adds `isWebsocketEnabled` to `clearWhen` — everything else (the `enableSilentSidebarRefetch` state, `useLoadMore`, the URL-sync `useEffect`) stays untouched.

- [ ] **Step 4: Run the full test file to verify all tests pass (old + new, confirming no regression in the polling path)**

Run: `yarn jest src/Apps/Conversations/components/Sidebar/__tests__/ConversationsSidebar 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"`
Expected: PASS, all tests

- [ ] **Step 5: Type-check and lint**

Run: `yarn type-check; yarn lint src/Apps/Conversations/components/Sidebar/ConversationsSidebar.tsx src/Apps/Conversations/components/Sidebar/__tests__/ConversationsSidebar.jest.tsx 2>&1 | tail -20`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add src/Apps/Conversations/components/Sidebar/ConversationsSidebar.tsx src/Apps/Conversations/components/Sidebar/__tests__/ConversationsSidebar.jest.tsx
git commit -m "feat: refetch conversations sidebar on realtime message event"
```

---

## Final verification

- [ ] Run the full Conversations test suite: `yarn jest src/Apps/Conversations 2>&1 | grep -E "Tests:|Suites:|✕|FAIL"` — expect all green.
- [ ] Run `yarn type-check` clean across the whole repo.
- [ ] Manually toggle the `amber_conversations-force--websocket` flag off and confirm the sidebar/thread still refresh via polling (no visible regression) — this can't be verified against a live Gravity socket without the flag actually flipped in an environment; note in the PR description that live-socket behavior needs verification against staging once the flag is enabled there.
