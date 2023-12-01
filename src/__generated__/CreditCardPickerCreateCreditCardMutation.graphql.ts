/**
 * @generated SignedSource<<5d6bdef39e0b404ff237f146ce6a32d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreditCardInput = {
  clientMutationId?: string | null | undefined;
  oneTimeUse?: boolean | null | undefined;
  token: string;
};
export type CreditCardPickerCreateCreditCardMutation$variables = {
  input: CreditCardInput;
};
export type CreditCardPickerCreateCreditCardMutation$data = {
  readonly createCreditCard: {
    readonly creditCardOrError: {
      readonly creditCard?: {
        readonly brand: string;
        readonly city: string | null | undefined;
        readonly country: string | null | undefined;
        readonly expirationMonth: number;
        readonly expirationYear: number;
        readonly internalID: string;
        readonly lastDigits: string;
        readonly name: string | null | undefined;
        readonly postalCode: string | null | undefined;
        readonly state: string | null | undefined;
        readonly street1: string | null | undefined;
        readonly street2: string | null | undefined;
      } | null | undefined;
      readonly mutationError?: {
        readonly detail: string | null | undefined;
        readonly message: string;
        readonly type: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type CreditCardPickerCreateCreditCardMutation = {
  response: CreditCardPickerCreateCreditCardMutation$data;
  variables: CreditCardPickerCreateCreditCardMutation$variables;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "street1",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "street2",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationMonth",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationYear",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "brand",
  "storageKey": null
},
v14 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreditCardPickerCreateCreditCardMutation",
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CreditCardMutationSuccess",
                "abstractKey": null
              },
              (v14/*: any*/)
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
    "name": "CreditCardPickerCreateCreditCardMutation",
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
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
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
                "type": "CreditCardMutationSuccess",
                "abstractKey": null
              },
              (v14/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dc4c21986b7369a27d25aeaf64797553",
    "id": null,
    "metadata": {},
    "name": "CreditCardPickerCreateCreditCardMutation",
    "operationKind": "mutation",
    "text": "mutation CreditCardPickerCreateCreditCardMutation(\n  $input: CreditCardInput!\n) {\n  createCreditCard(input: $input) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCard {\n          internalID\n          name\n          street1\n          street2\n          city\n          state\n          country\n          postalCode\n          expirationMonth\n          expirationYear\n          lastDigits\n          brand\n          id\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "93d2f38e59fc6191787907ef69756ed8";

export default node;
