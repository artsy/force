/**
 * @generated SignedSource<<4d67c439714a985efd50eb92004ff97e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowArtworksEmptyState_show$data = {
  readonly isFairBooth: boolean | null | undefined;
  readonly status: string | null | undefined;
  readonly " $fragmentType": "ShowArtworksEmptyState_show";
};
export type ShowArtworksEmptyState_show$key = {
  readonly " $data"?: ShowArtworksEmptyState_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowArtworksEmptyState_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowArtworksEmptyState_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFairBooth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "be321818d2ec1658c3e5dfa05febe366";

export default node;
