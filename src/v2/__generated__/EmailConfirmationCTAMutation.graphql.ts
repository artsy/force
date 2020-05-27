/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type EmailConfirmationCTAMutationVariables = {};
export type EmailConfirmationCTAMutationResponse = {
    readonly sendConfirmationEmail: {
        readonly confirmationOrError: {
            readonly unconfirmedEmail?: string | null;
            readonly mutationError?: {
                readonly error: string | null;
                readonly message: string | null;
            } | null;
        } | null;
    } | null;
};
export type EmailConfirmationCTAMutation = {
    readonly response: EmailConfirmationCTAMutationResponse;
    readonly variables: EmailConfirmationCTAMutationVariables;
};



/*
mutation EmailConfirmationCTAMutation {
  sendConfirmationEmail(input: {}) {
    confirmationOrError {
      __typename
      ... on SendConfirmationEmailMutationSuccess {
        unconfirmedEmail
      }
      ... on SendConfirmationEmailMutationFailure {
        mutationError {
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
    "kind": "Literal",
    "name": "input",
    "value": {}
  }
],
v1 = {
  "kind": "InlineFragment",
  "type": "SendConfirmationEmailMutationSuccess",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "unconfirmedEmail",
      "args": null,
      "storageKey": null
    }
  ]
},
v2 = {
  "kind": "InlineFragment",
  "type": "SendConfirmationEmailMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "mutationError",
      "storageKey": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "error",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "message",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "EmailConfirmationCTAMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendConfirmationEmail",
        "storageKey": "sendConfirmationEmail(input:{})",
        "args": (v0/*: any*/),
        "concreteType": "SendConfirmationEmailMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "confirmationOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EmailConfirmationCTAMutation",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendConfirmationEmail",
        "storageKey": "sendConfirmationEmail(input:{})",
        "args": (v0/*: any*/),
        "concreteType": "SendConfirmationEmailMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "confirmationOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "EmailConfirmationCTAMutation",
    "id": null,
    "text": "mutation EmailConfirmationCTAMutation {\n  sendConfirmationEmail(input: {}) {\n    confirmationOrError {\n      __typename\n      ... on SendConfirmationEmailMutationSuccess {\n        unconfirmedEmail\n      }\n      ... on SendConfirmationEmailMutationFailure {\n        mutationError {\n          error\n          message\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5e61b752f39c278e40b8fd9c5498f3b0';
export default node;
