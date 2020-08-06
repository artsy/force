/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreditCardInput = {
    readonly clientMutationId?: string | null;
    readonly oneTimeUse?: boolean | null;
    readonly token: string;
};
export type UpdateMyProfileInput = {
    readonly clientMutationId?: string | null;
    readonly collectorLevel?: number | null;
    readonly email?: string | null;
    readonly location?: EditableLocation | null;
    readonly name?: string | null;
    readonly phone?: string | null;
    readonly priceRangeMax?: number | null;
    readonly priceRangeMin?: number | null;
    readonly receiveLotOpeningSoonNotification?: boolean | null;
    readonly receiveNewSalesNotification?: boolean | null;
    readonly receiveNewWorksNotification?: boolean | null;
    readonly receiveOutbidNotification?: boolean | null;
    readonly receivePromotionNotification?: boolean | null;
    readonly receivePurchaseNotification?: boolean | null;
    readonly receiveSaleOpeningClosingNotification?: boolean | null;
};
export type EditableLocation = {
    readonly address?: string | null;
    readonly address2?: string | null;
    readonly city?: string | null;
    readonly country?: string | null;
    readonly postalCode?: string | null;
    readonly state?: string | null;
    readonly stateCode?: string | null;
    readonly summary?: string | null;
};
export type CreateCreditCardAndUpdatePhoneMutationVariables = {
    creditCardInput: CreditCardInput;
    profileInput: UpdateMyProfileInput;
};
export type CreateCreditCardAndUpdatePhoneMutationResponse = {
    readonly updateMyUserProfile: {
        readonly user: {
            readonly internalID: string;
        } | null;
    } | null;
    readonly createCreditCard: {
        readonly creditCardOrError: {
            readonly creditCardEdge?: {
                readonly node: {
                    readonly lastDigits: string;
                } | null;
            } | null;
            readonly mutationError?: {
                readonly type: string | null;
                readonly message: string | null;
                readonly detail: string | null;
            } | null;
        } | null;
    } | null;
};
export type CreateCreditCardAndUpdatePhoneMutation = {
    readonly response: CreateCreditCardAndUpdatePhoneMutationResponse;
    readonly variables: CreateCreditCardAndUpdatePhoneMutationVariables;
};



/*
mutation CreateCreditCardAndUpdatePhoneMutation(
  $creditCardInput: CreditCardInput!
  $profileInput: UpdateMyProfileInput!
) {
  updateMyUserProfile(input: $profileInput) {
    user {
      internalID
      id
    }
  }
  createCreditCard(input: $creditCardInput) {
    creditCardOrError {
      __typename
      ... on CreditCardMutationSuccess {
        creditCardEdge {
          node {
            lastDigits
            id
          }
        }
      }
      ... on CreditCardMutationFailure {
        mutationError {
          type
          message
          detail
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
    "name": "creditCardInput",
    "type": "CreditCardInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "profileInput",
    "type": "UpdateMyProfileInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "profileInput"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "creditCardInput"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastDigits",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "type": "CreditCardMutationFailure",
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
          "name": "type",
          "args": null,
          "storageKey": null
        },
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
          "name": "detail",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCreditCardAndUpdatePhoneMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateMyUserProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": (v3/*: any*/),
        "concreteType": "CreditCardPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCardOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "CreditCardMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "creditCardEdge",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CreditCardEdge",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCreditCardAndUpdatePhoneMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateMyUserProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": (v3/*: any*/),
        "concreteType": "CreditCardPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCardOrError",
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
              {
                "kind": "InlineFragment",
                "type": "CreditCardMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "creditCardEdge",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CreditCardEdge",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v6/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCreditCardAndUpdatePhoneMutation",
    "id": null,
    "text": "mutation CreateCreditCardAndUpdatePhoneMutation(\n  $creditCardInput: CreditCardInput!\n  $profileInput: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $profileInput) {\n    user {\n      internalID\n      id\n    }\n  }\n  createCreditCard(input: $creditCardInput) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCardEdge {\n          node {\n            lastDigits\n            id\n          }\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '0e9a10ba21b3de4a4cfdd5c03d3b733b';
export default node;
