/**
 * @generated SignedSource<<45e00c69664166ca975fe98864377e52>>
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
export type CheckoutAddressQuery$variables = {
  address: AddressInput;
};
export type CheckoutAddressQuery$data = {
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
export type CheckoutAddressQuery = {
  response: CheckoutAddressQuery$data;
  variables: CheckoutAddressQuery$variables;
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
    "name": "CheckoutAddressQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CheckoutAddressQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "95e12062e1d450e93336f86a23d53215",
    "id": null,
    "metadata": {},
    "name": "CheckoutAddressQuery",
    "operationKind": "query",
    "text": "query CheckoutAddressQuery(\n  $address: AddressInput!\n) {\n  verifyAddress(address: $address) {\n    inputAddress {\n      lines\n      address {\n        addressLine1\n        addressLine2\n        city\n        country\n        postalCode\n        region\n      }\n    }\n    suggestedAddresses {\n      lines\n      address {\n        addressLine1\n        addressLine2\n        city\n        country\n        postalCode\n        region\n      }\n    }\n    verificationStatus\n  }\n}\n"
  }
};
})();

(node as any).hash = "83bd28b24c0af472e94e9112d82d338e";

export default node;
