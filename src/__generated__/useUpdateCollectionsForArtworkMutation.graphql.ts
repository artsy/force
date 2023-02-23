/**
 * @generated SignedSource<<3c322683f900bcbe6604a424402d5d82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ArtworksCollectionsBatchUpdateInput = {
  addToCollectionIDs?: ReadonlyArray<string> | null;
  artworkIDs: ReadonlyArray<string>;
  clientMutationId?: string | null;
  removeFromCollectionIDs?: ReadonlyArray<string> | null;
};
export type useUpdateCollectionsForArtworkMutation$variables = {
  input: ArtworksCollectionsBatchUpdateInput;
};
export type useUpdateCollectionsForArtworkMutation$data = {
  readonly artworksCollectionsBatchUpdate: {
    readonly responseOrError: {
      readonly __typename: "ArtworksCollectionsBatchUpdateSuccess";
      readonly mutationError?: {
        readonly statusCode: number | null;
      } | null;
    } | null;
  } | null;
};
export type useUpdateCollectionsForArtworkMutation = {
  response: useUpdateCollectionsForArtworkMutation$data;
  variables: useUpdateCollectionsForArtworkMutation$variables;
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateCollectionsForArtworkMutation",
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
                  (v2/*: any*/)
                ],
                "type": "ArtworksCollectionsBatchUpdateSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
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
    "name": "useUpdateCollectionsForArtworkMutation",
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
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c1d82037d1224e542c84dfab01bad1c7",
    "id": null,
    "metadata": {},
    "name": "useUpdateCollectionsForArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCollectionsForArtworkMutation(\n  $input: ArtworksCollectionsBatchUpdateInput!\n) {\n  artworksCollectionsBatchUpdate(input: $input) {\n    responseOrError {\n      __typename\n      ... on ArtworksCollectionsBatchUpdateSuccess {\n        __typename\n      }\n      ... on ArtworksCollectionsBatchUpdateFailure {\n        mutationError {\n          statusCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bb7f26c34020bb78b8a2f16ed8d72889";

export default node;
