/**
 * @generated SignedSource<<4df429cb8a0c1de10c184a9af1286f53>>
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
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkModal_artwork">;
  } | null;
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
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artworkID"
  }
],
v2 = {
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
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
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "artworksConnection(first:1)"
  },
  (v3/*: any*/)
],
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
  "type": "Collection"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdge"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v14 = {
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
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SelectListsForArtworkModal_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artworkID\")"
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
            "selections": (v4/*: any*/),
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
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "collectionsConnection(default:false,first:30,saves:true)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
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
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": "artwork(id:\"artworkID\")"
      }
    ]
  },
  "params": {
    "cacheID": "718ae24644b6f1fae14330f5bfde0984",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v5/*: any*/),
        "artwork.date": (v6/*: any*/),
        "artwork.id": (v7/*: any*/),
        "artwork.image": (v8/*: any*/),
        "artwork.image.url": (v6/*: any*/),
        "artwork.title": (v6/*: any*/),
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
        "me.collectionsConnection.edges.node": (v9/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection": (v10/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges": (v11/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node": (v5/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node.id": (v7/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node.image": (v8/*: any*/),
        "me.collectionsConnection.edges.node.artworksConnection.edges.node.image.url": (v6/*: any*/),
        "me.collectionsConnection.edges.node.artworksCount": (v12/*: any*/),
        "me.collectionsConnection.edges.node.id": (v7/*: any*/),
        "me.collectionsConnection.edges.node.internalID": (v7/*: any*/),
        "me.collectionsConnection.edges.node.isSavedArtwork": (v13/*: any*/),
        "me.collectionsConnection.edges.node.name": (v14/*: any*/),
        "me.defaultSaves": (v9/*: any*/),
        "me.defaultSaves.artworksConnection": (v10/*: any*/),
        "me.defaultSaves.artworksConnection.edges": (v11/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node": (v5/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.id": (v7/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image": (v8/*: any*/),
        "me.defaultSaves.artworksConnection.edges.node.image.url": (v6/*: any*/),
        "me.defaultSaves.artworksCount": (v12/*: any*/),
        "me.defaultSaves.id": (v7/*: any*/),
        "me.defaultSaves.internalID": (v7/*: any*/),
        "me.defaultSaves.isSavedArtwork": (v13/*: any*/),
        "me.defaultSaves.name": (v14/*: any*/),
        "me.id": (v7/*: any*/)
      }
    },
    "name": "SelectListsForArtworkModal_Test_Query",
    "operationKind": "query",
    "text": "query SelectListsForArtworkModal_Test_Query {\n  me {\n    ...SelectListsForArtworkModal_me_42bAl0\n    id\n  }\n  artwork(id: \"artworkID\") {\n    ...SelectListsForArtworkModal_artwork\n    id\n  }\n}\n\nfragment SelectListItem_item on Collection {\n  name\n  artworksCount\n  artworksConnection(first: 1) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SelectListsForArtworkHeader_artwork on Artwork {\n  title\n  date\n  image {\n    url(version: \"square\")\n  }\n}\n\nfragment SelectListsForArtworkModal_artwork on Artwork {\n  ...SelectListsForArtworkHeader_artwork\n}\n\nfragment SelectListsForArtworkModal_me_42bAl0 on Me {\n  defaultSaves: collection(id: \"saved-artwork\") {\n    internalID\n    isSavedArtwork(artworkID: \"artworkID\")\n    ...SelectListItem_item\n    id\n  }\n  collectionsConnection(first: 30, default: false, saves: true) {\n    edges {\n      node {\n        internalID\n        isSavedArtwork(artworkID: \"artworkID\")\n        ...SelectListItem_item\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "52e6f1c0ed33b9a79a06d3e314dbe8f8";

export default node;
