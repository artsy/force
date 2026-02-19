# Immersive View Accessibility Report (Artwork Grids)

Date: 2026-02-19  
Area: `ArtworkFilter` immersive view entry point and immersive artwork navigation

## Scope

This report covers accessibility for:

1. Entering immersive view from artwork grids (desktop artwork filter toolbar)
2. Navigating between artworks while immersive view is open (keyboard + controls)

## Method

- Component-level code review of:
  - `src/Components/ArtworkFilter/index.tsx`
  - `src/Components/ArtworkFilter/ImmersiveView.tsx`
- Test verification and behavior checks using:
  - `yarn jest src/Components/ArtworkFilter/__tests__/ArtworkFilter.jest.tsx`
  - `yarn jest src/Components/ArtworkFilter/__tests__/ImmersiveView.jest.tsx`

## Findings

### 1) Entry point into immersive view

**Status:** Pass

- The entry point is a semantic `<button>` with accessible name **"Immersive View"**.
- It is disabled when there are zero artworks, which prevents opening an empty experience.
- It is reachable by keyboard and covered by existing tests.

### 2) In-immersive navigation controls

**Status:** Improved in this pass

#### Issue A (fixed): No explicit live announcement when artwork changes

- Before this change, the current artwork content updated visually, but there was no dedicated live region to announce artwork changes to screen readers during arrow/button navigation.
- **Fix:** Added a polite `role="status"` live announcement (`VisuallyHidden`) that updates with the current artwork index and metadata.

#### Issue B (fixed): Next control remained enabled at true end-of-results

- Before this change, the **Next artwork** control could remain enabled at the last artwork when no next page existed.
- **Fix:** Next is now disabled when the user reaches the final artwork and `hasNextPage` is false. Navigation controls are also disabled during page-loading and empty states.

#### Issue C (fixed): Artwork link used `target="_new"`

- `target="_new"` can create/reuse a named browsing context and is less predictable than `_blank`.
- **Fix:** Switched to `target="_blank"` and added `rel="noopener noreferrer"`.

## Changes Implemented

- Updated `src/Components/ArtworkFilter/ImmersiveView.tsx`:
  - Added SR live announcement region for current artwork updates.
  - Added boundary-aware disabling for previous/next controls.
  - Guarded keyboard/button navigation during loading and empty states.
  - Prevented default browser behavior on left/right arrow handling.
  - Updated artwork link target/rel attributes for safer, predictable new-tab behavior.

- Updated `src/Components/ArtworkFilter/__tests__/ImmersiveView.jest.tsx`:
  - Added test coverage for:
    - next-button disabled at last artwork when no next page
    - status announcement update on artwork navigation
    - artwork link `_blank` + `rel` behavior

## Test Results

- `yarn jest src/Components/ArtworkFilter/__tests__/ImmersiveView.jest.tsx` ✅
- `yarn jest src/Components/ArtworkFilter/__tests__/ArtworkFilter.jest.tsx` ✅

## Follow-up Recommendations

- Perform a browser-level screen-reader pass (VoiceOver/NVDA) on a real artwork grid page to confirm announcement cadence and focus behavior in production conditions.
- Confirm modal focus return behavior after closing immersive view (typically handled by `ModalBase`).
