/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_Test_QueryVariables = {};
export type ArtworkApp_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkApp_artwork">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkApp_me">;
    } | null;
};
export type ArtworkApp_Test_Query = {
    readonly response: ArtworkApp_Test_QueryResponse;
    readonly variables: ArtworkApp_Test_QueryVariables;
};



/*
query ArtworkApp_Test_Query {
  artwork(id: "example") {
    ...ArtworkApp_artwork
    id
  }
  me {
    ...ArtworkApp_me
    id
  }
}

fragment ArtistBio_bio on Artist {
  biographyBlurb(format: HTML, partnerBio: false) {
    credit
    partnerID
    text
  }
}

fragment ArtistCard_artist on Artist {
  name
  slug
  href
  image {
    cropped(width: 45, height: 45) {
      src
      srcSet
    }
  }
  formatted_nationality_and_birthday: formattedNationalityAndBirthday
  ...FollowArtistButton_artist
}

fragment ArtistInfo_artist on Artist {
  internalID
  slug
  name
  href
  image {
    cropped(width: 45, height: 45) {
      src
      srcSet
    }
  }
  formatted_nationality_and_birthday: formattedNationalityAndBirthday
  counts {
    partner_shows: partnerShows
  }
  exhibition_highlights: exhibitionHighlights(size: 3) {
    ...SelectedExhibitions_exhibitions
    id
  }
  collections
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          __typename
          id
        }
        id
      }
    }
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        __typename
        id
      }
    }
  }
  ...ArtistBio_bio
  ...ArtistMarketInsights_artist
  ...FollowArtistButton_artist
  biographyBlurb(format: HTML, partnerBio: false) {
    text
  }
}

fragment ArtistMarketInsights_artist on Artist {
  collections
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0.0a")
        }
        organization
        sale_date: saleDate(format: "YYYY")
        id
      }
    }
  }
}

fragment ArtworkActionsSaveButton_artwork on Artwork {
  internalID
  id
  slug
  title
  sale {
    isAuction
    isClosed
    id
  }
  is_saved: isSaved
}

fragment ArtworkActions_artwork on Artwork {
  ...ArtworkActionsSaveButton_artwork
  ...ArtworkSharePanel_artwork
  ...ViewInRoom_artwork
  artists {
    name
    id
  }
  date
  dimensions {
    cm
  }
  slug
  image {
    internalID
    url(version: "larger")
    height
    width
  }
  downloadableImageUrl
  is_downloadable: isDownloadable
  is_hangable: isHangable
  partner {
    slug
    id
  }
  title
  sale {
    is_closed: isClosed
    is_auction: isAuction
    id
  }
  is_saved: isSaved
}

fragment ArtworkApp_artwork on Artwork {
  slug
  internalID
  is_acquireable: isAcquireable
  is_offerable: isOfferable
  availability
  listPrice {
    __typename
    ... on PriceRange {
      display
    }
    ... on Money {
      display
    }
  }
  is_in_auction: isInAuction
  sale {
    internalID
    cascadingEndTimeIntervalMinutes
    extendedBiddingIntervalMinutes
    slug
    id
  }
  artists {
    id
    slug
    ...ArtistInfo_artist
  }
  artist {
    ...ArtistInfo_artist
    id
  }
  ...ArtworkRelatedArtists_artwork
  ...ArtworkMeta_artwork
  ...ArtworkBanner_artwork
  ...ArtworkSidebar_artwork
  ...ArtworkImageBrowser_artwork
}

fragment ArtworkApp_me on Me {
  ...ArtworkSidebar_me
  ...SubmittedOrderModal_me
}

fragment ArtworkBanner_artwork on Artwork {
  partner {
    name
    id
  }
  sale {
    isAuction
    isBenefit
    isGalleryAuction
    coverImage {
      url
    }
    id
  }
  context {
    __typename
    ... on Sale {
      name
      href
    }
    ... on Fair {
      name
      href
      profile {
        icon {
          url
        }
        id
      }
    }
    ... on Show {
      name
      href
      status
      thumbnail: coverImage {
        url
      }
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
}

fragment ArtworkImageBrowserLarge_artwork on Artwork {
  ...ArtworkLightbox_artwork
  ...ArtworkVideoPlayer_artwork
  figures {
    __typename
    ... on Image {
      type: __typename
      internalID
      isZoomable
      ...DeepZoom_image
    }
    ... on Video {
      type: __typename
    }
  }
}

fragment ArtworkImageBrowserSmall_artwork on Artwork {
  ...ArtworkLightbox_artwork
  ...ArtworkVideoPlayer_artwork
  figures {
    __typename
    ... on Image {
      ...DeepZoom_image
      internalID
      isZoomable
      type: __typename
    }
    ... on Video {
      type: __typename
    }
  }
}

fragment ArtworkImageBrowser_artwork on Artwork {
  ...ArtworkActions_artwork
  ...ArtworkImageBrowserSmall_artwork
  ...ArtworkImageBrowserLarge_artwork
  internalID
  images {
    width
    height
  }
  figures {
    __typename
    ... on Image {
      internalID
      isDefault
    }
    ... on Video {
      type: __typename
    }
  }
}

fragment ArtworkLightbox_artwork on Artwork {
  formattedMetadata
  images {
    isDefault
    placeholder: url(version: ["small", "medium"])
    fallback: cropped(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      width
      height
      src
      srcSet
    }
    resized(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      width
      height
      src
      srcSet
    }
  }
}

fragment ArtworkMeta_artwork on Artwork {
  href
  internalID
  date
  artistNames
  sale_message: saleMessage
  listPrice {
    __typename
    ... on Money {
      currencyCode
      major
    }
    ... on PriceRange {
      maxPrice {
        currencyCode
        major
      }
    }
  }
  partner {
    name
    id
  }
  isInAuction
  isAcquireable
  isInquireable
  isOfferable
  isShareable
  metaImage: image {
    resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
      width
      height
      url
    }
  }
  meta {
    title
    description(limit: 155)
    longDescription: description(limit: 200)
  }
  context {
    __typename
    ... on Fair {
      slug
      name
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
  ...SeoDataForArtwork_artwork
}

fragment ArtworkRelatedArtists_artwork on Artwork {
  slug
  artist {
    href
    related {
      artistsConnection(kind: MAIN, first: 4, after: "") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...ArtistCard_artist
            id
            __typename
          }
          cursor
        }
      }
    }
    id
  }
}

fragment ArtworkSharePanel_artwork on Artwork {
  href
  images {
    url
  }
  artworkMeta: meta {
    share
  }
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  cultural_maker: culturalMaker
  artists {
    ...EntityHeaderArtist_artist
    internalID
    slug
    name
    ...FollowArtistButton_artist_2eN9lh
    id
  }
}

fragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {
  internalID
  sale {
    isClosed
    id
  }
  saleArtwork {
    currentBid {
      display
    }
    id
  }
  ...ArtworkSidebarCurrentBidInfo_artwork
  ...ArtworkSidebarBidAction_artwork
}

fragment ArtworkSidebarAuctionInfoPolling_me on Me {
  ...ArtworkSidebarBidAction_me
}

fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
  partner {
    name
    id
  }
  sale_artwork: saleArtwork {
    estimate
    id
  }
  sale {
    internalID
    is_closed: isClosed
    id
  }
}

fragment ArtworkSidebarAuctionTimer_artwork on Artwork {
  internalID
  sale {
    cascadingEndTimeIntervalMinutes
    isClosed
    ...AuctionTimer_sale
    startAt
    id
  }
  saleArtwork {
    ...LotTimer_saleArtwork
    endAt
    id
  }
}

fragment ArtworkSidebarBidAction_artwork on Artwork {
  myLotStanding(live: true) {
    most_recent_bid: mostRecentBid {
      max_bid: maxBid {
        cents
      }
      id
    }
  }
  slug
  internalID
  sale {
    slug
    registrationStatus {
      qualified_for_bidding: qualifiedForBidding
      id
    }
    is_preview: isPreview
    is_open: isOpen
    is_live_open: isLiveOpen
    is_closed: isClosed
    is_registration_closed: isRegistrationClosed
    requireIdentityVerification
    id
  }
  sale_artwork: saleArtwork {
    increments {
      cents
      display
    }
    endedAt
    id
  }
}

fragment ArtworkSidebarBidAction_me on Me {
  identityVerified
  pendingIdentityVerification {
    internalID
    id
  }
}

fragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {
  ...ArtworkSidebarCreateAlertButton_artwork
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attributionClass {
    shortArrayDescription
    id
  }
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  edition_sets: editionSets {
    internalID
    id
    is_acquireable: isAcquireable
    is_offerable: isOfferable
    sale_message: saleMessage
    ...ArtworkSidebarSizeInfo_piece
  }
  internalID
  isOfferableFromInquiry
  isPriceHidden
  is_acquireable: isAcquireable
  is_for_sale: isForSale
  is_inquireable: isInquireable
  is_offerable: isOfferable
  is_sold: isSold
  listPrice {
    __typename
    ... on PriceRange {
      display
    }
    ... on Money {
      display
    }
  }
  priceIncludesTaxDisplay
  sale_message: saleMessage
  shippingInfo
  shippingOrigin
  slug
  ...ArtworkSidebarCreateAlertButton_artwork
}

fragment ArtworkSidebarCreateAlertButton_artwork on Artwork {
  slug
  internalID
  title
  artists {
    internalID
    name
    slug
    id
  }
  attributionClass {
    internalID
    id
  }
  mediumType {
    filterGene {
      slug
      name
      id
    }
  }
}

fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
  sale {
    is_closed: isClosed
    is_live_open: isLiveOpen
    internalID
    is_with_buyers_premium: isWithBuyersPremium
    id
  }
  sale_artwork: saleArtwork {
    is_with_reserve: isWithReserve
    reserve_message: reserveMessage
    reserve_status: reserveStatus
    endedAt
    current_bid: currentBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
  myLotStanding(live: true) {
    active_bid: activeBid {
      is_winning: isWinning
      id
    }
    most_recent_bid: mostRecentBid {
      max_bid: maxBid {
        display
      }
      id
    }
  }
  ...ArtworkSidebarBiddingClosedMessage_artwork
}

fragment ArtworkSidebarExtraLinks_artwork on Artwork {
  internalID
  is_in_auction: isInAuction
  is_for_sale: isForSale
  is_acquireable: isAcquireable
  is_inquireable: isInquireable
  artists {
    is_consignable: isConsignable
    id
  }
  sale {
    is_closed: isClosed
    isBenefit
    partner {
      name
      id
    }
    id
  }
}

fragment ArtworkSidebarMetadata_artwork on Artwork {
  is_biddable: isBiddable
  edition_sets: editionSets {
    __typename
    id
  }
  sale_artwork: saleArtwork {
    lot_label: lotLabel
    id
  }
  ...ArtworkSidebarTitleInfo_artwork
  ...ArtworkSidebarSizeInfo_piece
  ...ArtworkSidebarClassification_artwork
}

fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
  internalID
  slug
  isInquireable
  partner {
    name
    href
    cities
    id
  }
  sale {
    name
    href
    id
  }
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  __isSellable: __typename
  dimensions {
    in
    cm
  }
  edition_of: editionOf
}

fragment ArtworkSidebarTitleInfo_artwork on Artwork {
  title
  date
  medium
}

fragment ArtworkSidebar_artwork on Artwork {
  is_in_auction: isInAuction
  is_sold: isSold
  is_biddable: isBiddable
  is_acquireable: isAcquireable
  is_offerable: isOfferable
  hasCertificateOfAuthenticity
  partner {
    isVerifiedSeller
    id
  }
  ...ArtworkSidebarArtists_artwork
  ...ArtworkSidebarMetadata_artwork
  ...ArtworkSidebarAuctionPartnerInfo_artwork
  ...ArtworkSidebarAuctionInfoPolling_artwork
  ...ArtworkSidebarAuctionTimer_artwork
  ...ArtworkSidebarCommercial_artwork
  ...ArtworkSidebarPartnerInfo_artwork
  ...ArtworkSidebarExtraLinks_artwork
  ...SecurePayment_artwork
  ...VerifiedSeller_artwork
  ...AuthenticityCertificate_artwork
  ...BuyerGuarantee_artwork
  ...CreateArtworkAlertSection_artwork
  ...ArtworkSidebarBiddingClosedMessage_artwork
  sale {
    is_closed: isClosed
    startAt
    internalID
    extendedBiddingIntervalMinutes
    id
  }
  saleArtwork {
    endAt
    endedAt
    extendedBiddingEndAt
    lotID
    id
  }
}

fragment ArtworkSidebar_me on Me {
  ...ArtworkSidebarAuctionInfoPolling_me
}

fragment ArtworkVideoPlayer_artwork on Artwork {
  figures {
    __typename
    ... on Video {
      type: __typename
      url
      height
      width
    }
  }
}

fragment AuctionTimer_sale on Sale {
  liveStartAt
  endAt
}

fragment AuthenticityCertificate_artwork on Artwork {
  hasCertificateOfAuthenticity
  is_biddable: isBiddable
}

fragment BuyerGuarantee_artwork on Artwork {
  is_acquireable: isAcquireable
  is_offerable: isOfferable
}

fragment CreateArtworkAlertSection_artwork on Artwork {
  internalID
  title
  slug
  artists {
    internalID
    name
    slug
    id
  }
  attributionClass {
    internalID
    id
  }
  mediumType {
    filterGene {
      slug
      name
      id
    }
  }
}

fragment DeepZoom_image on Image {
  deepZoom {
    Image {
      xmlns
      Url
      Format
      TileSize
      Overlap
      Size {
        Width
        Height
      }
    }
  }
}

fragment EntityHeaderArtist_artist on Artist {
  internalID
  href
  slug
  name
  initials
  formattedNationalityAndBirthday
  counts {
    artworks
    forSaleArtworks
  }
  avatar: image {
    cropped(width: 45, height: 45) {
      src
      srcSet
    }
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment FollowArtistButton_artist_2eN9lh on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
  ...FollowArtistPopover_artist
}

fragment FollowArtistPopoverRow_artist on Artist {
  internalID
  name
  formattedNationalityAndBirthday
  image {
    cropped(width: 45, height: 45) {
      url
    }
  }
}

fragment FollowArtistPopover_artist on Artist {
  related {
    suggestedConnection(first: 3, excludeFollowedArtists: true, includeFallbackArtists: true) {
      edges {
        node {
          id
          internalID
          ...FollowArtistPopoverRow_artist
        }
      }
    }
  }
}

fragment LotTimer_saleArtwork on SaleArtwork {
  endAt
  formattedStartDateTime
  extendedBiddingEndAt
  lotID
  sale {
    startAt
    extendedBiddingPeriodMinutes
    extendedBiddingIntervalMinutes
    internalID
    id
  }
}

fragment SecurePayment_artwork on Artwork {
  is_acquireable: isAcquireable
  is_offerable: isOfferable
}

fragment SelectedExhibitions_exhibitions on Show {
  partner {
    __typename
    ... on ExternalPartner {
      name
      id
    }
    ... on Partner {
      name
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
  name
  start_at: startAt(format: "YYYY")
  cover_image: coverImage {
    cropped(width: 800, height: 600) {
      url
    }
  }
  city
}

fragment SeoDataForArtwork_artwork on Artwork {
  href
  date
  is_price_hidden: isPriceHidden
  is_price_range: isPriceRange
  listPrice {
    __typename
    ... on PriceRange {
      minPrice {
        major
        currencyCode
      }
      maxPrice {
        major
      }
    }
    ... on Money {
      major
      currencyCode
    }
  }
  meta_image: image {
    resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
      width
      height
      url
    }
  }
  meta {
    title
    description(limit: 155)
  }
  partner {
    name
    type
    profile {
      image {
        resized(width: 320, height: 320, version: ["medium"]) {
          url
        }
      }
      id
    }
    id
  }
  artistNames
  availability
  category
  dimensions {
    in
  }
}

fragment SubmittedOrderModal_me on Me {
  orders(states: [SUBMITTED], mode: OFFER, first: 1, sort: UPDATED_AT_DESC) {
    edges {
      node {
        __typename
        stateExpiresAt(format: "MMM D")
        lineItems {
          edges {
            node {
              artwork {
                slug
                id
              }
              id
            }
          }
        }
        id
      }
    }
  }
}

fragment VerifiedSeller_artwork on Artwork {
  is_biddable: isBiddable
  partner {
    isVerifiedSeller
    name
    id
  }
}

fragment ViewInRoomArtwork_artwork on Artwork {
  widthCm
  heightCm
  image {
    resized(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      src
      srcSet
      width
      height
    }
  }
}

fragment ViewInRoom_artwork on Artwork {
  ...ViewInRoomArtwork_artwork
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": "is_acquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v4 = {
  "alias": "is_offerable",
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v12 = [
  (v11/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v17 = [
  (v15/*: any*/),
  (v10/*: any*/)
],
v18 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 45
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 45
  }
],
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v21 = [
  {
    "alias": null,
    "args": (v18/*: any*/),
    "concreteType": "CroppedImageUrl",
    "kind": "LinkedField",
    "name": "cropped",
    "plural": false,
    "selections": [
      (v19/*: any*/),
      (v20/*: any*/)
    ],
    "storageKey": "cropped(height:45,width:45)"
  }
],
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v23 = {
  "alias": "formatted_nationality_and_birthday",
  "args": null,
  "kind": "ScalarField",
  "name": "formattedNationalityAndBirthday",
  "storageKey": null
},
v24 = {
  "alias": "partner_shows",
  "args": null,
  "kind": "ScalarField",
  "name": "partnerShows",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "follows",
  "storageKey": null
},
v26 = {
  "kind": "InlineFragment",
  "selections": [
    (v10/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v27 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "YYYY"
  }
],
v28 = {
  "kind": "Literal",
  "name": "width",
  "value": 800
},
v29 = {
  "alias": "exhibition_highlights",
  "args": [
    {
      "kind": "Literal",
      "name": "size",
      "value": 3
    }
  ],
  "concreteType": "Show",
  "kind": "LinkedField",
  "name": "exhibitionHighlights",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": (v17/*: any*/),
          "type": "ExternalPartner",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v15/*: any*/)
          ],
          "type": "Partner",
          "abstractKey": null
        },
        (v26/*: any*/)
      ],
      "storageKey": null
    },
    (v15/*: any*/),
    {
      "alias": "start_at",
      "args": (v27/*: any*/),
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"YYYY\")"
    },
    {
      "alias": "cover_image",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 600
            },
            (v28/*: any*/)
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v12/*: any*/),
          "storageKey": "cropped(height:600,width:800)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    },
    (v10/*: any*/)
  ],
  "storageKey": "exhibitionHighlights(size:3)"
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "collections",
  "storageKey": null
},
v31 = [
  (v1/*: any*/),
  (v10/*: any*/)
],
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtistHighlights",
  "kind": "LinkedField",
  "name": "highlights",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "displayOnPartnerProfile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "partnerCategory",
          "value": [
            "blue-chip",
            "top-established",
            "top-emerging"
          ]
        },
        {
          "kind": "Literal",
          "name": "representedBy",
          "value": true
        }
      ],
      "concreteType": "PartnerArtistConnection",
      "kind": "LinkedField",
      "name": "partnersConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PartnerArtistEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v5/*: any*/),
                (v10/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PartnerCategory",
                  "kind": "LinkedField",
                  "name": "categories",
                  "plural": true,
                  "selections": (v31/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            (v10/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
    }
  ],
  "storageKey": null
},
v33 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v34 = {
  "alias": null,
  "args": [
    (v33/*: any*/),
    {
      "kind": "Literal",
      "name": "recordsTrusted",
      "value": true
    },
    {
      "kind": "Literal",
      "name": "sort",
      "value": "PRICE_AND_DATE_DESC"
    }
  ],
  "concreteType": "AuctionResultConnection",
  "kind": "LinkedField",
  "name": "auctionResultsConnection",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionResultEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AuctionResult",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v5/*: any*/),
            (v10/*: any*/),
            {
              "alias": "price_realized",
              "args": null,
              "concreteType": "AuctionResultPriceRealized",
              "kind": "LinkedField",
              "name": "priceRealized",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "0.0a"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "display",
                  "storageKey": "display(format:\"0.0a\")"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "organization",
              "storageKey": null
            },
            {
              "alias": "sale_date",
              "args": (v27/*: any*/),
              "kind": "ScalarField",
              "name": "saleDate",
              "storageKey": "saleDate(format:\"YYYY\")"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
},
v35 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "HTML"
    },
    {
      "kind": "Literal",
      "name": "partnerBio",
      "value": false
    }
  ],
  "concreteType": "ArtistBlurb",
  "kind": "LinkedField",
  "name": "biographyBlurb",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "credit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
},
v36 = {
  "alias": "is_followed",
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowed",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "formattedNationalityAndBirthday",
  "storageKey": null
},
v38 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  },
  {
    "kind": "Literal",
    "name": "kind",
    "value": "MAIN"
  }
],
v39 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v42 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 640
      },
      {
        "kind": "Literal",
        "name": "version",
        "value": [
          "large",
          "medium",
          "tall"
        ]
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 640
      }
    ],
    "concreteType": "ResizedImageUrl",
    "kind": "LinkedField",
    "name": "resized",
    "plural": false,
    "selections": [
      (v40/*: any*/),
      (v41/*: any*/),
      (v11/*: any*/)
    ],
    "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)"
  }
],
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "in",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cm",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v45 = {
  "alias": "edition_of",
  "args": null,
  "kind": "ScalarField",
  "name": "editionOf",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endedAt",
  "storageKey": null
},
v47 = [
  (v6/*: any*/)
],
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v50 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 800
  },
  {
    "kind": "Literal",
    "name": "version",
    "value": [
      "normalized",
      "larger",
      "large"
    ]
  },
  (v28/*: any*/)
],
v51 = [
  (v40/*: any*/),
  (v41/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/)
],
v52 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v54 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AuctionResultEdge"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v59 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistBlurb"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistCounts"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v66 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Show"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v69 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerTypes"
},
v70 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistHighlights"
},
v71 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerArtistConnection"
},
v72 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "PartnerArtistEdge"
},
v73 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v74 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "PartnerCategory"
},
v75 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v76 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistRelatedData"
},
v77 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistConnection"
},
v78 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtistEdge"
},
v79 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMeta"
},
v80 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Profile"
},
v81 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v82 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v83 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v84 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v85 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v86 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v87 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v88 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v89 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "BidderPosition"
},
v90 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v91 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v92 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCurrentBid"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkApp_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkApp_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "availability",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "listPrice",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "maxPrice",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "minPrice",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "type": "Money",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "is_in_auction",
            "args": null,
            "kind": "ScalarField",
            "name": "isInAuction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cascadingEndTimeIntervalMinutes",
                "storageKey": null
              },
              (v9/*: any*/),
              (v1/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isBenefit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isGalleryAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "coverImage",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": "is_live_open",
                "args": null,
                "kind": "ScalarField",
                "name": "isLiveOpen",
                "storageKey": null
              },
              {
                "alias": "is_with_buyers_premium",
                "args": null,
                "kind": "ScalarField",
                "name": "isWithBuyersPremium",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Bidder",
                "kind": "LinkedField",
                "name": "registrationStatus",
                "plural": false,
                "selections": [
                  {
                    "alias": "qualified_for_bidding",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "qualifiedForBidding",
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "is_preview",
                "args": null,
                "kind": "ScalarField",
                "name": "isPreview",
                "storageKey": null
              },
              {
                "alias": "is_open",
                "args": null,
                "kind": "ScalarField",
                "name": "isOpen",
                "storageKey": null
              },
              {
                "alias": "is_registration_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isRegistrationClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "requireIdentityVerification",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liveStartAt",
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": (v17/*: any*/),
                "storageKey": null
              },
              {
                "alias": "is_auction",
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  (v24/*: any*/),
                  (v25/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "artworks",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "forSaleArtworks",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v29/*: any*/),
              (v30/*: any*/),
              (v32/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v36/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              (v37/*: any*/),
              {
                "alias": "avatar",
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": (v21/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "kind": "LinkedField",
                "name": "related",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "excludeFollowedArtists",
                        "value": true
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      },
                      {
                        "kind": "Literal",
                        "name": "includeFallbackArtists",
                        "value": true
                      }
                    ],
                    "concreteType": "ArtistConnection",
                    "kind": "LinkedField",
                    "name": "suggestedConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v10/*: any*/),
                              (v2/*: any*/),
                              (v15/*: any*/),
                              (v37/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Image",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": (v18/*: any*/),
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v12/*: any*/),
                                    "storageKey": "cropped(height:45,width:45)"
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3,includeFallbackArtists:true)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "is_consignable",
                "args": null,
                "kind": "ScalarField",
                "name": "isConsignable",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v1/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  (v24/*: any*/),
                  (v25/*: any*/)
                ],
                "storageKey": null
              },
              (v29/*: any*/),
              (v30/*: any*/),
              (v32/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v10/*: any*/),
              (v36/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "kind": "LinkedField",
                "name": "related",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": (v38/*: any*/),
                    "concreteType": "ArtistConnection",
                    "kind": "LinkedField",
                    "name": "artistsConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "kind": "LinkedField",
                        "name": "pageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "hasNextPage",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endCursor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v15/*: any*/),
                              (v1/*: any*/),
                              (v16/*: any*/),
                              (v22/*: any*/),
                              (v23/*: any*/),
                              (v10/*: any*/),
                              (v2/*: any*/),
                              (v36/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtistCounts",
                                "kind": "LinkedField",
                                "name": "counts",
                                "plural": false,
                                "selections": [
                                  (v25/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cursor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artistsConnection(after:\"\",first:4,kind:\"MAIN\")"
                  },
                  {
                    "alias": null,
                    "args": (v38/*: any*/),
                    "filters": [
                      "kind"
                    ],
                    "handle": "connection",
                    "key": "ArtworkRelatedArtists_artistsConnection",
                    "kind": "LinkedHandle",
                    "name": "artistsConnection"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v16/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          (v39/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v15/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Profile",
                "kind": "LinkedField",
                "name": "profile",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 320
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "medium"
                            ]
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 320
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "kind": "LinkedField",
                        "name": "resized",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": "resized(height:320,version:[\"medium\"],width:320)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isVerifiedSeller",
                "storageKey": null
              },
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cities",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInAuction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAcquireable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInquireable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOfferable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isShareable",
            "storageKey": null
          },
          {
            "alias": "metaImage",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": (v42/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v43/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "limit",
                    "value": 155
                  }
                ],
                "kind": "ScalarField",
                "name": "description",
                "storageKey": "description(limit:155)"
              },
              {
                "alias": "longDescription",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "limit",
                    "value": 200
                  }
                ],
                "kind": "ScalarField",
                "name": "description",
                "storageKey": "description(limit:200)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "context",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "icon",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Fair",
                "abstractKey": null
              },
              (v26/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v15/*: any*/),
                  (v16/*: any*/)
                ],
                "type": "Sale",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": "thumbnail",
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "Show",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "is_price_hidden",
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceHidden",
            "storageKey": null
          },
          {
            "alias": "is_price_range",
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceRange",
            "storageKey": null
          },
          {
            "alias": "meta_image",
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": (v42/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          (v44/*: any*/),
          {
            "alias": "is_sold",
            "args": null,
            "kind": "ScalarField",
            "name": "isSold",
            "storageKey": null
          },
          {
            "alias": "is_biddable",
            "args": null,
            "kind": "ScalarField",
            "name": "isBiddable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCertificateOfAuthenticity",
            "storageKey": null
          },
          {
            "alias": "cultural_maker",
            "args": null,
            "kind": "ScalarField",
            "name": "culturalMaker",
            "storageKey": null
          },
          {
            "alias": "edition_sets",
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v10/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v39/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v44/*: any*/),
                  (v45/*: any*/)
                ],
                "type": "Sellable",
                "abstractKey": "__isSellable"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "sale_artwork",
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": "lot_label",
                "args": null,
                "kind": "ScalarField",
                "name": "lotLabel",
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "estimate",
                "storageKey": null
              },
              {
                "alias": "is_with_reserve",
                "args": null,
                "kind": "ScalarField",
                "name": "isWithReserve",
                "storageKey": null
              },
              {
                "alias": "reserve_message",
                "args": null,
                "kind": "ScalarField",
                "name": "reserveMessage",
                "storageKey": null
              },
              {
                "alias": "reserve_status",
                "args": null,
                "kind": "ScalarField",
                "name": "reserveStatus",
                "storageKey": null
              },
              (v46/*: any*/),
              {
                "alias": "current_bid",
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v47/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": "bidder_positions",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bidderPositions",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "kind": "LinkedField",
                "name": "increments",
                "plural": true,
                "selections": [
                  (v48/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v43/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortArrayDescription",
                "storageKey": null
              },
              (v10/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v47/*: any*/),
                "storageKey": null
              },
              (v10/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedStartDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extendedBiddingEndAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "extendedBiddingPeriodMinutes",
                    "storageKey": null
                  },
                  (v9/*: any*/),
                  (v2/*: any*/),
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v46/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
              }
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "myLotStanding",
            "plural": true,
            "selections": [
              {
                "alias": "active_bid",
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "activeBid",
                "plural": false,
                "selections": [
                  {
                    "alias": "is_winning",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isWinning",
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "most_recent_bid",
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "mostRecentBid",
                "plural": false,
                "selections": [
                  {
                    "alias": "max_bid",
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "kind": "LinkedField",
                    "name": "maxBid",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v48/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "myLotStanding(live:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Gene",
                "kind": "LinkedField",
                "name": "filterGene",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v15/*: any*/),
                  (v10/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOfferableFromInquiry",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceHidden",
            "storageKey": null
          },
          {
            "alias": "is_for_sale",
            "args": null,
            "kind": "ScalarField",
            "name": "isForSale",
            "storageKey": null
          },
          {
            "alias": "is_inquireable",
            "args": null,
            "kind": "ScalarField",
            "name": "isInquireable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceIncludesTaxDisplay",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingInfo",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingOrigin",
            "storageKey": null
          },
          (v10/*: any*/),
          {
            "alias": "is_saved",
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              (v49/*: any*/),
              {
                "alias": "placeholder",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "small",
                      "medium"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"small\",\"medium\"])"
              },
              {
                "alias": "fallback",
                "args": (v50/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v51/*: any*/),
                "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v50/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v51/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v40/*: any*/),
              (v41/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "artworkMeta",
            "args": null,
            "concreteType": "ArtworkMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "share",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "widthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "heightCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v50/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v40/*: any*/),
                  (v41/*: any*/)
                ],
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "larger"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"larger\")"
              },
              (v41/*: any*/),
              (v40/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "downloadableImageUrl",
            "storageKey": null
          },
          {
            "alias": "is_downloadable",
            "args": null,
            "kind": "ScalarField",
            "name": "isDownloadable",
            "storageKey": null
          },
          {
            "alias": "is_hangable",
            "args": null,
            "kind": "ScalarField",
            "name": "isHangable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedMetadata",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "figures",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v52/*: any*/),
                  (v11/*: any*/),
                  (v41/*: any*/),
                  (v40/*: any*/)
                ],
                "type": "Video",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeepZoom",
                    "kind": "LinkedField",
                    "name": "deepZoom",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeepZoomImage",
                        "kind": "LinkedField",
                        "name": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "xmlns",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Format",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "TileSize",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Overlap",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DeepZoomImageSize",
                            "kind": "LinkedField",
                            "name": "Size",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Height",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isZoomable",
                    "storageKey": null
                  },
                  (v52/*: any*/),
                  (v49/*: any*/)
                ],
                "type": "Image",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v45/*: any*/)
            ],
            "type": "Sellable",
            "abstractKey": "__isSellable"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "identityVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "pendingIdentityVerification",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v33/*: any*/),
              {
                "kind": "Literal",
                "name": "mode",
                "value": "OFFER"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "UPDATED_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "SUBMITTED"
                ]
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOrderEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "stateExpiresAt",
                        "storageKey": "stateExpiresAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceLineItemEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceLineItem",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Artwork",
                                    "kind": "LinkedField",
                                    "name": "artwork",
                                    "plural": false,
                                    "selections": (v31/*: any*/),
                                    "storageKey": null
                                  },
                                  (v10/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:1,mode:\"OFFER\",sort:\"UPDATED_AT_DESC\",states:[\"SUBMITTED\"])"
          },
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0932dfff3e137f8df7faa9f08042d582",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v53/*: any*/),
        "artwork.__isSellable": (v54/*: any*/),
        "artwork.artist": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.__typename": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.sale_date": (v60/*: any*/),
        "artwork.artist.biographyBlurb": (v62/*: any*/),
        "artwork.artist.biographyBlurb.credit": (v60/*: any*/),
        "artwork.artist.biographyBlurb.partnerID": (v60/*: any*/),
        "artwork.artist.biographyBlurb.text": (v60/*: any*/),
        "artwork.artist.collections": (v63/*: any*/),
        "artwork.artist.counts": (v64/*: any*/),
        "artwork.artist.counts.follows": (v65/*: any*/),
        "artwork.artist.counts.partner_shows": (v65/*: any*/),
        "artwork.artist.exhibition_highlights": (v66/*: any*/),
        "artwork.artist.exhibition_highlights.city": (v60/*: any*/),
        "artwork.artist.exhibition_highlights.cover_image": (v67/*: any*/),
        "artwork.artist.exhibition_highlights.cover_image.cropped": (v68/*: any*/),
        "artwork.artist.exhibition_highlights.cover_image.cropped.url": (v54/*: any*/),
        "artwork.artist.exhibition_highlights.id": (v59/*: any*/),
        "artwork.artist.exhibition_highlights.name": (v60/*: any*/),
        "artwork.artist.exhibition_highlights.partner": (v69/*: any*/),
        "artwork.artist.exhibition_highlights.partner.__isNode": (v54/*: any*/),
        "artwork.artist.exhibition_highlights.partner.__typename": (v54/*: any*/),
        "artwork.artist.exhibition_highlights.partner.id": (v59/*: any*/),
        "artwork.artist.exhibition_highlights.partner.name": (v60/*: any*/),
        "artwork.artist.exhibition_highlights.start_at": (v60/*: any*/),
        "artwork.artist.formatted_nationality_and_birthday": (v60/*: any*/),
        "artwork.artist.highlights": (v70/*: any*/),
        "artwork.artist.highlights.partnersConnection": (v71/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges": (v72/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.id": (v59/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node": (v73/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.__typename": (v54/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.categories": (v74/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.categories.id": (v59/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.categories.slug": (v59/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.id": (v59/*: any*/),
        "artwork.artist.href": (v60/*: any*/),
        "artwork.artist.id": (v59/*: any*/),
        "artwork.artist.image": (v67/*: any*/),
        "artwork.artist.image.cropped": (v68/*: any*/),
        "artwork.artist.image.cropped.src": (v54/*: any*/),
        "artwork.artist.image.cropped.srcSet": (v54/*: any*/),
        "artwork.artist.internalID": (v59/*: any*/),
        "artwork.artist.is_followed": (v75/*: any*/),
        "artwork.artist.name": (v60/*: any*/),
        "artwork.artist.related": (v76/*: any*/),
        "artwork.artist.related.artistsConnection": (v77/*: any*/),
        "artwork.artist.related.artistsConnection.edges": (v78/*: any*/),
        "artwork.artist.related.artistsConnection.edges.cursor": (v54/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node": (v55/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.__typename": (v54/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.counts": (v64/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.counts.follows": (v65/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.formatted_nationality_and_birthday": (v60/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.href": (v60/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.id": (v59/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image": (v67/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image.cropped": (v68/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image.cropped.src": (v54/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image.cropped.srcSet": (v54/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.internalID": (v59/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.is_followed": (v75/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.name": (v60/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.slug": (v59/*: any*/),
        "artwork.artist.related.artistsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.related.artistsConnection.pageInfo.endCursor": (v60/*: any*/),
        "artwork.artist.related.artistsConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.artist.slug": (v59/*: any*/),
        "artwork.artistNames": (v60/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.auctionResultsConnection": (v56/*: any*/),
        "artwork.artists.auctionResultsConnection.edges": (v57/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node": (v58/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.__typename": (v54/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.id": (v59/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.organization": (v60/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.price_realized": (v61/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.price_realized.display": (v60/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.sale_date": (v60/*: any*/),
        "artwork.artists.avatar": (v67/*: any*/),
        "artwork.artists.avatar.cropped": (v68/*: any*/),
        "artwork.artists.avatar.cropped.src": (v54/*: any*/),
        "artwork.artists.avatar.cropped.srcSet": (v54/*: any*/),
        "artwork.artists.biographyBlurb": (v62/*: any*/),
        "artwork.artists.biographyBlurb.credit": (v60/*: any*/),
        "artwork.artists.biographyBlurb.partnerID": (v60/*: any*/),
        "artwork.artists.biographyBlurb.text": (v60/*: any*/),
        "artwork.artists.collections": (v63/*: any*/),
        "artwork.artists.counts": (v64/*: any*/),
        "artwork.artists.counts.artworks": (v65/*: any*/),
        "artwork.artists.counts.follows": (v65/*: any*/),
        "artwork.artists.counts.forSaleArtworks": (v65/*: any*/),
        "artwork.artists.counts.partner_shows": (v65/*: any*/),
        "artwork.artists.exhibition_highlights": (v66/*: any*/),
        "artwork.artists.exhibition_highlights.city": (v60/*: any*/),
        "artwork.artists.exhibition_highlights.cover_image": (v67/*: any*/),
        "artwork.artists.exhibition_highlights.cover_image.cropped": (v68/*: any*/),
        "artwork.artists.exhibition_highlights.cover_image.cropped.url": (v54/*: any*/),
        "artwork.artists.exhibition_highlights.id": (v59/*: any*/),
        "artwork.artists.exhibition_highlights.name": (v60/*: any*/),
        "artwork.artists.exhibition_highlights.partner": (v69/*: any*/),
        "artwork.artists.exhibition_highlights.partner.__isNode": (v54/*: any*/),
        "artwork.artists.exhibition_highlights.partner.__typename": (v54/*: any*/),
        "artwork.artists.exhibition_highlights.partner.id": (v59/*: any*/),
        "artwork.artists.exhibition_highlights.partner.name": (v60/*: any*/),
        "artwork.artists.exhibition_highlights.start_at": (v60/*: any*/),
        "artwork.artists.formattedNationalityAndBirthday": (v60/*: any*/),
        "artwork.artists.formatted_nationality_and_birthday": (v60/*: any*/),
        "artwork.artists.highlights": (v70/*: any*/),
        "artwork.artists.highlights.partnersConnection": (v71/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges": (v72/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.id": (v59/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node": (v73/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.__typename": (v54/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.categories": (v74/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.categories.id": (v59/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.categories.slug": (v59/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.id": (v59/*: any*/),
        "artwork.artists.href": (v60/*: any*/),
        "artwork.artists.id": (v59/*: any*/),
        "artwork.artists.image": (v67/*: any*/),
        "artwork.artists.image.cropped": (v68/*: any*/),
        "artwork.artists.image.cropped.src": (v54/*: any*/),
        "artwork.artists.image.cropped.srcSet": (v54/*: any*/),
        "artwork.artists.initials": (v60/*: any*/),
        "artwork.artists.internalID": (v59/*: any*/),
        "artwork.artists.is_consignable": (v75/*: any*/),
        "artwork.artists.is_followed": (v75/*: any*/),
        "artwork.artists.name": (v60/*: any*/),
        "artwork.artists.related": (v76/*: any*/),
        "artwork.artists.related.suggestedConnection": (v77/*: any*/),
        "artwork.artists.related.suggestedConnection.edges": (v78/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node": (v55/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.formattedNationalityAndBirthday": (v60/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.id": (v59/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image": (v67/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image.cropped": (v68/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image.cropped.url": (v54/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.internalID": (v59/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.name": (v60/*: any*/),
        "artwork.artists.slug": (v59/*: any*/),
        "artwork.artworkMeta": (v79/*: any*/),
        "artwork.artworkMeta.share": (v60/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v59/*: any*/),
        "artwork.attributionClass.internalID": (v59/*: any*/),
        "artwork.attributionClass.shortArrayDescription": (v63/*: any*/),
        "artwork.availability": (v60/*: any*/),
        "artwork.category": (v60/*: any*/),
        "artwork.context": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkContext"
        },
        "artwork.context.__isNode": (v54/*: any*/),
        "artwork.context.__typename": (v54/*: any*/),
        "artwork.context.href": (v60/*: any*/),
        "artwork.context.id": (v59/*: any*/),
        "artwork.context.name": (v60/*: any*/),
        "artwork.context.profile": (v80/*: any*/),
        "artwork.context.profile.icon": (v67/*: any*/),
        "artwork.context.profile.icon.url": (v60/*: any*/),
        "artwork.context.profile.id": (v59/*: any*/),
        "artwork.context.slug": (v59/*: any*/),
        "artwork.context.status": (v60/*: any*/),
        "artwork.context.thumbnail": (v67/*: any*/),
        "artwork.context.thumbnail.url": (v60/*: any*/),
        "artwork.cultural_maker": (v60/*: any*/),
        "artwork.date": (v60/*: any*/),
        "artwork.dimensions": (v81/*: any*/),
        "artwork.dimensions.cm": (v60/*: any*/),
        "artwork.dimensions.in": (v60/*: any*/),
        "artwork.downloadableImageUrl": (v60/*: any*/),
        "artwork.edition_of": (v60/*: any*/),
        "artwork.edition_sets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.edition_sets.__isSellable": (v54/*: any*/),
        "artwork.edition_sets.__typename": (v54/*: any*/),
        "artwork.edition_sets.dimensions": (v81/*: any*/),
        "artwork.edition_sets.dimensions.cm": (v60/*: any*/),
        "artwork.edition_sets.dimensions.in": (v60/*: any*/),
        "artwork.edition_sets.edition_of": (v60/*: any*/),
        "artwork.edition_sets.id": (v59/*: any*/),
        "artwork.edition_sets.internalID": (v59/*: any*/),
        "artwork.edition_sets.is_acquireable": (v75/*: any*/),
        "artwork.edition_sets.is_offerable": (v75/*: any*/),
        "artwork.edition_sets.sale_message": (v60/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v54/*: any*/),
        "artwork.figures.deepZoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoom"
        },
        "artwork.figures.deepZoom.Image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImage"
        },
        "artwork.figures.deepZoom.Image.Format": (v60/*: any*/),
        "artwork.figures.deepZoom.Image.Overlap": (v82/*: any*/),
        "artwork.figures.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.figures.deepZoom.Image.Size.Height": (v82/*: any*/),
        "artwork.figures.deepZoom.Image.Size.Width": (v82/*: any*/),
        "artwork.figures.deepZoom.Image.TileSize": (v82/*: any*/),
        "artwork.figures.deepZoom.Image.Url": (v60/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v60/*: any*/),
        "artwork.figures.height": (v83/*: any*/),
        "artwork.figures.internalID": (v84/*: any*/),
        "artwork.figures.isDefault": (v75/*: any*/),
        "artwork.figures.isZoomable": (v75/*: any*/),
        "artwork.figures.type": (v54/*: any*/),
        "artwork.figures.url": (v54/*: any*/),
        "artwork.figures.width": (v83/*: any*/),
        "artwork.formattedMetadata": (v60/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v75/*: any*/),
        "artwork.heightCm": (v85/*: any*/),
        "artwork.href": (v60/*: any*/),
        "artwork.id": (v59/*: any*/),
        "artwork.image": (v67/*: any*/),
        "artwork.image.height": (v82/*: any*/),
        "artwork.image.internalID": (v84/*: any*/),
        "artwork.image.resized": (v86/*: any*/),
        "artwork.image.resized.height": (v82/*: any*/),
        "artwork.image.resized.src": (v54/*: any*/),
        "artwork.image.resized.srcSet": (v54/*: any*/),
        "artwork.image.resized.width": (v82/*: any*/),
        "artwork.image.url": (v60/*: any*/),
        "artwork.image.width": (v82/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": (v68/*: any*/),
        "artwork.images.fallback.height": (v83/*: any*/),
        "artwork.images.fallback.src": (v54/*: any*/),
        "artwork.images.fallback.srcSet": (v54/*: any*/),
        "artwork.images.fallback.width": (v83/*: any*/),
        "artwork.images.height": (v82/*: any*/),
        "artwork.images.isDefault": (v75/*: any*/),
        "artwork.images.placeholder": (v60/*: any*/),
        "artwork.images.resized": (v86/*: any*/),
        "artwork.images.resized.height": (v82/*: any*/),
        "artwork.images.resized.src": (v54/*: any*/),
        "artwork.images.resized.srcSet": (v54/*: any*/),
        "artwork.images.resized.width": (v82/*: any*/),
        "artwork.images.url": (v60/*: any*/),
        "artwork.images.width": (v82/*: any*/),
        "artwork.internalID": (v59/*: any*/),
        "artwork.isAcquireable": (v75/*: any*/),
        "artwork.isInAuction": (v75/*: any*/),
        "artwork.isInquireable": (v75/*: any*/),
        "artwork.isOfferable": (v75/*: any*/),
        "artwork.isOfferableFromInquiry": (v75/*: any*/),
        "artwork.isPriceHidden": (v75/*: any*/),
        "artwork.isShareable": (v75/*: any*/),
        "artwork.is_acquireable": (v75/*: any*/),
        "artwork.is_biddable": (v75/*: any*/),
        "artwork.is_downloadable": (v75/*: any*/),
        "artwork.is_for_sale": (v75/*: any*/),
        "artwork.is_hangable": (v75/*: any*/),
        "artwork.is_in_auction": (v75/*: any*/),
        "artwork.is_inquireable": (v75/*: any*/),
        "artwork.is_offerable": (v75/*: any*/),
        "artwork.is_price_hidden": (v75/*: any*/),
        "artwork.is_price_range": (v75/*: any*/),
        "artwork.is_saved": (v75/*: any*/),
        "artwork.is_sold": (v75/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v54/*: any*/),
        "artwork.listPrice.currencyCode": (v54/*: any*/),
        "artwork.listPrice.display": (v60/*: any*/),
        "artwork.listPrice.major": (v87/*: any*/),
        "artwork.listPrice.maxPrice": (v88/*: any*/),
        "artwork.listPrice.maxPrice.currencyCode": (v54/*: any*/),
        "artwork.listPrice.maxPrice.major": (v87/*: any*/),
        "artwork.listPrice.minPrice": (v88/*: any*/),
        "artwork.listPrice.minPrice.currencyCode": (v54/*: any*/),
        "artwork.listPrice.minPrice.major": (v87/*: any*/),
        "artwork.medium": (v60/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.mediumType.filterGene.id": (v59/*: any*/),
        "artwork.mediumType.filterGene.name": (v60/*: any*/),
        "artwork.mediumType.filterGene.slug": (v59/*: any*/),
        "artwork.meta": (v79/*: any*/),
        "artwork.meta.description": (v60/*: any*/),
        "artwork.meta.longDescription": (v60/*: any*/),
        "artwork.meta.title": (v60/*: any*/),
        "artwork.metaImage": (v67/*: any*/),
        "artwork.metaImage.resized": (v86/*: any*/),
        "artwork.metaImage.resized.height": (v82/*: any*/),
        "artwork.metaImage.resized.url": (v54/*: any*/),
        "artwork.metaImage.resized.width": (v82/*: any*/),
        "artwork.meta_image": (v67/*: any*/),
        "artwork.meta_image.resized": (v86/*: any*/),
        "artwork.meta_image.resized.height": (v82/*: any*/),
        "artwork.meta_image.resized.url": (v54/*: any*/),
        "artwork.meta_image.resized.width": (v82/*: any*/),
        "artwork.myLotStanding": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "artwork.myLotStanding.active_bid": (v89/*: any*/),
        "artwork.myLotStanding.active_bid.id": (v59/*: any*/),
        "artwork.myLotStanding.active_bid.is_winning": (v75/*: any*/),
        "artwork.myLotStanding.most_recent_bid": (v89/*: any*/),
        "artwork.myLotStanding.most_recent_bid.id": (v59/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPositionMaxBid"
        },
        "artwork.myLotStanding.most_recent_bid.max_bid.cents": (v85/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid.display": (v60/*: any*/),
        "artwork.partner": (v73/*: any*/),
        "artwork.partner.cities": (v63/*: any*/),
        "artwork.partner.href": (v60/*: any*/),
        "artwork.partner.id": (v59/*: any*/),
        "artwork.partner.isVerifiedSeller": (v75/*: any*/),
        "artwork.partner.name": (v60/*: any*/),
        "artwork.partner.profile": (v80/*: any*/),
        "artwork.partner.profile.id": (v59/*: any*/),
        "artwork.partner.profile.image": (v67/*: any*/),
        "artwork.partner.profile.image.resized": (v86/*: any*/),
        "artwork.partner.profile.image.resized.url": (v54/*: any*/),
        "artwork.partner.slug": (v59/*: any*/),
        "artwork.partner.type": (v60/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v60/*: any*/),
        "artwork.sale": (v90/*: any*/),
        "artwork.sale.cascadingEndTimeIntervalMinutes": (v82/*: any*/),
        "artwork.sale.coverImage": (v67/*: any*/),
        "artwork.sale.coverImage.url": (v60/*: any*/),
        "artwork.sale.endAt": (v60/*: any*/),
        "artwork.sale.extendedBiddingIntervalMinutes": (v82/*: any*/),
        "artwork.sale.href": (v60/*: any*/),
        "artwork.sale.id": (v59/*: any*/),
        "artwork.sale.internalID": (v59/*: any*/),
        "artwork.sale.isAuction": (v75/*: any*/),
        "artwork.sale.isBenefit": (v75/*: any*/),
        "artwork.sale.isClosed": (v75/*: any*/),
        "artwork.sale.isGalleryAuction": (v75/*: any*/),
        "artwork.sale.is_auction": (v75/*: any*/),
        "artwork.sale.is_closed": (v75/*: any*/),
        "artwork.sale.is_live_open": (v75/*: any*/),
        "artwork.sale.is_open": (v75/*: any*/),
        "artwork.sale.is_preview": (v75/*: any*/),
        "artwork.sale.is_registration_closed": (v75/*: any*/),
        "artwork.sale.is_with_buyers_premium": (v75/*: any*/),
        "artwork.sale.liveStartAt": (v60/*: any*/),
        "artwork.sale.name": (v60/*: any*/),
        "artwork.sale.partner": (v73/*: any*/),
        "artwork.sale.partner.id": (v59/*: any*/),
        "artwork.sale.partner.name": (v60/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v59/*: any*/),
        "artwork.sale.registrationStatus.qualified_for_bidding": (v75/*: any*/),
        "artwork.sale.requireIdentityVerification": (v75/*: any*/),
        "artwork.sale.slug": (v59/*: any*/),
        "artwork.sale.startAt": (v60/*: any*/),
        "artwork.saleArtwork": (v91/*: any*/),
        "artwork.saleArtwork.currentBid": (v92/*: any*/),
        "artwork.saleArtwork.currentBid.display": (v60/*: any*/),
        "artwork.saleArtwork.endAt": (v60/*: any*/),
        "artwork.saleArtwork.endedAt": (v60/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v60/*: any*/),
        "artwork.saleArtwork.formattedStartDateTime": (v60/*: any*/),
        "artwork.saleArtwork.id": (v59/*: any*/),
        "artwork.saleArtwork.lotID": (v60/*: any*/),
        "artwork.saleArtwork.sale": (v90/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingIntervalMinutes": (v82/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingPeriodMinutes": (v82/*: any*/),
        "artwork.saleArtwork.sale.id": (v59/*: any*/),
        "artwork.saleArtwork.sale.internalID": (v59/*: any*/),
        "artwork.saleArtwork.sale.startAt": (v60/*: any*/),
        "artwork.sale_artwork": (v91/*: any*/),
        "artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.sale_artwork.counts.bidder_positions": (v65/*: any*/),
        "artwork.sale_artwork.current_bid": (v92/*: any*/),
        "artwork.sale_artwork.current_bid.display": (v60/*: any*/),
        "artwork.sale_artwork.endedAt": (v60/*: any*/),
        "artwork.sale_artwork.estimate": (v60/*: any*/),
        "artwork.sale_artwork.id": (v59/*: any*/),
        "artwork.sale_artwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.sale_artwork.increments.cents": (v85/*: any*/),
        "artwork.sale_artwork.increments.display": (v60/*: any*/),
        "artwork.sale_artwork.is_with_reserve": (v75/*: any*/),
        "artwork.sale_artwork.lot_label": (v60/*: any*/),
        "artwork.sale_artwork.reserve_message": (v60/*: any*/),
        "artwork.sale_artwork.reserve_status": (v60/*: any*/),
        "artwork.sale_message": (v60/*: any*/),
        "artwork.shippingInfo": (v60/*: any*/),
        "artwork.shippingOrigin": (v60/*: any*/),
        "artwork.slug": (v59/*: any*/),
        "artwork.title": (v60/*: any*/),
        "artwork.widthCm": (v85/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v59/*: any*/),
        "me.identityVerified": (v75/*: any*/),
        "me.orders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "me.orders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "me.orders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "me.orders.edges.node.__typename": (v54/*: any*/),
        "me.orders.edges.node.id": (v59/*: any*/),
        "me.orders.edges.node.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "me.orders.edges.node.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "me.orders.edges.node.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "me.orders.edges.node.lineItems.edges.node.artwork": (v53/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.id": (v59/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.slug": (v59/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.id": (v59/*: any*/),
        "me.orders.edges.node.stateExpiresAt": (v60/*: any*/),
        "me.pendingIdentityVerification": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "IdentityVerification"
        },
        "me.pendingIdentityVerification.id": (v59/*: any*/),
        "me.pendingIdentityVerification.internalID": (v59/*: any*/)
      }
    },
    "name": "ArtworkApp_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkApp_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtworkApp_artwork\n    id\n  }\n  me {\n    ...ArtworkApp_me\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n\nfragment ArtistCard_artist on Artist {\n  name\n  slug\n  href\n  image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  formatted_nationality_and_birthday: formattedNationalityAndBirthday\n  ...FollowArtistButton_artist\n}\n\nfragment ArtistInfo_artist on Artist {\n  internalID\n  slug\n  name\n  href\n  image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  formatted_nationality_and_birthday: formattedNationalityAndBirthday\n  counts {\n    partner_shows: partnerShows\n  }\n  exhibition_highlights: exhibitionHighlights(size: 3) {\n    ...SelectedExhibitions_exhibitions\n    id\n  }\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          __typename\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        __typename\n        id\n      }\n    }\n  }\n  ...ArtistBio_bio\n  ...ArtistMarketInsights_artist\n  ...FollowArtistButton_artist\n  biographyBlurb(format: HTML, partnerBio: false) {\n    text\n  }\n}\n\nfragment ArtistMarketInsights_artist on Artist {\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  internalID\n  id\n  slug\n  title\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkSharePanel_artwork\n  ...ViewInRoom_artwork\n  artists {\n    name\n    id\n  }\n  date\n  dimensions {\n    cm\n  }\n  slug\n  image {\n    internalID\n    url(version: \"larger\")\n    height\n    width\n  }\n  downloadableImageUrl\n  is_downloadable: isDownloadable\n  is_hangable: isHangable\n  partner {\n    slug\n    id\n  }\n  title\n  sale {\n    is_closed: isClosed\n    is_auction: isAuction\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkApp_artwork on Artwork {\n  slug\n  internalID\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  availability\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  is_in_auction: isInAuction\n  sale {\n    internalID\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    slug\n    id\n  }\n  artists {\n    id\n    slug\n    ...ArtistInfo_artist\n  }\n  artist {\n    ...ArtistInfo_artist\n    id\n  }\n  ...ArtworkRelatedArtists_artwork\n  ...ArtworkMeta_artwork\n  ...ArtworkBanner_artwork\n  ...ArtworkSidebar_artwork\n  ...ArtworkImageBrowser_artwork\n}\n\nfragment ArtworkApp_me on Me {\n  ...ArtworkSidebar_me\n  ...SubmittedOrderModal_me\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale {\n    isAuction\n    isBenefit\n    isGalleryAuction\n    coverImage {\n      url\n    }\n    id\n  }\n  context {\n    __typename\n    ... on Sale {\n      name\n      href\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        icon {\n          url\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        url\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  figures {\n    __typename\n    ... on Image {\n      type: __typename\n      internalID\n      isZoomable\n      ...DeepZoom_image\n    }\n    ... on Video {\n      type: __typename\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  figures {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkActions_artwork\n  ...ArtworkImageBrowserSmall_artwork\n  ...ArtworkImageBrowserLarge_artwork\n  internalID\n  images {\n    width\n    height\n  }\n  figures {\n    __typename\n    ... on Image {\n      internalID\n      isDefault\n    }\n    ... on Video {\n      type: __typename\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork on Artwork {\n  formattedMetadata\n  images {\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtworkMeta_artwork on Artwork {\n  href\n  internalID\n  date\n  artistNames\n  sale_message: saleMessage\n  listPrice {\n    __typename\n    ... on Money {\n      currencyCode\n      major\n    }\n    ... on PriceRange {\n      maxPrice {\n        currencyCode\n        major\n      }\n    }\n  }\n  partner {\n    name\n    id\n  }\n  isInAuction\n  isAcquireable\n  isInquireable\n  isOfferable\n  isShareable\n  metaImage: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n    longDescription: description(limit: 200)\n  }\n  context {\n    __typename\n    ... on Fair {\n      slug\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...SeoDataForArtwork_artwork\n}\n\nfragment ArtworkRelatedArtists_artwork on Artwork {\n  slug\n  artist {\n    href\n    related {\n      artistsConnection(kind: MAIN, first: 4, after: \"\") {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            ...ArtistCard_artist\n            id\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  cultural_maker: culturalMaker\n  artists {\n    ...EntityHeaderArtist_artist\n    internalID\n    slug\n    name\n    ...FollowArtistButton_artist_2eN9lh\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {\n  internalID\n  sale {\n    isClosed\n    id\n  }\n  saleArtwork {\n    currentBid {\n      display\n    }\n    id\n  }\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_me on Me {\n  ...ArtworkSidebarBidAction_me\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionTimer_artwork on Artwork {\n  internalID\n  sale {\n    cascadingEndTimeIntervalMinutes\n    isClosed\n    ...AuctionTimer_sale\n    startAt\n    id\n  }\n  saleArtwork {\n    ...LotTimer_saleArtwork\n    endAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    endedAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_me on Me {\n  identityVerified\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  edition_sets: editionSets {\n    internalID\n    id\n    is_acquireable: isAcquireable\n    is_offerable: isOfferable\n    sale_message: saleMessage\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  internalID\n  isOfferableFromInquiry\n  isPriceHidden\n  is_acquireable: isAcquireable\n  is_for_sale: isForSale\n  is_inquireable: isInquireable\n  is_offerable: isOfferable\n  is_sold: isSold\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  priceIncludesTaxDisplay\n  sale_message: saleMessage\n  shippingInfo\n  shippingOrigin\n  slug\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarCreateAlertButton_artwork on Artwork {\n  slug\n  internalID\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    endedAt\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  internalID\n  is_in_auction: isInAuction\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  artists {\n    is_consignable: isConsignable\n    id\n  }\n  sale {\n    is_closed: isClosed\n    isBenefit\n    partner {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable: isBiddable\n  edition_sets: editionSets {\n    __typename\n    id\n  }\n  sale_artwork: saleArtwork {\n    lot_label: lotLabel\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  partner {\n    name\n    href\n    cities\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_in_auction: isInAuction\n  is_sold: isSold\n  is_biddable: isBiddable\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  hasCertificateOfAuthenticity\n  partner {\n    isVerifiedSeller\n    id\n  }\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarAuctionInfoPolling_artwork\n  ...ArtworkSidebarAuctionTimer_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  ...SecurePayment_artwork\n  ...VerifiedSeller_artwork\n  ...AuthenticityCertificate_artwork\n  ...BuyerGuarantee_artwork\n  ...CreateArtworkAlertSection_artwork\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n  sale {\n    is_closed: isClosed\n    startAt\n    internalID\n    extendedBiddingIntervalMinutes\n    id\n  }\n  saleArtwork {\n    endAt\n    endedAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n}\n\nfragment ArtworkSidebar_me on Me {\n  ...ArtworkSidebarAuctionInfoPolling_me\n}\n\nfragment ArtworkVideoPlayer_artwork on Artwork {\n  figures {\n    __typename\n    ... on Video {\n      type: __typename\n      url\n      height\n      width\n    }\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  liveStartAt\n  endAt\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable: isBiddable\n}\n\nfragment BuyerGuarantee_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment CreateArtworkAlertSection_artwork on Artwork {\n  internalID\n  title\n  slug\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment FollowArtistButton_artist_2eN9lh on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n  ...FollowArtistPopover_artist\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n\nfragment FollowArtistPopover_artist on Artist {\n  related {\n    suggestedConnection(first: 3, excludeFollowedArtists: true, includeFallbackArtists: true) {\n      edges {\n        node {\n          id\n          internalID\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n  formattedStartDateTime\n  extendedBiddingEndAt\n  lotID\n  sale {\n    startAt\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    internalID\n    id\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment SelectedExhibitions_exhibitions on Show {\n  partner {\n    __typename\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  name\n  start_at: startAt(format: \"YYYY\")\n  cover_image: coverImage {\n    cropped(width: 800, height: 600) {\n      url\n    }\n  }\n  city\n}\n\nfragment SeoDataForArtwork_artwork on Artwork {\n  href\n  date\n  is_price_hidden: isPriceHidden\n  is_price_range: isPriceRange\n  listPrice {\n    __typename\n    ... on PriceRange {\n      minPrice {\n        major\n        currencyCode\n      }\n      maxPrice {\n        major\n      }\n    }\n    ... on Money {\n      major\n      currencyCode\n    }\n  }\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n  }\n  partner {\n    name\n    type\n    profile {\n      image {\n        resized(width: 320, height: 320, version: [\"medium\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n  artistNames\n  availability\n  category\n  dimensions {\n    in\n  }\n}\n\nfragment SubmittedOrderModal_me on Me {\n  orders(states: [SUBMITTED], mode: OFFER, first: 1, sort: UPDATED_AT_DESC) {\n    edges {\n      node {\n        __typename\n        stateExpiresAt(format: \"MMM D\")\n        lineItems {\n          edges {\n            node {\n              artwork {\n                slug\n                id\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();
(node as any).hash = '604252fa71edf8caf8655f5478bd42ed';
export default node;
