/**
 * @generated SignedSource<<d519790fe8ebd0af41a6d9230f1f54fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkModalQuery$variables = {
  artworkID: string;
};
export type SelectListsForArtworkModalQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkModal_artwork">;
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkModal_me">;
  } | null;
};
export type SelectListsForArtworkModalQuery = {
  response: SelectListsForArtworkModalQuery$data;
  variables: SelectListsForArtworkModalQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "artworkID",
    "variableName": "artworkID"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v3 = {
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  {
    "alias": null,
    "args": (v1/*: any*/),
    "kind": "ScalarField",
    "name": "isSavedArtwork",
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
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "artworksConnection(first:1)"
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectListsForArtworkModalQuery",
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
            "args": (v1/*: any*/),
            "kind": "FragmentSpread",
            "name": "SelectListsForArtworkModal_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
    "name": "SelectListsForArtworkModalQuery",
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
            "selections": (v5/*: any*/),
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
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "collectionsConnection(default:false,first:30,saves:true,sort:\"CREATED_AT_DESC\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f098219df974f7413efbf733f4ee8102",
    "id": null,
    "metadata": {},
    "name": "SelectListsForArtworkModalQuery",
    "operationKind": "query",
    "text": "query SelectListsForArtworkModalQuery(\n  $artworkID: String!\n) {\n  me {\n    ...SelectListsForArtworkModal_me_2R6IMa\n    id\n  }\n  artwork(id: $artworkID) {\n    ...SelectListsForArtworkModal_artwork\n    id\n  }\n}\n\nfragment SelectListItem_item on Collection {\n  name\n  artworksCount\n  artworksConnection(first: 1) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SelectListsForArtworkHeader_artwork on Artwork {\n  title\n  date\n  image {\n    url(version: \"square\")\n  }\n}\n\nfragment SelectListsForArtworkModal_artwork on Artwork {\n  ...SelectListsForArtworkHeader_artwork\n}\n\nfragment SelectListsForArtworkModal_me_2R6IMa on Me {\n  defaultSaves: collection(id: \"saved-artwork\") {\n    internalID\n    isSavedArtwork(artworkID: $artworkID)\n    ...SelectListItem_item\n    id\n  }\n  collectionsConnection(first: 30, default: false, saves: true, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        isSavedArtwork(artworkID: $artworkID)\n        ...SelectListItem_item\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "60909341344f6400c8392a24678f26c2";

export default node;
