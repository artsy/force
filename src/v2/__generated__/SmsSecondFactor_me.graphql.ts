/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmsSecondFactor_me = {
    readonly hasSecondFactorEnabled: boolean;
    readonly smsSecondFactors: ReadonlyArray<({
        readonly __typename: "SmsSecondFactor";
        readonly internalID: string;
        readonly formattedPhoneNumber: string | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "SmsSecondFactor_me";
};
export type SmsSecondFactor_me$data = SmsSecondFactor_me;
export type SmsSecondFactor_me$key = {
    readonly " $data"?: SmsSecondFactor_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SmsSecondFactor_me">;
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
      "name": "hasSecondFactorEnabled",
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
(node as any).hash = '8c0f24b8224b514269381da71ff6b1b2';
export default node;
