/**
 * @generated SignedSource<<a34848b70a662584e3de300e6dd94fc6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryBiography_artist$data = {
  readonly biographyBlurb: {
    readonly credit: string | null | undefined;
    readonly text: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistStoryBiography_artist";
};
export type ArtistStoryBiography_artist$key = {
  readonly " $data"?: ArtistStoryBiography_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryBiography_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryBiography_artist",
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
      "concreteType": "ArtistBlurb",
      "kind": "LinkedField",
      "name": "biographyBlurb",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "credit",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "25be0158f6c4912eede792d01f256b39";

export default node;
