/* tslint:disable */

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
    readonly " $data"?: SmsSecondFactor_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SmsSecondFactor_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SmsSecondFactor_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasSecondFactorEnabled",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "smsSecondFactors",
      "name": "secondFactors",
      "storageKey": "secondFactors(kinds:[\"sms\"])",
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
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "type": "SmsSecondFactor",
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "__typename",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "internalID",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "formattedPhoneNumber",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '8c0f24b8224b514269381da71ff6b1b2';
export default node;
