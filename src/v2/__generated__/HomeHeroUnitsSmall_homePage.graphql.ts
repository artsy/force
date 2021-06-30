/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeHeroUnitsSmall_homePage = {
    readonly heroUnits: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnit_heroUnit">;
    } | null> | null;
    readonly " $refType": "HomeHeroUnitsSmall_homePage";
};
export type HomeHeroUnitsSmall_homePage$data = HomeHeroUnitsSmall_homePage;
export type HomeHeroUnitsSmall_homePage$key = {
    readonly " $data"?: HomeHeroUnitsSmall_homePage$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnitsSmall_homePage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeHeroUnitsSmall_homePage",
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
(node as any).hash = 'a493d7fb57bc95e583bfd63e93b76c8b';
export default node;
