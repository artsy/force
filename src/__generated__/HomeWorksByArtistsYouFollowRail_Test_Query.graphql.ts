/**
 * @generated SignedSource<<295bc76f71f77cd5e9b6f73c47eeea06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeWorksByArtistsYouFollowRail_Test_Query$variables = Record<PropertyKey, never>;
export type HomeWorksByArtistsYouFollowRail_Test_Query$data = {
  readonly homePage: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeWorksByArtistsYouFollowRail_homePage">;
  } | null | undefined;
};
export type HomeWorksByArtistsYouFollowRail_Test_Query = {
  response: HomeWorksByArtistsYouFollowRail_Test_Query$data;
  variables: HomeWorksByArtistsYouFollowRail_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v7 = [
  (v5/*: any*/),
  (v2/*: any*/)
],
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeWorksByArtistsYouFollowRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeWorksByArtistsYouFollowRail_homePage"
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
    "name": "HomeWorksByArtistsYouFollowRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "key",
                "value": "FOLLOWED_ARTISTS"
              }
            ],
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModule",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "results",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CollectorSignals",
                    "kind": "LinkedField",
                    "name": "collectorSignals",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "primaryLabel",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionCollectorSignals",
                        "kind": "LinkedField",
                        "name": "auction",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bidCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotWatcherCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotClosesAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "liveBiddingStarted",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "registrationEndsAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "onlineBiddingExtended",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PartnerOfferToCollector",
                        "kind": "LinkedField",
                        "name": "partnerOffer",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "priceWithDiscount",
                            "plural": false,
                            "selections": (v1/*: any*/),
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
                    "name": "isUnlisted",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "date",
                    "storageKey": null
                  },
                  {
                    "alias": "sale_message",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "saleMessage",
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
                    "alias": null,
                    "args": (v4/*: any*/),
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistTargetSupply",
                        "kind": "LinkedField",
                        "name": "targetSupply",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isP1",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": "artist(shallow:true)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtworkPriceInsights",
                    "kind": "LinkedField",
                    "name": "marketPriceInsights",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "demandRank",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artists",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": "artists(shallow:true)"
                  },
                  {
                    "alias": "collecting_institution",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "collectingInstitution",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": "partner(shallow:true)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cascadingEndTimeIntervalMinutes",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "extendedBiddingIntervalMinutes",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startAt",
                        "storageKey": null
                      },
                      {
                        "alias": "is_auction",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isAuction",
                        "storageKey": null
                      },
                      {
                        "alias": "is_closed",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isClosed",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isOpen",
                        "storageKey": null
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lotLabel",
                        "storageKey": null
                      },
                      (v0/*: any*/),
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
                        "name": "formattedEndDateTime",
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
                        "alias": "highest_bid",
                        "args": null,
                        "concreteType": "SaleArtworkHighestBid",
                        "kind": "LinkedField",
                        "name": "highestBid",
                        "plural": false,
                        "selections": (v1/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": "opening_bid",
                        "args": null,
                        "concreteType": "SaleArtworkOpeningBid",
                        "kind": "LinkedField",
                        "name": "openingBid",
                        "plural": false,
                        "selections": (v1/*: any*/),
                        "storageKey": null
                      },
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
                      (v6/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AttributionClass",
                    "kind": "LinkedField",
                    "name": "attributionClass",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
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
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "artistNames",
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
                        "alias": "src",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "larger",
                              "large"
                            ]
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:[\"larger\",\"large\"])"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "height",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "blurhashDataURL",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "artworkModule(key:\"FOLLOWED_ARTISTS\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e97d35c89ad94ba214a115bf2d26e107",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "homePage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HomePage"
        },
        "homePage.artworkModule": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HomePageArtworkModule"
        },
        "homePage.artworkModule.id": (v8/*: any*/),
        "homePage.artworkModule.results": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artwork"
        },
        "homePage.artworkModule.results.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "homePage.artworkModule.results.artist.id": (v8/*: any*/),
        "homePage.artworkModule.results.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "homePage.artworkModule.results.artist.targetSupply.isP1": (v9/*: any*/),
        "homePage.artworkModule.results.artistNames": (v10/*: any*/),
        "homePage.artworkModule.results.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "homePage.artworkModule.results.artists.href": (v10/*: any*/),
        "homePage.artworkModule.results.artists.id": (v8/*: any*/),
        "homePage.artworkModule.results.artists.name": (v10/*: any*/),
        "homePage.artworkModule.results.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "homePage.artworkModule.results.attributionClass.id": (v8/*: any*/),
        "homePage.artworkModule.results.attributionClass.name": (v10/*: any*/),
        "homePage.artworkModule.results.collecting_institution": (v10/*: any*/),
        "homePage.artworkModule.results.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "homePage.artworkModule.results.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "homePage.artworkModule.results.collectorSignals.auction.bidCount": (v11/*: any*/),
        "homePage.artworkModule.results.collectorSignals.auction.liveBiddingStarted": (v12/*: any*/),
        "homePage.artworkModule.results.collectorSignals.auction.lotClosesAt": (v10/*: any*/),
        "homePage.artworkModule.results.collectorSignals.auction.lotWatcherCount": (v11/*: any*/),
        "homePage.artworkModule.results.collectorSignals.auction.onlineBiddingExtended": (v12/*: any*/),
        "homePage.artworkModule.results.collectorSignals.auction.registrationEndsAt": (v10/*: any*/),
        "homePage.artworkModule.results.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "homePage.artworkModule.results.collectorSignals.partnerOffer.endAt": (v10/*: any*/),
        "homePage.artworkModule.results.collectorSignals.partnerOffer.id": (v8/*: any*/),
        "homePage.artworkModule.results.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "homePage.artworkModule.results.collectorSignals.partnerOffer.priceWithDiscount.display": (v10/*: any*/),
        "homePage.artworkModule.results.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "homePage.artworkModule.results.cultural_maker": (v10/*: any*/),
        "homePage.artworkModule.results.date": (v10/*: any*/),
        "homePage.artworkModule.results.href": (v10/*: any*/),
        "homePage.artworkModule.results.id": (v8/*: any*/),
        "homePage.artworkModule.results.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "homePage.artworkModule.results.image.blurhashDataURL": (v10/*: any*/),
        "homePage.artworkModule.results.image.height": (v13/*: any*/),
        "homePage.artworkModule.results.image.src": (v10/*: any*/),
        "homePage.artworkModule.results.image.width": (v13/*: any*/),
        "homePage.artworkModule.results.internalID": (v8/*: any*/),
        "homePage.artworkModule.results.isUnlisted": (v12/*: any*/),
        "homePage.artworkModule.results.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "homePage.artworkModule.results.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "homePage.artworkModule.results.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "homePage.artworkModule.results.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "homePage.artworkModule.results.mediumType.filterGene.id": (v8/*: any*/),
        "homePage.artworkModule.results.mediumType.filterGene.name": (v10/*: any*/),
        "homePage.artworkModule.results.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "homePage.artworkModule.results.partner.href": (v10/*: any*/),
        "homePage.artworkModule.results.partner.id": (v8/*: any*/),
        "homePage.artworkModule.results.partner.name": (v10/*: any*/),
        "homePage.artworkModule.results.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "homePage.artworkModule.results.sale.cascadingEndTimeIntervalMinutes": (v13/*: any*/),
        "homePage.artworkModule.results.sale.endAt": (v10/*: any*/),
        "homePage.artworkModule.results.sale.extendedBiddingIntervalMinutes": (v13/*: any*/),
        "homePage.artworkModule.results.sale.id": (v8/*: any*/),
        "homePage.artworkModule.results.sale.isOpen": (v9/*: any*/),
        "homePage.artworkModule.results.sale.is_auction": (v9/*: any*/),
        "homePage.artworkModule.results.sale.is_closed": (v9/*: any*/),
        "homePage.artworkModule.results.sale.startAt": (v10/*: any*/),
        "homePage.artworkModule.results.saleArtwork": (v14/*: any*/),
        "homePage.artworkModule.results.saleArtwork.id": (v8/*: any*/),
        "homePage.artworkModule.results.saleArtwork.lotID": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork": (v14/*: any*/),
        "homePage.artworkModule.results.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "homePage.artworkModule.results.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "homePage.artworkModule.results.sale_artwork.endAt": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork.extendedBiddingEndAt": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork.formattedEndDateTime": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "homePage.artworkModule.results.sale_artwork.highest_bid.display": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork.id": (v8/*: any*/),
        "homePage.artworkModule.results.sale_artwork.lotID": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork.lotLabel": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "homePage.artworkModule.results.sale_artwork.opening_bid.display": (v10/*: any*/),
        "homePage.artworkModule.results.sale_message": (v10/*: any*/),
        "homePage.artworkModule.results.slug": (v8/*: any*/),
        "homePage.artworkModule.results.title": (v10/*: any*/)
      }
    },
    "name": "HomeWorksByArtistsYouFollowRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeWorksByArtistsYouFollowRail_Test_Query {\n  homePage {\n    ...HomeWorksByArtistsYouFollowRail_homePage\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...LegacyPrimaryLabelLine_artwork\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HomeWorksByArtistsYouFollowRail_homePage on HomePage {\n  artworkModule(key: FOLLOWED_ARTISTS) {\n    results {\n      internalID\n      slug\n      collectorSignals {\n        primaryLabel\n        auction {\n          bidCount\n          lotWatcherCount\n        }\n      }\n      ...ShelfArtwork_artwork\n      id\n    }\n    id\n  }\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment LegacyPrimaryLabelLine_artwork on Artwork {\n  collectorSignals {\n    primaryLabel\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n"
  }
};
})();

(node as any).hash = "cb902ac8ff13f607179605fce299e166";

export default node;
