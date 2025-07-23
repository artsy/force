# Easy-Peasy Migration Guide for Force Contexts

## Overview

This guide outlines the process for migrating 33+ React createContext implementations to easy-peasy's createContextStore pattern in the Force codebase.

## Migration Phases

### Phase 1: Simple Contexts (4 contexts)

- **SystemContext** - App configuration storage
- **NavigationHistoryContext** - History tracking
- **ArticleContext** - Article state
- **SelectedEditionSetContext** - Edition selection

### Phase 2: Medium Complexity (9 contexts)

- **StickyProvider** - State + positioning logic
- **AuthDialogContext** - Auth flow management
- **CookieConsentManagerContext** - Consent state
- **TransitionPanel** - UI transitions
- **ManageArtworkForSaves** - Save state
- **WebsocketContext** - WebSocket connection management
- **ArtworkGridContext** - Grid state management
- **InquiryContext** - Inquiry workflow
- **OnboardingContext** - Onboarding flow

### Phase 3: Complex Contexts (20 contexts)

Including:

- **AlertContext** - Complex with reducers and GraphQL
- **ArtworkFilterContext** - Dual reducers and URL sync
- **Order2CheckoutContext** - E-commerce workflow
- **AuctionResultsFilterContext** - Filter + auction logic
- **SavedSearchAlertContext** - Search criteria management

## Migration Pattern

### 1. Install easy-peasy

```bash
yarn add easy-peasy
```

### 2. Basic Migration Pattern

#### Before (React.createContext):

```typescript
// SystemContext.tsx
import { createContext, useState } from "react"

export interface SystemContextProps {
  router: Router | null
  setRouter: (router: Router) => void
  user: User
  setUser: (user: User) => void
}

export const SystemContext = createContext<SystemContextProps>({} as SystemContextProps)

export const SystemContextProvider = ({ children }) => {
  const [router, setRouter] = useState(null)
  const [user, setUser] = useState(getUser())

  return (
    <SystemContext.Provider value={{ router, setRouter, user, setUser }}>
      {children}
    </SystemContext.Provider>
  )
}
```

#### After (easy-peasy):

```typescript
// SystemContext.tsx
import { createContextStore, Action, action } from "easy-peasy"

interface SystemContextModel {
  // State
  router: Router | null
  user: User

  // Actions
  setRouter: Action<SystemContextModel, Router>
  setUser: Action<SystemContextModel, User>
}

export const SystemContext = createContextStore<SystemContextModel>({
  // State
  router: null,
  user: getUser(),

  // Actions
  setRouter: action((state, payload) => {
    state.router = payload
  }),
  setUser: action((state, payload) => {
    state.user = payload
  }),
})

export const SystemContextProvider = SystemContext.Provider

// Hook usage remains similar
export const useSystemContext = () => {
  const router = SystemContext.useStoreState(state => state.router)
  const setRouter = SystemContext.useStoreActions(actions => actions.setRouter)
  return { router, setRouter }
}
```

### 3. Migrating useReducer Patterns

#### Before:

```typescript
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload }
    default:
      return state
  }
}
```

#### After:

```typescript
interface Model {
  value: string
  setValue: Action<Model, string>
}

const store = createContextStore<Model>({
  value: "",
  setValue: action((state, payload) => {
    state.value = payload
  }),
})
```

### 4. Complex State with Computed Values

```typescript
import { computed } from "easy-peasy"

interface FilterModel {
  filters: Record<string, any>
  activeFilterCount: Computed<FilterModel, number>
}

const store = createContextStore<FilterModel>({
  filters: {},
  activeFilterCount: computed(
    state => Object.values(state.filters).filter(Boolean).length,
  ),
})
```

## Migration Checklist

- [ ] Install easy-peasy dependency
- [ ] Create TypeScript interface for store model
- [ ] Convert state to store properties
- [ ] Convert state setters to actions
- [ ] Replace useReducer with actions
- [ ] Update Provider component
- [ ] Create backward-compatible hooks
- [ ] Update all consumer components
- [ ] Add tests for migrated context
- [ ] Remove old context implementation

## Testing Strategy

1. **Unit Tests**: Test each action and computed value
2. **Integration Tests**: Test context within components
3. **Backward Compatibility**: Ensure existing API works
4. **Performance**: Monitor re-render behavior

## Common Pitfalls

1. **Direct State Mutation**: Easy-peasy uses immer, so direct mutations are allowed in actions
2. **Async Actions**: Use thunks for async operations
3. **TypeScript**: Ensure proper typing for all models
4. **Performance**: Use selectors to prevent unnecessary re-renders

## Resources

- [Easy-Peasy Documentation](https://easy-peasy.vercel.app/)
- [Migration Examples from Volt](https://github.com/artsy/volt/blob/main/doc/javascript/managing-state.md)
- [Force Context Implementations](src/System/Contexts/)
