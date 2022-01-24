/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateUserDefaultAddressInput = {
    clientMutationId?: string | null;
    userAddressID: string;
};
export type useSetDefaultAddressMutationVariables = {
    input: UpdateUserDefaultAddressInput;
};
export type useSetDefaultAddressMutationResponse = {
    readonly updateUserDefaultAddress: {
        readonly userAddressOrErrors: {
            readonly errors?: ReadonlyArray<{
                readonly message: string;
            }>;
            readonly " $fragmentRefs": FragmentRefs<"SettingsShippingAddress_address">;
        };
    } | null;
};
export type useSetDefaultAddressMutation = {
    readonly response: useSetDefaultAddressMutationResponse;
    readonly variables: useSetDefaultAddressMutationVariables;
};



/*
mutation useSetDefaultAddressMutation(
  $input: UpdateUserDefaultAddressInput!
) {
  updateUserDefaultAddress(input: $input) {
    userAddressOrErrors {
      __typename
      ... on UserAddress {
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
    "name": "useSetDefaultAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUserDefaultAddressPayload",
        "kind": "LinkedField",
        "name": "updateUserDefaultAddress",
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
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "SettingsShippingAddress_address"
                  }
                ],
                "type": "UserAddress",
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
    "name": "useSetDefaultAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUserDefaultAddressPayload",
        "kind": "LinkedField",
        "name": "updateUserDefaultAddress",
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
    "cacheID": "a8029397d01dc0faf4d157588c2894be",
    "id": null,
    "metadata": {},
    "name": "useSetDefaultAddressMutation",
    "operationKind": "mutation",
    "text": "mutation useSetDefaultAddressMutation(\n  $input: UpdateUserDefaultAddressInput!\n) {\n  updateUserDefaultAddress(input: $input) {\n    userAddressOrErrors {\n      __typename\n      ... on UserAddress {\n        ...SettingsShippingAddress_address\n        id\n      }\n      ... on Errors {\n        errors {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsShippingAddress_address on UserAddress {\n  internalID\n  addressLine1\n  addressLine2\n  city\n  country\n  isDefault\n  name\n  phoneNumber\n  postalCode\n  region\n}\n"
  }
};
})();
(node as any).hash = '73164b6d9e1314f17593c35faf81384a';
export default node;
