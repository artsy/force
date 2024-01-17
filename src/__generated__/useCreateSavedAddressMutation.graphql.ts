/**
 * @generated SignedSource<<d28db51b1356882bfedd23e4cef2c745>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
export type useCreateSavedAddressMutation$variables = {
  input: CreateUserAddressInput;
};
export type useCreateSavedAddressMutation$data = {
  readonly createUserAddress: {
    readonly me: {
      readonly " $fragmentSpreads": FragmentRefs<"Shipping2_me">;
    } | null | undefined;
    readonly userAddressOrErrors: {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly message: string;
      }>;
    } | {
      readonly __typename: "UserAddress";
      readonly addressLine1: string;
      readonly addressLine2: string | null | undefined;
      readonly addressLine3: string | null | undefined;
      readonly city: string;
      readonly country: string;
      readonly id: string;
      readonly internalID: string;
      readonly isDefault: boolean;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type useCreateSavedAddressMutation = {
  response: useCreateSavedAddressMutation$data;
  variables: useCreateSavedAddressMutation$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "name": "addressLine3",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
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
  "name": "isDefault",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumber",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "region",
  "storageKey": null
},
v14 = {
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
        (v12/*: any*/),
        (v13/*: any*/)
      ],
      "type": "UserAddress",
      "abstractKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateSavedAddressMutation",
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
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Shipping2_me"
              }
            ],
            "storageKey": null
          },
          (v14/*: any*/)
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
    "name": "useCreateSavedAddressMutation",
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
                    "value": 30
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
                          (v3/*: any*/),
                          (v10/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/),
                          (v13/*: any*/),
                          (v12/*: any*/),
                          (v8/*: any*/),
                          (v11/*: any*/),
                          (v9/*: any*/),
                          (v2/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "addressConnection(first:30)"
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MyLocation",
                "kind": "LinkedField",
                "name": "location",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v14/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d6026bb613dc7cdd258eabb740939b06",
    "id": null,
    "metadata": {},
    "name": "useCreateSavedAddressMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateSavedAddressMutation(\n  $input: CreateUserAddressInput!\n) {\n  createUserAddress(input: $input) {\n    me {\n      ...Shipping2_me\n      id\n    }\n    userAddressOrErrors {\n      __typename\n      ... on Errors {\n        errors {\n          message\n        }\n      }\n      ... on UserAddress {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n      }\n    }\n  }\n}\n\nfragment FulfillmentDetailsForm_me on Me {\n  ...SavedAddresses2_me\n  name\n  email\n  id\n  location {\n    country\n    id\n  }\n  addressConnection(first: 30) {\n    edges {\n      node {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n      }\n    }\n  }\n}\n\nfragment SavedAddresses2_me on Me {\n  addressConnection(first: 30) {\n    edges {\n      node {\n        internalID\n        name\n        addressLine1\n        addressLine2\n        city\n        region\n        postalCode\n        country\n        phoneNumber\n        isDefault\n        id\n      }\n    }\n  }\n}\n\nfragment Shipping2_me on Me {\n  ...FulfillmentDetailsForm_me\n  addressConnection(first: 30) {\n    edges {\n      node {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb7c8760ea3300b57f3b56327f5fee10";

export default node;
