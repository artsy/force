/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeHeroUnits_homePage = {
    readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnitsSmall_homePage" | "HomeHeroUnitsLarge_homePage">;
    readonly " $refType": "HomeHeroUnits_homePage";
};
export type HomeHeroUnits_homePage$data = HomeHeroUnits_homePage;
export type HomeHeroUnits_homePage$key = {
    readonly " $data"?: HomeHeroUnits_homePage$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnits_homePage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeHeroUnits_homePage",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HomeHeroUnitsSmall_homePage"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HomeHeroUnitsLarge_homePage"
    }
  ],
  "type": "HomePage"
};
(node as any).hash = '46e23ad3c0a65ec752bcaf54587a6dde';
export default node;
