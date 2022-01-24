/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeApp_homePage = {
    readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnits_homePage">;
    readonly " $refType": "HomeApp_homePage";
};
export type HomeApp_homePage$data = HomeApp_homePage;
export type HomeApp_homePage$key = {
    readonly " $data"?: HomeApp_homePage$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeApp_homePage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeApp_homePage",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HomeHeroUnits_homePage"
    }
  ],
  "type": "HomePage",
  "abstractKey": null
};
(node as any).hash = '88cdcdc3789855289e8a13bd7d5d605c';
export default node;
