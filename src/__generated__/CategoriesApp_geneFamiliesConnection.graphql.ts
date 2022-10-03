/**
 * @generated SignedSource<<534a1fe4aaca28fa9572099e17b54d35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoriesApp_geneFamiliesConnection$data = {
  readonly " $fragmentSpreads": FragmentRefs<"GeneFamilies_geneFamiliesConnection" | "StickyNav_geneFamiliesConnection">;
  readonly " $fragmentType": "CategoriesApp_geneFamiliesConnection";
};
export type CategoriesApp_geneFamiliesConnection$key = {
  readonly " $data"?: CategoriesApp_geneFamiliesConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoriesApp_geneFamiliesConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoriesApp_geneFamiliesConnection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StickyNav_geneFamiliesConnection"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GeneFamilies_geneFamiliesConnection"
    }
  ],
  "type": "GeneFamilyConnection",
  "abstractKey": null
};

(node as any).hash = "855564f4196c746eaf076bb5a27d9fa5";

export default node;
