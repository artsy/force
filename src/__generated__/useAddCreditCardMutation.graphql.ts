/**
 * @generated SignedSource<<8cb825068449738962296a1b02c982e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreditCardInput = {
  clientMutationId?: string | null | undefined;
  oneTimeUse?: boolean | null | undefined;
  token: string;
};
export type useAddCreditCardMutation$variables = {
  input: CreditCardInput;
};
export type useAddCreditCardMutation$data = {
  readonly createCreditCard: {
    readonly creditCardOrError: {
      readonly creditCard?: {
        readonly " $fragmentSpreads": FragmentRefs<"SettingsCreditCard_creditCard">;
      } | null | undefined;
      readonly mutationError?: {
        readonly message: string;
      } | null | undefined;
    } | null | undefined;
    readonly me: {
      readonly " $fragmentSpreads": FragmentRefs<"SettingsPaymentsMethods_me">;
    } | null | undefined;
  } | null | undefined;
};
export type useAddCreditCardMutation = {
  response: useAddCreditCardMutation$data;
  variables: useAddCreditCardMutation$variables;
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CreditCardMutationFailure",
  "abstractKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "brand",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastDigits",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "expirationYear",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "expirationMonth",
    "storageKey": null
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useAddCreditCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreditCardPayload",
        "kind": "LinkedField",
        "name": "createCreditCard",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SettingsPaymentsMethods_me"
              }
            ],
            "storageKey": null
          },
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
                    "concreteType": "CreditCard",
                    "kind": "LinkedField",
                    "name": "creditCard",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "SettingsCreditCard_creditCard"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CreditCardMutationSuccess",
                "abstractKey": null
              },
              (v2/*: any*/)
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
    "name": "useAddCreditCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreditCardPayload",
        "kind": "LinkedField",
        "name": "createCreditCard",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "CreditCardConnection",
                "kind": "LinkedField",
                "name": "creditCards",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCardEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "creditCards(first:50)"
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "BankAccountConnection",
                "kind": "LinkedField",
                "name": "bankAccounts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BankAccountEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "BankAccount",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "last4",
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "bankAccounts(first:50)"
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
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
                    "concreteType": "CreditCard",
                    "kind": "LinkedField",
                    "name": "creditCard",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "CreditCardMutationSuccess",
                "abstractKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5947d5b0603bb6b30e372014b40a53b7",
    "id": null,
    "metadata": {},
    "name": "useAddCreditCardMutation",
    "operationKind": "mutation",
    "text": "mutation useAddCreditCardMutation(\n  $input: CreditCardInput!\n) {\n  createCreditCard(input: $input) {\n    me {\n      ...SettingsPaymentsMethods_me\n      id\n    }\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCard {\n          ...SettingsCreditCard_creditCard\n          id\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsBankAccount_bankAccount on BankAccount {\n  internalID\n  last4\n}\n\nfragment SettingsCreditCard_creditCard on CreditCard {\n  internalID\n  name\n  brand\n  lastDigits\n  expirationYear\n  expirationMonth\n}\n\nfragment SettingsPaymentsMethods_me on Me {\n  creditCards(first: 50) {\n    edges {\n      node {\n        internalID\n        ...SettingsCreditCard_creditCard\n        id\n      }\n    }\n  }\n  bankAccounts(first: 50) {\n    edges {\n      node {\n        internalID\n        ...SettingsBankAccount_bankAccount\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e064482f600ae2ee3f6de660c742a52";

export default node;
