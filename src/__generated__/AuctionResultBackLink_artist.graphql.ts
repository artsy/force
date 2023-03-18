/**
 * @generated SignedSource<<272758f2f8ead147a0018220e27ed404>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResultBackLink_artist$data = {
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentType": "AuctionResultBackLink_artist";
};
export type AuctionResultBackLink_artist$key = {
  readonly " $data"?: AuctionResultBackLink_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultBackLink_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionResultBackLink_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "75640c05ddfd0f771348972d716209ba";

export default node;
