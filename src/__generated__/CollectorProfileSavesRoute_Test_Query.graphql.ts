/**
 * @generated SignedSource<<6e3c06ecbc743d12b83395d8372bf07d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSavesRoute_Test_Query$variables = Record<PropertyKey, never>;
export type CollectorProfileSavesRoute_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSavesRoute_me">;
  } | null | undefined;
};
export type CollectorProfileSavesRoute_Test_Query = {
  response: CollectorProfileSavesRoute_Test_Query$data;
  variables: CollectorProfileSavesRoute_Test_Query$variables;
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
],
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Collection"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdge"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v19 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectorProfileSavesRoute_Test_Query",
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
    "name": "CollectorProfileSavesRoute_Test_Query",
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
    "cacheID": "02491d990014d10755426726760eca8a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.customArtworkLists": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectionsConnection"
        },
        "me.customArtworkLists.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CollectionsEdge"
        },
        "me.customArtworkLists.edges.cursor": (v9/*: any*/),
        "me.customArtworkLists.edges.node": (v10/*: any*/),
        "me.customArtworkLists.edges.node.__typename": (v9/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection": (v11/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges": (v12/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node": (v13/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.id": (v14/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image": (v15/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image.resized": (v16/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image.resized.src": (v9/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image.url": (v17/*: any*/),
        "me.customArtworkLists.edges.node.artworksCount": (v18/*: any*/),
        "me.customArtworkLists.edges.node.default": (v19/*: any*/),
        "me.customArtworkLists.edges.node.id": (v14/*: any*/),
        "me.customArtworkLists.edges.node.internalID": (v14/*: any*/),
        "me.customArtworkLists.edges.node.name": (v9/*: any*/),
        "me.customArtworkLists.edges.node.shareableWithPartners": (v19/*: any*/),
        "me.customArtworkLists.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.customArtworkLists.pageInfo.endCursor": (v17/*: any*/),
        "me.customArtworkLists.pageInfo.hasNextPage": (v19/*: any*/),
        "me.id": (v14/*: any*/),
        "me.partnerOffersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollectorConnection"
        },
        "me.partnerOffersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerOfferToCollectorEdge"
        },
        "me.partnerOffersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "me.partnerOffersConnection.edges.node.artworkId": (v17/*: any*/),
        "me.partnerOffersConnection.edges.node.endAt": (v17/*: any*/),
        "me.partnerOffersConnection.edges.node.id": (v14/*: any*/),
        "me.savedArtworksArtworkList": (v10/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection": (v11/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges": (v12/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node": (v13/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.id": (v14/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.image": (v15/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.image.resized": (v16/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.image.resized.src": (v9/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.image.url": (v17/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.internalID": (v14/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.isAcquireable": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.savedArtworksArtworkList.artworksConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "me.savedArtworksArtworkList.artworksCount": (v18/*: any*/),
        "me.savedArtworksArtworkList.default": (v19/*: any*/),
        "me.savedArtworksArtworkList.id": (v14/*: any*/),
        "me.savedArtworksArtworkList.internalID": (v14/*: any*/),
        "me.savedArtworksArtworkList.name": (v9/*: any*/),
        "me.savedArtworksArtworkList.shareableWithPartners": (v19/*: any*/)
      }
    },
    "name": "CollectorProfileSavesRoute_Test_Query",
    "operationKind": "query",
    "text": "query CollectorProfileSavesRoute_Test_Query {\n  me {\n    ...CollectorProfileSavesRoute_me\n    id\n  }\n}\n\nfragment ArtworkListItem_item on Collection {\n  default\n  name\n  internalID\n  artworksCount(onlyVisible: true)\n  shareableWithPartners\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CollectorProfileSavesRoute_me on Me {\n  ...useCollectorSignals_me\n  savedArtworksArtworkList: collection(id: \"saved-artwork\") {\n    internalID\n    shareableWithPartners\n    ...ArtworkListItem_item\n    ...OfferSettingsListItem_item\n    artworksConnection(first: 4) {\n      ...useCollectorSignals_artworksConnection\n      totalCount\n    }\n    id\n  }\n  customArtworkLists: collectionsConnection(first: 30, default: false, saves: true, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        default\n        shareableWithPartners\n        ...ArtworkListItem_item\n        ...OfferSettingsListItem_item\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment OfferSettingsListItem_item on Collection {\n  name\n  internalID\n  artworksCount(onlyVisible: true)\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          resized(width: 200, version: [\"square\"]) {\n            src\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment useCollectorSignals_artworksConnection on ArtworkConnection {\n  edges {\n    node {\n      internalID\n      isAcquireable\n      id\n    }\n  }\n}\n\nfragment useCollectorSignals_me on Me {\n  partnerOffersConnection(first: 100) {\n    edges {\n      node {\n        artworkId\n        endAt\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "02cfd934947b026cfd085f509f1ff279";

export default node;
