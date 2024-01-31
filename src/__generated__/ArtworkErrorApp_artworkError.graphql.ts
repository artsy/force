/**
 * @generated SignedSource<<1f0b2e1323b384bf226112a594111c1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkErrorApp_artworkError$data = {
  readonly artwork: {
    readonly slug: string;
  } | null | undefined;
  readonly requestError: {
    readonly statusCode: number;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkErrorApp_artworkError";
};
export type ArtworkErrorApp_artworkError$key = {
  readonly " $data"?: ArtworkErrorApp_artworkError$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkErrorApp_artworkError">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkErrorApp_artworkError",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PartialArtwork",
      "kind": "LinkedField",
      "name": "artwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "RequestError",
      "kind": "LinkedField",
      "name": "requestError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "statusCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworkError",
  "abstractKey": null
};

(node as any).hash = "95c8785d4269002598fc195959122667";

export default node;
