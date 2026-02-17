/**
 * @generated SignedSource<<12c923a1a9aa1549c8fa9efdb92143c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistHeader_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistHeader_artist">;
  } | null | undefined;
};
export type ArtistHeader_Test_Query = {
  response: ArtistHeader_Test_Query$data;
  variables: ArtistHeader_Test_Query$variables;
};

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
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v3/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistHeader_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedNationalityAndBirthday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "follows",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credit",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "label",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "entities",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "kind": "ScalarField",
                "name": "description",
                "storageKey": "description(format:\"HTML\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "VerifiedRepresentative",
            "kind": "LinkedField",
            "name": "verifiedRepresentatives",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
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
                        "selections": [
                          {
                            "alias": "src1x",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 30
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 30
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": "cropped(height:30,width:30)"
                          },
                          {
                            "alias": "src2x",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 60
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 60
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": "cropped(height:60,width:60)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v5/*: any*/),
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
                          "larger"
                        ]
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:[\"larger\",\"larger\"])"
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
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "imageTitle",
                "storageKey": null
              },
              {
                "alias": "fallbackArtist",
                "args": null,
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artist",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
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
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "priceWithDiscount",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
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
                "args": (v11/*: any*/),
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
                  (v7/*: any*/)
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
                "args": (v11/*: any*/),
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artists",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v5/*: any*/),
                  (v3/*: any*/)
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
                "args": (v11/*: any*/),
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/)
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
                  (v9/*: any*/),
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
                  (v7/*: any*/)
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
                  (v12/*: any*/),
                  {
                    "alias": null,
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
                    "selections": (v10/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": "opening_bid",
                    "args": null,
                    "concreteType": "SaleArtworkOpeningBid",
                    "kind": "LinkedField",
                    "name": "openingBid",
                    "plural": false,
                    "selections": (v10/*: any*/),
                    "storageKey": null
                  },
                  (v7/*: any*/)
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
                  (v12/*: any*/),
                  (v7/*: any*/)
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
                "selections": (v8/*: any*/),
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
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "d3eb0398a7c318a83b7d7d6e220cb719",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": (v13/*: any*/),
        "artist.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "artist.biographyBlurb.credit": (v14/*: any*/),
        "artist.biographyBlurb.text": (v14/*: any*/),
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.follows": (v15/*: any*/),
        "artist.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artist.coverArtwork.artist": (v13/*: any*/),
        "artist.coverArtwork.artist.id": (v16/*: any*/),
        "artist.coverArtwork.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artist.coverArtwork.artist.targetSupply.isP1": (v17/*: any*/),
        "artist.coverArtwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artist.coverArtwork.artists.href": (v14/*: any*/),
        "artist.coverArtwork.artists.id": (v16/*: any*/),
        "artist.coverArtwork.artists.name": (v14/*: any*/),
        "artist.coverArtwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artist.coverArtwork.attributionClass.id": (v16/*: any*/),
        "artist.coverArtwork.attributionClass.name": (v14/*: any*/),
        "artist.coverArtwork.collecting_institution": (v14/*: any*/),
        "artist.coverArtwork.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "artist.coverArtwork.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "artist.coverArtwork.collectorSignals.auction.bidCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "artist.coverArtwork.collectorSignals.auction.liveBiddingStarted": (v18/*: any*/),
        "artist.coverArtwork.collectorSignals.auction.lotClosesAt": (v14/*: any*/),
        "artist.coverArtwork.collectorSignals.auction.onlineBiddingExtended": (v18/*: any*/),
        "artist.coverArtwork.collectorSignals.auction.registrationEndsAt": (v14/*: any*/),
        "artist.coverArtwork.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "artist.coverArtwork.collectorSignals.partnerOffer.endAt": (v14/*: any*/),
        "artist.coverArtwork.collectorSignals.partnerOffer.id": (v16/*: any*/),
        "artist.coverArtwork.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artist.coverArtwork.collectorSignals.partnerOffer.priceWithDiscount.display": (v14/*: any*/),
        "artist.coverArtwork.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "artist.coverArtwork.cultural_maker": (v14/*: any*/),
        "artist.coverArtwork.date": (v14/*: any*/),
        "artist.coverArtwork.fallbackArtist": (v13/*: any*/),
        "artist.coverArtwork.fallbackArtist.id": (v16/*: any*/),
        "artist.coverArtwork.fallbackArtist.name": (v14/*: any*/),
        "artist.coverArtwork.href": (v14/*: any*/),
        "artist.coverArtwork.id": (v16/*: any*/),
        "artist.coverArtwork.image": (v19/*: any*/),
        "artist.coverArtwork.image.height": (v20/*: any*/),
        "artist.coverArtwork.image.src": (v14/*: any*/),
        "artist.coverArtwork.image.width": (v20/*: any*/),
        "artist.coverArtwork.imageTitle": (v14/*: any*/),
        "artist.coverArtwork.internalID": (v16/*: any*/),
        "artist.coverArtwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artist.coverArtwork.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.coverArtwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artist.coverArtwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artist.coverArtwork.mediumType.filterGene.id": (v16/*: any*/),
        "artist.coverArtwork.mediumType.filterGene.name": (v14/*: any*/),
        "artist.coverArtwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artist.coverArtwork.partner.href": (v14/*: any*/),
        "artist.coverArtwork.partner.id": (v16/*: any*/),
        "artist.coverArtwork.partner.name": (v14/*: any*/),
        "artist.coverArtwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artist.coverArtwork.sale.cascadingEndTimeIntervalMinutes": (v20/*: any*/),
        "artist.coverArtwork.sale.endAt": (v14/*: any*/),
        "artist.coverArtwork.sale.extendedBiddingIntervalMinutes": (v20/*: any*/),
        "artist.coverArtwork.sale.id": (v16/*: any*/),
        "artist.coverArtwork.sale.is_auction": (v17/*: any*/),
        "artist.coverArtwork.sale.is_closed": (v17/*: any*/),
        "artist.coverArtwork.sale.startAt": (v14/*: any*/),
        "artist.coverArtwork.saleArtwork": (v21/*: any*/),
        "artist.coverArtwork.saleArtwork.id": (v16/*: any*/),
        "artist.coverArtwork.saleArtwork.lotID": (v14/*: any*/),
        "artist.coverArtwork.sale_artwork": (v21/*: any*/),
        "artist.coverArtwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artist.coverArtwork.sale_artwork.counts.bidder_positions": (v15/*: any*/),
        "artist.coverArtwork.sale_artwork.endAt": (v14/*: any*/),
        "artist.coverArtwork.sale_artwork.extendedBiddingEndAt": (v14/*: any*/),
        "artist.coverArtwork.sale_artwork.formattedEndDateTime": (v14/*: any*/),
        "artist.coverArtwork.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artist.coverArtwork.sale_artwork.highest_bid.display": (v14/*: any*/),
        "artist.coverArtwork.sale_artwork.id": (v16/*: any*/),
        "artist.coverArtwork.sale_artwork.lotID": (v14/*: any*/),
        "artist.coverArtwork.sale_artwork.lotLabel": (v14/*: any*/),
        "artist.coverArtwork.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artist.coverArtwork.sale_artwork.opening_bid.display": (v14/*: any*/),
        "artist.coverArtwork.sale_message": (v14/*: any*/),
        "artist.coverArtwork.slug": (v16/*: any*/),
        "artist.coverArtwork.title": (v14/*: any*/),
        "artist.formattedNationalityAndBirthday": (v14/*: any*/),
        "artist.id": (v16/*: any*/),
        "artist.insights": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insights.description": (v14/*: any*/),
        "artist.insights.entities": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "artist.insights.kind": {
          "enumValues": [
            "ACTIVE_SECONDARY_MARKET",
            "ARTSY_VANGUARD_YEAR",
            "AWARDS",
            "BIENNIAL",
            "COLLECTED",
            "CRITICALLY_ACCLAIMED",
            "CURATORS_PICK_EMERGING",
            "FOUNDATIONS",
            "GAINING_FOLLOWERS",
            "GROUP_SHOW",
            "HIGH_AUCTION_RECORD",
            "PRIVATE_COLLECTIONS",
            "RECENT_CAREER_EVENT",
            "RESIDENCIES",
            "REVIEWED",
            "SOLO_SHOW",
            "TRENDING_NOW"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtistInsightKind"
        },
        "artist.insights.label": (v22/*: any*/),
        "artist.internalID": (v16/*: any*/),
        "artist.name": (v14/*: any*/),
        "artist.slug": (v16/*: any*/),
        "artist.verifiedRepresentatives": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "VerifiedRepresentative"
        },
        "artist.verifiedRepresentatives.id": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Partner"
        },
        "artist.verifiedRepresentatives.partner.href": (v14/*: any*/),
        "artist.verifiedRepresentatives.partner.id": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner.internalID": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner.name": (v14/*: any*/),
        "artist.verifiedRepresentatives.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artist.verifiedRepresentatives.partner.profile.icon": (v19/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x": (v23/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x.src": (v22/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x": (v23/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x.src": (v22/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.id": (v16/*: any*/)
      }
    },
    "name": "ArtistHeader_Test_Query",
    "operationKind": "query",
    "text": "query ArtistHeader_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistHeader_artist\n    id\n  }\n}\n\nfragment ArtistCareerHighlight_insight on ArtistInsight {\n  kind\n  label\n  entities\n  description(format: HTML)\n}\n\nfragment ArtistHeaderImage_artwork on Artwork {\n  imageTitle\n  image {\n    src: url(version: [\"larger\", \"larger\"])\n    width\n    height\n  }\n  fallbackArtist: artist {\n    name\n    id\n  }\n  ...Details_artwork\n}\n\nfragment ArtistHeader_artist on Artist {\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n  }\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  insights {\n    kind\n    ...ArtistCareerHighlight_insight\n  }\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n  coverArtwork {\n    internalID\n    slug\n    href\n    image {\n      src: url(version: [\"larger\", \"larger\"])\n      width\n      height\n    }\n    ...ArtistHeaderImage_artwork\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "488ad05ec853dc8831a05ff896bf0d3c";

export default node;
