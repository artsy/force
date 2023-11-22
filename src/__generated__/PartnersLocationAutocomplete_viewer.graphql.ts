/**
 * @generated SignedSource<<6f71ffe515f7963867773d9406871303>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersLocationAutocomplete_viewer$data = {
  readonly allCities: ReadonlyArray<{
    readonly coordinates: {
      readonly lat: number | null | undefined;
      readonly lng: number | null | undefined;
    } | null | undefined;
    readonly fullName: string;
    readonly text: string;
    readonly value: string;
  }>;
  readonly featuredCities: ReadonlyArray<{
    readonly coordinates: {
      readonly lat: number | null | undefined;
      readonly lng: number | null | undefined;
    } | null | undefined;
    readonly fullName: string;
    readonly text: string;
    readonly value: string;
  }>;
  readonly " $fragmentType": "PartnersLocationAutocomplete_viewer";
};
export type PartnersLocationAutocomplete_viewer$key = {
  readonly " $data"?: PartnersLocationAutocomplete_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnersLocationAutocomplete_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fullName",
    "storageKey": null
  },
  {
    "alias": "text",
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": "value",
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "LatLng",
    "kind": "LinkedField",
    "name": "coordinates",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lat",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lng",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersLocationAutocomplete_viewer",
  "selections": [
    {
      "alias": "featuredCities",
      "args": [
        {
          "kind": "Literal",
          "name": "featured",
          "value": true
        }
      ],
      "concreteType": "City",
      "kind": "LinkedField",
      "name": "cities",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": "cities(featured:true)"
    },
    {
      "alias": "allCities",
      "args": null,
      "concreteType": "City",
      "kind": "LinkedField",
      "name": "cities",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "776615c6d6f326015b1e7fb8fa406b8a";

export default node;
