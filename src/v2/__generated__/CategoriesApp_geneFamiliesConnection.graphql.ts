/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoriesApp_geneFamiliesConnection = {
    readonly " $fragmentRefs": FragmentRefs<"GeneFamilies_geneFamiliesConnection">;
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
      "name": "GeneFamilies_geneFamiliesConnection"
    }
  ],
  "type": "GeneFamilyConnection"
};
(node as any).hash = 'dcd162e82c321631ed6beadf26916f9f';
export default node;
