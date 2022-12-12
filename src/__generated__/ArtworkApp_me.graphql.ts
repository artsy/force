/**
 * @generated SignedSource<<e970b6db62a274b2ec7ab1516870cd73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2_me" | "SubmittedOrderModal_me">;
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
      "name": "ArtworkSidebar2_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmittedOrderModal_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "12edaa36c34955d555c1915d63203602";

export default node;
