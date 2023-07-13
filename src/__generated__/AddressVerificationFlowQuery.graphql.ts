/**
 * @generated SignedSource<<b6764c3f8857351e0034a8273abeea46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddressInput = {
  addressLine1: string;
  addressLine2?: string | null;
  city?: string | null;
  country: string;
  postalCode: string;
  region?: string | null;
};
export type AddressVerificationFlowQuery$variables = {
  address: AddressInput;
};
export type AddressVerificationFlowQuery$data = {
  readonly verifyAddress: {
    readonly " $fragmentSpreads": FragmentRefs<"AddressVerificationFlow_verifiedAddressResult">;
  } | null;
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
    "name": "address",
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
        "concreteType": "VerifyAddressType",
        "kind": "LinkedField",
        "name": "verifyAddress",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddressVerificationFlow_verifiedAddressResult"
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
        "concreteType": "VerifyAddressType",
        "kind": "LinkedField",
        "name": "verifyAddress",
        "plural": false,
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "242e36573eba93a6afcaef3208233de4",
    "id": null,
    "metadata": {},
    "name": "AddressVerificationFlowQuery",
    "operationKind": "query",
    "text": "query AddressVerificationFlowQuery(\n  $address: AddressInput!\n) {\n  verifyAddress(address: $address) {\n    ...AddressVerificationFlow_verifiedAddressResult\n  }\n}\n\nfragment AddressVerificationFlow_verifiedAddressResult on VerifyAddressType {\n  inputAddress {\n    lines\n    address {\n      addressLine1\n      addressLine2\n      city\n      country\n      postalCode\n      region\n    }\n  }\n  suggestedAddresses {\n    lines\n    address {\n      addressLine1\n      addressLine2\n      city\n      country\n      postalCode\n      region\n    }\n  }\n  verificationStatus\n}\n"
  }
};
})();

(node as any).hash = "fc3f5b41165706d036f0f408dc3ddba2";

export default node;
