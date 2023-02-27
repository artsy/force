/**
 * @generated SignedSource<<bb5550dd1de1cdd9aa257e61ca221f88>>
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
      readonly addedToCollections?: ReadonlyArray<{
        readonly artworksCount: number;
        readonly internalID: string;
      } | null> | null;
      readonly mutationError?: {
        readonly statusCode: number | null;
      } | null;
      readonly removedFromCollections?: ReadonlyArray<{
        readonly artworksCount: number;
        readonly internalID: string;
      } | null> | null;
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
  "name": "internalID",
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
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
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
v6 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "addedToCollections",
                    "plural": true,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "removedFromCollections",
                    "plural": true,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "ArtworksCollectionsBatchUpdateSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
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
                    "alias": null,
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "addedToCollections",
                    "plural": true,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Collection",
                    "kind": "LinkedField",
                    "name": "removedFromCollections",
                    "plural": true,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "ArtworksCollectionsBatchUpdateSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4087a5ab425c05aca991344b8cc6c756",
    "id": null,
    "metadata": {},
    "name": "useUpdateCollectionsForArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCollectionsForArtworkMutation(\n  $input: ArtworksCollectionsBatchUpdateInput!\n) {\n  artworksCollectionsBatchUpdate(input: $input) {\n    responseOrError {\n      __typename\n      ... on ArtworksCollectionsBatchUpdateSuccess {\n        addedToCollections {\n          internalID\n          artworksCount\n          id\n        }\n        removedFromCollections {\n          internalID\n          artworksCount\n          id\n        }\n      }\n      ... on ArtworksCollectionsBatchUpdateFailure {\n        mutationError {\n          statusCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2c126fc4eb04d00d985143b4301bf564";

export default node;
