/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateUserAddressInput = {
    attributes: UserAddressAttributes;
    clientMutationId?: string | null;
};
export type UserAddressAttributes = {
    addressLine1: string;
    addressLine2?: string | null;
    addressLine3?: string | null;
    city: string;
    country: string;
    name: string;
    phoneNumber?: string | null;
    postalCode?: string | null;
    region?: string | null;
};
export type ShippingCreateUserAddressMutationVariables = {
    input: CreateUserAddressInput;
};
export type ShippingCreateUserAddressMutationResponse = {
    readonly createUserAddress: {
        readonly userAddressOrErrors: {
            readonly id?: string;
            readonly internalID?: string;
            readonly errors?: ReadonlyArray<{
                readonly code: string;
                readonly message: string;
            }>;
        };
    } | null;
};
export type ShippingCreateUserAddressMutation = {
    readonly response: ShippingCreateUserAddressMutationResponse;
    readonly variables: ShippingCreateUserAddressMutationVariables;
};



/*
mutation ShippingCreateUserAddressMutation(
  $input: CreateUserAddressInput!
) {
  createUserAddress(input: $input) {
    userAddressOrErrors {
      __typename
      ... on UserAddress {
        id
        internalID
      }
      ... on Errors {
        errors {
          code
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
    "name": "input",
    "type": "CreateUserAddressInput!"
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
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "UserAddress"
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Error",
      "kind": "LinkedField",
      "name": "errors",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
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
  "type": "Errors"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShippingCreateUserAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserAddressPayload",
        "kind": "LinkedField",
        "name": "createUserAddress",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userAddressOrErrors",
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
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShippingCreateUserAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserAddressPayload",
        "kind": "LinkedField",
        "name": "createUserAddress",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userAddressOrErrors",
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
    "id": null,
    "metadata": {},
    "name": "ShippingCreateUserAddressMutation",
    "operationKind": "mutation",
    "text": "mutation ShippingCreateUserAddressMutation(\n  $input: CreateUserAddressInput!\n) {\n  createUserAddress(input: $input) {\n    userAddressOrErrors {\n      __typename\n      ... on UserAddress {\n        id\n        internalID\n      }\n      ... on Errors {\n        errors {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6acb5693bdd8fbbf5ce46a3e2d63d03e';
export default node;
