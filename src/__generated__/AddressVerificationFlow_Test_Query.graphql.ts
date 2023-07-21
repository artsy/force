/**
 * @generated SignedSource<<f16bbe990f6f827d8a26ca270d1c6fd4>>
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
export type AddressVerificationFlow_Test_Query$variables = {
  address: AddressInput;
};
export type AddressVerificationFlow_Test_Query$data = {
  readonly verifyAddress: {
    readonly " $fragmentSpreads": FragmentRefs<"AddressVerificationFlow_verifyAddress">;
  } | null;
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
        "concreteType": "VerifyAddressType",
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
    "cacheID": "24e425ce3f99ac0b06d0e2522e50c45d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "verifyAddress": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "VerifyAddressType"
        },
        "verifyAddress.inputAddress": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "InputAddressFields"
        },
        "verifyAddress.inputAddress.address": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "InputAddress"
        },
        "verifyAddress.inputAddress.address.addressLine1": (v4/*: any*/),
        "verifyAddress.inputAddress.address.addressLine2": (v5/*: any*/),
        "verifyAddress.inputAddress.address.city": (v4/*: any*/),
        "verifyAddress.inputAddress.address.country": (v4/*: any*/),
        "verifyAddress.inputAddress.address.postalCode": (v4/*: any*/),
        "verifyAddress.inputAddress.address.region": (v5/*: any*/),
        "verifyAddress.inputAddress.lines": (v6/*: any*/),
        "verifyAddress.suggestedAddresses": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SuggestedAddressFields"
        },
        "verifyAddress.suggestedAddresses.address": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SuggestedAddress"
        },
        "verifyAddress.suggestedAddresses.address.addressLine1": (v4/*: any*/),
        "verifyAddress.suggestedAddresses.address.addressLine2": (v5/*: any*/),
        "verifyAddress.suggestedAddresses.address.city": (v4/*: any*/),
        "verifyAddress.suggestedAddresses.address.country": (v4/*: any*/),
        "verifyAddress.suggestedAddresses.address.postalCode": (v4/*: any*/),
        "verifyAddress.suggestedAddresses.address.region": (v5/*: any*/),
        "verifyAddress.suggestedAddresses.lines": (v6/*: any*/),
        "verifyAddress.verificationStatus": {
          "enumValues": [
            "NOT_FOUND",
            "NOT_PERFORMED",
            "VERIFICATION_UNAVAILABLE",
            "VERIFIED_NO_CHANGE",
            "VERIFIED_WITH_CHANGES"
          ],
          "nullable": true,
          "plural": false,
          "type": "VerificationStatuses"
        }
      }
    },
    "name": "AddressVerificationFlow_Test_Query",
    "operationKind": "query",
    "text": "query AddressVerificationFlow_Test_Query(\n  $address: AddressInput!\n) {\n  verifyAddress(address: $address) {\n    ...AddressVerificationFlow_verifyAddress\n  }\n}\n\nfragment AddressVerificationFlow_verifyAddress on VerifyAddressType {\n  inputAddress {\n    lines\n    address {\n      addressLine1\n      addressLine2\n      city\n      country\n      postalCode\n      region\n    }\n  }\n  suggestedAddresses {\n    lines\n    address {\n      addressLine1\n      addressLine2\n      city\n      country\n      postalCode\n      region\n    }\n  }\n  verificationStatus\n}\n"
  }
};
})();

(node as any).hash = "f9ed0de239e1632f8b2c4a3fa40f8d63";

export default node;
