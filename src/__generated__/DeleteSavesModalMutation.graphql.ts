/**
 * @generated SignedSource<<e213db694ab887324e37ad162705a8c7>>
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
export type DeleteSavesModalMutation$variables = {
  input: deleteCollectionInput;
};
export type DeleteSavesModalMutation$data = {
  readonly deleteCollection: {
    readonly responseOrError: {
      readonly __typename: "DeleteCollectionFailure";
      readonly mutationError: {
        readonly message: string;
        readonly statusCode: number | null;
      } | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null;
};
export type DeleteSavesModalMutation = {
  response: DeleteSavesModalMutation$data;
  variables: DeleteSavesModalMutation$variables;
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
    "name": "DeleteSavesModalMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteSavesModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "06286b93b30c0730a9415d12329e4ba1",
    "id": null,
    "metadata": {},
    "name": "DeleteSavesModalMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteSavesModalMutation(\n  $input: deleteCollectionInput!\n) {\n  deleteCollection(input: $input) {\n    responseOrError {\n      __typename\n      ... on DeleteCollectionFailure {\n        mutationError {\n          message\n          statusCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "59f147ada3d219e3c9b95dd32c1e6bc9";

export default node;
