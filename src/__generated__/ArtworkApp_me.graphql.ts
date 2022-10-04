/**
 * @generated SignedSource<<42fef9574036cfc73add76a326448747>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2_me" | "ArtworkSidebar_me" | "SubmittedOrderModal_me">;
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

(node as any).hash = "7ad4de42b08f35d00389ae776f1667a6";

export default node;
