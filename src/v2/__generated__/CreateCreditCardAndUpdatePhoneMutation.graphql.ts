/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CurrencyPreference = "EUR" | "GBP" | "USD" | "%future added value";
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type CreditCardInput = {
    clientMutationId?: string | null;
    oneTimeUse?: boolean | null;
    token: string;
};
export type UpdateMyProfileInput = {
    artworksPerYear?: string | null;
    bio?: string | null;
    clientMutationId?: string | null;
    collectorLevel?: number | null;
    completedOnboarding?: boolean | null;
    currencyPreference?: CurrencyPreference | null;
    email?: string | null;
    emailFrequency?: string | null;
    gender?: string | null;
    iconUrl?: string | null;
    industry?: string | null;
    isCollector?: boolean | null;
    lengthUnitPreference?: LengthUnitPreference | null;
    location?: EditableLocation | null;
    name?: string | null;
    notes?: string | null;
    otherRelevantPositions?: string | null;
    password?: string | null;
    phone?: string | null;
    priceRangeMax?: number | null;
    priceRangeMin?: number | null;
    privacy?: string | null;
    profession?: string | null;
    receiveLotOpeningSoonNotification?: boolean | null;
    receiveNewSalesNotification?: boolean | null;
    receiveNewWorksNotification?: boolean | null;
    receiveOutbidNotification?: boolean | null;
    receivePromotionNotification?: boolean | null;
    receivePurchaseNotification?: boolean | null;
    receiveSaleOpeningClosingNotification?: boolean | null;
    shareFollows?: boolean | null;
};
export type EditableLocation = {
    address?: string | null;
    address2?: string | null;
    city?: string | null;
    country?: string | null;
    postalCode?: string | null;
    state?: string | null;
    stateCode?: string | null;
    summary?: string | null;
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
                readonly message: string;
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "creditCardInput"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "profileInput"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
},
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
          "name": "type",
          "storageKey": null
        },
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
          "name": "detail",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CreditCardMutationFailure",
  "abstractKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateCreditCardAndUpdatePhoneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "kind": "LinkedField",
        "name": "updateMyUserProfile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreditCardPayload",
        "kind": "LinkedField",
        "name": "createCreditCard",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "creditCardOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCardEdge",
                    "kind": "LinkedField",
                    "name": "creditCardEdge",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CreditCardMutationSuccess",
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
    "name": "CreateCreditCardAndUpdatePhoneMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMyProfilePayload",
        "kind": "LinkedField",
        "name": "updateMyUserProfile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreditCardPayload",
        "kind": "LinkedField",
        "name": "createCreditCard",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "creditCardOrError",
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
                    "concreteType": "CreditCardEdge",
                    "kind": "LinkedField",
                    "name": "creditCardEdge",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CreditCardMutationSuccess",
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
    "cacheID": "26e06492f97f2709d70422249281b164",
    "id": null,
    "metadata": {},
    "name": "CreateCreditCardAndUpdatePhoneMutation",
    "operationKind": "mutation",
    "text": "mutation CreateCreditCardAndUpdatePhoneMutation(\n  $creditCardInput: CreditCardInput!\n  $profileInput: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $profileInput) {\n    user {\n      internalID\n      id\n    }\n  }\n  createCreditCard(input: $creditCardInput) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCardEdge {\n          node {\n            lastDigits\n            id\n          }\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0e9a10ba21b3de4a4cfdd5c03d3b733b';
export default node;
