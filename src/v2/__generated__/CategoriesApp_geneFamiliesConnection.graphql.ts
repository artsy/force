/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoriesApp_geneFamiliesConnection = {
    readonly " $fragmentRefs": FragmentRefs<"StickyNav_geneFamiliesConnection" | "GeneFamilies_geneFamiliesConnection">;
    readonly " $refType": "CategoriesApp_geneFamiliesConnection";
};
export type CategoriesApp_geneFamiliesConnection$data = CategoriesApp_geneFamiliesConnection;
export type CategoriesApp_geneFamiliesConnection$key = {
    readonly " $data"?: CategoriesApp_geneFamiliesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"CategoriesApp_geneFamiliesConnection">;
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
(node as any).hash = '855564f4196c746eaf076bb5a27d9fa5';
export default node;
