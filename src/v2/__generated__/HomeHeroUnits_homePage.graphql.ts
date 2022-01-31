/**
 * @generated SignedSource<<e36b8e8b72b0d3e7fda6630b70ac7292>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeHeroUnits_homePage$data = {
  readonly heroUnits: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnit_heroUnit">;
  } | null> | null;
  readonly " $fragmentType": "HomeHeroUnits_homePage";
};
export type HomeHeroUnits_homePage$key = {
  readonly " $data"?: HomeHeroUnits_homePage$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnits_homePage">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeHeroUnits_homePage",
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
  "type": "HomePage",
  "abstractKey": null
};

(node as any).hash = "639c22acaf91b70e81d884f640676335";

export default node;
