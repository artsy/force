/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeleteUserAddressInput = {
    clientMutationId?: string | null;
    userAddressID: string;
};
export type DeleteUserAddressMutationVariables = {
    input: DeleteUserAddressInput;
};
export type DeleteUserAddressMutationResponse = {
    readonly deleteUserAddress: {
        readonly userAddressOrErrors: {
            readonly id?: string;
            readonly internalID?: string;
            readonly name?: string | null;
            readonly addressLine1?: string;
            readonly addressLine2?: string | null;
            readonly isDefault?: boolean;
            readonly phoneNumber?: string | null;
            readonly city?: string;
            readonly region?: string | null;
            readonly postalCode?: string | null;
            readonly country?: string;
            readonly errors?: ReadonlyArray<{
                readonly code: string;
                readonly message: string;
            }>;
        };
    } | null;
};
export type DeleteUserAddressMutation = {
    readonly response: DeleteUserAddressMutationResponse;
    readonly variables: DeleteUserAddressMutationVariables;
};



/*
mutation DeleteUserAddressMutation(
  $input: DeleteUserAddressInput!
) {
  deleteUserAddress(input: $input) {
    userAddressOrErrors {
      __typename
      ... on UserAddress {
        id
        internalID
        name
        addressLine1
        addressLine2
        isDefault
        phoneNumber
        city
        region
        postalCode
        country
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
    "type": "DeleteUserAddressInput!"
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
      "name": "name",
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
      "name": "isDefault",
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
      "name": "city",
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
      "name": "postalCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
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
    "name": "DeleteUserAddressMutation",
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
    "name": "DeleteUserAddressMutation",
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
    "name": "DeleteUserAddressMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteUserAddressMutation(\n  $input: DeleteUserAddressInput!\n) {\n  deleteUserAddress(input: $input) {\n    userAddressOrErrors {\n      __typename\n      ... on UserAddress {\n        id\n        internalID\n        name\n        addressLine1\n        addressLine2\n        isDefault\n        phoneNumber\n        city\n        region\n        postalCode\n        country\n      }\n      ... on Errors {\n        errors {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '45a8df457122ee6ddb24c927e5997d24';
export default node;
