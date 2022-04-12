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
  images {
    internalID
    isZoomable
    ...DeepZoom_image
  }
}

fragment ArtworkImageBrowserSmall_artwork on Artwork {
  ...ArtworkLightbox_artwork
  images {
    internalID
    isZoomable
    ...DeepZoom_image
  }
}

fragment ArtworkImageBrowser_artwork on Artwork {
  ...ArtworkActions_artwork
  ...ArtworkImageBrowserSmall_artwork
  ...ArtworkImageBrowserLarge_artwork
  internalID
  images {
    internalID
    isDefault
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
    internalID
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
    shortDescription
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
  partner {
    name
    href
    locations {
      city
      id
    }
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
    id
  }
  saleArtwork {
    endAt
    id
  }
}

fragment ArtworkSidebar_me on Me {
  ...ArtworkSidebarAuctionInfoPolling_me
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
    suggestedConnection(first: 3, excludeFollowedArtists: true) {
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
  sale {
    startAt
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
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v11 = [
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v16 = [
  (v14/*: any*/),
  (v9/*: any*/)
],
v17 = [
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
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v20 = [
  {
    "alias": null,
    "args": (v17/*: any*/),
    "concreteType": "CroppedImageUrl",
    "kind": "LinkedField",
    "name": "cropped",
    "plural": false,
    "selections": [
      (v18/*: any*/),
      (v19/*: any*/)
    ],
    "storageKey": "cropped(height:45,width:45)"
  }
],
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": (v20/*: any*/),
  "storageKey": null
},
v22 = {
  "alias": "formatted_nationality_and_birthday",
  "args": null,
  "kind": "ScalarField",
  "name": "formattedNationalityAndBirthday",
  "storageKey": null
},
v23 = {
  "alias": "partner_shows",
  "args": null,
  "kind": "ScalarField",
  "name": "partnerShows",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "follows",
  "storageKey": null
},
v25 = {
  "kind": "InlineFragment",
  "selections": [
    (v9/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v26 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "YYYY"
  }
],
v27 = {
  "kind": "Literal",
  "name": "width",
  "value": 800
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
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
          "selections": (v16/*: any*/),
          "type": "ExternalPartner",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v14/*: any*/)
          ],
          "type": "Partner",
          "abstractKey": null
        },
        (v25/*: any*/)
      ],
      "storageKey": null
    },
    (v14/*: any*/),
    {
      "alias": "start_at",
      "args": (v26/*: any*/),
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
            (v27/*: any*/)
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v11/*: any*/),
          "storageKey": "cropped(height:600,width:800)"
        }
      ],
      "storageKey": null
    },
    (v28/*: any*/),
    (v9/*: any*/)
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
  (v9/*: any*/)
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
                (v9/*: any*/),
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
            (v9/*: any*/)
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
            (v9/*: any*/),
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
              "args": (v26/*: any*/),
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
      (v10/*: any*/)
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
v46 = [
  (v6/*: any*/)
],
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v48 = [
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
  (v27/*: any*/)
],
v49 = [
  (v40/*: any*/),
  (v41/*: any*/),
  (v18/*: any*/),
  (v19/*: any*/)
],
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v51 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AuctionResultEdge"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v56 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistBlurb"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistCounts"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Show"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v66 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerTypes"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistHighlights"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerArtistConnection"
},
v69 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "PartnerArtistEdge"
},
v70 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v71 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "PartnerCategory"
},
v72 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v73 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistRelatedData"
},
v74 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistConnection"
},
v75 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtistEdge"
},
v76 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMeta"
},
v77 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Profile"
},
v78 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v79 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v80 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v81 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v82 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v83 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v84 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v85 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v86 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "BidderPosition"
},
v87 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v88 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v89 = {
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
              (v1/*: any*/),
              (v9/*: any*/),
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
                "selections": (v11/*: any*/),
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
                  (v9/*: any*/)
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
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": (v16/*: any*/),
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
              (v9/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  (v23/*: any*/),
                  (v24/*: any*/),
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
                "selections": (v20/*: any*/),
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
                              (v9/*: any*/),
                              (v2/*: any*/),
                              (v14/*: any*/),
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
                                    "args": (v17/*: any*/),
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v11/*: any*/),
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
                    "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3)"
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
              (v14/*: any*/),
              (v15/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  (v23/*: any*/),
                  (v24/*: any*/)
                ],
                "storageKey": null
              },
              (v29/*: any*/),
              (v30/*: any*/),
              (v32/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v9/*: any*/),
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
                              (v14/*: any*/),
                              (v1/*: any*/),
                              (v15/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v9/*: any*/),
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
                                  (v24/*: any*/)
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
          (v15/*: any*/),
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
              (v14/*: any*/),
              (v9/*: any*/),
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
                        "selections": (v11/*: any*/),
                        "storageKey": "resized(height:320,version:[\"medium\"],width:320)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "locations",
                "plural": true,
                "selections": [
                  (v28/*: any*/),
                  (v9/*: any*/)
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
                  (v14/*: any*/),
                  (v15/*: any*/),
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
                        "selections": (v11/*: any*/),
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Fair",
                "abstractKey": null
              },
              (v25/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v14/*: any*/),
                  (v15/*: any*/)
                ],
                "type": "Sale",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v14/*: any*/),
                  (v15/*: any*/),
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
                    "selections": (v11/*: any*/),
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
            "alias": "cultural_maker",
            "args": null,
            "kind": "ScalarField",
            "name": "culturalMaker",
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
            "alias": "edition_sets",
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v9/*: any*/),
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
              (v9/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endedAt",
                "storageKey": null
              },
              {
                "alias": "current_bid",
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": (v46/*: any*/),
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
                  (v47/*: any*/),
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
                "name": "shortDescription",
                "storageKey": null
              },
              (v9/*: any*/),
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
                "selections": (v46/*: any*/),
                "storageKey": null
              },
              (v9/*: any*/),
              (v12/*: any*/),
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
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v13/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
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
                  (v9/*: any*/)
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
                      (v47/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
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
                  (v14/*: any*/),
                  (v9/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCertificateOfAuthenticity",
            "storageKey": null
          },
          (v9/*: any*/),
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
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDefault",
                "storageKey": null
              },
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
                "args": (v48/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v49/*: any*/),
                "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v48/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v49/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isZoomable",
                "storageKey": null
              },
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
              }
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
                "args": (v48/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  (v18/*: any*/),
                  (v19/*: any*/),
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
              (v9/*: any*/)
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
                                  (v9/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:1,mode:\"OFFER\",sort:\"UPDATED_AT_DESC\",states:[\"SUBMITTED\"])"
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "17c4b84e8201f33b76e6950ebff47e80",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v50/*: any*/),
        "artwork.__isSellable": (v51/*: any*/),
        "artwork.artist": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.__typename": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.sale_date": (v57/*: any*/),
        "artwork.artist.biographyBlurb": (v59/*: any*/),
        "artwork.artist.biographyBlurb.credit": (v57/*: any*/),
        "artwork.artist.biographyBlurb.partnerID": (v57/*: any*/),
        "artwork.artist.biographyBlurb.text": (v57/*: any*/),
        "artwork.artist.collections": (v60/*: any*/),
        "artwork.artist.counts": (v61/*: any*/),
        "artwork.artist.counts.follows": (v62/*: any*/),
        "artwork.artist.counts.partner_shows": (v62/*: any*/),
        "artwork.artist.exhibition_highlights": (v63/*: any*/),
        "artwork.artist.exhibition_highlights.city": (v57/*: any*/),
        "artwork.artist.exhibition_highlights.cover_image": (v64/*: any*/),
        "artwork.artist.exhibition_highlights.cover_image.cropped": (v65/*: any*/),
        "artwork.artist.exhibition_highlights.cover_image.cropped.url": (v51/*: any*/),
        "artwork.artist.exhibition_highlights.id": (v56/*: any*/),
        "artwork.artist.exhibition_highlights.name": (v57/*: any*/),
        "artwork.artist.exhibition_highlights.partner": (v66/*: any*/),
        "artwork.artist.exhibition_highlights.partner.__isNode": (v51/*: any*/),
        "artwork.artist.exhibition_highlights.partner.__typename": (v51/*: any*/),
        "artwork.artist.exhibition_highlights.partner.id": (v56/*: any*/),
        "artwork.artist.exhibition_highlights.partner.name": (v57/*: any*/),
        "artwork.artist.exhibition_highlights.start_at": (v57/*: any*/),
        "artwork.artist.formatted_nationality_and_birthday": (v57/*: any*/),
        "artwork.artist.highlights": (v67/*: any*/),
        "artwork.artist.highlights.partnersConnection": (v68/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges": (v69/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.id": (v56/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node": (v70/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.__typename": (v51/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.categories": (v71/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.categories.id": (v56/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.categories.slug": (v56/*: any*/),
        "artwork.artist.highlights.partnersConnection.edges.node.id": (v56/*: any*/),
        "artwork.artist.href": (v57/*: any*/),
        "artwork.artist.id": (v56/*: any*/),
        "artwork.artist.image": (v64/*: any*/),
        "artwork.artist.image.cropped": (v65/*: any*/),
        "artwork.artist.image.cropped.src": (v51/*: any*/),
        "artwork.artist.image.cropped.srcSet": (v51/*: any*/),
        "artwork.artist.internalID": (v56/*: any*/),
        "artwork.artist.is_followed": (v72/*: any*/),
        "artwork.artist.name": (v57/*: any*/),
        "artwork.artist.related": (v73/*: any*/),
        "artwork.artist.related.artistsConnection": (v74/*: any*/),
        "artwork.artist.related.artistsConnection.edges": (v75/*: any*/),
        "artwork.artist.related.artistsConnection.edges.cursor": (v51/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node": (v52/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.__typename": (v51/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.counts": (v61/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.counts.follows": (v62/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.formatted_nationality_and_birthday": (v57/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.href": (v57/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.id": (v56/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image": (v64/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image.cropped": (v65/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image.cropped.src": (v51/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.image.cropped.srcSet": (v51/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.internalID": (v56/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.is_followed": (v72/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.name": (v57/*: any*/),
        "artwork.artist.related.artistsConnection.edges.node.slug": (v56/*: any*/),
        "artwork.artist.related.artistsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.related.artistsConnection.pageInfo.endCursor": (v57/*: any*/),
        "artwork.artist.related.artistsConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.artist.slug": (v56/*: any*/),
        "artwork.artistNames": (v57/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.auctionResultsConnection": (v53/*: any*/),
        "artwork.artists.auctionResultsConnection.edges": (v54/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node": (v55/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.__typename": (v51/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.id": (v56/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.organization": (v57/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.price_realized": (v58/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.price_realized.display": (v57/*: any*/),
        "artwork.artists.auctionResultsConnection.edges.node.sale_date": (v57/*: any*/),
        "artwork.artists.avatar": (v64/*: any*/),
        "artwork.artists.avatar.cropped": (v65/*: any*/),
        "artwork.artists.avatar.cropped.src": (v51/*: any*/),
        "artwork.artists.avatar.cropped.srcSet": (v51/*: any*/),
        "artwork.artists.biographyBlurb": (v59/*: any*/),
        "artwork.artists.biographyBlurb.credit": (v57/*: any*/),
        "artwork.artists.biographyBlurb.partnerID": (v57/*: any*/),
        "artwork.artists.biographyBlurb.text": (v57/*: any*/),
        "artwork.artists.collections": (v60/*: any*/),
        "artwork.artists.counts": (v61/*: any*/),
        "artwork.artists.counts.artworks": (v62/*: any*/),
        "artwork.artists.counts.follows": (v62/*: any*/),
        "artwork.artists.counts.forSaleArtworks": (v62/*: any*/),
        "artwork.artists.counts.partner_shows": (v62/*: any*/),
        "artwork.artists.exhibition_highlights": (v63/*: any*/),
        "artwork.artists.exhibition_highlights.city": (v57/*: any*/),
        "artwork.artists.exhibition_highlights.cover_image": (v64/*: any*/),
        "artwork.artists.exhibition_highlights.cover_image.cropped": (v65/*: any*/),
        "artwork.artists.exhibition_highlights.cover_image.cropped.url": (v51/*: any*/),
        "artwork.artists.exhibition_highlights.id": (v56/*: any*/),
        "artwork.artists.exhibition_highlights.name": (v57/*: any*/),
        "artwork.artists.exhibition_highlights.partner": (v66/*: any*/),
        "artwork.artists.exhibition_highlights.partner.__isNode": (v51/*: any*/),
        "artwork.artists.exhibition_highlights.partner.__typename": (v51/*: any*/),
        "artwork.artists.exhibition_highlights.partner.id": (v56/*: any*/),
        "artwork.artists.exhibition_highlights.partner.name": (v57/*: any*/),
        "artwork.artists.exhibition_highlights.start_at": (v57/*: any*/),
        "artwork.artists.formattedNationalityAndBirthday": (v57/*: any*/),
        "artwork.artists.formatted_nationality_and_birthday": (v57/*: any*/),
        "artwork.artists.highlights": (v67/*: any*/),
        "artwork.artists.highlights.partnersConnection": (v68/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges": (v69/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.id": (v56/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node": (v70/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.__typename": (v51/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.categories": (v71/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.categories.id": (v56/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.categories.slug": (v56/*: any*/),
        "artwork.artists.highlights.partnersConnection.edges.node.id": (v56/*: any*/),
        "artwork.artists.href": (v57/*: any*/),
        "artwork.artists.id": (v56/*: any*/),
        "artwork.artists.image": (v64/*: any*/),
        "artwork.artists.image.cropped": (v65/*: any*/),
        "artwork.artists.image.cropped.src": (v51/*: any*/),
        "artwork.artists.image.cropped.srcSet": (v51/*: any*/),
        "artwork.artists.initials": (v57/*: any*/),
        "artwork.artists.internalID": (v56/*: any*/),
        "artwork.artists.is_consignable": (v72/*: any*/),
        "artwork.artists.is_followed": (v72/*: any*/),
        "artwork.artists.name": (v57/*: any*/),
        "artwork.artists.related": (v73/*: any*/),
        "artwork.artists.related.suggestedConnection": (v74/*: any*/),
        "artwork.artists.related.suggestedConnection.edges": (v75/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node": (v52/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.formattedNationalityAndBirthday": (v57/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.id": (v56/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image": (v64/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image.cropped": (v65/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.image.cropped.url": (v51/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.internalID": (v56/*: any*/),
        "artwork.artists.related.suggestedConnection.edges.node.name": (v57/*: any*/),
        "artwork.artists.slug": (v56/*: any*/),
        "artwork.artworkMeta": (v76/*: any*/),
        "artwork.artworkMeta.share": (v57/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v56/*: any*/),
        "artwork.attributionClass.internalID": (v56/*: any*/),
        "artwork.attributionClass.shortDescription": (v57/*: any*/),
        "artwork.availability": (v57/*: any*/),
        "artwork.category": (v57/*: any*/),
        "artwork.context": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkContext"
        },
        "artwork.context.__isNode": (v51/*: any*/),
        "artwork.context.__typename": (v51/*: any*/),
        "artwork.context.href": (v57/*: any*/),
        "artwork.context.id": (v56/*: any*/),
        "artwork.context.name": (v57/*: any*/),
        "artwork.context.profile": (v77/*: any*/),
        "artwork.context.profile.icon": (v64/*: any*/),
        "artwork.context.profile.icon.url": (v57/*: any*/),
        "artwork.context.profile.id": (v56/*: any*/),
        "artwork.context.slug": (v56/*: any*/),
        "artwork.context.status": (v57/*: any*/),
        "artwork.context.thumbnail": (v64/*: any*/),
        "artwork.context.thumbnail.url": (v57/*: any*/),
        "artwork.cultural_maker": (v57/*: any*/),
        "artwork.date": (v57/*: any*/),
        "artwork.dimensions": (v78/*: any*/),
        "artwork.dimensions.cm": (v57/*: any*/),
        "artwork.dimensions.in": (v57/*: any*/),
        "artwork.downloadableImageUrl": (v57/*: any*/),
        "artwork.edition_of": (v57/*: any*/),
        "artwork.edition_sets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.edition_sets.__isSellable": (v51/*: any*/),
        "artwork.edition_sets.__typename": (v51/*: any*/),
        "artwork.edition_sets.dimensions": (v78/*: any*/),
        "artwork.edition_sets.dimensions.cm": (v57/*: any*/),
        "artwork.edition_sets.dimensions.in": (v57/*: any*/),
        "artwork.edition_sets.edition_of": (v57/*: any*/),
        "artwork.edition_sets.id": (v56/*: any*/),
        "artwork.edition_sets.internalID": (v56/*: any*/),
        "artwork.edition_sets.is_acquireable": (v72/*: any*/),
        "artwork.edition_sets.is_offerable": (v72/*: any*/),
        "artwork.edition_sets.sale_message": (v57/*: any*/),
        "artwork.formattedMetadata": (v57/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v72/*: any*/),
        "artwork.heightCm": (v79/*: any*/),
        "artwork.href": (v57/*: any*/),
        "artwork.id": (v56/*: any*/),
        "artwork.image": (v64/*: any*/),
        "artwork.image.height": (v80/*: any*/),
        "artwork.image.internalID": (v81/*: any*/),
        "artwork.image.resized": (v82/*: any*/),
        "artwork.image.resized.height": (v80/*: any*/),
        "artwork.image.resized.src": (v51/*: any*/),
        "artwork.image.resized.srcSet": (v51/*: any*/),
        "artwork.image.resized.width": (v80/*: any*/),
        "artwork.image.url": (v57/*: any*/),
        "artwork.image.width": (v80/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.deepZoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoom"
        },
        "artwork.images.deepZoom.Image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImage"
        },
        "artwork.images.deepZoom.Image.Format": (v57/*: any*/),
        "artwork.images.deepZoom.Image.Overlap": (v80/*: any*/),
        "artwork.images.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.images.deepZoom.Image.Size.Height": (v80/*: any*/),
        "artwork.images.deepZoom.Image.Size.Width": (v80/*: any*/),
        "artwork.images.deepZoom.Image.TileSize": (v80/*: any*/),
        "artwork.images.deepZoom.Image.Url": (v57/*: any*/),
        "artwork.images.deepZoom.Image.xmlns": (v57/*: any*/),
        "artwork.images.fallback": (v65/*: any*/),
        "artwork.images.fallback.height": (v83/*: any*/),
        "artwork.images.fallback.src": (v51/*: any*/),
        "artwork.images.fallback.srcSet": (v51/*: any*/),
        "artwork.images.fallback.width": (v83/*: any*/),
        "artwork.images.internalID": (v81/*: any*/),
        "artwork.images.isDefault": (v72/*: any*/),
        "artwork.images.isZoomable": (v72/*: any*/),
        "artwork.images.placeholder": (v57/*: any*/),
        "artwork.images.resized": (v82/*: any*/),
        "artwork.images.resized.height": (v80/*: any*/),
        "artwork.images.resized.src": (v51/*: any*/),
        "artwork.images.resized.srcSet": (v51/*: any*/),
        "artwork.images.resized.width": (v80/*: any*/),
        "artwork.images.url": (v57/*: any*/),
        "artwork.internalID": (v56/*: any*/),
        "artwork.isAcquireable": (v72/*: any*/),
        "artwork.isInAuction": (v72/*: any*/),
        "artwork.isInquireable": (v72/*: any*/),
        "artwork.isOfferable": (v72/*: any*/),
        "artwork.isOfferableFromInquiry": (v72/*: any*/),
        "artwork.isPriceHidden": (v72/*: any*/),
        "artwork.isShareable": (v72/*: any*/),
        "artwork.is_acquireable": (v72/*: any*/),
        "artwork.is_biddable": (v72/*: any*/),
        "artwork.is_downloadable": (v72/*: any*/),
        "artwork.is_for_sale": (v72/*: any*/),
        "artwork.is_hangable": (v72/*: any*/),
        "artwork.is_in_auction": (v72/*: any*/),
        "artwork.is_inquireable": (v72/*: any*/),
        "artwork.is_offerable": (v72/*: any*/),
        "artwork.is_price_hidden": (v72/*: any*/),
        "artwork.is_price_range": (v72/*: any*/),
        "artwork.is_saved": (v72/*: any*/),
        "artwork.is_sold": (v72/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": (v51/*: any*/),
        "artwork.listPrice.currencyCode": (v51/*: any*/),
        "artwork.listPrice.display": (v57/*: any*/),
        "artwork.listPrice.major": (v84/*: any*/),
        "artwork.listPrice.maxPrice": (v85/*: any*/),
        "artwork.listPrice.maxPrice.currencyCode": (v51/*: any*/),
        "artwork.listPrice.maxPrice.major": (v84/*: any*/),
        "artwork.listPrice.minPrice": (v85/*: any*/),
        "artwork.listPrice.minPrice.currencyCode": (v51/*: any*/),
        "artwork.listPrice.minPrice.major": (v84/*: any*/),
        "artwork.medium": (v57/*: any*/),
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
        "artwork.mediumType.filterGene.id": (v56/*: any*/),
        "artwork.mediumType.filterGene.name": (v57/*: any*/),
        "artwork.mediumType.filterGene.slug": (v56/*: any*/),
        "artwork.meta": (v76/*: any*/),
        "artwork.meta.description": (v57/*: any*/),
        "artwork.meta.longDescription": (v57/*: any*/),
        "artwork.meta.title": (v57/*: any*/),
        "artwork.metaImage": (v64/*: any*/),
        "artwork.metaImage.resized": (v82/*: any*/),
        "artwork.metaImage.resized.height": (v80/*: any*/),
        "artwork.metaImage.resized.url": (v51/*: any*/),
        "artwork.metaImage.resized.width": (v80/*: any*/),
        "artwork.meta_image": (v64/*: any*/),
        "artwork.meta_image.resized": (v82/*: any*/),
        "artwork.meta_image.resized.height": (v80/*: any*/),
        "artwork.meta_image.resized.url": (v51/*: any*/),
        "artwork.meta_image.resized.width": (v80/*: any*/),
        "artwork.myLotStanding": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "artwork.myLotStanding.active_bid": (v86/*: any*/),
        "artwork.myLotStanding.active_bid.id": (v56/*: any*/),
        "artwork.myLotStanding.active_bid.is_winning": (v72/*: any*/),
        "artwork.myLotStanding.most_recent_bid": (v86/*: any*/),
        "artwork.myLotStanding.most_recent_bid.id": (v56/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPositionMaxBid"
        },
        "artwork.myLotStanding.most_recent_bid.max_bid.cents": (v79/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid.display": (v57/*: any*/),
        "artwork.partner": (v70/*: any*/),
        "artwork.partner.href": (v57/*: any*/),
        "artwork.partner.id": (v56/*: any*/),
        "artwork.partner.isVerifiedSeller": (v72/*: any*/),
        "artwork.partner.locations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Location"
        },
        "artwork.partner.locations.city": (v57/*: any*/),
        "artwork.partner.locations.id": (v56/*: any*/),
        "artwork.partner.name": (v57/*: any*/),
        "artwork.partner.profile": (v77/*: any*/),
        "artwork.partner.profile.id": (v56/*: any*/),
        "artwork.partner.profile.image": (v64/*: any*/),
        "artwork.partner.profile.image.resized": (v82/*: any*/),
        "artwork.partner.profile.image.resized.url": (v51/*: any*/),
        "artwork.partner.slug": (v56/*: any*/),
        "artwork.partner.type": (v57/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v57/*: any*/),
        "artwork.sale": (v87/*: any*/),
        "artwork.sale.cascadingEndTimeIntervalMinutes": (v80/*: any*/),
        "artwork.sale.coverImage": (v64/*: any*/),
        "artwork.sale.coverImage.url": (v57/*: any*/),
        "artwork.sale.endAt": (v57/*: any*/),
        "artwork.sale.href": (v57/*: any*/),
        "artwork.sale.id": (v56/*: any*/),
        "artwork.sale.internalID": (v56/*: any*/),
        "artwork.sale.isAuction": (v72/*: any*/),
        "artwork.sale.isBenefit": (v72/*: any*/),
        "artwork.sale.isClosed": (v72/*: any*/),
        "artwork.sale.isGalleryAuction": (v72/*: any*/),
        "artwork.sale.is_auction": (v72/*: any*/),
        "artwork.sale.is_closed": (v72/*: any*/),
        "artwork.sale.is_live_open": (v72/*: any*/),
        "artwork.sale.is_open": (v72/*: any*/),
        "artwork.sale.is_preview": (v72/*: any*/),
        "artwork.sale.is_registration_closed": (v72/*: any*/),
        "artwork.sale.is_with_buyers_premium": (v72/*: any*/),
        "artwork.sale.liveStartAt": (v57/*: any*/),
        "artwork.sale.name": (v57/*: any*/),
        "artwork.sale.partner": (v70/*: any*/),
        "artwork.sale.partner.id": (v56/*: any*/),
        "artwork.sale.partner.name": (v57/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v56/*: any*/),
        "artwork.sale.registrationStatus.qualified_for_bidding": (v72/*: any*/),
        "artwork.sale.requireIdentityVerification": (v72/*: any*/),
        "artwork.sale.slug": (v56/*: any*/),
        "artwork.sale.startAt": (v57/*: any*/),
        "artwork.saleArtwork": (v88/*: any*/),
        "artwork.saleArtwork.currentBid": (v89/*: any*/),
        "artwork.saleArtwork.currentBid.display": (v57/*: any*/),
        "artwork.saleArtwork.endAt": (v57/*: any*/),
        "artwork.saleArtwork.formattedStartDateTime": (v57/*: any*/),
        "artwork.saleArtwork.id": (v56/*: any*/),
        "artwork.saleArtwork.sale": (v87/*: any*/),
        "artwork.saleArtwork.sale.id": (v56/*: any*/),
        "artwork.saleArtwork.sale.startAt": (v57/*: any*/),
        "artwork.sale_artwork": (v88/*: any*/),
        "artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.sale_artwork.counts.bidder_positions": (v62/*: any*/),
        "artwork.sale_artwork.current_bid": (v89/*: any*/),
        "artwork.sale_artwork.current_bid.display": (v57/*: any*/),
        "artwork.sale_artwork.endedAt": (v57/*: any*/),
        "artwork.sale_artwork.estimate": (v57/*: any*/),
        "artwork.sale_artwork.id": (v56/*: any*/),
        "artwork.sale_artwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.sale_artwork.increments.cents": (v79/*: any*/),
        "artwork.sale_artwork.increments.display": (v57/*: any*/),
        "artwork.sale_artwork.is_with_reserve": (v72/*: any*/),
        "artwork.sale_artwork.lot_label": (v57/*: any*/),
        "artwork.sale_artwork.reserve_message": (v57/*: any*/),
        "artwork.sale_artwork.reserve_status": (v57/*: any*/),
        "artwork.sale_message": (v57/*: any*/),
        "artwork.shippingInfo": (v57/*: any*/),
        "artwork.shippingOrigin": (v57/*: any*/),
        "artwork.slug": (v56/*: any*/),
        "artwork.title": (v57/*: any*/),
        "artwork.widthCm": (v79/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v56/*: any*/),
        "me.identityVerified": (v72/*: any*/),
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
        "me.orders.edges.node.__typename": (v51/*: any*/),
        "me.orders.edges.node.id": (v56/*: any*/),
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
        "me.orders.edges.node.lineItems.edges.node.artwork": (v50/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.id": (v56/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.slug": (v56/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.id": (v56/*: any*/),
        "me.orders.edges.node.stateExpiresAt": (v57/*: any*/),
        "me.pendingIdentityVerification": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "IdentityVerification"
        },
        "me.pendingIdentityVerification.id": (v56/*: any*/),
        "me.pendingIdentityVerification.internalID": (v56/*: any*/)
      }
    },
    "name": "ArtworkApp_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkApp_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtworkApp_artwork\n    id\n  }\n  me {\n    ...ArtworkApp_me\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n\nfragment ArtistCard_artist on Artist {\n  name\n  slug\n  href\n  image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  formatted_nationality_and_birthday: formattedNationalityAndBirthday\n  ...FollowArtistButton_artist\n}\n\nfragment ArtistInfo_artist on Artist {\n  internalID\n  slug\n  name\n  href\n  image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  formatted_nationality_and_birthday: formattedNationalityAndBirthday\n  counts {\n    partner_shows: partnerShows\n  }\n  exhibition_highlights: exhibitionHighlights(size: 3) {\n    ...SelectedExhibitions_exhibitions\n    id\n  }\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          __typename\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        __typename\n        id\n      }\n    }\n  }\n  ...ArtistBio_bio\n  ...ArtistMarketInsights_artist\n  ...FollowArtistButton_artist\n  biographyBlurb(format: HTML, partnerBio: false) {\n    text\n  }\n}\n\nfragment ArtistMarketInsights_artist on Artist {\n  collections\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  internalID\n  id\n  slug\n  title\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkSharePanel_artwork\n  ...ViewInRoom_artwork\n  artists {\n    name\n    id\n  }\n  date\n  dimensions {\n    cm\n  }\n  slug\n  image {\n    internalID\n    url(version: \"larger\")\n    height\n    width\n  }\n  downloadableImageUrl\n  is_downloadable: isDownloadable\n  is_hangable: isHangable\n  partner {\n    slug\n    id\n  }\n  title\n  sale {\n    is_closed: isClosed\n    is_auction: isAuction\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkApp_artwork on Artwork {\n  slug\n  internalID\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  availability\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  is_in_auction: isInAuction\n  sale {\n    internalID\n    cascadingEndTimeIntervalMinutes\n    slug\n    id\n  }\n  artists {\n    id\n    slug\n    ...ArtistInfo_artist\n  }\n  artist {\n    ...ArtistInfo_artist\n    id\n  }\n  ...ArtworkRelatedArtists_artwork\n  ...ArtworkMeta_artwork\n  ...ArtworkBanner_artwork\n  ...ArtworkSidebar_artwork\n  ...ArtworkImageBrowser_artwork\n}\n\nfragment ArtworkApp_me on Me {\n  ...ArtworkSidebar_me\n  ...SubmittedOrderModal_me\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale {\n    isAuction\n    isBenefit\n    isGalleryAuction\n    coverImage {\n      url\n    }\n    id\n  }\n  context {\n    __typename\n    ... on Sale {\n      name\n      href\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        icon {\n          url\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        url\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  images {\n    internalID\n    isZoomable\n    ...DeepZoom_image\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  images {\n    internalID\n    isZoomable\n    ...DeepZoom_image\n  }\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkActions_artwork\n  ...ArtworkImageBrowserSmall_artwork\n  ...ArtworkImageBrowserLarge_artwork\n  internalID\n  images {\n    internalID\n    isDefault\n  }\n}\n\nfragment ArtworkLightbox_artwork on Artwork {\n  formattedMetadata\n  images {\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtworkMeta_artwork on Artwork {\n  href\n  internalID\n  date\n  artistNames\n  sale_message: saleMessage\n  listPrice {\n    __typename\n    ... on Money {\n      currencyCode\n      major\n    }\n    ... on PriceRange {\n      maxPrice {\n        currencyCode\n        major\n      }\n    }\n  }\n  partner {\n    name\n    id\n  }\n  isInAuction\n  isAcquireable\n  isInquireable\n  isOfferable\n  isShareable\n  metaImage: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n    longDescription: description(limit: 200)\n  }\n  context {\n    __typename\n    ... on Fair {\n      slug\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...SeoDataForArtwork_artwork\n}\n\nfragment ArtworkRelatedArtists_artwork on Artwork {\n  slug\n  artist {\n    href\n    related {\n      artistsConnection(kind: MAIN, first: 4, after: \"\") {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            ...ArtistCard_artist\n            id\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  cultural_maker: culturalMaker\n  artists {\n    ...EntityHeaderArtist_artist\n    internalID\n    slug\n    name\n    ...FollowArtistButton_artist_2eN9lh\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {\n  internalID\n  sale {\n    isClosed\n    internalID\n    id\n  }\n  saleArtwork {\n    currentBid {\n      display\n    }\n    id\n  }\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_me on Me {\n  ...ArtworkSidebarBidAction_me\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionTimer_artwork on Artwork {\n  internalID\n  sale {\n    cascadingEndTimeIntervalMinutes\n    isClosed\n    ...AuctionTimer_sale\n    startAt\n    id\n  }\n  saleArtwork {\n    ...LotTimer_saleArtwork\n    endAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    endedAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_me on Me {\n  identityVerified\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  edition_sets: editionSets {\n    internalID\n    id\n    is_acquireable: isAcquireable\n    is_offerable: isOfferable\n    sale_message: saleMessage\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  internalID\n  isOfferableFromInquiry\n  isPriceHidden\n  is_acquireable: isAcquireable\n  is_for_sale: isForSale\n  is_inquireable: isInquireable\n  is_offerable: isOfferable\n  is_sold: isSold\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  priceIncludesTaxDisplay\n  sale_message: saleMessage\n  shippingInfo\n  shippingOrigin\n  slug\n  ...ArtworkSidebarCreateAlertButton_artwork\n}\n\nfragment ArtworkSidebarCreateAlertButton_artwork on Artwork {\n  slug\n  internalID\n  title\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    endedAt\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  internalID\n  is_in_auction: isInAuction\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  artists {\n    is_consignable: isConsignable\n    id\n  }\n  sale {\n    is_closed: isClosed\n    isBenefit\n    partner {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable: isBiddable\n  edition_sets: editionSets {\n    __typename\n    id\n  }\n  sale_artwork: saleArtwork {\n    lot_label: lotLabel\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    href\n    locations {\n      city\n      id\n    }\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  edition_of: editionOf\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_in_auction: isInAuction\n  is_sold: isSold\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarAuctionInfoPolling_artwork\n  ...ArtworkSidebarAuctionTimer_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  ...SecurePayment_artwork\n  ...VerifiedSeller_artwork\n  ...AuthenticityCertificate_artwork\n  ...BuyerGuarantee_artwork\n  ...CreateArtworkAlertSection_artwork\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n  sale {\n    is_closed: isClosed\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    id\n  }\n}\n\nfragment ArtworkSidebar_me on Me {\n  ...ArtworkSidebarAuctionInfoPolling_me\n}\n\nfragment AuctionTimer_sale on Sale {\n  liveStartAt\n  endAt\n}\n\nfragment AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  is_biddable: isBiddable\n}\n\nfragment BuyerGuarantee_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment CreateArtworkAlertSection_artwork on Artwork {\n  internalID\n  title\n  slug\n  artists {\n    internalID\n    name\n    slug\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment FollowArtistButton_artist_2eN9lh on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n  ...FollowArtistPopover_artist\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n\nfragment FollowArtistPopover_artist on Artist {\n  related {\n    suggestedConnection(first: 3, excludeFollowedArtists: true) {\n      edges {\n        node {\n          id\n          internalID\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n  formattedStartDateTime\n  sale {\n    startAt\n    id\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n\nfragment SelectedExhibitions_exhibitions on Show {\n  partner {\n    __typename\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  name\n  start_at: startAt(format: \"YYYY\")\n  cover_image: coverImage {\n    cropped(width: 800, height: 600) {\n      url\n    }\n  }\n  city\n}\n\nfragment SeoDataForArtwork_artwork on Artwork {\n  href\n  date\n  is_price_hidden: isPriceHidden\n  is_price_range: isPriceRange\n  listPrice {\n    __typename\n    ... on PriceRange {\n      minPrice {\n        major\n        currencyCode\n      }\n      maxPrice {\n        major\n      }\n    }\n    ... on Money {\n      major\n      currencyCode\n    }\n  }\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n  }\n  partner {\n    name\n    type\n    profile {\n      image {\n        resized(width: 320, height: 320, version: [\"medium\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n  artistNames\n  availability\n  category\n  dimensions {\n    in\n  }\n}\n\nfragment SubmittedOrderModal_me on Me {\n  orders(states: [SUBMITTED], mode: OFFER, first: 1, sort: UPDATED_AT_DESC) {\n    edges {\n      node {\n        __typename\n        stateExpiresAt(format: \"MMM D\")\n        lineItems {\n          edges {\n            node {\n              artwork {\n                slug\n                id\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();
(node as any).hash = '604252fa71edf8caf8655f5478bd42ed';
export default node;
