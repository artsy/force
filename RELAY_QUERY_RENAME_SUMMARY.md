# Relay Query Name Updates Summary

This document summarizes the query name updates made to fix duplicate Relay query names in test files.

## Files Updated

1. **UserRegistrationAuctions.jest.tsx**

   - `UserRegistrationAuctions_Test_Query` → `UserRegistrationAuctionsTestQuery`

2. **FairOrganizerFollowButton.jest.tsx**

   - `FairOrganizerFollowButton_Test_Query` → `FairOrganizerFollowButtonTestQuery`

3. **AuctionBuyNowRail.jest.tsx**

   - Already had correct naming: `AuctionBuyNowRailTestQuery`

4. **ArtistCurrentShowsRail.jest.tsx**

   - `ArtistCurrentShowsRail_Test_Query` → `ArtistCurrentShowsRailTestQuery`

5. **MyBids.jest.tsx**

   - `MyBids_Test_Query` → `MyBidsTestQuery`
   - Added missing type import

6. **ArtworkSidebarAuctionPartnerInfo.jest.tsx**

   - `ArtworkSidebarAuctionPartnerInfo_Test_Query` → `ArtworkSidebarAuctionPartnerInfoTestQuery`

7. **ViewingRoomWorksRoute.jest.tsx**

   - `ViewingRoomWorksRoute_Test_Query` → `ViewingRoomWorksRouteTestQuery`

8. **AuctionDetails.jest.tsx**

   - Already had correct naming: `AuctionDetailsTestQuery`

9. **ShowArtworksEmptyState.jest.tsx**

   - `ShowArtworksEmptyState_Test_Query` → `ShowArtworksEmptyStateTestQuery`

10. **ArtistBio.jest.tsx**

    - Already had correct naming: `ArtistBioTestQuery`

11. **ArtworkActions.jest.tsx**

    - `ArtworkActions_Test_Query` → `ArtworkActionsTestQuery`

12. **ArtworkTopContextBar.jest.tsx**

    - `ArtworkTopContextBar_Test_Query` → `ArtworkTopContextBarTestQuery`

13. **MyBidsBidHeader.jest.tsx**

    - `MyBidsBidHeader_Test_Query` → `MyBidsBidHeaderTestQuery`
    - Added missing type import

14. **ArtistApp.jest.tsx**

    - `ArtistApp_Test_Query` → `ArtistAppTestQuery`

15. **ArtistsIndex.jest.tsx**

    - `ArtistsIndexFragmentContainer_Test_Query` → `ArtistsIndexFragmentContainerTestQuery`

16. **AuctionApp.jest.tsx**
    - Already had correct naming: `AuctionAppTestQuery`

## Pattern Applied

The consistent pattern applied was to remove underscores and "Test" from the middle of query names:

- `ComponentName_Test_Query` → `ComponentNameTestQuery`

This ensures all test queries follow a consistent naming convention and avoids duplicate query names in the codebase.
