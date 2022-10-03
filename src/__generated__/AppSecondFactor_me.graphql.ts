/**
 * @generated SignedSource<<f81daaab9b89c6dc2d5c2d5e8343fc1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppSecondFactor_me$data = {
  readonly hasSecondFactorEnabled: boolean;
  readonly appSecondFactors: ReadonlyArray<{
    readonly __typename: "AppSecondFactor";
    readonly internalID: string;
    readonly name: string | null;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null> | null;
  readonly " $fragmentType": "AppSecondFactor_me";
};
export type AppSecondFactor_me$key = {
  readonly " $data"?: AppSecondFactor_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AppSecondFactor_me">;
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
          "type": "AppSecondFactor",
          "abstractKey": null
        }
      ],
      "storageKey": "secondFactors(kinds:[\"app\"])"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "5c098681fc3af26acb2b13dab1368da3";

export default node;
