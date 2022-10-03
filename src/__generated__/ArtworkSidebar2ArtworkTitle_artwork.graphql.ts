/**
 * @generated SignedSource<<85c59c8265f9ac32cdefca9b44c03ff8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2ArtworkTitle_artwork$data = {
  readonly date: string | null;
  readonly title: string | null;
  readonly " $fragmentType": "ArtworkSidebar2ArtworkTitle_artwork";
};
export type ArtworkSidebar2ArtworkTitle_artwork$key = {
  readonly " $data"?: ArtworkSidebar2ArtworkTitle_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2ArtworkTitle_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2ArtworkTitle_artwork",
  "selections": [
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "8521ac0b18b267e83b6cec088b757887";

export default node;
