/**
 * @generated SignedSource<<980278e3a3d1ceef3cde71e58d0d3725>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CurrencyPreference = "EUR" | "GBP" | "USD" | "%future added value";
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type CreditCardInput = {
  clientMutationId?: string | null | undefined;
  oneTimeUse?: boolean | null | undefined;
  token: string;
};
export type UpdateMyProfileInput = {
  artworksPerYear?: string | null | undefined;
  bio?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  collectorLevel?: number | null | undefined;
  completedOnboarding?: boolean | null | undefined;
  currencyPreference?: CurrencyPreference | null | undefined;
  email?: string | null | undefined;
  emailFrequency?: string | null | undefined;
  gender?: string | null | undefined;
  iconUrl?: string | null | undefined;
  industry?: string | null | undefined;
  isCollector?: boolean | null | undefined;
  lengthUnitPreference?: LengthUnitPreference | null | undefined;
  location?: EditableLocation | null | undefined;
  name?: string | null | undefined;
  notes?: string | null | undefined;
  otherRelevantPositions?: string | null | undefined;
  password?: string | null | undefined;
  phone?: string | null | undefined;
  phoneCountryCode?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  priceRangeMax?: number | null | undefined;
  priceRangeMin?: number | null | undefined;
  privacy?: string | null | undefined;
  profession?: string | null | undefined;
  promptedForUpdate?: boolean | null | undefined;
  receiveLotOpeningSoonNotification?: boolean | null | undefined;
  receiveNewSalesNotification?: boolean | null | undefined;
  receiveNewWorksNotification?: boolean | null | undefined;
  receiveOrderNotification?: boolean | null | undefined;
  receiveOutbidNotification?: boolean | null | undefined;
  receivePartnerOfferNotification?: boolean | null | undefined;
  receivePartnerShowNotification?: boolean | null | undefined;
  receivePromotionNotification?: boolean | null | undefined;
  receivePurchaseNotification?: boolean | null | undefined;
  receiveSaleOpeningClosingNotification?: boolean | null | undefined;
  receiveViewingRoomNotification?: boolean | null | undefined;
  shareFollows?: boolean | null | undefined;
};
export type EditableLocation = {
  address?: string | null | undefined;
  address2?: string | null | undefined;
  city?: string | null | undefined;
  coordinates?: ReadonlyArray<number> | null | undefined;
  country?: string | null | undefined;
  countryCode?: string | null | undefined;
  postalCode?: string | null | undefined;
  state?: string | null | undefined;
  stateCode?: string | null | undefined;
  summary?: string | null | undefined;
};
export type useAddCreditCardAndUpdateProfileMutation$variables = {
  creditCardInput: CreditCardInput;
  profileInput: UpdateMyProfileInput;
};
export type useAddCreditCardAndUpdateProfileMutation$data = {
  readonly createCreditCard: {
    readonly creditCardOrError: {
      readonly creditCardEdge?: {
        readonly node: {
          readonly lastDigits: string;
        } | null | undefined;
      } | null | undefined;
      readonly mutationError?: {
        readonly detail: string | null | undefined;
        readonly message: string;
        readonly type: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly updateMyUserProfile: {
    readonly user: {
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined;
};
export type useAddCreditCardAndUpdateProfileMutation = {
  response: useAddCreditCardAndUpdateProfileMutation$data;
  variables: useAddCreditCardAndUpdateProfileMutation$variables;
};

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
    "name": "useAddCreditCardAndUpdateProfileMutation",
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
    "name": "useAddCreditCardAndUpdateProfileMutation",
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
    "cacheID": "9005c85d37fb2dc5f6000b558ed459f6",
    "id": null,
    "metadata": {},
    "name": "useAddCreditCardAndUpdateProfileMutation",
    "operationKind": "mutation",
    "text": "mutation useAddCreditCardAndUpdateProfileMutation(\n  $creditCardInput: CreditCardInput!\n  $profileInput: UpdateMyProfileInput!\n) {\n  updateMyUserProfile(input: $profileInput) {\n    user {\n      internalID\n      id\n    }\n  }\n  createCreditCard(input: $creditCardInput) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCardEdge {\n          node {\n            lastDigits\n            id\n          }\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "950f8ec45774ad1bf44857df41f815d7";

export default node;
