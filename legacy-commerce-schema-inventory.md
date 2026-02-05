# Legacy Commerce GraphQL Schema Inventory - Force

**Last Updated**: 2026-02-05

---

## Executive Summary

### Usage Statistics

- **Commerce Queries Used**: 1 (`commerceOrder`)
- **Commerce Mutations Used**: 15
- **Primary Apps Using Commerce Schema**:
  - `src/Apps/Order` (legacy checkout - 50+ files)
  - `src/Apps/Artwork` (Buy/Offer buttons)
  - `src/Apps/PartnerOffer` (partner-initiated offers)
  - `src/Utils/useAuthIntent` (logged-out purchase initiation)
- **Migration Status**: Order2 (new checkout) already migrated to new Order API ✅

### Critical Findings

⚠️ **Force has TWO checkout systems**:
- **Legacy**: `src/Apps/Order` using `CommerceOrder` + commerce mutations
- **New**: `src/Apps/Order2` using `Order` + new mutations (createBuyerOffer, submitOrder, etc.)

🎯 **Migration Scope (Refined)**:
1. **Keep in Legacy Order** - Only counter-offer responses & payment updates
2. **Migrate to New API** - Artwork page order creation, Auth Intent
3. **Separate Work** - Conversations (similar to partner-facing work)
4. **Out of Scope** - Settings (will ticket), uncertain components (may be replaced)

---

## Commerce Queries

### `commerceOrder` - ✅ ACTIVELY USED

**Purpose**: Fetch single order by ID for legacy checkout flow

**Used In**: [src/Apps/Order/orderRoutes.tsx](src/Apps/Order/orderRoutes.tsx)
- Used **11 times** across all route queries (Shipping, Payment, Review, Offer, Accept, Reject, etc.)

**Usage Pattern**:
```graphql
query OrderQuery($orderID: ID!) {
  order: commerceOrder(id: $orderID) {
    internalID
    mode
    state
    # ... ~100+ fields queried across routes
  }
}
```

**Migration**: Once legacy Order app is deprecated, replace with `order(id: $orderID)`

---

## Commerce Mutations

### Order Creation Mutations (HIGH PRIORITY)

#### 1. `commerceCreateOrderWithArtwork` ✅ ACTIVELY USED

**Purpose**: Create Buy Now order from artwork detail page

**Locations**:
- [src/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons.tsx:576](src/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons.tsx#L576)
- [src/Utils/Hooks/useAuthIntent/mutations/AuthIntentCreateOrderMutation.ts:28](src/Utils/Hooks/useAuthIntent/mutations/AuthIntentCreateOrderMutation.ts#L28)

**Input**:
```typescript
{
  artworkId: String!
  editionSetId?: String
}
```

**Returns**:
```graphql
CommerceOrderWithMutationSuccess {
  order { internalID, mode }
}
```

**Current Behavior**:
- Redirects to `/orders/${orderID}/shipping` (legacy Order app)

**Migration Needed**:
- Replace with `createOrderWithArtwork` (or equivalent new mutation)
- Redirect to Order2 checkout route
- Research: Can this be consolidated with offer/partner-offer creation?

---

#### 2. `commerceCreateOfferOrderWithArtwork` ✅ ACTIVELY USED

**Purpose**: Create Make Offer order from artwork page

**Locations**:
- [src/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons.tsx:605](src/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons.tsx#L605)
- [src/Utils/Hooks/useAuthIntent/mutations/AuthIntentCreateOfferOrderMutation.ts](src/Utils/Hooks/useAuthIntent/mutations/AuthIntentCreateOfferOrderMutation.ts)

**Input**:
```typescript
{
  artworkId: String!
  editionSetId?: String
  partnerOfferId?: String  // For accepting partner offers
}
```

**Current Behavior**:
- Redirects to `/orders/${orderID}/offer` (legacy Order app)

**Migration Needed**:
- Replace with new mutation
- Redirect to Order2
- Note: Supports both regular offers AND partner offer acceptance

---

#### 3. `commerceCreatePartnerOfferOrder` ✅ ACTIVELY USED

**Purpose**: Create order from limited-time partner promotional offer

**Location**: [src/Apps/PartnerOffer/Routes/Mutations/UsePartnerOfferCheckoutMutation.tsx:11](src/Apps/PartnerOffer/Routes/Mutations/UsePartnerOfferCheckoutMutation.tsx#L11)

**Input**:
```typescript
{
  partnerOfferId: String!
}
```

**Used By**: Partner offer landing pages (`/partner-offer/:id`)

**Migration Needed**:
- Check if `createPartnerOfferOrder` exists in new schema
- Update types from `CommerceOrder` to `Order`

---

### Legacy Order Flow Mutations (SELECTIVE RETENTION)

#### 4. `commerceAddInitialOfferToOrder` ✅ KEEP (Used in legacy counter-offers)

**Purpose**: Add initial offer amount to offer order

**Location**: [src/Apps/Order/Routes/Offer/index.tsx](src/Apps/Order/Routes/Offer/index.tsx)

**Status**: Keep for legacy counter-offer flows

**Note**: Order2 uses `createBuyerOffer` instead (new API)

---

#### 5. `commerceBuyerCounterOffer` ✅ KEEP

**Purpose**: Buyer sends counter-offer to seller

**Location**: [src/Apps/Order/Routes/Respond/index.tsx](src/Apps/Order/Routes/Respond/index.tsx)

**Input**:
```typescript
{
  offerId: String!
  offerPrice: Money!
}
```

**Status**: Keep for legacy counter-offer response flows

---

#### 6. `commerceBuyerAcceptOffer` ✅ KEEP

**Purpose**: Buyer accepts seller's counter-offer

**Location**: [src/Apps/Order/Routes/Accept/index.tsx:68](src/Apps/Order/Routes/Accept/index.tsx#L68)

**Status**: Keep for legacy counter-offer flows

---

#### 7. `commerceBuyerRejectOffer` ✅ KEEP

**Purpose**: Buyer rejects seller's counter-offer

**Location**: [src/Apps/Order/Routes/Reject/index.tsx](src/Apps/Order/Routes/Reject/index.tsx)

**Status**: Keep for legacy counter-offer flows

---

#### 8. `commerceSubmitPendingOffer` ✅ KEEP

**Purpose**: Submit counter-offer after buyer has responded

**Location**: [src/Apps/Order/Routes/Counter/index.tsx:52](src/Apps/Order/Routes/Counter/index.tsx#L52)

**Status**: Keep for legacy counter-offer flows

---

### Payment Mutations (SELECTIVE RETENTION)

#### 9. `commerceSetPayment` ✅ KEEP

**Purpose**: Set payment method for order

**Locations**:
- [src/Apps/Order/Mutations/useSetPayment.ts:9](src/Apps/Order/Mutations/useSetPayment.ts#L9)
- [src/Apps/Order/Routes/Payment/index.tsx](src/Apps/Order/Routes/Payment/index.tsx)
- [src/Apps/Order/Routes/NewPayment/index.tsx](src/Apps/Order/Routes/NewPayment/index.tsx) (failed payment recovery)

**Input**:
```typescript
{
  id: String!
  creditCardId?: String
  bankAccountId?: String
}
```

**Status**: Keep for legacy payment update flows

**Note**: Order2 uses `setOrderPayment` (new API)

---

#### 10. `commerceSetPaymentByStripeIntent` ✅ KEEP

**Purpose**: Set payment using Stripe Payment Intent

**Location**: [src/Apps/Order/Mutations/useSetPaymentByStripeIntentMutation.ts](src/Apps/Order/Mutations/useSetPaymentByStripeIntentMutation.ts)

**Status**: Keep for legacy Stripe 3DS flows

---

#### 11. `commerceFixFailedPayment` ✅ KEEP

**Purpose**: Retry failed payment with new payment method

**Location**: [src/Apps/Order/Routes/NewPayment/index.tsx](src/Apps/Order/Routes/NewPayment/index.tsx)

**Status**: Keep for failed payment recovery

---

#### 12. `commerceCreateBankDebitSetupForOrder` ⚠️ UNCERTAIN

**Purpose**: Setup ACH/bank debit payment for order

**Location**: [src/Components/BankDebitForm/Mutations/CreateBankDebitSetupForOrder.ts:11](src/Components/BankDebitForm/Mutations/CreateBankDebitSetupForOrder.ts#L11)

**Input**:
```typescript
{
  orderId: String!
}
```

**Returns**:
```graphql
CommerceOrderRequiresAction {
  actionData { clientSecret }
}
```

**Status**: Uncertain - may be replaced by Order2, needs investigation

---

### Shipping/Fulfillment Mutations (LIKELY TO BE REPLACED)

#### 13. `commerceSetShipping` 🔴 WILL BE REPLACED

**Purpose**: Set shipping address for order

**Location**: [src/Apps/Order/Routes/Shipping/Mutations/useSaveFulfillmentDetails.ts](src/Apps/Order/Routes/Shipping/Mutations/useSaveFulfillmentDetails.ts)

**Status**: Will be replaced by Order2 (`setOrderDeliveryAddress`)

---

#### 14. `commerceSelectShippingOption` 🔴 WILL BE REPLACED

**Purpose**: Select shipping quote/option

**Location**: [src/Apps/Order/Routes/Shipping/Mutations/useSelectShippingQuote.ts](src/Apps/Order/Routes/Shipping/Mutations/useSelectShippingQuote.ts)

**Status**: Will be replaced by Order2 (`setOrderFulfillmentOption`)

---

#### 15. `commerceSubmitOrder` 🔴 WILL BE REPLACED

**Purpose**: Final order submission

**Location**: [src/Apps/Order/Routes/Review/index.tsx](src/Apps/Order/Routes/Review/index.tsx)

**Status**: Will be replaced by Order2 (`submitOrder`)

---

## Order2 (New Checkout) - Already Migrated ✅

**Location**: `src/Apps/Order2/Routes/Checkout/`

**New Mutations Used** (non-commerce):
- `createBuyerOffer` - [useOrder2AddInitialOfferMutation.ts:11](src/Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation.ts#L11)
- `submitOrder` - [useOrder2SubmitOrderMutation.ts](src/Apps/Order2/Routes/Checkout/Mutations/useOrder2SubmitOrderMutation.ts)
- `setOrderPayment` - [useOrder2SetOrderPaymentMutation.ts](src/Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderPaymentMutation.ts)
- `setOrderDeliveryAddress` - [useOrder2SetOrderDeliveryAddressMutation.ts](src/Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderDeliveryAddressMutation.ts)
- `setOrderFulfillmentOption` - [useOrder2SetOrderFulfillmentOptionMutation.ts](src/Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation.ts)

**Status**: ✅ Already using new Order API, no commerce mutations

---

## Migration Roadmap

### Phase 1: Order Entry Points (CRITICAL)

**Goal**: New orders use new API and Order2 checkout

#### 1.1 Artwork Page Order Creation

**Files**:
- `src/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons.tsx`

**Changes**:
- Replace `commerceCreateOrderWithArtwork` → new mutation
- Replace `commerceCreateOfferOrderWithArtwork` → new mutation
- Update redirects: `/orders/${id}` → Order2 route

**Research Needed**:
- What new mutations exist for order creation?
- Can buy/offer/partner-offer be consolidated?
- How to handle artworks with incomplete shipping (inquiry vs direct)?

---

#### 1.2 Auth Intent (Logged-out Users)

**Files**:
- `src/Utils/Hooks/useAuthIntent/mutations/AuthIntentCreateOrderMutation.ts`
- `src/Utils/Hooks/useAuthIntent/mutations/AuthIntentCreateOfferOrderMutation.ts`

**Changes**:
- Replace commerce mutations with new API
- Update redirect logic to Order2
- May reuse same mutations as Artwork page

**Auth Intent Action Types**:
```typescript
afterAuthAction: {
  action: "buyNow" | "makeOffer"
  kind: "artworks"
  objectId: string
  secondaryObjectId?: string  // editionSetId
}
```

---

#### 1.3 Partner Offer Checkout

**Files**:
- `src/Apps/PartnerOffer/Routes/Mutations/UsePartnerOfferCheckoutMutation.tsx`
- `src/Apps/PartnerOffer/Routes/PartnerOfferCheckout.tsx`

**Changes**:
- Replace `commerceCreatePartnerOfferOrder` with new mutation
- Update types from `CommerceOrder` to `Order`
- Verify redirect to Order2

---

### Phase 2: Legacy Order Retention (SELECTIVE)

**Goal**: Keep only counter-offer and payment update flows in legacy Order app

**Keep These Routes**:
- `/orders/:id/respond` - Counter-offer response (accept/reject/counter)
- `/orders/:id/counter` - Submit pending counter-offer
- `/orders/:id/new-payment` - Failed payment recovery

**Keep These Mutations**:
- `commerceBuyerCounterOffer`
- `commerceBuyerAcceptOffer`
- `commerceBuyerRejectOffer`
- `commerceSubmitPendingOffer`
- `commerceAddInitialOfferToOrder`
- `commerceSetPayment`
- `commerceSetPaymentByStripeIntent`
- `commerceFixFailedPayment`

**Delete These Routes** (replaced by Order2):
- `/orders/:id/shipping` → Order2 handles
- `/orders/:id/payment` → Order2 handles
- `/orders/:id/review` → Order2 handles
- `/orders/:id/offer` (initial offer entry) → Order2 handles

---

### Phase 3: Conversations (SEPARATE WORK ITEM)

**Goal**: Update conversations to use new Order type

**Scope**:
- Similar to partner-facing conversations work (already completed)
- Update fragments from `CommerceOrder` to `Order`
- No mutation changes needed (display only)

**Files**:
- `src/Apps/Conversations/components/Details/OrderInformation/`
- `src/Apps/Conversations/components/ConversationCTA/`

---

### Phase 4: Future Cleanup (OUT OF SCOPE FOR NOW)

**Will be ticketed separately**:
- Settings order history (`src/Apps/Settings/Routes/Orders/`, `src/Apps/Settings/Routes/Purchases/`)
- Bank debit component migration (if not replaced by Order2)

---

## Open Questions for New Schema Research

### 1. Order Creation Mutations

**Question**: What are the new mutations for creating orders?

**Need to check**:
- Does `createOrderWithArtwork` exist?
- Does `createOfferOrderWithArtwork` exist?
- Does `createPartnerOfferOrder` exist?
- Can these be consolidated into a single mutation?

**Context**: Different order types have different requirements:
- **Buy Now**: Direct purchase, may have incomplete shipping
- **Make Offer**: Negotiation flow
- **Partner Offer**: Limited-time promotional offer from gallery
- **Inquiry Offer**: Offer after inquiry conversation

---

### 2. Order Type Differences

**Question**: What fields differ between `CommerceOrder` and `Order`?

**Need to compare**:
- Required fields
- Enum values (state, mode, etc.)
- Nested object structures
- Fragment compatibility

**Impact**: Determines breaking changes in UI components

---

### 3. Counter-Offer Flow in New Schema

**Question**: Does new Order schema support counter-offer flows?

**Need to verify**:
- Are there equivalents to `commerceBuyerCounterOffer`, `commerceBuyerAcceptOffer`, etc.?
- Or is counter-offer flow being redesigned?

**Impact**: Determines if legacy Order routes can be fully deprecated

---

### 4. Bank Debit Payment

**Question**: Is `commerceCreateBankDebitSetupForOrder` supported in Order2?

**Need to check**:
- Does new schema have `createBankDebitSetupForOrder`?
- Is this already working in Order2?

---

## File Inventory Summary

### Apps Using CommerceOrder

| App/Directory | Files | Status | Priority |
|---------------|-------|--------|----------|
| `src/Apps/Order` | ~50 | Partial retention | HIGH |
| `src/Apps/Order2` | ~40 | ✅ Migrated | N/A |
| `src/Apps/Artwork` | 1 | Needs migration | 🔴 CRITICAL |
| `src/Apps/PartnerOffer` | 2 | Needs migration | HIGH |
| `src/Utils/useAuthIntent` | 2 | Needs migration | 🔴 CRITICAL |
| `src/Apps/Conversations` | ~5 | Separate work item | MEDIUM |
| `src/Components/BankDebitForm` | 2 | Uncertain | LOW |
| `src/Apps/Settings` | 2 | Will ticket | LOW |

### Generated Relay Types

- **187+ files** in `src/__generated__/` contain CommerceOrder type definitions
- These will need regeneration after GraphQL schema updates

---

## Next Steps

1. **Schema Research**: Investigate new Order schema to answer open questions above
2. **Artwork Page Migration**: Implement new order creation mutations
3. **Auth Intent Migration**: Update logged-out purchase flows
4. **Partner Offer Migration**: Update partner offer checkout
5. **Legacy Order Cleanup**: Remove deprecated routes, keep counter-offer flows
6. **Conversations**: Ticket as separate work item
7. **Monitoring**: Ensure no traffic to deleted `/orders/*` routes

---

## References

- **Order2 Implementation**: `src/Apps/Order2/` (reference for new API usage)
- **Legacy Order Routes**: `src/Apps/Order/orderRoutes.tsx`
- **Schema Definition**: `data/schema.graphql`
- **Related Work**: Partner-facing conversations migration (completed)
