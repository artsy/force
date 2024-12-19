/**
 * @generated SignedSource<<33c008507bfe6709f3734d88bef23f7d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
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
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
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
      "storageKey": "artists(shallow:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "8d4dfff374d31cbfee2e4043f3e4ab47";

export default node;
