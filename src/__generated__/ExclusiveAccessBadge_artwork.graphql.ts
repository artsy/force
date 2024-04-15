/**
 * @generated SignedSource<<faa740fbf391e195ae72202d7d3c5ae0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExclusiveAccessBadge_artwork$data = {
  readonly isUnlisted: boolean;
  readonly " $fragmentType": "ExclusiveAccessBadge_artwork";
};
export type ExclusiveAccessBadge_artwork$key = {
  readonly " $data"?: ExclusiveAccessBadge_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExclusiveAccessBadge_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExclusiveAccessBadge_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "0ca17d7e976cfae65668f4cd0de97b06";

export default node;
