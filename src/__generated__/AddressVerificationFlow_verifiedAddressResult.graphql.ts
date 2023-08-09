/**
 * @generated SignedSource<<79e77fcc92ba39e316a45872597ea7d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type VerificationStatuses = "NOT_FOUND" | "NOT_PERFORMED" | "VERIFICATION_UNAVAILABLE" | "VERIFIED_NO_CHANGE" | "VERIFIED_WITH_CHANGES" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AddressVerificationFlow_verifiedAddressResult$data = {
  readonly verifyAddressOrError: {
    readonly inputAddress?: {
      readonly address: {
        readonly addressLine1: string;
        readonly addressLine2: string | null;
        readonly city: string;
        readonly country: string;
        readonly postalCode: string;
        readonly region: string | null;
      } | null;
      readonly lines: ReadonlyArray<string | null> | null;
    };
    readonly mutationError?: {
      readonly message: string;
      readonly statusCode: number | null;
      readonly type: string | null;
    } | null;
    readonly suggestedAddresses?: ReadonlyArray<{
      readonly address: {
        readonly addressLine1: string;
        readonly addressLine2: string | null;
        readonly city: string;
        readonly country: string;
        readonly postalCode: string;
        readonly region: string | null;
      } | null;
      readonly lines: ReadonlyArray<string | null> | null;
    } | null>;
    readonly verificationStatus?: VerificationStatuses;
  } | null;
  readonly " $fragmentType": "AddressVerificationFlow_verifiedAddressResult";
};
export type AddressVerificationFlow_verifiedAddressResult$key = {
  readonly " $data"?: AddressVerificationFlow_verifiedAddressResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddressVerificationFlow_verifiedAddressResult">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lines",
  "storageKey": null
},
v1 = [
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddressVerificationFlow_verifiedAddressResult",
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "InputAddress",
                  "kind": "LinkedField",
                  "name": "address",
                  "plural": false,
                  "selections": (v1/*: any*/),
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "SuggestedAddress",
                  "kind": "LinkedField",
                  "name": "address",
                  "plural": false,
                  "selections": (v1/*: any*/),
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
  "type": "VerifyAddressPayload",
  "abstractKey": null
};
})();

(node as any).hash = "6795615167f6d70f9f083443550debb8";

export default node;
