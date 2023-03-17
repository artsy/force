/**
 * @generated SignedSource<<0ac3bffd511b56285bb7476d5b72c405>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deleteCollectionInput = {
  clientMutationId?: string | null;
  id: string;
};
export type useDeleteCollectionMutation$variables = {
  input: deleteCollectionInput;
};
export type useDeleteCollectionMutation$data = {
  readonly deleteCollection: {
    readonly responseOrError: {
      readonly __typename: "DeleteCollectionFailure";
      readonly mutationError: {
        readonly message: string;
        readonly statusCode: number | null;
      } | null;
    } | {
      readonly __typename: "DeleteCollectionSuccess";
      readonly collection: {
        readonly id: string;
      } | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null;
};
export type useDeleteCollectionMutation = {
  response: useDeleteCollectionMutation$data;
  variables: useDeleteCollectionMutation$variables;
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
                "alias": null,
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
    "name": "useDeleteCollectionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteCollectionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b55ee2de2db8af67f58443b58b6750ba",
    "id": null,
    "metadata": {},
    "name": "useDeleteCollectionMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteCollectionMutation(\n  $input: deleteCollectionInput!\n) {\n  deleteCollection(input: $input) {\n    responseOrError {\n      __typename\n      ... on DeleteCollectionSuccess {\n        collection {\n          id\n        }\n      }\n      ... on DeleteCollectionFailure {\n        mutationError {\n          message\n          statusCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cd4660036df1dbb6578207830b0db6f5";

export default node;
