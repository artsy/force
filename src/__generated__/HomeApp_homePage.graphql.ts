/**
 * @generated SignedSource<<9b39d8f481f8de893c21e1b0a3a16831>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_homePage$data = {
  readonly heroUnits: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnit_heroUnit">;
  } | null> | null;
  readonly " $fragmentType": "HomeApp_homePage";
};
export type HomeApp_homePage$key = {
  readonly " $data"?: HomeApp_homePage$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeApp_homePage">;
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
  "type": "HomePage",
  "abstractKey": null
};

(node as any).hash = "0e3bf7e8c8be3fbc6ddb48bac59c5d9b";

export default node;
