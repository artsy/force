/**
 * @generated SignedSource<<16b0cfb734d9ad813788b9cdc846e094>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type VerificationStatuses = "NOT_FOUND" | "NOT_PERFORMED" | "VERIFICATION_UNAVAILABLE" | "VERIFIED_NO_CHANGE" | "VERIFIED_WITH_CHANGES" | "%future added value";
export type AddressInput = {
  addressLine1: string;
  addressLine2?: string | null;
  city?: string | null;
  country: string;
  postalCode: string;
  region?: string | null;
};
export type AddressVerificationManagerQuery$variables = {
  address: AddressInput;
};
export type AddressVerificationManagerQuery$data = {
  readonly verifyAddress: {
    readonly inputAddress: {
      readonly address: {
        readonly addressLine1: string;
        readonly addressLine2: string;
        readonly city: string;
        readonly country: string;
        readonly postalCode: string;
        readonly region: string | null;
      } | null;
      readonly lines: ReadonlyArray<string | null> | null;
    } | null;
    readonly suggestedAddresses: ReadonlyArray<{
      readonly address: {
        readonly addressLine1: string;
        readonly addressLine2: string;
        readonly city: string;
        readonly country: string;
        readonly postalCode: string;
        readonly region: string | null;
      } | null;
      readonly lines: ReadonlyArray<string | null> | null;
    } | null> | null;
    readonly verificationStatus: VerificationStatuses | null;
  } | null;
};
export type AddressVerificationManagerQuery = {
  response: AddressVerificationManagerQuery$data;
  variables: AddressVerificationManagerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "address"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lines",
  "storageKey": null
},
v2 = [
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
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "address",
        "variableName": "address"
      }
    ],
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "InputAddress",
            "kind": "LinkedField",
            "name": "address",
            "plural": false,
            "selections": (v2/*: any*/),
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "SuggestedAddress",
            "kind": "LinkedField",
            "name": "address",
            "plural": false,
            "selections": (v2/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddressVerificationManagerQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddressVerificationManagerQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "250348439c017e994bbf2ed1b37d5074",
    "id": null,
    "metadata": {},
    "name": "AddressVerificationManagerQuery",
    "operationKind": "query",
    "text": "query AddressVerificationManagerQuery(\n  $address: AddressInput!\n) {\n  verifyAddress(address: $address) {\n    inputAddress {\n      lines\n      address {\n        addressLine1\n        addressLine2\n        city\n        country\n        postalCode\n        region\n      }\n    }\n    suggestedAddresses {\n      lines\n      address {\n        addressLine1\n        addressLine2\n        city\n        country\n        postalCode\n        region\n      }\n    }\n    verificationStatus\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d78c8f6b38af2ebadf6b1e5383cee6a";

export default node;
