/**
 * @generated SignedSource<<561eeecaabba5b3c6d59c9060c6cdae1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsHeader_viewer$data = {
  readonly allCities: ReadonlyArray<{
    readonly text: string;
    readonly value: string;
  }>;
  readonly featuredCities: ReadonlyArray<{
    readonly text: string;
    readonly value: string;
  }>;
  readonly " $fragmentType": "ShowsHeader_viewer";
};
export type ShowsHeader_viewer$key = {
  readonly " $data"?: ShowsHeader_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsHeader_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsHeader_viewer",
  "selections": [
    {
      "alias": "allCities",
      "args": null,
      "concreteType": "City",
      "kind": "LinkedField",
      "name": "cities",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
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
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "cfb59087d237d793ca8064609f04e774";

export default node;
