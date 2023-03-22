/**
 * @generated SignedSource<<926c6915dbf3422b8d791f3bec702ab6>>
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
  "name": "artworksCount",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "default",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 4
    }
  ],
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
            (v4/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "artworksConnection(first:4)"
},
v6 = [
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
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Collection"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdge"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v16 = {
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
            "alias": "defaultSaves",
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
              (v5/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          {
            "alias": "otherSaves",
            "args": (v6/*: any*/),
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v1/*: any*/),
                      (v5/*: any*/),
                      (v4/*: any*/),
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
            "alias": "otherSaves",
            "args": (v6/*: any*/),
            "filters": [],
            "handle": "connection",
            "key": "CollectorProfileSaves2Route_otherSaves",
            "kind": "LinkedHandle",
            "name": "collectionsConnection"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "434c557b1c16e93656f7dbe499aa17b4",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.defaultSaves": (v7/*: any*/),
        "me.defaultSaves.artworksConnection": (v8/*: any*/),
        "me.defaultSaves.artworksConnection.edges": (v9/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node": (v10/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.id": (v11/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image": (v12/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image.url": (v13/*: any*/),
        "me.defaultSaves.artworksCount": (v14/*: any*/),
        "me.defaultSaves.default": (v15/*: any*/),
        "me.defaultSaves.id": (v11/*: any*/),
        "me.defaultSaves.internalID": (v11/*: any*/),
        "me.defaultSaves.name": (v16/*: any*/),
        "me.id": (v11/*: any*/),
        "me.otherSaves": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectionsConnection"
        },
        "me.otherSaves.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CollectionsEdge"
        },
        "me.otherSaves.edges.cursor": (v16/*: any*/),
        "me.otherSaves.edges.node": (v7/*: any*/),
        "me.otherSaves.edges.node.__typename": (v16/*: any*/),
        "me.otherSaves.edges.node.artworksConnection": (v8/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges": (v9/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node": (v10/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node.id": (v11/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node.image": (v12/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node.image.url": (v13/*: any*/),
        "me.otherSaves.edges.node.artworksCount": (v14/*: any*/),
        "me.otherSaves.edges.node.default": (v15/*: any*/),
        "me.otherSaves.edges.node.id": (v11/*: any*/),
        "me.otherSaves.edges.node.internalID": (v11/*: any*/),
        "me.otherSaves.edges.node.name": (v16/*: any*/),
        "me.otherSaves.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.otherSaves.pageInfo.endCursor": (v13/*: any*/),
        "me.otherSaves.pageInfo.hasNextPage": (v15/*: any*/)
      }
    },
    "name": "CollectorProfileSaves2Route_Test_Query",
    "operationKind": "query",
    "text": "query CollectorProfileSaves2Route_Test_Query {\n  me {\n    ...CollectorProfileSaves2Route_me\n    id\n  }\n}\n\nfragment CollectorProfileSaves2Route_me on Me {\n  defaultSaves: collection(id: \"saved-artwork\") {\n    internalID\n    artworksCount\n    ...SavesItem_item\n    id\n  }\n  otherSaves: collectionsConnection(first: 30, default: false, saves: true, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        default\n        ...SavesItem_item\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SavesItem_item on Collection {\n  default\n  name\n  internalID\n  artworksCount\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "faa377c58f63688c07edf6968b891343";

export default node;
