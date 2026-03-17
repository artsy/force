# Smarty Address Autocomplete: International + Unit Narrowing

## Architectural Decision: Component Model vs Lines

The current `Address` type stores structured fields: `addressLine1`, `addressLine2`, `city`,
`region`, `postalCode`, `country`. A "lines" model (freeform `line1`/`line2`/`line3`) would
be more flexible for international but requires Metaphysics schema changes and a migration
of all existing addresses — out of scope here.

**Decision: keep the component model for both US and international.**

Smarty's international API returns structured components (`street`, `locality`,
`administrative_area`, `postal_code`, `country_iso3`) that map directly onto our existing
fields. No address assembly is needed. Empty fields (e.g. no `administrative_area` in many
countries) are already handled by the validation layer (`isRegionRequired`,
`isPostalCodeRequired`).

---

## Feature 1: International Autocomplete

**Complexity: Medium**

### API

- Endpoint: `https://international-autocomplete.api.smarty.com/v2/lookup`
- Params: `key`, `search`, `country` (ISO-3), `max_results`
- Same `SMARTY_EMBEDDED_KEY_JSON` embedded key covers international — no new config needed

### Response shape vs current US shape

| Field (US)         | Field (International) | Notes                              |
| ------------------ | --------------------- | ---------------------------------- |
| `suggestions[]`    | `candidates[]`        | Different array name               |
| `street_line`      | `street`              | Maps to `addressLine1`             |
| `city`             | `locality`            | Maps to `city`                     |
| `state`            | `administrative_area` | May be empty; maps to `region`     |
| `zipcode`          | `postal_code`         | May be empty; maps to `postalCode` |
| `"US"` (hardcoded) | `country_iso3`        | Need ISO-3 → ISO-2 conversion      |
| `secondary`        | _(not available)_     | `addressLine2` stays empty         |

### Changes required in `AddressAutocompleteInput.tsx`

1. Add `ProviderSuggestionInternational` type for `candidates[]`
2. Add ISO-2 ↔ ISO-3 country code conversion utility
3. Add `fetchInternationalSuggestionsWithThrottle` calling the international endpoint
4. Add feature flag `address_autocomplete_international` (same pattern as `address_autocomplete_us`)
5. Extend `serviceAvailability` effect to check international flag for non-US countries
6. Add mapping branch for international candidates (handle missing `administrative_area`/`postal_code`)

### What does NOT change

- `AddressFormFields.tsx` `onSelect` handler already sets all fields including `country` ✓
- Validation schema already makes `region`/`postalCode` optional for non-US/CA ✓
- No UI layout changes

### Optional: OpenCageData formatting

[address-formatting](https://github.com/OpenCageData/address-formatting) provides per-country
Mustache templates for assembling components in the correct local order. Useful if Smarty's
`street` field proves ambiguous for certain countries. Start without it; add if issues arise.

---

## Feature 2: US Unit Narrowing

**Complexity: Higher** (requires multi-step UX state management)

### How Smarty narrowing works

1. User types `"401 Broadway"` → API returns results; some have `entries > 1` (multi-unit buildings)
2. User selects a multi-unit result → make a second API call:
   `search=401 Broadway&selected=401 Broadway (3) New York NY 10013`
3. API returns unit-level options (Apt 1, Apt 2, …) with `entries === 1`
4. User selects a unit → form fields populate normally

### Current blockers in the code

| Location                                   | Problem                                            |
| ------------------------------------------ | -------------------------------------------------- |
| `filterSecondarySuggestions` (line 398)    | Strips all `secondary`/unit data — must be removed |
| `entries: null` (line 276)                 | Hardcoded; must use real API value                 |
| `selected` param in `fetchForAutocomplete` | Wired up but never triggered                       |

### Changes required

1. Remove `filterSecondarySuggestions` (or gate it to non-narrowing mode)
2. Use real `entries` value from the API response
3. Add a `NARROWING` state to the reducer tracking whether we're in initial search or narrowing
4. Intercept `onSelect` when `option.entries > 1`:
   - Update the input value to the building address text
   - Fetch with `selected` param
   - Enter narrowing state — do **not** call parent `onSelect` yet
5. When `entries === 1`: call parent `onSelect` as normal (final selection)
6. Clear narrowing state on `onClear` and on country change

### UI affordance

Show a "N units" hint on multi-unit rows so users understand that selecting one will drill
down rather than immediately fill the form. Requires checking whether Palette's
`AutocompleteInput` supports `renderOption` customisation; otherwise a text suffix on the
`text`/`value` field is a fallback.

### Key risk

Verify that Palette's `AutocompleteInput` does not unconditionally close the dropdown on
`onSelect`. If it does, the narrowing step (keep dropdown open with sub-unit suggestions)
will require a workaround or a Palette change.

---

## Sequencing Recommendation

| PR  | Scope                      | Why first                                                  |
| --- | -------------------------- | ---------------------------------------------------------- |
| 1   | International autocomplete | Self-contained API + mapping work, no UX risks             |
| 2   | US unit narrowing          | More UX unknowns; Palette behaviour needs validation first |

---

## Files to Modify

- `src/Components/Address/AddressAutocompleteInput.tsx` — primary changes for both features
- `src/Components/Address/__tests__/AddressAutocompleteInput.jest.tsx` — new tests
- `src/Components/Address/AddressFormFields.tsx` — no changes expected

## Verification

```sh
yarn type-check
yarn jest src/Components/Address
```

New test cases needed:

- International suggestion fetch and field mapping
- ISO-3 → ISO-2 conversion edge cases
- Narrowing: `entries > 1` does not call parent `onSelect`
- Narrowing: `entries === 1` calls parent `onSelect` with unit-level address
