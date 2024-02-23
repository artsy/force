/**
 * @generated SignedSource<<69bc6a65b9da04853a7ab99dc079faa4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type deleteAlertInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type useDeleteAlertMutation$variables = {
  input: deleteAlertInput;
};
export type useDeleteAlertMutation$data = {
  readonly deleteAlert: {
    readonly responseOrError: {
      readonly alert?: {
        readonly internalID: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useDeleteAlertMutation = {
  response: useDeleteAlertMutation$data;
  variables: useDeleteAlertMutation$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "deleteAlertPayload",
        "kind": "LinkedField",
        "name": "deleteAlert",
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
                    "concreteType": "Alert",
                    "kind": "LinkedField",
                    "name": "alert",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "DeleteAlertSuccess",
                "abstractKey": null
              }
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
    "name": "useDeleteAlertMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "deleteAlertPayload",
        "kind": "LinkedField",
        "name": "deleteAlert",
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
                    "concreteType": "Alert",
                    "kind": "LinkedField",
                    "name": "alert",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                "type": "DeleteAlertSuccess",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e3a4147ddbd03c8d806b279493ec4f7e",
    "id": null,
    "metadata": {},
    "name": "useDeleteAlertMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteAlertMutation(\n  $input: deleteAlertInput!\n) {\n  deleteAlert(input: $input) {\n    responseOrError {\n      __typename\n      ... on DeleteAlertSuccess {\n        alert {\n          internalID\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fcb2784d6ccf26ec63e896d7f70b682a";

export default node;
