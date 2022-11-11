/**
 * @generated SignedSource<<210ee4592e3bd6f31efcc9aa83b2e0d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairHeader_fair$data = {
  readonly exhibitionPeriod: string | null;
  readonly name: string | null;
  readonly profile: {
    readonly icon: {
      readonly url: string | null;
    } | null;
  } | null;
  readonly " $fragmentType": "FairHeader_fair";
};
export type FairHeader_fair$key = {
  readonly " $data"?: FairHeader_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairHeader_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeader_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "exhibitionPeriod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "large",
                    "square",
                    "square140"
                  ]
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:[\"large\",\"square\",\"square140\"])"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "f406737327f57215c5b236b25647ec44";

export default node;
