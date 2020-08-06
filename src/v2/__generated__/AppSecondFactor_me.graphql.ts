/* tslint:disable */

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
  "kind": "Fragment",
  "name": "AppSecondFactor_me",
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
      "alias": "appSecondFactors",
      "name": "secondFactors",
      "storageKey": "secondFactors(kinds:[\"app\"])",
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
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "type": "AppSecondFactor",
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
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '5c098681fc3af26acb2b13dab1368da3';
export default node;
