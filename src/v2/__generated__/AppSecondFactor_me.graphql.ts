/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppSecondFactor_me = {
    readonly hasSecondFactorEnabled: boolean;
    readonly appSecondFactors: ReadonlyArray<({
        readonly __typename: "AppSecondFactor";
        readonly internalID: string;
        readonly name: string | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "AppSecondFactor_me";
};
export type AppSecondFactor_me$data = AppSecondFactor_me;
export type AppSecondFactor_me$key = {
    readonly " $data"?: AppSecondFactor_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AppSecondFactor_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppSecondFactor_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasSecondFactorEnabled",
      "storageKey": null
    },
    {
      "alias": "appSecondFactors",
      "args": [
        {
          "kind": "Literal",
          "name": "kinds",
          "value": [
            "app"
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
              "name": "name",
              "storageKey": null
            }
          ],
          "type": "AppSecondFactor"
        }
      ],
      "storageKey": "secondFactors(kinds:[\"app\"])"
    }
  ],
  "type": "Me"
};
(node as any).hash = '5c098681fc3af26acb2b13dab1368da3';
export default node;
