/**
 * @generated SignedSource<<8c6f71cd895d8eec83daff303397f0f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDownloadButton_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly name: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly date: string | null | undefined;
  readonly downloadableImageUrl: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArtworkDownloadButton_artwork";
};
export type ArtworkDownloadButton_artwork$key = {
  readonly " $data"?: ArtworkDownloadButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDownloadButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDownloadButton_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "downloadableImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "4458c7df74efb6912d1163a2a6ae9e50";

export default node;
