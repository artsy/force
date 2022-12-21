/**
 * @generated SignedSource<<4202b5d23f59ad8db3b099b3eb8ddbc1>>
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
    readonly fullName: string;
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
          "name": "fullName",
          "storageKey": null
        },
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

(node as any).hash = "a4f03b7aa8086fb933929f0259acf90b";

export default node;
