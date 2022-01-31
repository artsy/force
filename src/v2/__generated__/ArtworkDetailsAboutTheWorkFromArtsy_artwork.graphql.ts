/**
 * @generated SignedSource<<b61177b469575cb1527fd105848ee8b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$data = {
  readonly description: string | null;
  readonly " $fragmentType": "ArtworkDetailsAboutTheWorkFromArtsy_artwork";
};
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$key = {
  readonly " $data"?: ArtworkDetailsAboutTheWorkFromArtsy_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAboutTheWorkFromArtsy_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
  "selections": [
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
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "621e4eaa61c267369ccc26d7d14d9ef3";

export default node;
