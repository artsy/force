/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DeleteBankAccountInput = {
    clientMutationId?: string | null | undefined;
    id: string;
};
export type useDeleteBankAccountMutationVariables = {
    input: DeleteBankAccountInput;
};
export type useDeleteBankAccountMutationResponse = {
    readonly deleteBankAccount: {
        readonly me: {
            readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsMethods_me">;
        } | null;
        readonly bankAccountOrError: {
            readonly bankAccount?: {
                readonly " $fragmentRefs": FragmentRefs<"SettingsBankAccount_bankAccount">;
            } | null | undefined;
            readonly mutationError?: {
                readonly message: string;
            } | null | undefined;
        } | null;
    } | null;
};
export type useDeleteBankAccountMutation = {
    readonly response: useDeleteBankAccountMutationResponse;
    readonly variables: useDeleteBankAccountMutationVariables;
};



/*
mutation useDeleteBankAccountMutation(
  $input: DeleteBankAccountInput!
) {
  deleteBankAccount(input: $input) {
    me {
      ...SettingsPaymentsMethods_me
      id
    }
    bankAccountOrError {
      __typename
      ... on BankAccountMutationSuccess {
        bankAccount {
          ...SettingsBankAccount_bankAccount
          id
        }
      }
      ... on BankAccountMutationFailure {
        mutationError {
          message
        }
      }
    }
  }
}

fragment SettingsBankAccount_bankAccount on BankAccount {
  internalID
  last4
}

fragment SettingsCreditCard_creditCard on CreditCard {
  internalID
  name
  brand
  lastDigits
  expirationYear
  expirationMonth
}

fragment SettingsPaymentsMethods_me on Me {
  creditCards(first: 50) {
    edges {
      node {
        internalID
        ...SettingsCreditCard_creditCard
        id
      }
    }
  }
  bankAccounts(first: 50) {
    edges {
      node {
        internalID
        ...SettingsBankAccount_bankAccount
        id
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
  "type": "BankAccountMutationFailure",
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
    "name": "last4",
    "storageKey": null
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteBankAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteBankAccountPayload",
        "kind": "LinkedField",
        "name": "deleteBankAccount",
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
            "name": "bankAccountOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BankAccount",
                    "kind": "LinkedField",
                    "name": "bankAccount",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "SettingsBankAccount_bankAccount"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "BankAccountMutationSuccess",
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
    "name": "useDeleteBankAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteBankAccountPayload",
        "kind": "LinkedField",
        "name": "deleteBankAccount",
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
                        "selections": [
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
                        ],
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
                        "selections": (v6/*: any*/),
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
            "name": "bankAccountOrError",
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
                    "concreteType": "BankAccount",
                    "kind": "LinkedField",
                    "name": "bankAccount",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "BankAccountMutationSuccess",
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
    "cacheID": "e0b7565bc33bb7801c84d05d78f098e3",
    "id": null,
    "metadata": {},
    "name": "useDeleteBankAccountMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteBankAccountMutation(\n  $input: DeleteBankAccountInput!\n) {\n  deleteBankAccount(input: $input) {\n    me {\n      ...SettingsPaymentsMethods_me\n      id\n    }\n    bankAccountOrError {\n      __typename\n      ... on BankAccountMutationSuccess {\n        bankAccount {\n          ...SettingsBankAccount_bankAccount\n          id\n        }\n      }\n      ... on BankAccountMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsBankAccount_bankAccount on BankAccount {\n  internalID\n  last4\n}\n\nfragment SettingsCreditCard_creditCard on CreditCard {\n  internalID\n  name\n  brand\n  lastDigits\n  expirationYear\n  expirationMonth\n}\n\nfragment SettingsPaymentsMethods_me on Me {\n  creditCards(first: 50) {\n    edges {\n      node {\n        internalID\n        ...SettingsCreditCard_creditCard\n        id\n      }\n    }\n  }\n  bankAccounts(first: 50) {\n    edges {\n      node {\n        internalID\n        ...SettingsBankAccount_bankAccount\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3f412db286ec13bf72154f61855e2542';
export default node;
