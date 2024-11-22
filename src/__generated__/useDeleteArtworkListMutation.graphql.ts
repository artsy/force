/**
 * @generated SignedSource<<6c831660e0bd6855f6759d7467da2692>>
 * @relayHash 0e755afbf6a66f051770fe2c7b61796e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0e755afbf6a66f051770fe2c7b61796e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deleteCollectionInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type useDeleteArtworkListMutation$variables = {
  input: deleteCollectionInput;
};
export type useDeleteArtworkListMutation$data = {
  readonly deleteCollection: {
    readonly responseOrError: {
      readonly __typename: "DeleteCollectionFailure";
      readonly mutationError: {
        readonly message: string;
        readonly statusCode: number | null | undefined;
      } | null | undefined;
    } | {
      readonly __typename: "DeleteCollectionSuccess";
      readonly artworkList: {
        readonly id: string;
      } | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type useDeleteArtworkListMutation = {
  response: useDeleteArtworkListMutation$data;
  variables: useDeleteArtworkListMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "deleteCollectionPayload",
    "kind": "LinkedField",
    "name": "deleteCollection",
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
                "alias": "artworkList",
                "args": null,
                "concreteType": "Collection",
                "kind": "LinkedField",
                "name": "collection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "DeleteCollectionSuccess",
            "abstractKey": null
          },
          {
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
                    "name": "message",
                    "storageKey": null
                  },
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
            "type": "DeleteCollectionFailure",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteArtworkListMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteArtworkListMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0e755afbf6a66f051770fe2c7b61796e",
    "metadata": {},
    "name": "useDeleteArtworkListMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "9bb9f88a0393db865d9e3a52df30c4c9";

export default node;
