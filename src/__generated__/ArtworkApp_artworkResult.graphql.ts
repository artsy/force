/**
 * @generated SignedSource<<a470b6d8a931588ac912d12121e94b5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_artworkResult$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artwork" | "ArtworkErrorApp_artworkError">;
  readonly " $fragmentType": "ArtworkApp_artworkResult";
};
export type ArtworkApp_artworkResult$key = {
  readonly " $data"?: ArtworkApp_artworkResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artworkResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_artworkResult",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkApp_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkErrorApp_artworkError"
    }
  ],
  "type": "ArtworkResult",
  "abstractKey": "__isArtworkResult"
};

(node as any).hash = "af234c780e0aaad319500dbe2cc10e51";

export default node;
