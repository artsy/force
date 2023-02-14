/**
 * @generated SignedSource<<10283aa313a0232f09c0b84e8190e1cf>>
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
  "name": "id",
  "storageKey": null
},
v1 = [
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
    "name": "default",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "artworksCount",
    "storageKey": null
  },
  {
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
  (v0/*: any*/)
],
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Collection"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdge"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v11 = {
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
            "selections": (v1/*: any*/),
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          {
            "alias": "otherSaves",
            "args": [
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
              }
            ],
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
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "collectionsConnection(default:false,first:30,saves:true)"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94486b30e85e45dc38b9c592fa58dab6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.defaultSaves": (v2/*: any*/),
        "me.defaultSaves.artworksConnection": (v3/*: any*/),
        "me.defaultSaves.artworksConnection.edges": (v4/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node": (v5/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.id": (v6/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image": (v7/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image.url": (v8/*: any*/),
        "me.defaultSaves.artworksCount": (v9/*: any*/),
        "me.defaultSaves.default": (v10/*: any*/),
        "me.defaultSaves.id": (v6/*: any*/),
        "me.defaultSaves.internalID": (v6/*: any*/),
        "me.defaultSaves.name": (v11/*: any*/),
        "me.id": (v6/*: any*/),
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
        "me.otherSaves.edges.node": (v2/*: any*/),
        "me.otherSaves.edges.node.artworksConnection": (v3/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges": (v4/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node": (v5/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node.id": (v6/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node.image": (v7/*: any*/),
        "me.otherSaves.edges.node.artworksConnection.edges.node.image.url": (v8/*: any*/),
        "me.otherSaves.edges.node.artworksCount": (v9/*: any*/),
        "me.otherSaves.edges.node.default": (v10/*: any*/),
        "me.otherSaves.edges.node.id": (v6/*: any*/),
        "me.otherSaves.edges.node.internalID": (v6/*: any*/),
        "me.otherSaves.edges.node.name": (v11/*: any*/)
      }
    },
    "name": "CollectorProfileSaves2Route_Test_Query",
    "operationKind": "query",
    "text": "query CollectorProfileSaves2Route_Test_Query {\n  me {\n    ...CollectorProfileSaves2Route_me\n    id\n  }\n}\n\nfragment CollectorProfileSaves2Route_me on Me {\n  defaultSaves: collection(id: \"saved-artwork\") {\n    internalID\n    ...SavesItem_item\n    id\n  }\n  otherSaves: collectionsConnection(first: 30, default: false, saves: true) {\n    edges {\n      node {\n        internalID\n        default\n        ...SavesItem_item\n        id\n      }\n    }\n  }\n}\n\nfragment SavesItem_item on Collection {\n  default\n  name\n  internalID\n  artworksCount\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "faa377c58f63688c07edf6968b891343";

export default node;
