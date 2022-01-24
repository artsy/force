/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
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
    phoneNumberCountryCode?: string | null;
    postalCode?: string | null;
    region?: string | null;
};
export type useAddAddressMutationVariables = {
    input: CreateUserAddressInput;
};
export type useAddAddressMutationResponse = {
    readonly createUserAddress: {
        readonly userAddressOrErrors: {
            readonly internalID?: string;
            readonly errors?: ReadonlyArray<{
                readonly message: string;
            }>;
            readonly " $fragmentRefs": FragmentRefs<"SettingsShippingAddress_address">;
        };
    } | null;
};
export type useAddAddressMutation = {
    readonly response: useAddAddressMutationResponse;
    readonly variables: useAddAddressMutationVariables;
};



/*
mutation useAddAddressMutation(
  $input: CreateUserAddressInput!
) {
  createUserAddress(input: $input) {
    userAddressOrErrors {
      __typename
      ... on UserAddress {
        internalID
        ...SettingsShippingAddress_address
        id
      }
      ... on Errors {
        errors {
          message
        }
      }
    }
  }
}

fragment SettingsShippingAddress_address on UserAddress {
  internalID
  addressLine1
  addressLine2
  city
  country
  isDefault
  name
  phoneNumber
  postalCode
  region
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
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
    "name": "useAddAddressMutation",
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
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "SettingsShippingAddress_address"
                  }
                ],
                "type": "UserAddress",
                "abstractKey": null
              },
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
    "name": "useAddAddressMutation",
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
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "type": "UserAddress",
                "abstractKey": null
              },
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
    "cacheID": "92851fe4a5b0e6a81f2657014b9cf0d2",
    "id": null,
    "metadata": {},
    "name": "useAddAddressMutation",
    "operationKind": "mutation",
    "text": "mutation useAddAddressMutation(\n  $input: CreateUserAddressInput!\n) {\n  createUserAddress(input: $input) {\n    userAddressOrErrors {\n      __typename\n      ... on UserAddress {\n        internalID\n        ...SettingsShippingAddress_address\n        id\n      }\n      ... on Errors {\n        errors {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsShippingAddress_address on UserAddress {\n  internalID\n  addressLine1\n  addressLine2\n  city\n  country\n  isDefault\n  name\n  phoneNumber\n  postalCode\n  region\n}\n"
  }
};
})();
(node as any).hash = '07bbb98d8b2298a01f725cf82aaceb2a';
export default node;
