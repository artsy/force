/**
 * @generated SignedSource<<94444243a926a0bbe0d708a9f81efe27>>
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
export type AddressVerificationFlowQuery$variables = {
  address: VerifyAddressInput;
};
export type AddressVerificationFlowQuery$data = {
  readonly verifyAddress: {
    readonly " $fragmentSpreads": FragmentRefs<"AddressVerificationFlow_verifyAddress">;
  } | null | undefined;
};
export type AddressVerificationFlowQuery = {
  response: AddressVerificationFlowQuery$data;
  variables: AddressVerificationFlowQuery$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddressVerificationFlowQuery",
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
    "name": "AddressVerificationFlowQuery",
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
    "cacheID": "9e0aa5cc81fda4355ce35d18a45bb945",
    "id": null,
    "metadata": {},
    "name": "AddressVerificationFlowQuery",
    "operationKind": "query",
    "text": "query AddressVerificationFlowQuery(\n  $address: VerifyAddressInput!\n) {\n  verifyAddress(input: $address) {\n    ...AddressVerificationFlow_verifyAddress\n  }\n}\n\nfragment AddressVerificationFlow_verifyAddress on VerifyAddressPayload {\n  verifyAddressOrError {\n    __typename\n    ... on VerifyAddressType {\n      inputAddress {\n        lines\n        address {\n          addressLine1\n          addressLine2\n          city\n          country\n          postalCode\n          region\n        }\n      }\n      suggestedAddresses {\n        lines\n        address {\n          addressLine1\n          addressLine2\n          city\n          country\n          postalCode\n          region\n        }\n      }\n      verificationStatus\n      addressVerificationId\n    }\n    ... on VerifyAddressFailureType {\n      mutationError {\n        type\n        message\n        statusCode\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "31cd5f4d8f169b96f099ac32b701be30";

export default node;
