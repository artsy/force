/**
 * @generated SignedSource<<4136f304497b6410b005bf7b0ec7d5ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type favoritesRoutes_SavesRouteQuery$variables = Record<PropertyKey, never>;
export type favoritesRoutes_SavesRouteQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSavesRoute_me">;
  } | null | undefined;
};
export type favoritesRoutes_SavesRouteQuery = {
  response: favoritesRoutes_SavesRouteQuery$data;
  variables: favoritesRoutes_SavesRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
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
  "name": "shareableWithPartners",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "default",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "onlyVisible",
      "value": true
    }
  ],
  "kind": "ScalarField",
  "name": "artworksCount",
  "storageKey": "artworksCount(onlyVisible:true)"
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v7 = {
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
          "name": "version",
          "value": "square"
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:\"square\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "square"
          ]
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 200
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        }
      ],
      "storageKey": "resized(version:[\"square\"],width:200)"
    }
  ],
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "default",
    "value": false
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  },
  {
    "kind": "Literal",
    "name": "saves",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "CREATED_AT_DESC"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "favoritesRoutes_SavesRouteQuery",
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
            "name": "CollectorProfileSavesRoute_me"
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
    "name": "favoritesRoutes_SavesRouteQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100
              }
            ],
            "concreteType": "PartnerOfferToCollectorConnection",
            "kind": "LinkedField",
            "name": "partnerOffersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerOfferToCollectorEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerOfferToCollector",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artworkId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endAt",
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnerOffersConnection(first:100)"
          },
          {
            "alias": "savedArtworksArtworkList",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "saved-artwork"
              }
            ],
            "concreteType": "Collection",
            "kind": "LinkedField",
            "name": "collection",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "ArtworkConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
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
                          (v7/*: any*/),
                          (v0/*: any*/),
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAcquireable",
                            "storageKey": null
                          }
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
                    "name": "totalCount",
                    "storageKey": null
                  }
                ],
                "storageKey": "artworksConnection(first:4)"
              },
              (v0/*: any*/)
            ],
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          {
            "alias": "customArtworkLists",
            "args": (v8/*: any*/),
            "concreteType": "CollectionsConnection",
            "kind": "LinkedField",
            "name": "collectionsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CollectionsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/),
                      (v2/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": (v6/*: any*/),
                        "concreteType": "ArtworkConnection",
                        "kind": "LinkedField",
                        "name": "artworksConnection",
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
                                  (v7/*: any*/),
                                  (v0/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artworksConnection(first:4)"
                      },
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
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
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "collectionsConnection(default:false,first:30,saves:true,sort:\"CREATED_AT_DESC\")"
          },
          {
            "alias": "customArtworkLists",
            "args": (v8/*: any*/),
            "filters": [],
            "handle": "connection",
            "key": "CollectorProfileSavesRoute_customArtworkLists",
            "kind": "LinkedHandle",
            "name": "collectionsConnection"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1174fd97f405ddcaf056ef224b295908",
    "id": null,
    "metadata": {},
    "name": "favoritesRoutes_SavesRouteQuery",
    "operationKind": "query",
    "text": "query favoritesRoutes_SavesRouteQuery {\n  me {\n    ...CollectorProfileSavesRoute_me\n    id\n  }\n}\n\nfragment ArtworkListItem_item on Collection {\n  default\n  name\n  internalID\n  artworksCount(onlyVisible: true)\n  shareableWithPartners\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CollectorProfileSavesRoute_me on Me {\n  ...useCollectorSignals_me\n  savedArtworksArtworkList: collection(id: \"saved-artwork\") {\n    internalID\n    shareableWithPartners\n    ...ArtworkListItem_item\n    ...OfferSettingsListItem_item\n    artworksConnection(first: 4) {\n      ...useCollectorSignals_artworksConnection\n      totalCount\n    }\n    id\n  }\n  customArtworkLists: collectionsConnection(first: 30, default: false, saves: true, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        default\n        shareableWithPartners\n        ...ArtworkListItem_item\n        ...OfferSettingsListItem_item\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment OfferSettingsListItem_item on Collection {\n  name\n  internalID\n  artworksCount(onlyVisible: true)\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          resized(width: 200, version: [\"square\"]) {\n            src\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment useCollectorSignals_artworksConnection on ArtworkConnection {\n  edges {\n    node {\n      internalID\n      isAcquireable\n      id\n    }\n  }\n}\n\nfragment useCollectorSignals_me on Me {\n  partnerOffersConnection(first: 100) {\n    edges {\n      node {\n        artworkId\n        endAt\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8da633f95d484ad55532d130944db008";

export default node;
