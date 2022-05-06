/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsAllCities_viewer = {
    readonly cities: ReadonlyArray<{
        readonly name: string;
        readonly slug: string;
    }>;
    readonly " $refType": "ShowsAllCities_viewer";
};
export type ShowsAllCities_viewer$data = ShowsAllCities_viewer;
export type ShowsAllCities_viewer$key = {
    readonly " $data"?: ShowsAllCities_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShowsAllCities_viewer">;
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
(node as any).hash = 'e0495c5d6a1a793f6146df5dcf3e2c25';
export default node;
