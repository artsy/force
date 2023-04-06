/**
 * @generated SignedSource<<c58164974c7bfac1b4c85678299f75de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSaves2Route_Test_Query$variables = {};
export type CollectorProfileSaves2Route_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSaves2Route_me">;
  } | null;
};
export type CollectorProfileSaves2Route_Test_Query = {
  response: CollectorProfileSaves2Route_Test_Query$data;
  variables: CollectorProfileSaves2Route_Test_Query$variables;
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
  "name": "default",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artworksCount",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
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
        (v5/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = [
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
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Collection"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdge"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectorProfileSaves2Route_Test_Query",
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
            "name": "CollectorProfileSaves2Route_me"
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
    "name": "CollectorProfileSaves2Route_Test_Query",
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
            "alias": "allSavesArtworkList",
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "ArtworkConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
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
              (v5/*: any*/)
            ],
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          {
            "alias": "customArtworkLists",
            "args": (v7/*: any*/),
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
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
                        "concreteType": "ArtworkConnection",
                        "kind": "LinkedField",
                        "name": "artworksConnection",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/)
                        ],
                        "storageKey": "artworksConnection(first:4)"
                      },
                      (v5/*: any*/),
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
            "args": (v7/*: any*/),
            "filters": [],
            "handle": "connection",
            "key": "CollectorProfileSaves2Route_customArtworkLists",
            "kind": "LinkedHandle",
            "name": "collectionsConnection"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "41cce23e01ccaed8c054e43ba169cfa9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.allSavesArtworkList": (v8/*: any*/),
        "me.allSavesArtworkList.artworksConnection": (v9/*: any*/),
        "me.allSavesArtworkList.artworksConnection.edges": (v10/*: any*/),
        "me.allSavesArtworkList.artworksConnection.edges.node": (v11/*: any*/),
        "me.allSavesArtworkList.artworksConnection.edges.node.id": (v12/*: any*/),
        "me.allSavesArtworkList.artworksConnection.edges.node.image": (v13/*: any*/),
        "me.allSavesArtworkList.artworksConnection.edges.node.image.url": (v14/*: any*/),
        "me.allSavesArtworkList.artworksConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "me.allSavesArtworkList.artworksCount": (v15/*: any*/),
        "me.allSavesArtworkList.default": (v16/*: any*/),
        "me.allSavesArtworkList.id": (v12/*: any*/),
        "me.allSavesArtworkList.internalID": (v12/*: any*/),
        "me.allSavesArtworkList.name": (v17/*: any*/),
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
        "me.customArtworkLists.edges.cursor": (v17/*: any*/),
        "me.customArtworkLists.edges.node": (v8/*: any*/),
        "me.customArtworkLists.edges.node.__typename": (v17/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection": (v9/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges": (v10/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node": (v11/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.id": (v12/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image": (v13/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image.url": (v14/*: any*/),
        "me.customArtworkLists.edges.node.artworksCount": (v15/*: any*/),
        "me.customArtworkLists.edges.node.default": (v16/*: any*/),
        "me.customArtworkLists.edges.node.id": (v12/*: any*/),
        "me.customArtworkLists.edges.node.internalID": (v12/*: any*/),
        "me.customArtworkLists.edges.node.name": (v17/*: any*/),
        "me.customArtworkLists.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.customArtworkLists.pageInfo.endCursor": (v14/*: any*/),
        "me.customArtworkLists.pageInfo.hasNextPage": (v16/*: any*/),
        "me.id": (v12/*: any*/)
      }
    },
    "name": "CollectorProfileSaves2Route_Test_Query",
    "operationKind": "query",
    "text": "query CollectorProfileSaves2Route_Test_Query {\n  me {\n    ...CollectorProfileSaves2Route_me\n    id\n  }\n}\n\nfragment ArtworkListItem_item on Collection {\n  default\n  name\n  internalID\n  artworksCount\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CollectorProfileSaves2Route_me on Me {\n  allSavesArtworkList: collection(id: \"saved-artwork\") {\n    internalID\n    ...ArtworkListItem_item\n    artworksConnection(first: 4) {\n      totalCount\n    }\n    id\n  }\n  customArtworkLists: collectionsConnection(first: 30, default: false, saves: true, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        default\n        ...ArtworkListItem_item\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "faa377c58f63688c07edf6968b891343";

export default node;
