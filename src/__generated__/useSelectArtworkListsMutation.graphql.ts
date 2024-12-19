/**
 * @generated SignedSource<<a53577fbb46b4affca790949ee172e61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworksCollectionsBatchUpdateInput = {
  addToCollectionIDs?: ReadonlyArray<string> | null | undefined;
  artworkIDs: ReadonlyArray<string>;
  clientMutationId?: string | null | undefined;
  removeFromCollectionIDs?: ReadonlyArray<string> | null | undefined;
};
export type useSelectArtworkListsMutation$variables = {
  input: ArtworksCollectionsBatchUpdateInput;
};
export type useSelectArtworkListsMutation$data = {
  readonly artworksCollectionsBatchUpdate: {
    readonly responseOrError: {
      readonly addedToArtworkLists?: ReadonlyArray<{
        readonly default: boolean;
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtworkListItem_item">;
      } | null | undefined> | null | undefined;
      readonly artwork?: {
        readonly isSavedToAnyList: boolean;
      } | null | undefined;
      readonly mutationError?: {
        readonly statusCode: number | null | undefined;
      } | null | undefined;
      readonly removedFromArtworkLists?: ReadonlyArray<{
        readonly default: boolean;
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtworkListItem_item">;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useSelectArtworkListsMutation = {
  response: useSelectArtworkListsMutation$data;
  variables: useSelectArtworkListsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "default",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "ArtworkListItem_item"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSavedToAnyList",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "statusCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworksCollectionsBatchUpdateFailure",
  "abstractKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v2/*: any*/),
  (v3/*: any*/),
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
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "artworksConnection(first:4)"
  },
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSelectArtworkListsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtworksCollectionsBatchUpdatePayload",
        "kind": "LinkedField",
        "name": "artworksCollectionsBatchUpdate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "addedToArtworkLists",
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "addedToCollections",
                    "plural": true,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": "removedFromArtworkLists",
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "removedFromCollections",
                    "plural": true,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArtworksCollectionsBatchUpdateSuccess",
                "abstractKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSelectArtworkListsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtworksCollectionsBatchUpdatePayload",
        "kind": "LinkedField",
        "name": "artworksCollectionsBatchUpdate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "responseOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "addedToArtworkLists",
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "addedToCollections",
                    "plural": true,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": "removedFromArtworkLists",
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "removedFromCollections",
                    "plural": true,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArtworksCollectionsBatchUpdateSuccess",
                "abstractKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b9d6153f02a9425de4a25f8526299c12",
    "id": null,
    "metadata": {},
    "name": "useSelectArtworkListsMutation",
    "operationKind": "mutation",
    "text": "mutation useSelectArtworkListsMutation(\n  $input: ArtworksCollectionsBatchUpdateInput!\n) {\n  artworksCollectionsBatchUpdate(input: $input) {\n    responseOrError {\n      __typename\n      ... on ArtworksCollectionsBatchUpdateSuccess {\n        addedToArtworkLists: addedToCollections {\n          internalID\n          default\n          ...ArtworkListItem_item\n          id\n        }\n        removedFromArtworkLists: removedFromCollections {\n          internalID\n          default\n          ...ArtworkListItem_item\n          id\n        }\n        artwork {\n          isSavedToAnyList\n          id\n        }\n      }\n      ... on ArtworksCollectionsBatchUpdateFailure {\n        mutationError {\n          statusCode\n        }\n      }\n    }\n  }\n}\n\nfragment ArtworkListItem_item on Collection {\n  default\n  name\n  internalID\n  artworksCount(onlyVisible: true)\n  shareableWithPartners\n  artworksConnection(first: 4) {\n    edges {\n      node {\n        image {\n          url(version: \"square\")\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1a45b67aff26726ed28320e5f5e3524b";

export default node;
