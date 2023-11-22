/**
 * @generated SignedSource<<d0cceda0a733ff699877342e51b765a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type VerificationStatuses = "NOT_FOUND" | "NOT_PERFORMED" | "VERIFICATION_UNAVAILABLE" | "VERIFIED_NO_CHANGE" | "VERIFIED_WITH_CHANGES" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AddressVerificationFlow_verifyAddress$data = {
  readonly verifyAddressOrError: {
    readonly __typename: "VerifyAddressFailureType";
    readonly mutationError: {
      readonly message: string;
      readonly statusCode: number | null | undefined;
      readonly type: string | null | undefined;
    } | null | undefined;
  } | {
    readonly __typename: "VerifyAddressType";
    readonly addressVerificationId: string;
    readonly inputAddress: {
      readonly address: {
        readonly addressLine1: string;
        readonly addressLine2: string | null | undefined;
        readonly city: string;
        readonly country: string;
        readonly postalCode: string;
        readonly region: string | null | undefined;
      } | null | undefined;
      readonly lines: ReadonlyArray<string | null | undefined> | null | undefined;
    };
    readonly suggestedAddresses: ReadonlyArray<{
      readonly address: {
        readonly addressLine1: string;
        readonly addressLine2: string | null | undefined;
        readonly city: string;
        readonly country: string;
        readonly postalCode: string;
        readonly region: string | null | undefined;
      } | null | undefined;
      readonly lines: ReadonlyArray<string | null | undefined> | null | undefined;
    } | null | undefined>;
    readonly verificationStatus: VerificationStatuses;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly " $fragmentType": "AddressVerificationFlow_verifyAddress";
};
export type AddressVerificationFlow_verifyAddress$key = {
  readonly " $data"?: AddressVerificationFlow_verifyAddress$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddressVerificationFlow_verifyAddress">;
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
  "name": "AddressVerificationFlow_verifyAddress",
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
  "type": "VerifyAddressPayload",
  "abstractKey": null
};
})();

(node as any).hash = "b1de331dfa98716677e497189d7ce0bf";

export default node;
