/**
 * @generated SignedSource<<87d1ebfbf18b90b4b3dc3080a14e5ade>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateUserAddressInput = {
  attributes: UserAddressAttributes;
  clientMutationId?: string | null | undefined;
  userAddressID: string;
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
export type useOrder2UpdateUserAddressMutation$variables = {
  input: UpdateUserAddressInput;
};
export type useOrder2UpdateUserAddressMutation$data = {
  readonly updateUserAddress: {
    readonly me: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_me">;
    } | null | undefined;
    readonly userAddressOrErrors: {
      readonly addressLine1?: string;
      readonly addressLine2?: string | null | undefined;
      readonly city?: string;
      readonly country?: string;
      readonly errors?: ReadonlyArray<{
        readonly code: string;
      }>;
      readonly internalID?: string;
      readonly name?: string | null | undefined;
      readonly phoneNumber?: string | null | undefined;
      readonly phoneNumberCountryCode?: string | null | undefined;
      readonly postalCode?: string | null | undefined;
      readonly region?: string | null | undefined;
    };
  } | null | undefined;
};
export type useOrder2UpdateUserAddressMutation = {
  response: useOrder2UpdateUserAddressMutation$data;
  variables: useOrder2UpdateUserAddressMutation$variables;
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
  "name": "addressLine1",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine2",
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
  "name": "region",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumber",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumberCountryCode",
  "storageKey": null
},
v12 = {
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Errors",
  "abstractKey": null
},
v13 = {
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
    "name": "useOrder2UpdateUserAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUserAddressPayload",
        "kind": "LinkedField",
        "name": "updateUserAddress",
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
                "name": "Order2DeliveryForm_me"
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "type": "UserAddress",
                "abstractKey": null
              },
              (v12/*: any*/)
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
    "name": "useOrder2UpdateUserAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUserAddressPayload",
        "kind": "LinkedField",
        "name": "updateUserAddress",
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
                    "value": 20
                  }
                ],
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
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v3/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isDefault",
                            "storageKey": null
                          },
                          (v13/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "addressConnection(first:20)"
              },
              (v13/*: any*/)
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
                  (v13/*: any*/)
                ],
                "type": "UserAddress",
                "abstractKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ac6c1e6d767b617b56bec0db1a7a3048",
    "id": null,
    "metadata": {},
    "name": "useOrder2UpdateUserAddressMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2UpdateUserAddressMutation(\n  $input: UpdateUserAddressInput!\n) {\n  updateUserAddress(input: $input) {\n    me {\n      ...Order2DeliveryForm_me\n      id\n    }\n    userAddressOrErrors {\n      __typename\n      ... on UserAddress {\n        internalID\n        name\n        addressLine1\n        addressLine2\n        city\n        region\n        postalCode\n        country\n        phoneNumber\n        phoneNumberCountryCode\n        id\n      }\n      ... on Errors {\n        errors {\n          code\n        }\n      }\n    }\n  }\n}\n\nfragment Order2DeliveryForm_me on Me {\n  addressConnection(first: 20) {\n    edges {\n      node {\n        internalID\n        addressLine1\n        addressLine2\n        city\n        region\n        postalCode\n        country\n        name\n        phoneNumber\n        phoneNumberCountryCode\n        isDefault\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c274118a38f334e5ed2584ef9b87cb89";

export default node;
