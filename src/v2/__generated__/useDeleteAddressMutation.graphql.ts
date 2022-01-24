/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DeleteUserAddressInput = {
    clientMutationId?: string | null;
    userAddressID: string;
};
export type useDeleteAddressMutationVariables = {
    input: DeleteUserAddressInput;
};
export type useDeleteAddressMutationResponse = {
    readonly deleteUserAddress: {
        readonly me: {
            readonly " $fragmentRefs": FragmentRefs<"SettingsShippingAddresses_me">;
        };
        readonly userAddressOrErrors: {
            readonly errors?: ReadonlyArray<{
                readonly message: string;
            }>;
            readonly " $fragmentRefs": FragmentRefs<"SettingsShippingAddress_address">;
        };
    } | null;
};
export type useDeleteAddressMutation = {
    readonly response: useDeleteAddressMutationResponse;
    readonly variables: useDeleteAddressMutationVariables;
};



/*
mutation useDeleteAddressMutation(
  $input: DeleteUserAddressInput!
) {
  deleteUserAddress(input: $input) {
    me {
      ...SettingsShippingAddresses_me
      id
    }
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

fragment SettingsShippingAddresses_me on Me {
  addresses: addressConnection {
    edges {
      node {
        internalID
        ...SettingsShippingAddress_address
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
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteUserAddressPayload",
        "kind": "LinkedField",
        "name": "deleteUserAddress",
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
                "name": "SettingsShippingAddresses_me"
              }
            ],
            "storageKey": null
          },
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
    "name": "useDeleteAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteUserAddressPayload",
        "kind": "LinkedField",
        "name": "deleteUserAddress",
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
                "alias": "addresses",
                "args": null,
                "concreteType": "UserAddressConnection",
                "kind": "LinkedField",
                "name": "addressConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserAddressEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserAddress",
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
                "storageKey": null
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
                "selections": (v4/*: any*/),
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
    "cacheID": "ad2a73c3171eda7f4983bb8db99ceca9",
    "id": null,
    "metadata": {},
    "name": "useDeleteAddressMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteAddressMutation(\n  $input: DeleteUserAddressInput!\n) {\n  deleteUserAddress(input: $input) {\n    me {\n      ...SettingsShippingAddresses_me\n      id\n    }\n    userAddressOrErrors {\n      __typename\n      ... on UserAddress {\n        ...SettingsShippingAddress_address\n        id\n      }\n      ... on Errors {\n        errors {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment SettingsShippingAddress_address on UserAddress {\n  internalID\n  addressLine1\n  addressLine2\n  city\n  country\n  isDefault\n  name\n  phoneNumber\n  postalCode\n  region\n}\n\nfragment SettingsShippingAddresses_me on Me {\n  addresses: addressConnection {\n    edges {\n      node {\n        internalID\n        ...SettingsShippingAddress_address\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '30cd5ab1fde3cfa766e7168a5a5d5911';
export default node;
