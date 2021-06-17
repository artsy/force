/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeApp_homePage = {
    readonly heroUnits: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnit_heroUnit">;
    } | null> | null;
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
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "platform",
          "value": "DESKTOP"
        }
      ],
      "concreteType": "HomePageHeroUnit",
      "kind": "LinkedField",
      "name": "heroUnits",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "HomeHeroUnit_heroUnit"
        }
      ],
      "storageKey": "heroUnits(platform:\"DESKTOP\")"
    }
  ],
  "type": "HomePage"
};
(node as any).hash = '0e3bf7e8c8be3fbc6ddb48bac59c5d9b';
export default node;
