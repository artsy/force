# Easy-Peasy Migration Test Plan

## Overview

This document outlines the testing strategy for contexts migrated from React.createContext to easy-peasy createContextStore.

## Test Categories

### 1. Unit Tests (Per Context)

#### State Management

- [ ] Initial state is correctly set
- [ ] Actions update state as expected
- [ ] Computed values calculate correctly
- [ ] State immutability is maintained

#### API Compatibility

- [ ] useContext hook returns same shape
- [ ] All properties/methods available
- [ ] TypeScript types match original
- [ ] Consumer components work unchanged

#### Example Test Structure

```typescript
describe("SystemStore", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() => useSystemContext())
    expect(result.current.router).toBeNull()
    expect(result.current.isLoggedIn).toBe(false)
  })

  it("should update user and derived state", () => {
    const { result } = renderHook(() => useSystemContext())
    act(() => {
      result.current.setUser({ id: "123", name: "Test User" })
    })
    expect(result.current.user.id).toBe("123")
    expect(result.current.isLoggedIn).toBe(true)
  })
})
```

### 2. Integration Tests

#### Component Integration

- [ ] Components using context render correctly
- [ ] State updates propagate to child components
- [ ] No unnecessary re-renders
- [ ] Hooks work in nested components

#### Provider Tests

- [ ] Provider accepts runtime model
- [ ] Multiple providers can coexist
- [ ] Provider unmount cleans up properly

### 3. Performance Tests

#### Render Performance

- [ ] Measure render count before/after migration
- [ ] Check selector efficiency
- [ ] Verify computed values are memoized
- [ ] Test with React DevTools Profiler

#### Memory Usage

- [ ] Check for memory leaks
- [ ] Verify proper cleanup on unmount
- [ ] Monitor store size with large datasets

### 4. Backward Compatibility Tests

#### Legacy API Support

- [ ] HOCs (withContext) work correctly
- [ ] Context.Consumer pattern supported
- [ ] useContext hook compatibility
- [ ] Props passed correctly

#### Migration Path

- [ ] Can run old and new contexts simultaneously
- [ ] Gradual migration possible
- [ ] No breaking changes for consumers

## Test Checklist Per Context

### SystemContext ✅

- [ ] Unit tests for all actions
- [ ] User state management tests
- [ ] Router integration tests
- [ ] Relay environment handling
- [ ] TypeScript compilation tests

### NavigationHistoryContext 🟡

- [ ] History array management
- [ ] Path deduplication logic
- [ ] Computed previousPath tests
- [ ] Router integration tests
- [ ] Debug component tests

### ArticleContext ⬜

- [ ] TBD after migration

### SelectedEditionSetContext ⬜

- [ ] TBD after migration

## Testing Tools

1. **Jest** - Unit testing
2. **React Testing Library** - Component testing
3. **React DevTools Profiler** - Performance analysis
4. **TypeScript Compiler** - Type safety verification

## Automated Testing

### CI Pipeline Checks

1. All existing tests must pass
2. New migration tests must pass
3. Type checking must succeed
4. Bundle size comparison
5. Performance benchmarks

### Pre-merge Requirements

- 100% backward compatibility
- No performance regressions
- All TypeScript types maintained
- Documentation updated

## Manual Testing

### Smoke Tests

1. Start application with migrated context
2. Navigate through main user flows
3. Verify no console errors
4. Check state persistence
5. Test edge cases

### User Acceptance

1. No visible changes to end users
2. Performance feels same or better
3. All features work as before
4. No new bugs introduced
