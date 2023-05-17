/**
 * @generated SignedSource<<ed05d4f5e6863e83a4e859fa213f54b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_heroUnitsConnection$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnits_heroUnits">;
  readonly " $fragmentType": "HomeApp_heroUnitsConnection";
};
export type HomeApp_heroUnitsConnection$key = {
  readonly " $data"?: HomeApp_heroUnitsConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeApp_heroUnitsConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeApp_heroUnitsConnection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HomeHeroUnits_heroUnits"
    }
  ],
  "type": "HeroUnitConnection",
  "abstractKey": null
};

(node as any).hash = "fbd2d764b807d5397771d7aefc78b6d1";

export default node;
