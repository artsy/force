/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomePageHeroUnitMode = "CENTERED_DARK" | "CENTERED_LIGHT" | "LEFT_DARK" | "LEFT_LIGHT" | "RIGHT_DARK" | "RIGHT_LIGHT" | "%future added value";
export type HomeApp_homePage = {
    readonly heroUnits: ReadonlyArray<{
        readonly mode: HomePageHeroUnitMode | null;
        readonly heading: string | null;
        readonly title: string | null;
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
          "name": "mode",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "heading",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": "heroUnits(platform:\"DESKTOP\")"
    }
  ],
  "type": "HomePage"
};
(node as any).hash = 'e4c074bf2be22c2784666c5f568cabbb';
export default node;
