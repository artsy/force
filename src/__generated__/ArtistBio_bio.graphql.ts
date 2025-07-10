/**
 * @generated SignedSource<<866720d929493d835c3bc2b0992a6ff2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistBio_bio$data = {
  readonly biographyBlurb: {
    readonly credit: string | null | undefined;
    readonly text: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistBio_bio";
};
export type ArtistBio_bio$key = {
  readonly " $data"?: ArtistBio_bio$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistBio_bio">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistBio_bio",
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
          "name": "credit",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\")"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "a48596ee5a5f7462c8f8da2ac41272c3";

export default node;
