/**
 * @generated SignedSource<<18a8657266f30b0ab0d2d1dd90be3e28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CareerHighlightModalStep_careerHighlight$data = ReadonlyArray<{
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | null | undefined;
  readonly " $fragmentType": "CareerHighlightModalStep_careerHighlight";
}>;
export type CareerHighlightModalStep_careerHighlight$key = ReadonlyArray<{
  readonly " $data"?: CareerHighlightModalStep_careerHighlight$data;
  readonly " $fragmentSpreads": FragmentRefs<"CareerHighlightModalStep_careerHighlight">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CareerHighlightModalStep_careerHighlight",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityHeaderArtist_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistInsight",
  "abstractKey": null
};

(node as any).hash = "8843f9cb8141b83515dfcde750e8aa50";

export default node;
