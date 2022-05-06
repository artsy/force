/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateUserAddressInput = {
    attributes: UserAddressAttributes;
    clientMutationId?: string | null | undefined;
};
export type UserAddressAttributes = {
    addressLine1: string;
    addressLine2?: string | null | undefined;
    addressLine3?: string | null | undefined;
    city: string;
    country: string;
    name: string;
    phoneNumber?: string | null | undefined;
    phoneNumberCountryCode?: string | null | undefined;
    postalCode?: string | null | undefined;
    region?: string | null | undefined;
};
export type CreateUserAddressMutationVariables = {
    input: CreateUserAddressInput;
};
export type CreateUserAddressMutationResponse = {
    readonly createUserAddress: {
        readonly userAddressOrErrors: {
            readonly id?: string | undefined;
            readonly internalID?: string | undefined;
            readonly addressLine1?: string | undefined;
            readonly addressLine2?: string | null | undefined;
            readonly addressLine3?: string | null | undefined;
            readonly city?: string | undefined;
            readonly country?: string | undefined;
            readonly isDefault?: boolean | undefined;
            readonly name?: string | null | undefined;
            readonly phoneNumber?: string | null | undefined;
            readonly postalCode?: string | null | undefined;
            readonly region?: string | null | undefined;
            readonly errors?: ReadonlyArray<{
                readonly message: string;
            }> | undefined;
        };
    } | null;
};
export type CreateUserAddressMutation = {
    readonly response: CreateUserAddressMutationResponse;
    readonly variables: CreateUserAddressMutationVariables;
};



/*
mutation CreateUserAddressMutation(
  $input: CreateUserAddressInput!
) {
  createUserAddress(input: $input) {
    userAddressOrErrors {
      __typename
      ... on UserAddress {
        id
        internalID
        addressLine1
        addressLine2
        addressLine3
        city
        country
        isDefault
        name
        phoneNumber
        postalCode
        region
      }
      ... on Errors {
        errors {
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "addressLine1",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "addressLine2",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "addressLine3",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefault",
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
      "name": "phoneNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "postalCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "region",
      "storageKey": null
    }
  ],
  "type": "UserAddress",
  "abstractKey": null
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
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Errors",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateUserAddressMutation",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateUserAddressMutation",
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
    "cacheID": "0d9b217798cc13e1c197e32452f62677",
    "id": null,
    "metadata": {},
    "name": "CreateUserAddressMutation",
    "operationKind": "mutation",
    "text": "mutation CreateUserAddressMutation(\n  $input: CreateUserAddressInput!\n) {\n  createUserAddress(input: $input) {\n    userAddressOrErrors {\n      __typename\n      ... on UserAddress {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n      }\n      ... on Errors {\n        errors {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '28b6758809d33bd8ca1ebefa73b51d49';
export default node;
