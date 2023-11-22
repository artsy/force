/**
 * @generated SignedSource<<c6d8a1469e72f56f68d610b1a5e12743>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerifyAddressInput = {
  addressLine1: string;
  addressLine2?: string | null | undefined;
  city?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  country: string;
  postalCode: string;
  region?: string | null | undefined;
};
export type AddressVerificationFlow_Test_Query$variables = {
  address: VerifyAddressInput;
};
export type AddressVerificationFlow_Test_Query$data = {
  readonly verifyAddress: {
    readonly " $fragmentSpreads": FragmentRefs<"AddressVerificationFlow_verifyAddress">;
  } | null | undefined;
};
export type AddressVerificationFlow_Test_Query = {
  response: AddressVerificationFlow_Test_Query$data;
  variables: AddressVerificationFlow_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "address"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "address"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lines",
  "storageKey": null
},
v3 = [
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
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddressVerificationFlow_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAddressPayload",
        "kind": "LinkedField",
        "name": "verifyAddress",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddressVerificationFlow_verifyAddress"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddressVerificationFlow_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAddressPayload",
        "kind": "LinkedField",
        "name": "verifyAddress",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "verifyAddressOrError",
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
                    "concreteType": "InputAddressFields",
                    "kind": "LinkedField",
                    "name": "inputAddress",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "InputAddress",
                        "kind": "LinkedField",
                        "name": "address",
                        "plural": false,
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SuggestedAddressFields",
                    "kind": "LinkedField",
                    "name": "suggestedAddresses",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SuggestedAddress",
                        "kind": "LinkedField",
                        "name": "address",
                        "plural": false,
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "verificationStatus",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "addressVerificationId",
                    "storageKey": null
                  }
                ],
                "type": "VerifyAddressType",
                "abstractKey": null
              },
              {
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
                        "name": "statusCode",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "VerifyAddressFailureType",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "22015b04dd5c1e149a6094fd3837e20e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "verifyAddress": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "VerifyAddressPayload"
        },
        "verifyAddress.verifyAddressOrError": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "VerifyAddressMutationType"
        },
        "verifyAddress.verifyAddressOrError.__typename": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.addressVerificationId": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.inputAddress": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "InputAddressFields"
        },
        "verifyAddress.verifyAddressOrError.inputAddress.address": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "InputAddress"
        },
        "verifyAddress.verifyAddressOrError.inputAddress.address.addressLine1": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.inputAddress.address.addressLine2": (v5/*: any*/),
        "verifyAddress.verifyAddressOrError.inputAddress.address.city": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.inputAddress.address.country": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.inputAddress.address.postalCode": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.inputAddress.address.region": (v5/*: any*/),
        "verifyAddress.verifyAddressOrError.inputAddress.lines": (v6/*: any*/),
        "verifyAddress.verifyAddressOrError.mutationError": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GravityMutationError"
        },
        "verifyAddress.verifyAddressOrError.mutationError.message": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.mutationError.statusCode": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "verifyAddress.verifyAddressOrError.mutationError.type": (v5/*: any*/),
        "verifyAddress.verifyAddressOrError.suggestedAddresses": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "SuggestedAddressFields"
        },
        "verifyAddress.verifyAddressOrError.suggestedAddresses.address": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SuggestedAddress"
        },
        "verifyAddress.verifyAddressOrError.suggestedAddresses.address.addressLine1": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.suggestedAddresses.address.addressLine2": (v5/*: any*/),
        "verifyAddress.verifyAddressOrError.suggestedAddresses.address.city": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.suggestedAddresses.address.country": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.suggestedAddresses.address.postalCode": (v4/*: any*/),
        "verifyAddress.verifyAddressOrError.suggestedAddresses.address.region": (v5/*: any*/),
        "verifyAddress.verifyAddressOrError.suggestedAddresses.lines": (v6/*: any*/),
        "verifyAddress.verifyAddressOrError.verificationStatus": {
          "enumValues": [
            "NOT_FOUND",
            "NOT_PERFORMED",
            "VERIFICATION_UNAVAILABLE",
            "VERIFIED_NO_CHANGE",
            "VERIFIED_WITH_CHANGES"
          ],
          "nullable": false,
          "plural": false,
          "type": "VerificationStatuses"
        }
      }
    },
    "name": "AddressVerificationFlow_Test_Query",
    "operationKind": "query",
    "text": "query AddressVerificationFlow_Test_Query(\n  $address: VerifyAddressInput!\n) {\n  verifyAddress(input: $address) {\n    ...AddressVerificationFlow_verifyAddress\n  }\n}\n\nfragment AddressVerificationFlow_verifyAddress on VerifyAddressPayload {\n  verifyAddressOrError {\n    __typename\n    ... on VerifyAddressType {\n      inputAddress {\n        lines\n        address {\n          addressLine1\n          addressLine2\n          city\n          country\n          postalCode\n          region\n        }\n      }\n      suggestedAddresses {\n        lines\n        address {\n          addressLine1\n          addressLine2\n          city\n          country\n          postalCode\n          region\n        }\n      }\n      verificationStatus\n      addressVerificationId\n    }\n    ... on VerifyAddressFailureType {\n      mutationError {\n        type\n        message\n        statusCode\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "33002f652097a89ebf5cc1ee9262fe9e";

export default node;
