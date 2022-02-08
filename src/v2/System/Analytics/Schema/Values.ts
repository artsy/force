/**
 * Pages that the user can view.
 */
export enum PageName {
  ArticlePage = "Article",
  ArtistPage = "Artist",
  ArtistAuctionResults = "Artist Auction Results",
  ArtworkPage = "Artwork page",
  AuctionRegistrationPage = "Auction Registration page",
  AuctionConfirmBidPage = "Auction Confirm Bid page",
  CollectPage = "Collect page",
  CollectionPage = "Collection",
  SearchPage = "Search page",
  HomePage = "Home",
  IdentityVerificationPage = "Identity Verification page",
}

/**
 * An entity in the data model that has an ownership relationship to the entity
 * being described, be it a straightforward model such as ‘Artist’ or a more
 * conceptual one like a ‘Consignment Submission’
 *
 * @see {Result.owner}
 * @see {PageView.owner}
 */
export enum OwnerType {
  Article = "Article",
  Artist = "Artist",
  Artwork = "Artwork",
  Collection = "Collection",
  Consignment = "ConsignmentSubmission",
  Conversation = "Conversation",
  Gene = "Gene",
  Invoice = "Invoice",
  Partner = "Partner",
  Show = "Show",
}

/**
 * User actions, which can be active or passive ones.
 *
 * TODO: Distinguishing between Click and Tap is a little confusing. Do we always
 *       use Click on Force or do we use Tap when browsing from a mobile device?
 */
export enum ActionType {
  /**
   * A click on a UI element using a mouse-like input device.
   *
   * TODO: Check if ‘Tap’ and this can be combined.
   */
  Click = "Click",
  ClickedBid = 'Clicked "Bid"',
  /**
   * A click on 'Buy Now' or 'Make offer' buttons.
   */
  ClickedBuyNow = "Clicked buy now",
  ClickedConsign = "Clicked consign",
  ClickedContactGallery = 'Clicked "Contact Gallery"',
  ClickedMakeOffer = "Clicked make offer",

  /**
   * Triggers a pageview in force, skips segment
   */
  ClickedReadMore = "Clicked read more",

  AuctionResultFilterParamChanged = "Auction results filter params changed",
  AuctionResultItemClicked = "Auction result item clicked",

  /**
   * A/B Test Experiments
   */
  ExperimentViewed = "Experiment Viewed",

  /**
   * Moving the mouse pointer over a UI element or, when browsing on a mobile
   * device, by first tapping the UI element once making it switch into
   * continuous hover mode.
   */
  Hover = "Hover",

  /**
   * A UI element was rendered in the viewport
   */
  Impression = "Impression",
  AuthImpression = "Auth impression",

  /**
   * A UI element that links out to another location
   */
  Link = "Link",

  /**
   * Auctions
   */
  ClickedRequestConditionReport = "Clicked request condition report",
  ConfirmBidSubmitted = "Confirmed bid on bid page",
  ConfirmBidFailed = "Confirm bid failed",
  PlacedMaxBid = "Placed Max Bid",
  RegisteredToBid = "Registered To Bid",
  SelectedMaxBid = "Selected max bid",
  ViewedLot = "Lot Viewed",

  /**
   * A tap on a UI element using a finger-like input device.
   *
   * TODO: Check if ‘Click’ and this can be combined.
   */
  Tap = "Tap",

  /**
   * BNMO
   */
  SubmittedOrder = "submitted_order",
  SubmittedOffer = "submitted_offer",
  SubmittedCounterOffer = "submitted_counter_offer",
  FocusedOnOfferInput = "Focused on offer input",

  /**
   * Paid Marketing - Retargeting
   */
  ViewedProduct = "Product Viewed",

  // MO speedbumps
  ViewedOfferTooLow = "Viewed offer too low",
  ViewedOfferHigherThanListPrice = "Viewed offer higher than listed price",

  FocusedOnAutosuggestInput = "Focused on search input",
  SelectedItemFromSearch = "Selected item from search",
  SelectedItemFromSearchPage = "Selected item from search page",
  SearchedAutosuggestWithResults = "Searched from header with results",
  SearchedAutosuggestWithoutResults = "Searched from header with no results",

  /**
   * Auction Registration flow
   */
  RegistrationSubmitFailed = "Registration failed to submit",
  RegistrationSubmitted = "Registration submitted",

  /**
   * Identity Verification
   */
  ClickedContinueToIdVerification = "ClickedContinueToIdVerification",

  /**
   * Viewing Room
   */
  ClickedArtworkGroup = "clickedArtworkGroup",
  ClickedBuyViewingGroup = "clickedBuyViewingRoom",

  /**
   * Artwork Submission
   */
  SubmitAnotherArtwork = "submitAnotherArtwork",
  ClickedFAQ = "clickedFAQ",
}

/**
 * The identifier that ties an interaction to a result.
 */
export enum ActionName {
  /**
   * Artist Page
   */
  ArtistFollow = "artistFollow",
  ArtistUnfollow = "artistUnfollow",
  ArtworkAboutTheWork = "Artwork about the work",

  /**
   * Authentication
   */
  ViewEditorial = "viewed editorial",
  Dismiss = "dismiss",
  EmailNextButton = "emailNextButton",
  PasswordNextButton = "passwordNextButton",

  /**
   * Gene Page
   */
  GeneFollow = "geneFollow",
  GeneUnfollow = "geneUnfollow",

  /**
   * Home page events
   */
  HomeArtistRailFollow = "homeArtistRailFollow",
  HomeArtistArtworksBlockFollow = "homeArtistArtworksBlockFollow",

  /**
   * Conversations / Inbox / Messaging
   */
  ConversationSendReply = "conversationSendReply",
  ConversationLink = "conversationLinkUsed",
  InquiryCancel = "inquiryCancel",
  InquirySend = "inquirySend",

  /**
   *  Saves And Follows Events
   */
  SavesAndFollowsWorks = "savesAndFollowsWorks",
  SavesAndFollowsArtists = "savesAndFollowsArtists",
  SavesAndFollowsCategories = "savesAndFollowsCategories",

  /**
   *  Consignment flow
   */
  ConsignmentDraftCreated = "consignmentDraftCreated",
  ConsignmentSubmitted = "consignmentSubmitted",
  ConsignmentInterest = "Interested in selling a work learn more", // TODO: Old schema

  /**
   * Bid flow
   */
  BidFlowAddBillingAddress = "addBillingAddress",
  BidFlowPlaceBid = "placeBid",
  BidFlowSaveBillingAddress = "saveBillingAddress",

  /**
   * Generic
   */
  ReadMoreExpanded = "readMoreExpanded", // TODO: This differs from old event
  InSale = "In current auction", // TODO: Old schema
  InShow = "In featured show", // TODO: Old schema
}

/**
 * Identifier of content that was interacted with
 */
export enum Subject {
  /**
   * Generic events
   */
  ClickedNextButton = "clicked next button",

  /*
   * Articles
   * TODO: Old schema
   */
  FurtherReading = "Further reading",
  ReadMore = "Read more",
  RelatedArticles = "Related articles",

  /**
   * Buy now checkout flow
   */
  BNMOAskSpecialist = "ask a specialist",
  BNMOReadFAQ = "Visit our help center",
  BNMOProvideShipping = "provide shipping address",
  BNMOArrangePickup = "arrange for pickup",
  BNMOUseShippingAddress = "use shipping address",
  BNMOAddBankAccount = "addBankAccount",
  BNMOHelpEmail = "orders@artsy.net",
  BNMOBankTransferNotifcationCheckbox = "notifyCheckboxChecked",
  BNMOBankTransferModalDismissed = "modalDismissed",

  AuctionConditionsOfSale = "conditions of sale",
  AuctionFAQ = "auction faq",
  AuctionAskSpecialist = "ask a specialist",
  AuctionBuyerPremium = "Buyer premium",

  CollectorFAQ = "Visit our help center",

  ConsignLearnMore = "learn more",

  /**
   * Artist Page
   */
  GetStarted = "Get Started",

  /**
   * Artwork Page
   */
  Classification = "Classification info",
  ContactGallery = "Contact Gallery",
  EnterLiveAuction = "Enter live auction",
  ShowArtistInsights = "Show artist insights",
  HistogramBar = "Histogram Bar",
  BrowseWorks = "Browse works in this category",
  QuestionMarkIcon = "Question Mark Informational Icon",
  RequestConditionReport = "Request condition report",

  /**
   * Header
   */
  NotificationBell = "Notification Bell",
  Notification = "Notification",
  ViewAll = "View All",
  Login = "Log In",
  Signup = "Sign Up",
  SmallScreenMenuSandwichIcon = "Small Screen Menu Sandwich Icon",
  EmailConfirmationCTA = "Email Confirmation CTA",
  EmailConfirmationLinkExpired = "Email Confirmation Link Expired",

  /**
   * CollectionHub
   */
  FeaturedCategories = "Featured Categories",

  /**
   * Consignments
   */
  ExploreAuctionResults = "Explore Auction Results",
  Here = "here",
  RequestPriceEstimate = "Request a price estimate",
  SubmitForReview = "Submit for review",
  SubmitWorksInterestedInSelling = "submit works you’re interested in selling here",

  /**
   * Viewing Room
   */
  Rail = "Rail",
  ViewWorks = "View works",
  ArtworkThumbnail = "ArtworkThumbnail",
  ViewingRoomArtworkDetail = "ViewingRoomArtworkDetail",
}

/**
 * Identifier of a conceptual module on the page.
 */
export enum ContextModule {
  Header = "Header",
  NavigationTabs = "NavigationTabs",
  FlashBanner = "FlashBanner",
  RecentlyViewedArtworks = "recently_viewed_artworks",
  HeaderMoreDropdown = "HeaderMoreDropdown",
  HeaderUserDropdown = "HeaderUserDropdown",
  HeaderActivityDropdown = "HeaderActivityDropdown",
  HeaderArtworksDropdown = "HeaderArtworksDropdown",
  HeaderArtistsDropdown = "HeaderArtistsDropdown",

  /**
   * Artist page
   */
  ArtistConsignment = "ArtistConsignment",
  ArtistPage = "Artist page",
  AboutTheWork = "About the work",
  AboutTheWorkPartner = "About the Work (Partner)",
  ArtworkFilter = "ArtworkFilter",
  ArtistOverview = "ArtistOverview",
  ArtistBio = "ArtistBio",
  ArtistInsights = "ArtistInsights",
  Biography = "Biography",
  Sidebar = "Sidebar",
  WorksForSale = "Works For Sale",

  /**
   * Artwork page
   */
  AboutTheWorkCondition = "About the work condition",
  ArtworkPage = "Artwork page",
  ArtworkTabs = "Artwork tabs",
  OtherWorksByArtist = "Other works by artist",
  OtherWorksInAuction = "Other works in auction",
  OtherWorksInFair = "Other works in fair",
  OtherWorksFromGallery = "Other works from gallery",
  OtherWorksFromShow = "Other works from show",
  RecommendedArtists = "Recommended Artists",
  RelatedArtists = "RelatedArtists",
  RelatedWorks = "RelatedWorks",
  ShareButton = "Share button",
  Zoom = "Zoom",
  ViewInRoom = "View in room",
  PriceContext = "Price Context",

  /*
   * Articles
   * TODO: Old schema
   */
  FurtherReading = "Further reading",
  ReadMore = "Read more",
  RelatedArticles = "Related articles",

  /**
   * Buy Now Make Offer ("Works For You")
   */
  BNMOBanner = "BNMO Banner",

  /**
   * Collection page
   */
  CollectionDescription = "CollectionDescription",
  ArtworkBanner = "ArtworkBanner",

  /**
   * Collections Rails
   */
  CollectionsRail = "CollectionsRail",

  /**
   * CollectionHub Entry Point in home page
   */
  CollectionHubEntryPoint = "HubEntrypoint",

  /**
   * Consignments
   */
  FAQ = "FAQ",
  HowToSellYourCollection = "How to sell your collection with Artsy",
  SellArtFromYourCollection = "Sell Art From Your Collection",
  SellWorksBy = "Sell Works by",

  /**
   * Other Collections Rail
   */
  OtherCollectionsRail = "OtherCollectionsRail",

  /**
   * Featured Collections Rail
   */
  FeaturedCollectionsRail = "FeaturedCollectionsRail",

  /**
   * Artist Series rail in the collection hub
   */
  ArtistCollectionsRail = "ArtistCollectionsRail",

  /**
   * Ad Server
   */
  AdServer = "AdServer",

  /**
   * Art Keeps Going Campaign
   */
  FeaturedThisWeek = "FeaturedThisWeek",
  Editorial = "Editorial",
  SelectedWorks = "SelectedWorks",
  FeaturedArtists = "FeaturedArtists",
  BrowseCollections = "BrowseCollections",
  BrowseAuctions = "BrowseAuctions",
  BrowseFairs = "BrowseFairs",

  /**
   * Viewing Room
   */
  ViewingRoomArtworkRail = "viewingRoomArtworkRail",

  /**
   * Artwork Submission
   */
  ConsignSubmissionFlow = "consignSubmissionFlow",
}

export enum Flow {
  ArtworkAboutTheWork = "Artwork about the work",
  ArtworkAboutTheArtist = "Artwork about the artist",
  ArtworkShare = "Artwork share",
  ArtworkZoom = "Artwork zoom",
  ArtworkViewInRoom = "Artwork view in room",
  ArtworkPriceContext = "Artwork Price Context",
  Auctions = "Auctions",
  BuyNow = "Buy now",
  Consignments = "Consignments",
  MakeOffer = "Make offer",
  Header = "Header",
}

export enum Label {
  AboutTheWork = "about_the_work",
  Articles = "articles",
  Biography = "biography",
  ExhibitionHighlights = "exhibition_highlights",
  ReadMore = "ReadMore",
}

export enum Type {
  ArtistCard = "Artist card",
  ArtworkBrick = "Artwork brick",
  Button = "Button",
  Link = "Link",
  Tab = "Tab",
  Thumbnail = "thumbnail",
  Chart = "Chart",
  RadioButton = "radio button",
  EmailLink = "email link",
  ModalDismissal = "modal dismissal",
}
