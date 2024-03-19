/**
 * @generated SignedSource<<f2220545e5ea7965354d7acc42e7da4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectArtworkListsModal_Test_Query$variables = Record<PropertyKey, never>;
export type SelectArtworkListsModal_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SelectArtworkListsModal_me">;
  } | null | undefined;
};
export type SelectArtworkListsModal_Test_Query = {
  response: SelectArtworkListsModal_Test_Query$data;
  variables: SelectArtworkListsModal_Test_Query$variables;
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "shareableWithPartners",
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
    "name": "SelectArtworkListsModal_Test_Query",
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
            "name": "SelectArtworkListsModal_me"
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
    "name": "SelectArtworkListsModal_Test_Query",
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
            "selections": (v2/*: any*/),
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          {
            "alias": "customArtworkLists",
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
                "value": "UPDATED_AT_DESC"
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
            "storageKey": "collectionsConnection(default:false,first:30,saves:true,sort:\"UPDATED_AT_DESC\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "05d2294dc01eb50898364ba38031304b",
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
        "me.customArtworkLists.edges.node": (v3/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection": (v4/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges": (v5/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node": (v6/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.id": (v7/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image": (v8/*: any*/),
        "me.customArtworkLists.edges.node.artworksConnection.edges.node.image.url": (v9/*: any*/),
        "me.customArtworkLists.edges.node.artworksCount": (v10/*: any*/),
        "me.customArtworkLists.edges.node.id": (v7/*: any*/),
        "me.customArtworkLists.edges.node.internalID": (v7/*: any*/),
        "me.customArtworkLists.edges.node.isSavedArtwork": (v11/*: any*/),
        "me.customArtworkLists.edges.node.name": (v12/*: any*/),
        "me.customArtworkLists.edges.node.shareableWithPartners": (v11/*: any*/),
        "me.id": (v7/*: any*/),
        "me.savedArtworksArtworkList": (v3/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection": (v4/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges": (v5/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node": (v6/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.id": (v7/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.image": (v8/*: any*/),
        "me.savedArtworksArtworkList.artworksConnection.edges.node.image.url": (v9/*: any*/),
        "me.savedArtworksArtworkList.artworksCount": (v10/*: any*/),
        "me.savedArtworksArtworkList.id": (v7/*: any*/),
        "me.savedArtworksArtworkList.internalID": (v7/*: any*/),
        "me.savedArtworksArtworkList.isSavedArtwork": (v11/*: any*/),
        "me.savedArtworksArtworkList.name": (v12/*: any*/),
        "me.savedArtworksArtworkList.shareableWithPartners": (v11/*: any*/)
      }
    },
    "name": "SelectArtworkListsModal_Test_Query",
    "operationKind": "query",
    "text": "query SelectArtworkListsModal_Test_Query {\n  me {\n    ...SelectArtworkListsModal_me_42bAl0\n    id\n  }\n}\n\nfragment SelectArtworkListItem_item on Collection {\n  name\n  artworksCount(onlyVisible: true)\n  shareableWithPartners\n  artworksConnection(first: 1, sort: SAVED_AT_DESC) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SelectArtworkListsModal_me_42bAl0 on Me {\n  savedArtworksArtworkList: collection(id: \"saved-artwork\") {\n    internalID\n    isSavedArtwork(artworkID: \"artworkID\")\n    name\n    ...SelectArtworkListItem_item\n    id\n  }\n  customArtworkLists: collectionsConnection(first: 30, default: false, saves: true, sort: UPDATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        isSavedArtwork(artworkID: \"artworkID\")\n        name\n        ...SelectArtworkListItem_item\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5b28708f4ebbee300f8ceda10af92be0";

export default node;
