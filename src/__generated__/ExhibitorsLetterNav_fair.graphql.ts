/**
 * @generated SignedSource<<9ae3b78ba66515a5728fbbf3850d05b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExhibitorsLetterNav_fair$data = {
  readonly exhibitorsGroupedByName: ReadonlyArray<{
    readonly letter: string | null;
  } | null> | null;
  readonly " $fragmentType": "ExhibitorsLetterNav_fair";
};
export type ExhibitorsLetterNav_fair$key = {
  readonly " $data"?: ExhibitorsLetterNav_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExhibitorsLetterNav_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExhibitorsLetterNav_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FairExhibitorsGroup",
      "kind": "LinkedField",
      "name": "exhibitorsGroupedByName",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "letter",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "80f81b2b617cdc49ae85cd2745c5b6ac";

export default node;
