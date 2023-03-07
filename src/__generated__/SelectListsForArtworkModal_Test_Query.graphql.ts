/**
 * @generated SignedSource<<df2bbc25f729c5094341254a3c24d339>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkModal_Test_Query$variables = {};
export type SelectListsForArtworkModal_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkModal_me">;
  } | null;
};
export type SelectListsForArtworkModal_Test_Query = {
  response: SelectListsForArtworkModal_Test_Query$data;
  variables: SelectListsForArtworkModal_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "artworkID",
    "value": "artworkID"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  {
    "alias": null,
    "args": (v0/*: any*/),
    "kind": "ScalarField",
    "name": "isSavedArtwork",
    "storageKey": "isSavedArtwork(artworkID:\"artworkID\")"
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
        "value": 1
      },
      {
        "kind": "Literal",
        "name": "sort",
        "value": "SAVED_AT_DESC"
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
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "artworksConnection(first:1,sort:\"SAVED_AT_DESC\")"
  },
  (v1/*: any*/)
],
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Collection"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdge"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v12 = {
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
    "name": "SelectListsForArtworkModal_Test_Query",
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
            "args": (v0/*: any*/),
            "kind": "FragmentSpread",
            "name": "SelectListsForArtworkModal_me"
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
    "name": "SelectListsForArtworkModal_Test_Query",
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
            "selections": (v2/*: any*/),
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          {
            "alias": null,
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
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "CREATED_AT_DESC"
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
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "collectionsConnection(default:false,first:30,saves:true,sort:\"CREATED_AT_DESC\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a0e4db42a2f6d26264e62622afd244cd",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.collectionsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectionsConnection"
        },
        "me.collectionsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CollectionsEdge"
        },
        "me.collectionsConnection.edges.node": (v3/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection": (v4/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges": (v5/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node": (v6/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node.id": (v7/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node.image": (v8/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node.image.url": (v9/*: any*/),
        "me.collectionsConnection.edges.node.artworksCount": (v10/*: any*/),
        "me.collectionsConnection.edges.node.id": (v7/*: any*/),
        "me.collectionsConnection.edges.node.internalID": (v7/*: any*/),
        "me.collectionsConnection.edges.node.isSavedArtwork": (v11/*: any*/),
        "me.collectionsConnection.edges.node.name": (v12/*: any*/),
        "me.defaultSaves": (v3/*: any*/),
        "me.defaultSaves.artworksConnection": (v4/*: any*/),
        "me.defaultSaves.artworksConnection.edges": (v5/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node": (v6/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.id": (v7/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image": (v8/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image.url": (v9/*: any*/),
        "me.defaultSaves.artworksCount": (v10/*: any*/),
        "me.defaultSaves.id": (v7/*: any*/),
        "me.defaultSaves.internalID": (v7/*: any*/),
        "me.defaultSaves.isSavedArtwork": (v11/*: any*/),
        "me.defaultSaves.name": (v12/*: any*/),
        "me.id": (v7/*: any*/)
      }
    },
    "name": "SelectListsForArtworkModal_Test_Query",
    "operationKind": "query",
    "text": "query SelectListsForArtworkModal_Test_Query {\n  me {\n    ...SelectListsForArtworkModal_me_42bAl0\n    id\n  }\n}\n\nfragment SelectListItem_item on Collection {\n  name\n  artworksCount\n  artworksConnection(first: 1, sort: SAVED_AT_DESC) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SelectListsForArtworkModal_me_42bAl0 on Me {\n  defaultSaves: collection(id: \"saved-artwork\") {\n    internalID\n    isSavedArtwork(artworkID: \"artworkID\")\n    ...SelectListItem_item\n    id\n  }\n  collectionsConnection(first: 30, default: false, saves: true, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        isSavedArtwork(artworkID: \"artworkID\")\n        ...SelectListItem_item\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd37a25a329f34d0efae1d411aea815e";

export default node;
