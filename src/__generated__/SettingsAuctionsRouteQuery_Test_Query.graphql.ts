/**
 * @generated SignedSource<<ff6ecb2101bbf3c8ff0b030cb62a630e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsAuctionsRouteQuery_Test_Query$variables = Record<PropertyKey, never>;
export type SettingsAuctionsRouteQuery_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsAuctionsRoute_me">;
  } | null | undefined;
};
export type SettingsAuctionsRouteQuery_Test_Query = {
  response: SettingsAuctionsRouteQuery_Test_Query$data;
  variables: SettingsAuctionsRouteQuery_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotLabel",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
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
  "name": "endAt",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v8 = [
  (v5/*: any*/),
  (v2/*: any*/)
],
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isLeadingBidder",
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
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
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
              (v6/*: any*/),
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
              (v2/*: any*/)
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotID",
                "storageKey": null
              },
              (v0/*: any*/),
              (v6/*: any*/),
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
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              {
                "alias": "opening_bid",
                "args": null,
                "concreteType": "SaleArtworkOpeningBid",
                "kind": "LinkedField",
                "name": "openingBid",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/),
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
            "kind": "ScalarField",
            "name": "isSaved",
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
            "alias": "preview",
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
                    "name": "version",
                    "value": "square"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"square\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSavedToList",
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
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 100
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:100,width:100)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v2/*: any*/)
    ],
    "storageKey": null
  }
],
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "LotStanding"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ArtistTargetSupply"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkPriceInsights"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMedium"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Gene"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsAuctionsRouteQuery_Test_Query",
    "selections": [
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
            "name": "SettingsAuctionsRoute_me"
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
    "name": "SettingsAuctionsRouteQuery_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": "activeLotStandings",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
              }
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": (v9/*: any*/),
            "storageKey": "lotStandings(live:true)"
          },
          {
            "alias": "inactiveLotStandings",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": false
              }
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": (v9/*: any*/),
            "storageKey": "lotStandings(live:false)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "isAuction",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "registered",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "CREATED_AT_DESC"
              }
            ],
            "concreteType": "SaleRegistrationConnection",
            "kind": "LinkedField",
            "name": "saleRegistrationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleRegistrationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleRegistration",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isRegistered",
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
                          (v5/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "MMMM D, h:mmA"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": "startAt(format:\"MMMM D, h:mmA\")"
                          },
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isRegistrationClosed",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleRegistrationsConnection(first:10,isAuction:true,published:true,registered:false,sort:\"CREATED_AT_DESC\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "184956dd95b0047d943951633a6b0eb2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.activeLotStandings": (v10/*: any*/),
        "me.activeLotStandings.isLeadingBidder": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artist": (v14/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artist.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artist.targetSupply": (v16/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artist.targetSupply.isP1": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artistNames": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists": (v18/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.href": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.name": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.attributionClass": (v19/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.attributionClass.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.attributionClass.name": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.collecting_institution": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.cultural_maker": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.date": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.href": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image": (v20/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image.cropped": (v21/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image.cropped.src": (v22/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image.cropped.srcSet": (v22/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.internalID": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.isSaved": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.isSavedToList": (v23/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.marketPriceInsights": (v24/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.marketPriceInsights.demandRank": (v25/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.mediumType": (v26/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.mediumType.filterGene": (v27/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.mediumType.filterGene.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.mediumType.filterGene.name": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner": (v28/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.href": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.name": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.preview": (v20/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.preview.url": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale": (v29/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.cascadingEndTimeIntervalMinutes": (v30/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.endAt": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.extendedBiddingIntervalMinutes": (v30/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.is_auction": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.is_closed": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.startAt": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.counts": (v31/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.counts.bidder_positions": (v32/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.endAt": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.extendedBiddingEndAt": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.formattedEndDateTime": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.highest_bid": (v33/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.highest_bid.display": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.lotID": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.lotLabel": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.opening_bid": (v34/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.opening_bid.display": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_message": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.slug": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.title": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.lotLabel": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.sale": (v29/*: any*/),
        "me.activeLotStandings.saleArtwork.sale.id": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.sale.isClosed": (v11/*: any*/),
        "me.id": (v15/*: any*/),
        "me.inactiveLotStandings": (v10/*: any*/),
        "me.inactiveLotStandings.isLeadingBidder": (v11/*: any*/),
        "me.inactiveLotStandings.saleArtwork": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artist": (v14/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artist.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artist.targetSupply": (v16/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artist.targetSupply.isP1": (v11/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artistNames": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists": (v18/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists.href": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists.name": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.attributionClass": (v19/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.attributionClass.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.attributionClass.name": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.collecting_institution": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.cultural_maker": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.date": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.href": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image": (v20/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image.cropped": (v21/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image.cropped.src": (v22/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image.cropped.srcSet": (v22/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.internalID": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.isSaved": (v11/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.isSavedToList": (v23/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.marketPriceInsights": (v24/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.marketPriceInsights.demandRank": (v25/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.mediumType": (v26/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.mediumType.filterGene": (v27/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.mediumType.filterGene.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.mediumType.filterGene.name": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner": (v28/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner.href": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner.name": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.preview": (v20/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.preview.url": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale": (v29/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.cascadingEndTimeIntervalMinutes": (v30/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.endAt": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.extendedBiddingIntervalMinutes": (v30/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.is_auction": (v11/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.is_closed": (v11/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.startAt": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.counts": (v31/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.counts.bidder_positions": (v32/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.endAt": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.extendedBiddingEndAt": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.formattedEndDateTime": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.highest_bid": (v33/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.highest_bid.display": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.lotID": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.lotLabel": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.opening_bid": (v34/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.opening_bid.display": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_message": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.slug": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.title": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.lotLabel": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.sale": (v29/*: any*/),
        "me.inactiveLotStandings.saleArtwork.sale.id": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.sale.isClosed": (v11/*: any*/),
        "me.saleRegistrationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleRegistrationConnection"
        },
        "me.saleRegistrationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SaleRegistrationEdge"
        },
        "me.saleRegistrationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleRegistration"
        },
        "me.saleRegistrationsConnection.edges.node.id": (v15/*: any*/),
        "me.saleRegistrationsConnection.edges.node.isRegistered": (v11/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale": (v29/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.href": (v17/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.id": (v15/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.isClosed": (v11/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.isRegistrationClosed": (v11/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.name": (v17/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.startAt": (v17/*: any*/)
      }
    },
    "name": "SettingsAuctionsRouteQuery_Test_Query",
    "operationKind": "query",
    "text": "query SettingsAuctionsRouteQuery_Test_Query {\n  me {\n    ...SettingsAuctionsRoute_me\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment SettingsAuctionsLotStanding_lotStanding on LotStanding {\n  isLeadingBidder\n  saleArtwork {\n    lotLabel\n    sale {\n      isClosed\n      id\n    }\n    artwork {\n      ...Details_artwork\n      href\n      image {\n        cropped(height: 100, width: 100) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsAuctionsRoute_me on Me {\n  ...UserActiveBids_me\n  ...UserBidHistory_me\n  ...UserRegistrationAuctions_me\n}\n\nfragment UserActiveBids_me on Me {\n  activeLotStandings: lotStandings(live: true) {\n    ...SettingsAuctionsLotStanding_lotStanding\n  }\n}\n\nfragment UserBidHistory_me on Me {\n  inactiveLotStandings: lotStandings(live: false) {\n    ...SettingsAuctionsLotStanding_lotStanding\n  }\n}\n\nfragment UserRegistrationAuctions_me on Me {\n  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {\n    edges {\n      node {\n        isRegistered\n        sale {\n          id\n          name\n          href\n          startAt(format: \"MMMM D, h:mmA\")\n          isClosed\n          isRegistrationClosed\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "40a6dfae10813d606d91b054d59e896d";

export default node;
