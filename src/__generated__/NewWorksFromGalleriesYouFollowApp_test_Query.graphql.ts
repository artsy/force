/**
 * @generated SignedSource<<5995c22486854d2f198030c472f6d090>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewWorksFromGalleriesYouFollowApp_test_Query$variables = {
  first?: number | null | undefined;
};
export type NewWorksFromGalleriesYouFollowApp_test_Query$data = {
  readonly me: {
    readonly newWorksFromGalleriesYouFollowConnection: {
      readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection">;
    } | null | undefined;
  } | null | undefined;
};
export type NewWorksFromGalleriesYouFollowApp_test_Query = {
  response: NewWorksFromGalleriesYouFollowApp_test_Query$data;
  variables: NewWorksFromGalleriesYouFollowApp_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v9 = [
  (v7/*: any*/),
  (v5/*: any*/)
],
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
  "type": "String"
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
  "type": "Image"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewWorksFromGalleriesYouFollowApp_test_Query",
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
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "newWorksFromGalleriesYouFollowConnection",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewWorksFromGalleriesYouFollowApp_test_Query",
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
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "newWorksFromGalleriesYouFollowConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
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
                            "concreteType": "PartnerOfferToCollector",
                            "kind": "LinkedField",
                            "name": "partnerOffer",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/)
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
                        "args": (v6/*: any*/),
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
                          (v5/*: any*/)
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
                        "args": (v6/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v5/*: any*/),
                          (v3/*: any*/),
                          (v7/*: any*/)
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
                        "args": (v6/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v3/*: any*/),
                          (v5/*: any*/)
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
                          (v4/*: any*/),
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
                          (v5/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v4/*: any*/),
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
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkConsignmentSubmission",
                        "kind": "LinkedField",
                        "name": "consignmentSubmission",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "state",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "stateLabel",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "actionLabel",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "stateLabelColor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
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
                        "name": "isInAuction",
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
                        "selections": (v9/*: any*/),
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
                            "selections": (v9/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isListed",
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "11f820976fa8854e37ce8a3ed04439f1",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artist.targetSupply.isP1": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artistNames": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.href": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.artists.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.attributionClass.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collecting_institution": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.bidCount": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.lotWatcherCount": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.endAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.collectorSignals.partnerOffer.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.consignmentSubmission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConsignmentSubmission"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.consignmentSubmission.actionLabel": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.consignmentSubmission.internalID": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.consignmentSubmission.state": {
          "enumValues": [
            "APPROVED",
            "CLOSED",
            "DRAFT",
            "HOLD",
            "PUBLISHED",
            "REJECTED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArtworkConsignmentSubmissionState"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.consignmentSubmission.stateLabel": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.consignmentSubmission.stateLabelColor": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.cultural_maker": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.date": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.href": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.blurhashDataURL": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.height": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.src": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.image.width": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.internalID": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.isInAuction": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.isListed": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.isSaved": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.isSavedToList": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.isUnlisted": (v15/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.mediumType.filterGene.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.href": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.partner.name": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.preview": (v14/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.preview.url": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.endAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v13/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.is_auction": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.is_closed": (v11/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale.startAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.endAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.formattedEndDateTime": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.highest_bid.display": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.id": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.lotID": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.lotLabel": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_artwork.opening_bid.display": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.sale_message": (v12/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.slug": (v10/*: any*/),
        "me.newWorksFromGalleriesYouFollowConnection.edges.node.title": (v12/*: any*/)
      }
    },
    "name": "NewWorksFromGalleriesYouFollowApp_test_Query",
    "operationKind": "query",
    "text": "query NewWorksFromGalleriesYouFollowApp_test_Query(\n  $first: Int\n) {\n  me {\n    newWorksFromGalleriesYouFollowConnection(first: $first) {\n      ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection\n    }\n    id\n  }\n}\n\nfragment ConsignmentSubmissionStatus_artwork on Artwork {\n  internalID\n  isListed\n  consignmentSubmission {\n    internalID\n    state\n    stateLabel\n    actionLabel\n    stateLabelColor\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    bidCount\n    lotWatcherCount\n    partnerOffer {\n      endAt\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  consignmentSubmission {\n    internalID\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n  ...ConsignmentSubmissionStatus_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection on ArtworkConnection {\n  edges {\n    node {\n      internalID\n      slug\n      ...ShelfArtwork_artwork\n      id\n    }\n  }\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n"
  }
};
})();

(node as any).hash = "46563339635a2165db01c357f3f336de";

export default node;
