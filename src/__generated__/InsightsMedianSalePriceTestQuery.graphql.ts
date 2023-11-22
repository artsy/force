/**
 * @generated SignedSource<<3a32eeca8f806c8fc159487b04926af8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsMedianSalePriceTestQuery$variables = Record<PropertyKey, never>;
export type InsightsMedianSalePriceTestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"InsightsMedianSalePrice_me">;
  } | null | undefined;
};
export type InsightsMedianSalePriceTestQuery = {
  response: InsightsMedianSalePriceTestQuery$data;
  variables: InsightsMedianSalePriceTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InsightsMedianSalePriceTestQuery",
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
            "name": "InsightsMedianSalePrice_me"
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
    "name": "InsightsMedianSalePriceTestQuery",
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
            "alias": "medianSalePrices",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 3
              },
              {
                "kind": "Literal",
                "name": "sortByLastAuctionResultDate",
                "value": true
              }
            ],
            "concreteType": "MyCollectionConnection",
            "kind": "LinkedField",
            "name": "myCollectionConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MyCollectionEdge",
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
                      (v0/*: any*/),
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
                        "concreteType": "ArtworkMedium",
                        "kind": "LinkedField",
                        "name": "mediumType",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/)
                        ],
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
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "initials",
                            "storageKey": null
                          },
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "coverArtwork",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "avatar",
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
                                        "value": 45
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 45
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
                                    "storageKey": "cropped(height:45,width:45)"
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
                        "storageKey": null
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
                            "name": "medianSalePriceDisplayText",
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
            "storageKey": "myCollectionConnection(first:3,sortByLastAuctionResultDate:true)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e12dd738085e7b2bab9f1e2b61a88e00",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v3/*: any*/),
        "me.medianSalePrices": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyCollectionConnection"
        },
        "me.medianSalePrices.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MyCollectionEdge"
        },
        "me.medianSalePrices.edges.node": (v4/*: any*/),
        "me.medianSalePrices.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "me.medianSalePrices.edges.node.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "me.medianSalePrices.edges.node.artist.counts.artworks": (v5/*: any*/),
        "me.medianSalePrices.edges.node.artist.counts.forSaleArtworks": (v5/*: any*/),
        "me.medianSalePrices.edges.node.artist.coverArtwork": (v4/*: any*/),
        "me.medianSalePrices.edges.node.artist.coverArtwork.avatar": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.medianSalePrices.edges.node.artist.coverArtwork.avatar.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "me.medianSalePrices.edges.node.artist.coverArtwork.avatar.cropped.src": (v6/*: any*/),
        "me.medianSalePrices.edges.node.artist.coverArtwork.avatar.cropped.srcSet": (v6/*: any*/),
        "me.medianSalePrices.edges.node.artist.coverArtwork.id": (v3/*: any*/),
        "me.medianSalePrices.edges.node.artist.formattedNationalityAndBirthday": (v7/*: any*/),
        "me.medianSalePrices.edges.node.artist.href": (v7/*: any*/),
        "me.medianSalePrices.edges.node.artist.id": (v3/*: any*/),
        "me.medianSalePrices.edges.node.artist.initials": (v7/*: any*/),
        "me.medianSalePrices.edges.node.artist.internalID": (v3/*: any*/),
        "me.medianSalePrices.edges.node.artist.name": (v7/*: any*/),
        "me.medianSalePrices.edges.node.artist.slug": (v3/*: any*/),
        "me.medianSalePrices.edges.node.id": (v3/*: any*/),
        "me.medianSalePrices.edges.node.internalID": (v3/*: any*/),
        "me.medianSalePrices.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "me.medianSalePrices.edges.node.marketPriceInsights.medianSalePriceDisplayText": (v7/*: any*/),
        "me.medianSalePrices.edges.node.medium": (v7/*: any*/),
        "me.medianSalePrices.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "me.medianSalePrices.edges.node.mediumType.name": (v7/*: any*/),
        "me.medianSalePrices.edges.node.title": (v7/*: any*/)
      }
    },
    "name": "InsightsMedianSalePriceTestQuery",
    "operationKind": "query",
    "text": "query InsightsMedianSalePriceTestQuery {\n  me {\n    ...InsightsMedianSalePrice_me\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment InsightsMedianSalePrice_me on Me {\n  medianSalePrices: myCollectionConnection(first: 3, sortByLastAuctionResultDate: true) {\n    edges {\n      node {\n        internalID\n        medium\n        mediumType {\n          name\n        }\n        title\n        artist {\n          internalID\n          ...EntityHeaderArtist_artist\n          id\n        }\n        marketPriceInsights {\n          medianSalePriceDisplayText\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6769944a893edcab7958bf42803f3d36";

export default node;
