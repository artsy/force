/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type startIdentityVerificationMutationInput = {
    clientMutationId?: string | null;
    identityVerificationId: string;
};
export type IdentityVerificationAppStartMutationVariables = {
    input: startIdentityVerificationMutationInput;
};
export type IdentityVerificationAppStartMutationResponse = {
    readonly startIdentityVerification: {
        readonly startIdentityVerificationResponseOrError: {
            readonly identityVerificationFlowUrl?: string | null;
            readonly mutationError?: {
                readonly detail: string | null;
                readonly error: string | null;
                readonly message: string;
            } | null;
        } | null;
    } | null;
};
export type IdentityVerificationAppStartMutation = {
    readonly response: IdentityVerificationAppStartMutationResponse;
    readonly variables: IdentityVerificationAppStartMutationVariables;
};



/*
mutation IdentityVerificationAppStartMutation(
  $input: startIdentityVerificationMutationInput!
) {
  startIdentityVerification(input: $input) {
    startIdentityVerificationResponseOrError {
      __typename
      ... on StartIdentityVerificationSuccess {
        identityVerificationFlowUrl
      }
      ... on StartIdentityVerificationFailure {
        mutationError {
          detail
          error
          message
        }
      }
    }
  }
}
*/

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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "identityVerificationFlowUrl",
      "storageKey": null
    }
  ],
  "type": "StartIdentityVerificationSuccess",
  "abstractKey": null
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
          "name": "detail",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "error",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StartIdentityVerificationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IdentityVerificationAppStartMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "startIdentityVerificationMutationPayload",
        "kind": "LinkedField",
        "name": "startIdentityVerification",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "startIdentityVerificationResponseOrError",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IdentityVerificationAppStartMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "startIdentityVerificationMutationPayload",
        "kind": "LinkedField",
        "name": "startIdentityVerification",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "startIdentityVerificationResponseOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
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
    "cacheID": "2f05867d8850e6b7dd5b60bc193f489e",
    "id": null,
    "metadata": {},
    "name": "IdentityVerificationAppStartMutation",
    "operationKind": "mutation",
    "text": "mutation IdentityVerificationAppStartMutation(\n  $input: startIdentityVerificationMutationInput!\n) {\n  startIdentityVerification(input: $input) {\n    startIdentityVerificationResponseOrError {\n      __typename\n      ... on StartIdentityVerificationSuccess {\n        identityVerificationFlowUrl\n      }\n      ... on StartIdentityVerificationFailure {\n        mutationError {\n          detail\n          error\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5fb8327f4b811236854bf71ccdb299bd';
export default node;
