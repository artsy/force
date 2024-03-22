/**
 * @generated SignedSource<<b445c5d90fd0a7403a8c136747596405>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkPageBanner_me" | "ArtworkSidebar_me">;
  readonly " $fragmentType": "ArtworkApp_me";
};
export type ArtworkApp_me$key = {
  readonly " $data"?: ArtworkApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkPageBanner_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "2268413403c42c1b601195a884250f9a";

export default node;
