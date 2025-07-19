# Test Migration Assignments

## Summary

Total pending test files: 76
Files per migrator: ~12-13 files each
All files need to be migrated from Enzyme to React Testing Library.

## Important Notes

1. **Use `setupTestWrapperTL` helper, NOT `setupTestWrapperRTL`**
2. Create new files with `.jest.tsx` extension (removing `.enzyme` from filename)
3. Skip any tests in the Order directory - these will be handled separately
4. Group related files together when possible for context
5. If a test is particularly complex or problematic, move to TODO section

## Test Migrator 1 (13 files)

**Artwork Components (8 files)**

- `src/Apps/Artwork/Components/__tests__/ArtworkDetailsMediumModal.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/__tests__/ArtworkLightbox.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/__tests__/ArtworkRelatedArtists.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/__tests__/ArtworkSidebarClassificationsModal.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/__tests__/OtherWorks.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/__tests__/PricingContext.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/__tests__/PricingContextModal.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/ArtworkDetails/__tests__/ArtworkDetails.jest.enzyme.tsx`

**Artwork Additional (5 files)**

- `src/Apps/Artwork/Components/ArtworkDetails/__tests__/RequestConditionReport.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/ArtworkImageBrowser/__tests__/ArtworkActions.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/ArtworkImageBrowser/__tests__/ArtworkImageBrowserLarge.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/ArtworkImageBrowser/__tests__/ArtworkImageBrowserSmall.jest.enzyme.tsx`
- `src/Apps/Artwork/Components/ArtworkSidebar/__tests__/ArtworkSidebarAuctionPartnerInfo.jest.enzyme.tsx`

## Test Migrator 2 (13 files)

**Auction Components (7 files)**

- `src/Apps/Artwork/Components/ArtworkSidebar/__tests__/ArtworkSidebarAuctionProgressBar.jest.enzyme.tsx`
- `src/Apps/Auction/__tests__/AuctionApp.jest.enzyme.tsx`
- `src/Apps/Auction/Components/__tests__/AuctionActiveBids.jest.enzyme.tsx`
- `src/Apps/Auction/Routes/__tests__/AuctionConfirmRegistrationRoute.jest.enzyme.tsx`
- `src/Apps/Auction/Routes/__tests__/AuctionRegistrationRoute.jest.enzyme.tsx`
- `src/Apps/Auction/Routes/Bid/__tests__/AuctionBidRoute.jest.enzyme.tsx`
- `src/Apps/Auctions/Components/MyBids/__tests__/MyBidsBidHeader.jest.enzyme.tsx`

**Auctions Routes (6 files)**

- `src/Apps/Auctions/Components/MyBids/__tests__/MyBidsBidItem.jest.enzyme.tsx`
- `src/Apps/Auctions/Routes/__tests__/CurrentAuctions.jest.enzyme.tsx`
- `src/Apps/Auctions/Routes/__tests__/PastAuctions.jest.enzyme.tsx`
- `src/Apps/Auctions/Routes/__tests__/UpcomingAuctions.jest.enzyme.tsx`
- `src/Apps/BuyerGuarantee/Routes/__tests__/BuyerGuaranteeIndex.jest.enzyme.tsx`
- `src/Apps/Categories/Components/__tests__/GeneFamilies.jest.enzyme.tsx`

## Test Migrator 3 (13 files)

**Collection Components (6 files)**

- `src/Apps/Collect/Routes/Collection/Components/__tests__/CollectionArtworksFilter.jest.enzyme.tsx`
- `src/Apps/Collect/Routes/Collection/Components/CollectionsHubRails/ArtistSeriesRail/__tests__/ArtistSeriesEntity.jest.enzyme.tsx`
- `src/Apps/Collect/Routes/Collection/Components/CollectionsHubRails/FeaturedCollectionsRails/__tests__/FeaturedCollectionsRails.jest.enzyme.tsx`
- `src/Apps/Collect/Routes/Collection/Components/CollectionsHubRails/OtherCollectionsRail/__tests__/OtherCollectionEntity.jest.enzyme.tsx`
- `src/Apps/Collect/Routes/Collection/Components/CollectionsHubRails/OtherCollectionsRail/__tests__/OtherCollectionsRail.jest.enzyme.tsx`
- `src/Apps/Components/__tests__/LogInPrompt.jest.enzyme.tsx`

**Fair Organizer & Fairs (7 files)**

- `src/Apps/FairOrginizer/Components/__tests__/FairOrganizerPastEventsRail.jest.enzyme.tsx`
- `src/Apps/FairOrginizer/Components/FairOrganizerHeader/__tests__/FairOrganizerHeader.jest.enzyme.tsx`
- `src/Apps/FairOrginizer/Routes/__tests__/FairOrganizerDedicatedArticles.jest.enzyme.tsx`
- `src/Apps/Fairs/Routes/__tests__/FairsIndex.jest.enzyme.tsx`
- `src/Apps/Feature/__tests__/FeatureApp.jest.enzyme.tsx`
- `src/Apps/Gene/Components/__tests__/GeneArtworkFilter.jest.enzyme.tsx`
- `src/Apps/Gene/Routes/__tests__/GeneShow.jest.enzyme.tsx`

## Test Migrator 4 (12 files)

**Mixed Apps (6 files)**

- `src/Apps/IdentityVerification/__tests__/IdentityVerificationApp.jest.enzyme.tsx`
- `src/Apps/MyCollection/Routes/PriceEstimate/PriceEstimateConfirmation.jest.enzyme.tsx`
- `src/Apps/Partner/Components/__tests__/PartnerContacts/PartnerContacts.jest.enzyme.tsx`
- `src/Apps/Partner/Components/__tests__/PartnerShows/ShowBanner.jest.enzyme.tsx`
- `src/Apps/Partner/Components/__tests__/PartnerViewingRooms/ViewingRoomCard.jest.enzyme.tsx`
- `src/Apps/PriceDatabase/__tests__/PriceDatabaseApp.jest.enzyme.tsx`

**Search & Settings (6 files)**

- `src/Apps/Search/Routes/__tests__/SearchResultsEntity.jest.enzyme.tsx`
- `src/Apps/Settings/Routes/Auctions/__tests__/SettingsAuctionsRoute.jest.enzyme.tsx`
- `src/Apps/Show/__tests__/ShowArtworksEmptyState.jest.enzyme.tsx`
- `src/Apps/Show/__tests__/ShowContextualLink.jest.enzyme.tsx`
- `src/Apps/Show/__tests__/ShowHours.jest.enzyme.tsx`
- `src/Apps/Show/__tests__/ShowInfo.jest.enzyme.tsx`

## Test Migrator 5 (12 files)

**Show & ViewingRoom Components (6 files)**

- `src/Apps/Show/__tests__/ShowInstallShots.jest.enzyme.tsx`
- `src/Apps/Show/__tests__/ShowViewingRoom.jest.enzyme.tsx`
- `src/Apps/Shows/Routes/__tests__/ShowsCity.jest.enzyme.tsx`
- `src/Apps/ViewingRoom/__tests__/ViewingRoomsApp.jest.enzyme.tsx`
- `src/Apps/ViewingRoom/Routes/Statement/__tests__/ViewingRoomStatementRoute.jest.enzyme.tsx`
- `src/Apps/ViewingRoom/Routes/Works/__tests__/ViewingRoomWorksRoute.jest.enzyme.tsx`

**General Components (6 files)**

- `src/Components/__tests__/ArtistBio.jest.enzyme.tsx`
- `src/Components/__tests__/ArtistCurrentArticlesRail.jest.enzyme.tsx`
- `src/Components/__tests__/AuctionFAQsDialog.jest.enzyme.tsx`
- `src/Components/__tests__/CountrySelect.jest.enzyme.tsx`
- `src/Components/__tests__/LocationAutocompleteInput.jest.enzyme.tsx`
- `src/Components/__tests__/RouteTabs.jest.enzyme.tsx`

## Test Migrator 6 (13 files)

**Components & NavBar (7 files)**

- `src/Components/__tests__/SelectedExhibitions.jest.enzyme.tsx`
- `src/Components/__tests__/SortFilter.jest.enzyme.tsx`
- `src/Components/NavBar/__tests__/NavBar.jest.enzyme.tsx`
- `src/Components/NavBar/__tests__/NavBarSubMenu.jest.enzyme.tsx`
- `src/Components/NavBar/__tests__/NavBarTracking.jest.enzyme.tsx`
- `src/Components/NavBar/Menus/__tests__/NavBarUserMenu.jest.enzyme.tsx`
- `src/Components/NavBar/NavBarMobileMenu/__tests__/NavBarMobileMenu.jest.enzyme.tsx`

**System Components (6 files)**

- `src/System/Components/__tests__/ErrorBoundary.jest.enzyme.tsx`
- `src/System/Contexts/__tests__/SystemContext.jest.enzyme.tsx`
- `src/System/Relay/__tests__/SystemQueryRenderer.jest.enzyme.tsx`
- `src/System/Router/__tests__/serverRouter.jest.enzyme.tsx`
- `src/Utils/Hooks/__tests__/useEventTiming.jest.enzyme.tsx`

## TODO - Difficult Cases

If any tests prove particularly difficult to migrate or have complex enzyme-specific logic, move them here with a note about what makes them challenging.

## Migration Guidelines

1. Read the original `.enzyme.tsx` file
2. Create a new file with `.jest.tsx` extension
3. Use `setupTestWrapperTL` for test setup
4. Replace enzyme methods with React Testing Library equivalents:
   - `wrapper.find()` → `screen.getBy*()` or `screen.queryBy*()`
   - `wrapper.text()` → check text content directly
   - `wrapper.html()` → use snapshot testing or specific queries
   - `wrapper.simulate()` → `fireEvent` or `userEvent`
5. Update mocking patterns as needed
6. Ensure all tests pass before committing
