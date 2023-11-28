/**
 * @generated SignedSource<<30ab9f16292809fed459f3ff2bbf6355>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCareerHighlight_insight$data = {
  readonly description: string | null | undefined;
  readonly entities: ReadonlyArray<string>;
  readonly label: string;
  readonly " $fragmentType": "ArtistCareerHighlight_insight";
};
export type ArtistCareerHighlight_insight$key = {
  readonly " $data"?: ArtistCareerHighlight_insight$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCareerHighlight_insight">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCareerHighlight_insight",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "entities",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    }
  ],
  "type": "ArtistInsight",
  "abstractKey": null
};

(node as any).hash = "e5d94b27789f176069d79a2c94fda745";

export default node;
