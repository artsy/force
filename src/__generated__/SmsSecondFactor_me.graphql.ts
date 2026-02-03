/**
 * @generated SignedSource<<d0e3a55756ed5e5c65c9c2491945edb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SmsSecondFactor_me$data = {
  readonly email: string | null | undefined;
  readonly hasSecondFactorEnabled: boolean;
  readonly isEmailConfirmed: boolean;
  readonly smsSecondFactors: ReadonlyArray<{
    readonly __typename: "SmsSecondFactor";
    readonly formattedPhoneNumber: string | null | undefined;
    readonly internalID: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "SmsSecondFactor_me";
};
export type SmsSecondFactor_me$key = {
  readonly " $data"?: SmsSecondFactor_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SmsSecondFactor_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SmsSecondFactor_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasSecondFactorEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEmailConfirmed",
      "storageKey": null
    },
    {
      "alias": "smsSecondFactors",
      "args": [
        {
          "kind": "Literal",
          "name": "kinds",
          "value": [
            "sms"
          ]
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "secondFactors",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
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
              "name": "formattedPhoneNumber",
              "storageKey": null
            }
          ],
          "type": "SmsSecondFactor",
          "abstractKey": null
        }
      ],
      "storageKey": "secondFactors(kinds:[\"sms\"])"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "35d3dcb7ef9c7bdee5de2b44105c8676";

export default node;
