/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeHeroUnitsLarge_homePage = {
    readonly heroUnits: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnit_heroUnit">;
    } | null> | null;
    readonly " $refType": "HomeHeroUnitsLarge_homePage";
};
export type HomeHeroUnitsLarge_homePage$data = HomeHeroUnitsLarge_homePage;
export type HomeHeroUnitsLarge_homePage$key = {
    readonly " $data"?: HomeHeroUnitsLarge_homePage$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnitsLarge_homePage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeHeroUnitsLarge_homePage",
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
(node as any).hash = '0d78344ec337fd46b5b7712161b26ac0';
export default node;
