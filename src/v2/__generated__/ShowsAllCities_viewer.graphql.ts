/**
 * @generated SignedSource<<9755de0d203fc1473c5d28b8743c893e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsAllCities_viewer$data = {
  readonly cities: ReadonlyArray<{
    readonly name: string;
    readonly slug: string;
  }>;
  readonly " $fragmentType": "ShowsAllCities_viewer";
};
export type ShowsAllCities_viewer$key = {
  readonly " $data"?: ShowsAllCities_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsAllCities_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsAllCities_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "City",
      "kind": "LinkedField",
      "name": "cities",
      "plural": true,
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
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "e0495c5d6a1a793f6146df5dcf3e2c25";

export default node;
