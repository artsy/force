/**
 * @generated SignedSource<<4fadf500f79770bfe4133a0df5ab31d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionCreateAlertHeader_artwork$data = {
  readonly artistNames: string | null;
  readonly title: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCreateAlertButton_artwork">;
  readonly " $fragmentType": "ArtworkAuctionCreateAlertHeader_artwork";
};
export type ArtworkAuctionCreateAlertHeader_artwork$key = {
  readonly " $data"?: ArtworkAuctionCreateAlertHeader_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionCreateAlertHeader_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkAuctionCreateAlertHeader_artwork",
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
      "name": "artistNames",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCreateAlertButton_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "66f2b3de516634c6af99920c7233c612";

export default node;
