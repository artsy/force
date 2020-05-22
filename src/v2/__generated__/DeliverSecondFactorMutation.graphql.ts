/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type DeliverSecondFactorInput = {
    readonly clientMutationId?: string | null;
    readonly secondFactorID: string;
};
export type DeliverSecondFactorMutationVariables = {
    input: DeliverSecondFactorInput;
};
export type DeliverSecondFactorMutationResponse = {
    readonly deliverSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
            readonly formattedPhoneNumber: string | null;
        } | {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
            }>;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        };
    } | null;
};
export type DeliverSecondFactorMutationRawResponse = {
    readonly deliverSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
            readonly formattedPhoneNumber: string | null;
        } | {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
            }>;
        } | {
            readonly __typename: string | null;
        };
    }) | null;
};
export type DeliverSecondFactorMutation = {
    readonly response: DeliverSecondFactorMutationResponse;
    readonly variables: DeliverSecondFactorMutationVariables;
    readonly rawResponse: DeliverSecondFactorMutationRawResponse;
};



/*
mutation DeliverSecondFactorMutation(
  $input: DeliverSecondFactorInput!
) {
  deliverSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on SmsSecondFactor {
        __typename
        formattedPhoneNumber
      }
      ... on Errors {
        __typename
        errors {
          message
          code
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "DeliverSecondFactorInput!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "type": "SmsSecondFactor",
  "selections": [
    (v2/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "formattedPhoneNumber",
      "args": null,
      "storageKey": null
    }
  ]
},
v4 = {
  "kind": "InlineFragment",
  "type": "Errors",
  "selections": [
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "errors",
      "storageKey": null,
      "args": null,
      "concreteType": "Error",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "message",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "code",
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
    "name": "DeliverSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "deliverSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "DeliverSecondFactorPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorOrErrors",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "DeliverSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "deliverSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "DeliverSecondFactorPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorOrErrors",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeliverSecondFactorMutation",
    "id": null,
    "text": "mutation DeliverSecondFactorMutation(\n  $input: DeliverSecondFactorInput!\n) {\n  deliverSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n        formattedPhoneNumber\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'df969678bd1a9ce3e240489af95504c0';
export default node;
