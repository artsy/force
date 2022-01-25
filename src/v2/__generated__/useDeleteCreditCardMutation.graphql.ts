/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DeleteCreditCardInput = {
    clientMutationId?: string | null;
    id: string;
};
export type useDeleteCreditCardMutationVariables = {
    input: DeleteCreditCardInput;
};
export type useDeleteCreditCardMutationResponse = {
    readonly deleteCreditCard: {
        readonly me: {
            readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsMethods_me">;
        } | null;
        readonly creditCardOrError: {
            readonly creditCard?: {
                readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsMethod_method">;
            } | null;
            readonly mutationError?: {
                readonly message: string;
            } | null;
        } | null;
    } | null;
};
export type useDeleteCreditCardMutation = {
    readonly response: useDeleteCreditCardMutationResponse;
    readonly variables: useDeleteCreditCardMutationVariables;
};



/*
mutation useDeleteCreditCardMutation(
  $input: DeleteCreditCardInput!
) {
  deleteCreditCard(input: $input) {
    me {
      ...SettingsPaymentsMethods_me
      id
    }
    creditCardOrError {
      __typename
      ... on CreditCardMutationSuccess {
        creditCard {
          ...SettingsPaymentsMethod_method
          id
        }
      }
      ... on CreditCardMutationFailure {
        mutationError {
          message
        }
      }
    }
  }
}

fragment SettingsPaymentsMethod_method on CreditCard {
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
        ...SettingsPaymentsMethod_method
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
  "type": "CreditCardMutationFailure",
  "abstractKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
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
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteCreditCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteCreditCardPayload",
        "kind": "LinkedField",
        "name": "deleteCreditCard",
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
                        "name": "SettingsPaymentsMethod_method"
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
    "name": "useDeleteCreditCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteCreditCardPayload",
        "kind": "LinkedField",
        "name": "deleteCreditCard",
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
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 50
                  }
                ],
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
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "creditCards(first:50)"
              },
              (v3/*: any*/)
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
                    "selections": (v4/*: any*/),
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
    "cacheID": "b0dde5b9c61ebee68ae599b0d2f3c64d",
    "id": null,
    "metadata": {},
    "name": "useDeleteCreditCardMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteCreditCardMutation(\n  $input: DeleteCreditCardInput!\n) {\n  deleteCreditCard(input: $input) {\n    me {\n      ...SettingsPaymentsMethods_me\n      id\n    }\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCard {\n          ...SettingsPaymentsMethod_method\n          id\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsPaymentsMethod_method on CreditCard {\n  internalID\n  name\n  brand\n  lastDigits\n  expirationYear\n  expirationMonth\n}\n\nfragment SettingsPaymentsMethods_me on Me {\n  creditCards(first: 50) {\n    edges {\n      node {\n        internalID\n        ...SettingsPaymentsMethod_method\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '16f7357d04130c62f4e7a4a034ab4949';
export default node;
