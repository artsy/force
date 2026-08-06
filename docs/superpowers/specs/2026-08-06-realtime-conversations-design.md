# Realtime messages in Conversations

## Purpose

Conversations currently refresh via polling (`useRefetchLatestMessagesPoll`, every 20s while the tab is visible). This adds a websocket path so new messages and conversation-list updates arrive immediately, following the pattern already shipped in [Volt (PR #11808)](https://github.com/artsy/volt/pull/11808) and [Eigen (PR #13833)](https://github.com/artsy/eigen/pull/13833).

Feature flag: `amber_conversations-force--websocket` (client-side unleash, distinct from Volt's server-gated `amber_conversations-websocket`).

## Background: how Volt and Eigen did this

**Volt** (partner-facing): server-side Ruby feature model gates the flag; frontend reads `features.conversations_websocket_enabled` off context, no direct unleash call. `useWebsockets` opens one ActionCable consumer per hook call, subscribed to `ConversationsChannel` scoped by `partner_id`. This works there because Volt never mounts the sidebar and an open thread at the same time.

**Eigen** (collector-facing, same audience as Force): client-side `useFeatureFlag`. One shared ActionCable connection (`useCable()` context) plus a `channelsHolder` map, so the inbox list and an open thread — which _are_ both mounted at once — multiplex over a single physical connection instead of opening two. Subscribes with the user's own `access_token` (not a partner id), since Eigen streams a collector's own conversations.

**Force** matches Eigen's shape: `ConversationLayout.tsx` renders the sidebar and the open thread side by side via `<Resizer>` on desktop, so both need a live subscription concurrently. Force already depends on `actioncable` and has a `WebsocketContext` (`src/System/Contexts/WebsocketContext.tsx`), but it only supports one channel per provider and authenticates with the app-wide `ARTSY_XAPP_TOKEN` (used today for public sale/auction broadcasts in `AuctionApp`/`ArtworkApp`). Conversation data is private per user, and two concurrent subscribers would need two channels, so we're not reusing that context — see "Why not extend `WebsocketContext`" below.

**Backend assumption**: Gravity's `ConversationsChannel` already supports authenticating with a collector's own access token (proven by Eigen). No Gravity/metaphysics changes are needed for this work.

## Architecture

```
ConversationApp.tsx
└── ConversationsWebsocketContextProvider   (new)
      └── ConversationsProvider              (existing)
            └── ConversationsLayout
                  ├── ConversationsSidebar        → useConversationsWebsocket({ subscriptionKey: "inbox" })
                  └── ConversationMessages        → useConversationsWebsocket({ subscriptionKey: `conversation:${id}` })
```

One ActionCable consumer is created lazily (on first subscribe) and shared for the lifetime of the Conversations app. Each caller gets its own logical subscription, keyed independently, multiplexed over that one connection.

### New files

**`src/Apps/Conversations/context/ConversationsWebsocketContext.tsx`**

- Provider mounted once, in `ConversationApp.tsx`, wrapping the existing `ConversationsProvider`.
- Lazily creates one `actioncable` consumer (`useRef`, built on first subscribe) via `actionCable.createConsumer(getENV("GRAVITY_WEBSOCKET_URL"))`, authenticated with the current user's `accessToken` (from `useSystemContext()` — the same source Force already uses elsewhere for the logged-in user).
- Holds a `channelsHolder`: a small keyed map (`setChannel(key, subscription)`, plus a lookup/remove) so two independent subscribers never open a second physical connection or clobber each other's channel.
- Exposes `useCable()` returning `{ cable, channelsHolder }`.

**`src/Apps/Conversations/hooks/useConversationsWebsocket.ts`**

```ts
interface UseConversationsWebsocketProps {
  subscriptionKey: string
  enabled: boolean
  onEvent: (event: ConversationMessageSentEvent) => void
}
```

- Pulls `{ cable, channelsHolder }` from `useCable()`.
- No-ops if `!enabled`, or `cable`/`channelsHolder` aren't ready yet.
- Creates a `ConversationsChannel` subscription (`{ access_token, key: subscriptionKey }`) under `channelsHolder`, keyed `conversations:${subscriptionKey}`.
- Routes `onEvent` through a `useRef` so the callback never runs against a stale closure — this is the exact bug Volt shipped and had to patch in a follow-up commit.
- Unsubscribes its own channel (not the whole cable) on unmount or when `enabled` flips false.
- The flag itself is **not** checked inside this hook — call sites pass `enabled: isWebsocketEnabled` so the hook stays flag-agnostic and independently testable.

**Event payload** (mirrors Volt/Eigen — no message content over the wire, always refetch via Relay as the source of truth):

```ts
interface ConversationMessageSentEvent {
  type: "message.sent"
  conversation_id: string
  message_id: string
  created_at: string
}
```

### Why not extend `WebsocketContext`

Making the shared context support multiple keyed channels and a user-token auth mode alongside its existing single-channel, `xapp_token` mode would end up rebuilding the same shared-cable shape described above — just inside a file that `AuctionApp`/`ArtworkApp` depend on for live bidding. Every change would then need review and testing against auction's live-bidding path for a feature that has nothing to do with it. Building the same pattern as a self-contained piece inside `Apps/Conversations/` gets identical behavior with no risk to auction code.

## Call sites

**`ConversationsSidebar.tsx`** (list): `useConversationsWebsocket({ subscriptionKey: "inbox", enabled: isWebsocketEnabled, onEvent: () => { /* existing silent sidebar refetch */ } })`. Any event triggers the same refetch the poll already does today (`enableSilentSidebarRefetch` path).

**`ConversationMessages.tsx`** (thread): `useConversationsWebsocket({ subscriptionKey: `conversation:${conversation.internalID}`, enabled: isWebsocketEnabled, onEvent: (event) => { if (event.conversation_id !== conversation.internalID) return; refetchMessages({ showPreloader: false }) } })`. Reuses the existing `refetchMessages` function (`relay.refetchConnection`), same scroll-position-aware behavior the poll uses at `ConversationMessages.tsx:114`.

Both call sites read `isWebsocketEnabled = useFlag("amber_conversations-force--websocket")` and pass it to their existing `useRefetchLatestMessagesPoll({ clearWhen: isWebsocketEnabled, ... })` call, unchanged otherwise. When the flag is off, or the socket fails to connect, polling keeps running exactly as it does today — a zero-risk fallback.

## Error handling

- ActionCable's own reconnect/backoff handles transient connection drops; no custom retry logic needed.
- If the user has no `accessToken` (shouldn't happen — Conversations already requires auth), the hook simply never subscribes; polling covers it.
- If a subscription is created for a key that already has one (e.g. a fast re-render), `channelsHolder` skips creating a duplicate.

## Testing

- Unit tests for `useConversationsWebsocket`: subscribes only when `enabled`; unsubscribes on unmount/`enabled` flip; two calls with different `subscriptionKey`s don't collide on the same `channelsHolder`; `onEvent` never runs against a stale closure across re-renders.
- Unit tests for `ConversationsWebsocketContext`: lazily creates exactly one consumer across multiple subscribers.
- RTL tests on `ConversationMessages.tsx` and `ConversationsSidebar.tsx`: flag on → matching event triggers refetch, non-matching `conversation_id` is ignored; flag off → hook never subscribes, existing poll behavior is unchanged.
- No new Playwright/e2e test — this is a refresh-mechanism change behind an already-tested UI, not a new user-facing flow.

## Out of scope

- Any Gravity/metaphysics changes (assumed already in place, per Eigen precedent).
- Changing `WebsocketContext`, `AuctionApp`, or `ArtworkApp`.
- Pushing message content over the socket (Relay refetch remains the source of truth, matching Volt/Eigen).
